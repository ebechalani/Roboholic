// ─── Academy finances (admin-only bookkeeping) ──────────────────
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import type { Expense } from '@/types';

export async function getExpenses(): Promise<Expense[]> {
  const snap = await getDocs(collection(db, 'expenses'));
  return snap.docs
    .map(d => ({ id: d.id, ...(d.data() as Omit<Expense, 'id'>) }))
    .sort((a, b) => (b.at || '').localeCompare(a.at || ''));
}

export async function addExpense(e: Omit<Expense, 'id'>): Promise<Expense> {
  const ref = await addDoc(collection(db, 'expenses'), e);
  return { id: ref.id, ...e };
}

export async function deleteExpense(id: string): Promise<void> {
  await deleteDoc(doc(db, 'expenses', id));
}
