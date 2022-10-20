export interface ProfileState {
  profile: Profile;
  isLoading: boolean;
  error: string;
}

export interface Profile {
  id: string;
  alias: string;
  avatar: Avatar;
  isAdmin: boolean;
  pendingRequest: boolean;
  authUserId: string;
  householdId: string;
}

export interface ProfileCreateDto {
  alias: string;
  householdId?: string;
  isAdmin: boolean;
}

export interface ProfileEditDto {
  alias?: string;
  isAdmin?: boolean;
  avatar?: string;
  pendingRequest?: boolean;
}

export const Avatars = {
  fox: { emoji: "🦊", color: "#ff8244" },
  pig: { emoji: "🐷", color: "#fcc598" },
  frog: { emoji: "🐸", color: "#d2eb47" },
  chicken: { emoji: "🐥", color: "#ffe39c" },
  octopus: { emoji: "🐙", color: "#fa8e8c" },
  dolphin: { emoji: "🐬", color: "#62ccf3" },
  owl: { emoji: "🦉", color: "#f2d3b0" },
  unicorn: { emoji: "🦄", color: "#f880b2" },
} as const;

export type Avatar = keyof typeof Avatars;
