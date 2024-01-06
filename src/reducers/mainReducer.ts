import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ThemeType } from '../features/enums/ThemeType'

type TMainState = {
    theme: ThemeType
}

const initialState: TMainState = {
    theme: ThemeType.Dark
}

export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setTheme(state, action: PayloadAction<ThemeType>) {
            state.theme = action.payload
        }
    }
})

export const mainReducer = mainSlice.reducer
export const mainActions = mainSlice.actions
