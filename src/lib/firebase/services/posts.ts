import { db } from '../config';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp,
  doc,
  getDoc,
} from 'firebase/firestore';
import { Post } from '@/types';

export async function fetchTribunalFeed(limitCount: number = 10): Promise<Post[]> {
  try {
    const q = query(
      collection(db, 'posts'),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);

    const posts: Post[] = querySnapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        user_id: data.userId || 'user-demo',
        video_url: data.videoUrl || '',
        thumbnail_url: data.thumbnailUrl || '',
        caption: data.caption || '',
        aura_votes_count: data.auraVotesCount || 0,
        laura_votes_count: data.lauraVotesCount || 0,
        super_aura_count: data.superAuraCount || 0,
        is_promoted: Boolean(data.isPromoted),
        created_at: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        profiles: {
          username: data.username || 'usuario_aura',
          avatar_url: data.avatarUrl || 'https://api.dicebear.com/7.x/bottts/svg?seed=aura',
          rank_tier: data.rankTier || 'NPC',
          is_in_laura_state: Boolean(data.isInLauraState),
        },
      };
    });

    return posts;
  } catch (error) {
    console.error('Error fetching Tribunal Feed from Firestore:', error);
    return [];
  }
}

export async function createAuraMovePost(
  userId: string,
  username: string,
  avatarUrl: string,
  rankTier: string,
  videoUrl: string,
  caption: string,
  isPromoted: boolean = false
): Promise<string | null> {
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      userId,
      username,
      avatarUrl,
      rankTier,
      videoUrl,
      caption,
      auraVotesCount: 0,
      lauraVotesCount: 0,
      superAuraCount: 0,
      isPromoted,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating post in Firestore:', error);
    return null;
  }
}
