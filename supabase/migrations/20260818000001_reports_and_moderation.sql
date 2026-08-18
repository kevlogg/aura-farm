-- ============================================================================
-- MIGRACIÓN DE MODERACIÓN Y REPORTES: AURA FARM
-- ============================================================================

-- 1. ENUM DE CATEGORÍAS DE REPORTE
CREATE TYPE report_reason_enum AS ENUM (
    'MINORS_RISK',            -- Menor de edad en riesgo o sin consentimiento
    'BULLYING_HARASSMENT',    -- Ciberacoso, humillación o bullying directo
    'HATE_SPEECH_POLITICS',   -- Discurso de odio, discriminación o política extremista
    'NSFW_EXPLICIT',          -- Contenido explícito, violencia o desnudez
    'SPAM_FRAUD'              -- Spam o estafa
);

CREATE TYPE report_status_enum AS ENUM ('PENDING', 'REVIEWED', 'ACTION_TAKEN', 'DISMISSED');

-- 2. TABLA DE REPORTES
CREATE TABLE public.reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    reason report_reason_enum NOT NULL,
    details TEXT,
    status report_status_enum NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index para búsquedas eficientes por post y por estado
CREATE INDEX idx_reports_post_id ON public.reports(post_id);
CREATE INDEX idx_reports_status ON public.reports(status);

-- 3. TRIGGER AUTOMÁTICO DE AUTO-MODERACIÓN
-- Si un post acumula 5 o más reportes pendientes, se desactiva temporalmente del feed público
CREATE OR REPLACE FUNCTION public.auto_moderate_flagged_posts()
RETURNS TRIGGER AS $$
DECLARE
    v_report_count INT;
BEGIN
    SELECT COUNT(*) INTO v_report_count 
    FROM public.reports 
    WHERE post_id = NEW.post_id AND status = 'PENDING';

    -- Si supera 5 reportes, marcamos el post como despromovido / oculto
    IF v_report_count >= 5 THEN
        UPDATE public.posts 
        SET is_promoted = FALSE 
        WHERE id = NEW.post_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_report_created
    AFTER INSERT ON public.reports
    FOR EACH ROW EXECUTE FUNCTION public.auto_moderate_flagged_posts();

-- 4. SEGURIDAD: ROW LEVEL SECURITY (RLS)
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Los usuarios pueden insertar sus propios reportes
CREATE POLICY "Usuarios pueden emitir reportes" ON public.reports 
    FOR INSERT WITH CHECK (auth.uid() = reporter_id);

-- Los usuarios pueden consultar únicamente los reportes emitidos por ellos mismos
CREATE POLICY "Usuarios ven sus propios reportes" ON public.reports 
    FOR SELECT USING (auth.uid() = reporter_id);
