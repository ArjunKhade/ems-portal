
export interface UserState {
    user: string;
    loading:boolean;
}

export const initialState: UserState = {
    user: 'Dummy User',
    loading: false
}