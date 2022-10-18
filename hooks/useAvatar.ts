import { Avatars } from "../features/profile/profileTypes";

export const useAvatar = (avatar: string) => (Object.values(Avatars)[Object.keys(Avatars).indexOf(avatar)])
