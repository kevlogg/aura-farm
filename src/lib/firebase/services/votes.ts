import { db } from '../config';
import {
  doc,
  collection,
  runTransaction,
  serverTimestamp,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { VoteType, RankTier } from '@/types';
import { getRankTier } from '@/lib/utils/aura-rank';

export async function processAuraVoteFirestore(
  voterId: string,
  postId: string,
  voteType: VoteType
): Promise<{ success: boolean; auraDelta: number; message?: string }> {
  try {
    const voteDocRef = doc(db, 'votes', `${voterId}_${postId}`);
    const postRef = doc(db, 'posts', postId);

    let auraDelta = 0;
    if (voteType === 'AURA') auraDelta = 10;
    else if (voteType === 'LAURA') auraDelta = -15;
    else if (voteType === 'SUPER_AURA') auraDelta = 50;

    await runTransaction(db, async (transaction) => {
      // 1. Check if user already voted
      const voteSnap = await transaction.get(voteDocRef);
      if (voteSnap.exists()) {
        throw new Error('Ya has emitido un voto para este clip.');
      }

      // 2. Fetch post
      const postSnap = await transaction.get(postRef);
      if (!postSnap.exists()) {
        throw new Error('El clip ya no está disponible.');
      }
      const postData = postSnap.data();
      const authorId = postData.userId;

      // 3. Fetch author user profile
      const authorRef = doc(db, 'users', authorId);
      const authorSnap = await transaction.get(authorRef);
      if (!authorSnap.exists()) {
        throw new Error('Perfil del creador no encontrado.');
      }
      const authorData = authorSnap.data();

      // 4. Update post vote counters
      const newAuraVotes = (postData.auraVotesCount || 0) + (voteType !== 'LAURA' ? 1 : 0);
      const newLauraVotes = (postData.lauraVotesCount || 0) + (voteType === 'LAURA' ? 1 : 0);
      const newSuperVotes = (postData.superAuraCount || 0) + (voteType === 'SUPER_AURA' ? 1 : 0);

      transaction.update(postRef, {
        auraVotesCount: newAuraVotes,
        lauraVotesCount: newLauraVotes,
        superAuraCount: newSuperVotes,
      });

      // 5. Update author Aura points and rank
      const currentPoints = authorData.auraPoints || 100;
      const updatedPoints = Math.max(0, currentPoints + auraDelta);
      const newRank: RankTier = getRankTier(updatedPoints);

      // Evaluate Laura Bankrupt status (Laura ratio > 70% with min 10 votes)
      const totalAuthorVotes = (authorData.totalVotesReceived || 0) + 1;
      const totalLauraReceived = (authorData.totalLauraReceived || 0) + (voteType === 'LAURA' ? 1 : 0);
      const lauraRatio = totalLauraReceived / totalAuthorVotes;
      const isInLauraState = totalAuthorVotes >= 10 && lauraRatio >= 0.7;

      transaction.update(authorRef, {
        auraPoints: updatedPoints,
        rankTier: newRank,
        isInLauraState,
        totalVotesReceived: totalAuthorVotes,
        totalLauraReceived,
        updatedAt: serverTimestamp(),
      });

      // 6. Record vote document
      transaction.set(voteDocRef, {
        userId: voterId,
        postId,
        voteType,
        createdAt: serverTimestamp(),
      });

      // 7. Reward voter with 1 Aura Coin (daily limit 50)
      const voterRef = doc(db, 'users', voterId);
      const voterSnap = await transaction.get(voterRef);
      if (voterSnap.exists()) {
        const voterData = voterSnap.data();
        const dailyVotes = voterData.dailyVotesCount || 0;

        if (dailyVotes < 50) {
          transaction.update(voterRef, {
            auraCoins: (voterData.auraCoins || 50) + 1,
            dailyVotesCount: dailyVotes + 1,
            updatedAt: serverTimestamp(),
          });
        }
      }
    });

    return { success: true, auraDelta };
  } catch (error: any) {
    return { success: false, auraDelta: 0, message: error.message };
  }
}
