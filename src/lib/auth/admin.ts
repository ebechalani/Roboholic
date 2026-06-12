/**
 * The ROOT admin — the academy director's account.
 * Only this account can grant or remove admin rights for others
 * (enforced in the UI AND in firestore.rules), and it can never be
 * demoted itself.
 */
export const ROOT_ADMIN_EMAIL = 'ebechalani@gmail.com';

export function isRootAdmin(email?: string | null): boolean {
  return (email ?? '').trim().toLowerCase() === ROOT_ADMIN_EMAIL;
}
