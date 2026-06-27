/** Domain model for an authenticated user's profile. */
export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  role: 'student' | 'coach' | 'admin';
}
