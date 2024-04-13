import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ThemeType } from '../features/enums/ThemeType'

type TMainState = {
    theme: ThemeType
    isAuth: boolean
    id: number
}

const initialState: TMainState = {
    theme: ThemeType.Dark,
    isAuth: false,
    id: null
}

export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setTheme(state, action: PayloadAction<ThemeType>) {
            state.theme = action.payload
        },
        setIsAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
        },
        setId(state, action: PayloadAction<number>) {
            state.id = action.payload
        }
    }
})

export const mainReducer = mainSlice.reducer
export const mainActions = mainSlice.actions
