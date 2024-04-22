import axios from "axios"
import { useEffect, useState } from "react"
import Navbar from "../utils/NavBar"
import ReactMarkdown from 'react-markdown'
import { useParams } from "react-router-dom"
import Spinner from "../utils/Spinner"

interface Blog {
    id: number,
    title: string,
    content: string,
}

export default function ViewBlog() {
    const { blogId } = useParams()
    const [loading, setLoading] = useState(true)
    const [blog, setBlog] = useState<Blog>()

    async function getBlog() {
        try {
            const response = await axios.get(`http://localhost:8787/api/v1/blogs/blog/${blogId}`)
            if (response.status === 200) {
                console.log(response.data.msg)
                setBlog(response.data.msg)
                console.log(blog?.title)
                setLoading(false)
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getBlog()
    }, [blogId])

    return (
        <>
            <Navbar />
            {loading ?
                (
                    <Spinner />
                ) :
                (<div className='flex flex-col items-center'>
                    <ReactMarkdown className="markdown">{blog?.title}</ReactMarkdown>
                    <ReactMarkdown className="markdown ml-2 mr-1">{blog?.content}</ReactMarkdown>
                </div>
                )
            }
        </>
    )
}