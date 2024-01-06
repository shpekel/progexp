import React from 'react'
import './index.sass'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import SignInPage from './pages/SignIn'
import SignUpPage from './pages/SignUp'
import Notify from './components/Notify'
import MainPage from './pages/Main'

const App: React.FC = () => {
    return (
        <>
            <Notify />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="sign-in" element={<SignInPage />} />
                    <Route path="sign-up" element={<SignUpPage />} />
                    <Route path="*" element={<Navigate to="sign-in" replace />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
