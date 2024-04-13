import React, { useEffect, useState } from 'react'
import './styles.sass'
import { useParams } from 'react-router-dom'
// @ts-ignore
import anonymous from '../assets/images/anonymous.svg'
// @ts-ignore
import quill from '../assets/images/quill.svg'
import Button, { ButtonStyles } from '../components/Button'
import Input from '../components/Input'
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import { convertToRaw } from 'draft-js'
import { motion } from 'framer-motion'

export type PostData = {
    title: string
    description: string
    img: string
    dateTime: string
    author: string
}

const PostEdit = () => {
    const { id } = useParams()

    const [post, setPost] = useState<PostData>()
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<EditorState>()
    const [img, setImg] = useState()

    const handleClickToDelete = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/post/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id
                })
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handleSubmit = async () => {
        const formData = new FormData()
        formData.append('img', img)

        const response = await fetch('http://localhost:8080/api/post/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                description: draftToHtml(convertToRaw(description.getCurrentContent())),
                img: img.name,
                id: id
            })
        })

        const response_image = await fetch('http://localhost:8080/api/post/create/img', {
            method: 'POST',
            body: formData
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/post/get/${id}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch posts')
                }

                const data = await response.json()
                setPost(data)
                setTitle(data.title)

                setDescription(
                    EditorState.createWithContent(
                        ContentState.createFromBlockArray(convertFromHTML(data.description))
                    )
                )
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [])

    return (
        <motion.div
            className="post-page-edit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {post && (
                <div className="content">
                    <div className="post-data">
                        <label className="author">
                            <img src={anonymous} alt="Автор" className="icon" />
                            <span className="text">{post.author}</span>
                        </label>
                        <label className="date">
                            <img src={quill} alt="Ошибка" className="icon" />
                            <span className="text">
                                {`${new Date(post.dateTime).getHours()}:${new Date(
                                    post.dateTime
                                ).getMinutes()} ` +
                                    `${new Date(post.dateTime).getDate()}.${
                                        new Date(post.dateTime).getMonth() + 1
                                    }.${new Date(post.dateTime).getFullYear()}`}
                            </span>
                        </label>
                    </div>
                    <div className="label">
                        <div className="description">Название поста:</div>
                        <Input
                            placeholder="Например: Документация JavaScript"
                            noAnim
                            value={title}
                            setValue={setTitle}
                        />
                    </div>
                    <div className="label">
                        <div className="description">Описание:</div>
                        <Editor
                            editorState={description}
                            onEditorStateChange={(state) => setDescription(state)}
                        />
                    </div>
                    <img
                        src={`../../../../posts/assets/images/${post.img}`}
                        alt="Нет картинки"
                        className="img"
                    />
                    {/*<Button*/}
                    {/*    onClick={handleToDownloadImg}*/}
                    {/*    text="Загрузить картинку"*/}
                    {/*    type={ButtonStyles.Interactive}*/}
                    {/*/>*/}
                    <input
                        type="file"
                        name="img"
                        onChange={(event) => {
                            setImg(event.target.files[0])
                        }}
                    />

                    <div className="footer">
                        <div className="btn-container">
                            <Button
                                text="Изменить"
                                type={ButtonStyles.Interactive}
                                onClick={handleSubmit}
                            />
                        </div>
                        <div className="btn-container square">
                            <Button onClick={handleClickToDelete} type={ButtonStyles.Red} />
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    )
}

export default PostEdit
