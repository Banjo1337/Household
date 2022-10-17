export interface Profile {
    id: string,
    alias: string,
    color: string,
    isAdmin: boolean,
    pendingRequest: boolean,
    authUserId: string,
    householdId: string, 
    hasError: boolean,
    error: string
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