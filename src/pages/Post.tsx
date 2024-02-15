import React, { useEffect, useState } from 'react'
import './styles.sass'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'

export type PostData = {
    title: string
    description: string
    img: string
}

const Post = () => {
    const { postId } = useParams()

    const [post, setPost] = useState<PostData>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/post/get/${postId}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch posts')
                }

                const data = await response.json()
                setPost(data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [])

    return (
        <>
            <Header />
            <div className="post-page">
                {post ? (
                    <div className="content">
                        <div className="title">{post.title}</div>
                        <div className="description">{post.description}</div>
                        <img
                            src={`../../../../posts/assets/images/${post.img}`}
                            alt="Нет картинки"
                        />
                    </div>
                ) : (
                    <div>loading</div>
                )}
            </div>
        </>
    )
}

export default Post
