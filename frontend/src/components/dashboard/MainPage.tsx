import { useEffect, useState } from "react"
import axios from "axios"
import { useRecoilState } from "recoil"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { allBlogsAtom } from "../../store/atoms/blogs"
import Navbar from "../utils/NavBar"
import BlogSkeleton from "./BlogSkeleton"
import ReactMarkdown from 'react-markdown'
import { IoPersonCircle } from "react-icons/io5"
import { useNavigate } from "react-router-dom"

type Blog = {
  id: string,
  title: string,
  content: string
}

export default function MainPage() {
  const [allBlogs, setAllBlogs] = useRecoilState(allBlogsAtom)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const success = (time: number) => {
    toast.success("Welcome to Fuego", {
      position: "top-center",
      autoClose: time
    })
  }

  async function getAllBlogs() {
    const url = 'https://backend.ankitdash2019.workers.dev/api/v1/blogs/blog/bulk'
    try {
      const res = await axios.get(url)
      if (res.status === 200) {
        const reversedBlogs = res.data.blogs.slice().reverse()
        setAllBlogs(reversedBlogs)
        setLoading(false)
      }
    } catch (err) {
      console.error("Error is there")
    }
  }


  useEffect(() => {
    success(2000)
    getAllBlogs()
  }, [])

  return (
    <>
      <Navbar />
      {loading ?
        (<BlogSkeleton amount={3} />)
        :
        (
          allBlogs.map((blog: Blog, index: number) => (
            <div key={index} className="grid grid-cols-[0.05fr_0.95fr] gap-4 pt-2 pl-2 border-b-2 pb-2">
              <div>
                <IoPersonCircle className="h-14 w-14" />
              </div>
              <div className="-mt-4 cursor-pointer" onClick={() => {
                navigate(`/blog/${blog?.id}`)
              }}>
                <ReactMarkdown className="markdown">
                  {blog.title.length > 50 ? `${blog.title.slice(0, 50)}...` : blog.title}
                </ReactMarkdown>
                <ReactMarkdown className="markdown">
                  {blog.content.length > 200 ? `${blog.content.slice(0, 200)}...` : blog.content}
                </ReactMarkdown>
              </div>
            </div>
          ))
        )}
      <ToastContainer />
    </>
  )
}
