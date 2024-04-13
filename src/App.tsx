import React, { useEffect } from 'react'
import './index.sass'
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import SignInPage from './pages/SignIn'
import SignUpPage from './pages/SignUp'
import Notify from './components/Notify'
import PostsPage from './pages/Posts'
import Post from './pages/Post'
import Header from './components/Header'
import PostEdit from './pages/PostEdit'
import { AnimatePresence } from 'framer-motion'
import DialogsPage from './pages/Dialogs'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import { mainActions } from './reducers/mainReducer'
import MessagePage from './pages/Message'

const App: React.FC = () => {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const login = localStorage.getItem('login')
    const password = localStorage.getItem('password')

    const rememberMe = localStorage.getItem('rememberMe')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/users/get', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        login,
                        password
                    })
                })

                if (response.ok) {
                    response.json().then((data) => {
                        dispatch(mainActions.setId(data.id))
                    })

                    if (rememberMe) {
                        dispatch(mainActions.setIsAuth(true))
                    }
                } else {
                    navigate('/sign-in')
                    dispatch(mainActions.setIsAuth(false))
                }
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [])

    return (
        <>
            <Notify />
            <Header />
            <AnimatePresence>
                <Routes>
                    <Route index element={<PostsPage />} />
                    <Route path="sign-in" element={<SignInPage />} />
                    <Route path="sign-up" element={<SignUpPage />} />
                    <Route path="posts" element={<PostsPage />} />
                    <Route path="post/:id" element={<Post />} />
                    <Route path="post/:id/edit" element={<PostEdit />} />
                    <Route path="dialogs" element={<DialogsPage />} />
                    <Route path="dialogs/:id" element={<MessagePage />} />
                    <Route path="*" element={<Navigate to="sign-in" replace />} />
                </Routes>
            </AnimatePresence>
        </>
    )
}

export default App
