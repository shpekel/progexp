import React, { FC } from 'react'
import './styles.sass'
import Header from '../components/Header'
import Posts from '../components/Posts'

const MainPage: FC = () => {
    return (
        <>
            <Header />
            <Posts />
        </>
    )
}

export default MainPage
