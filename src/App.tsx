import React from 'react'
import './index.sass'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/*<Route path="/" element={<SignInPage />} />*/}
                <Route path="/" element={<div>зуйдуша</div>} />
                <Route path="sign-in" element={<SignInPage />} />
                <Route path="sign-up" element={<SignUpPage />} />
                <Route path="*" element={<Navigate to="sign-in" replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
