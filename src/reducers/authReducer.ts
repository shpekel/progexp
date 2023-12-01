import { Steps } from '../features/types/AuthType'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TAuthState = {
    step: Steps
}

const initialState: TAuthState = {
    step: Steps.First
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setStep(state, action: PayloadAction<Steps>) {
            state.step = action.payload
        }
    }
})

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions
