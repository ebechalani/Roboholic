// ─── Academy settings: fees + the academic year ──────────────────
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import type { AcademySettings } from '@/types';

export const SETTINGS_DOC = 'academy';

export const DEFAULT_SETTINGS: AcademySettings = {
  yearLabel: '2026–2027',
  currency: '$',
  fees: { robotics: 0, drawing: 0, muaythai: 0, chess: 0, makex: 0 },
  whishWallet: '70227005 (Eddy Bachaalany)',
  showFeesOnEnroll: false,
};

export async function getSettings(): Promise<AcademySettings> {
  try {
    const snap = await getDoc(doc(db, 'settings', SETTINGS_DOC));
    if (!snap.exists()) return { ...DEFAULT_SETTINGS };
    const d = snap.data() as Partial<AcademySettings>;
    return { ...DEFAULT_SETTINGS, ...d, fees: { ...DEFAULT_SETTINGS.fees, ...(d.fees ?? {}) } };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export async function saveSettings(s: AcademySettings): Promise<void> {
  await setDoc(doc(db, 'settings', SETTINGS_DOC), { ...s, updatedAt: new Date().toISOString() }, { merge: true });
}
