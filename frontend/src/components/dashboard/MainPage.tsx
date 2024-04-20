import { useEffect, useState } from "react"
import axios from "axios"
import { useRecoilState } from "recoil"
import { allBlogsAtom } from "../../store/atoms/blogs"
import Navbar from "../utils/NavBar"
import BlogSkeleton from "./BlogSkeleton"
import ReactMarkdown from 'react-markdown'
import { IoPersonCircle } from "react-icons/io5"

type Blog = {
  id: string,
  title: string,
  content: string
}

export default function MainPage() {
  const [allBlogs, setAllBlogs] = useRecoilState(allBlogsAtom)
  const [loading, setLoading] = useState(true)

  async function getAllBlogs() {
    const url = 'http://localhost:8787/api/v1/blogs/blog/bulk'
    try {
      const res = await axios.get(url)
      if (res.status === 200) {
        setAllBlogs(res.data.blogs)
        console.log(allBlogs)
        setLoading(false)
      }
    } catch (err) {
      console.error("Error is there")
    }
  }


  useEffect(() => {
    getAllBlogs()
  }, [])

  return (
    <>
      <Navbar />
      {loading ?
        (<BlogSkeleton amount={4} />)
        :
        (
          allBlogs.map((blog: Blog, index: number) => (
            <div key={index} className="grid grid-cols-[0.05fr_0.95fr] gap-4 pt-2 pl-2 border-b-2 pb-2">
              <div>
                <IoPersonCircle className="h-14 w-14" />
              </div>
              <div className="-mt-4">
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
    </>
  )
}
