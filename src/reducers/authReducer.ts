import { Steps } from '../features/types/AuthType'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TAuthState = {
    signInStep: Steps
    signUpStep: Steps
}

const initialState: TAuthState = {
    signInStep: Steps.First,
    signUpStep: Steps.First
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setSignInStep(state, action: PayloadAction<Steps>) {
            state.signInStep = action.payload
        },
        setSignUpStep(state, action: PayloadAction<Steps>) {
            state.signUpStep = action.payload
        }
    }
})

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions
