import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authReducer } from './reducers/authReducer'
import { notifiesReducer } from './reducers/notifyesReducer'
import { mainReducer } from './reducers/mainReducer'

const rootReducer = combineReducers({
    mainReducer: mainReducer,
    authReducer: authReducer,
    notifiesReducer: notifiesReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
