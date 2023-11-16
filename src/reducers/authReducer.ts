import { SignInSteps, SignUpSteps } from '../features/types/AuthType'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TAuthState = {
    signInStep: SignInSteps
    signUpStep: SignUpSteps
}

const initialState: TAuthState = {
    signInStep: SignInSteps.First,
    signUpStep: SignUpSteps.First
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setSignInStep(state, action: PayloadAction<SignInSteps>) {
            state.signInStep = action.payload
        },
        setSignUpStep(state, action: PayloadAction<SignUpSteps>) {
            state.signUpStep = action.payload
        }
    }
})

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions
