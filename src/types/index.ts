export type RankTier = 'NPC' | 'Canchero' | 'Aura Master' | 'Gigachad';

export type VoteType = 'AURA' | 'LAURA' | 'SUPER_AURA';

export type DuelTier = 'BRONZE' | 'SILVER' | 'GOLD';

export type DuelStatus = 'PENDING' | 'ACTIVE' | 'FINISHED';

export type StoreItemType = 'SKIN_AVATAR' | 'RECOVERY_PACK' | 'BOOSTER' | 'CLEANSE';

export type ReportReason =
  | 'MINORS_RISK'
  | 'BULLYING_HARASSMENT'
  | 'HATE_SPEECH_POLITICS'
  | 'NSFW_EXPLICIT'
  | 'SPAM_FRAUD';

export type ReportStatus = 'PENDING' | 'REVIEWED' | 'ACTION_TAKEN' | 'DISMISSED';

export interface UserProfile {
  id: string;
  username: string;
  avatar_url: string;
  aura_points: number;
  aura_coins: number;
  rank_tier: RankTier;
  is_in_laura_state: boolean;
  daily_votes_count: number;
  last_vote_date?: string;
  streak_days: number;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  user_id: string;
  video_url: string;
  thumbnail_url?: string;
  caption: string;
  aura_votes_count: number;
  laura_votes_count: number;
  super_aura_count: number;
  is_promoted: boolean;
  created_at: string;
  profiles: {
    username: string;
    avatar_url: string;
    rank_tier: RankTier;
    is_in_laura_state: boolean;
  };
}

export interface Vote {
  id: string;
  user_id: string;
  post_id: string;
  vote_type: VoteType;
  created_at: string;
}

export interface Duel {
  id: string;
  challenger_id: string;
  challenged_id?: string;
  tier: DuelTier;
  entry_fee: number;
  challenger_post_id?: string;
  challenged_post_id?: string;
  challenger_votes: number;
  challenged_votes: number;
  winner_id?: string;
  status: DuelStatus;
  expires_at: string;
  created_at: string;
  challenger_profile?: UserProfile;
  challenged_profile?: UserProfile;
}

export interface StoreItem {
  id: string;
  name: string;
  description: string;
  type: StoreItemType;
  price_coins: number;
  aura_grant_amount: number;
  is_laura_exclusive: boolean;
  image_url: string;
}

export interface UserReport {
  id: string;
  reporter_id: string;
  post_id: string;
  reason: ReportReason;
  details?: string;
  status: ReportStatus;
  created_at: string;
}
