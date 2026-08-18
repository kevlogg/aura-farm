-- ============================================================================
-- MIGRACIÓN BASE DE DATOS: AURA FARM
-- ============================================================================

-- 1. CREACIÓN DE ENUMS
CREATE TYPE rank_tier_enum AS ENUM ('NPC', 'Canchero', 'Aura Master', 'Gigachad');
CREATE TYPE vote_type_enum AS ENUM ('AURA', 'LAURA', 'SUPER_AURA');
CREATE TYPE duel_tier_enum AS ENUM ('BRONZE', 'SILVER', 'GOLD');
CREATE TYPE duel_status_enum AS ENUM ('PENDING', 'ACTIVE', 'FINISHED');
CREATE TYPE store_item_type_enum AS ENUM ('SKIN_AVATAR', 'RECOVERY_PACK', 'BOOSTER', 'CLEANSE');

-- 2. TABLA PROFILES
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    aura_points INTEGER NOT NULL DEFAULT 100,
    aura_coins INTEGER NOT NULL DEFAULT 50,
    rank_tier rank_tier_enum NOT NULL DEFAULT 'NPC',
    is_in_laura_state BOOLEAN NOT NULL DEFAULT FALSE,
    daily_votes_count INTEGER NOT NULL DEFAULT 0,
    last_vote_date DATE DEFAULT CURRENT_DATE,
    streak_days INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. TABLA POSTS (Aura Moves)
CREATE TABLE public.posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT,
    caption TEXT,
    aura_votes_count INTEGER NOT NULL DEFAULT 0,
    laura_votes_count INTEGER NOT NULL DEFAULT 0,
    super_aura_count INTEGER NOT NULL DEFAULT 0,
    is_promoted BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. TABLA VOTES
CREATE TABLE public.votes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    vote_type vote_type_enum NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_user_post_vote UNIQUE (user_id, post_id)
);

-- 5. TABLA DUELS (1v1)
CREATE TABLE public.duels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    challenger_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    challenged_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    tier duel_tier_enum NOT NULL,
    entry_fee INTEGER NOT NULL,
    challenger_post_id UUID REFERENCES public.posts(id),
    challenged_post_id UUID REFERENCES public.posts(id),
    challenger_votes INTEGER NOT NULL DEFAULT 0,
    challenged_votes INTEGER NOT NULL DEFAULT 0,
    winner_id UUID REFERENCES public.profiles(id),
    status duel_status_enum NOT NULL DEFAULT 'PENDING',
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. TABLA STORE ITEMS
CREATE TABLE public.store_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    type store_item_type_enum NOT NULL,
    price_coins INTEGER NOT NULL,
    aura_grant_amount INTEGER NOT NULL DEFAULT 0,
    is_laura_exclusive BOOLEAN NOT NULL DEFAULT FALSE,
    image_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. TABLA INVENTARIO DE USUARIO
CREATE TABLE public.user_inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    item_id UUID NOT NULL REFERENCES public.store_items(id) ON DELETE CASCADE,
    is_equipped BOOLEAN NOT NULL DEFAULT FALSE,
    purchased_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_user_item UNIQUE (user_id, item_id)
);

-- ============================================================================
-- LÓGICA DE NEGOCIO: TRIGGERS & FUNCIONES
-- ============================================================================

-- A. Auto-crear perfil al registrarse en Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, username, avatar_url)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'username', 'User_' || SUBSTRING(NEW.id::text, 1, 8)),
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', 'https://api.dicebear.com/7.x/bottts/svg?seed=' || NEW.id)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- B. Procesador de Votos: Actualización de Post, Perfil, Rango y Estado Laura Bankrupt
CREATE OR REPLACE FUNCTION public.process_aura_vote()
RETURNS TRIGGER AS $$
DECLARE
    v_target_user_id UUID;
    v_aura_delta INT := 0;
    v_current_aura INT;
    v_total_aura_votes INT;
    v_total_laura_votes INT;
    v_laura_ratio NUMERIC;
    v_new_rank rank_tier_enum;
    v_new_laura_state BOOLEAN;
    v_voter_daily_count INT;
    v_voter_last_date DATE;
BEGIN
    -- Obtenemos el autor del post objetivo
    SELECT user_id INTO v_target_user_id FROM public.posts WHERE id = NEW.post_id;

    -- 1. Actualizamos contadores en la tabla posts
    IF NEW.vote_type = 'AURA' THEN
        UPDATE public.posts SET aura_votes_count = aura_votes_count + 1 WHERE id = NEW.post_id;
        v_aura_delta := 10;
    ELSIF NEW.vote_type = 'LAURA' THEN
        UPDATE public.posts SET laura_votes_count = laura_votes_count + 1 WHERE id = NEW.post_id;
        v_aura_delta := -15;
    ELSIF NEW.vote_type = 'SUPER_AURA' THEN
        UPDATE public.posts 
        SET aura_votes_count = aura_votes_count + 1,
            super_aura_count = super_aura_count + 1 
        WHERE id = NEW.post_id;
        v_aura_delta := 50;
    END IF;

    -- 2. Actualizamos los Aura Points del creador del post
    UPDATE public.profiles 
    SET aura_points = GREATEST(0, aura_points + v_aura_delta),
        updated_at = NOW()
    WHERE id = v_target_user_id
    RETURNING aura_points INTO v_current_aura;

    -- 3. Recalculamos Rango según puntos
    IF v_current_aura >= 5000 THEN
        v_new_rank := 'Gigachad';
    ELSIF v_current_aura >= 2000 THEN
        v_new_rank := 'Aura Master';
    ELSIF v_current_aura >= 500 THEN
        v_new_rank := 'Canchero';
    ELSE
        v_new_rank := 'NPC';
    END IF;

    -- 4. Evaluación de Estado "Laura Bankrupt" (Tasa de Laura > 70% con mínimo 10 votos totales acumulados)
    SELECT COALESCE(SUM(aura_votes_count), 0), COALESCE(SUM(laura_votes_count), 0)
    INTO v_total_aura_votes, v_total_laura_votes
    FROM public.posts
    WHERE user_id = v_target_user_id;

    IF (v_total_aura_votes + v_total_laura_votes) >= 10 THEN
        v_laura_ratio := (v_total_laura_votes::NUMERIC / (v_total_aura_votes + v_total_laura_votes)::NUMERIC);
        v_new_laura_state := (v_laura_ratio >= 0.70);
    ELSE
        v_new_laura_state := FALSE;
    END IF;

    -- Aplicamos actualización de Rango y Laura State al perfil del creador
    UPDATE public.profiles 
    SET rank_tier = v_new_rank,
        is_in_laura_state = v_new_laura_state
    WHERE id = v_target_user_id;

    -- 5. Recompensa de Coins al Votante (Recompensa de minería de Aura en Tribunal, limite 50 votos diarios)
    SELECT daily_votes_count, last_vote_date INTO v_voter_daily_count, v_voter_last_date 
    FROM public.profiles WHERE id = NEW.user_id;

    IF v_voter_last_date IS NULL OR v_voter_last_date < CURRENT_DATE THEN
        v_voter_daily_count := 0;
    END IF;

    IF v_voter_daily_count < 50 THEN
        UPDATE public.profiles
        SET aura_coins = aura_coins + 1,
            daily_votes_count = v_voter_daily_count + 1,
            last_vote_date = CURRENT_DATE
        WHERE id = NEW.user_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_vote_inserted
    AFTER INSERT ON public.votes
    FOR EACH ROW EXECUTE FUNCTION public.process_aura_vote();

-- ============================================================================
-- SEGURIDAD: ROW LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.duels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_inventory ENABLE ROW LEVEL SECURITY;

-- Profiles: Lectura pública, Edición solo del dueño
CREATE POLICY "Perfiles visibles públicamente" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Usuarios pueden actualizar su propio perfil" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Posts: Lectura pública, Creación por autenticados, Eliminación por dueño
CREATE POLICY "Posts visibles por todos" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Usuarios autenticados pueden crear posts" ON public.posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuarios pueden borrar sus propios posts" ON public.posts FOR DELETE USING (auth.uid() = user_id);

-- Votes: Lectura pública, Inserción solo por usuario autenticado
CREATE POLICY "Votos visibles por todos" ON public.votes FOR SELECT USING (true);
CREATE POLICY "Usuarios pueden emitir un voto" ON public.votes FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Store Items: Lectura pública
CREATE POLICY "Tienda visible por todos" ON public.store_items FOR SELECT USING (true);

-- User Inventory: Visibilidad y compra por el propio usuario
CREATE POLICY "Usuarios ven su inventario" ON public.user_inventory FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuarios pueden comprar en inventario" ON public.user_inventory FOR INSERT WITH CHECK (auth.uid() = user_id);
