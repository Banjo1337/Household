export interface ProfileState {
    profile: Profile,
    hasError: boolean,
    error: string,
}

export interface Profile {
    id: string,
    alias: string,
    avatar: string,
    color: string,
    isAdmin: boolean,
    pendingRequest: boolean,
    authUserId: string,
    householdId: string, 
}

export interface ProfileCreateDto {
    alias: string,
    householdId?: string,
    isAdmin: boolean
}

export interface ProfileEditDto {
    alias?: string,
    isAdmin?: boolean,
    avatar?: string,
    color?: string,
    pendingRequest?: boolean
}

export enum Avatars {
    "fox" = "🦊",
    "pig" = "🐷",
    "frog" = "🐸",
    "chicken" = "🐥",
    "octopus" = "🐙",
    "dolphin" = "🐬",
    "owl" = "🦉",
    "unicorn" = "🦄"
}




