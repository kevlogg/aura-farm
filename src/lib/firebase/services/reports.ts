import { db } from '../config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ReportReason } from '@/types';

export async function submitReportFirestore(
  reporterId: string,
  postId: string,
  reason: ReportReason,
  details?: string
): Promise<boolean> {
  try {
    await addDoc(collection(db, 'reports'), {
      reporterId,
      postId,
      reason,
      details: details || '',
      status: 'PENDING',
      createdAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error('Error submitting report to Firestore:', error);
    return false;
  }
}
