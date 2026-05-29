import { createAction, props } from "@ngrx/store";



export const loadUser = createAction(
    '[User] load user'
)

export const loadUserSuccess = createAction(
    '[User] load user sucess',
    props<{user: string}>()
)

export const loadUserFailure = createAction(
    '[User] load user failure',
    props<{error: any}>()
)