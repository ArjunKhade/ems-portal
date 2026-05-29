import { createReducer, on } from "@ngrx/store";
import { initialState } from "../state/user.state";
import * as UserActions from "../actions/user.actions"

export const userReducer = createReducer(
    initialState,

    on(UserActions.loadUser, (state)=>({
        ...state,
       loading: true
    })),

    on(UserActions.loadUserSuccess,(state, actions)=>({
        ...state,
        user: actions.user,
        loading: false
    })),


    on(UserActions.loadUserFailure, (state)=>({
          ...state,
       loading: false
    }))

)