import { db } from '../config';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { UserProfile, RankTier } from '@/types';

export async function getUserProfileFirestore(userId: string): Promise<UserProfile | null> {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        username: data.username || 'user',
        avatar_url: data.avatarUrl || 'https://api.dicebear.com/7.x/bottts/svg?seed=' + userId,
        aura_points: data.auraPoints || 100,
        aura_coins: data.auraCoins || 50,
        rank_tier: data.rankTier || 'NPC',
        is_in_laura_state: Boolean(data.isInLauraState),
        daily_votes_count: data.dailyVotesCount || 0,
        last_vote_date: data.lastVoteDate || '',
        streak_days: data.streakDays || 0,
        created_at: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updated_at: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile from Firestore:', error);
    return null;
  }
}

export async function createUserProfileFirestore(
  userId: string,
  username: string,
  avatarUrl?: string
): Promise<boolean> {
  try {
    const docRef = doc(db, 'users', userId);
    await setDoc(
      docRef,
      {
        username,
        avatarUrl: avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${userId}`,
        auraPoints: 100,
        auraCoins: 50,
        rankTier: 'NPC',
        isInLauraState: false,
        dailyVotesCount: 0,
        streakDays: 1,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    return true;
  } catch (error) {
    console.error('Error creating user profile in Firestore:', error);
    return false;
  }
}
