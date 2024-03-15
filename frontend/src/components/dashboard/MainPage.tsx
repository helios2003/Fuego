import { useEffect } from "react"
import axios from "axios"
import { useRecoilState } from "recoil"
import { allBlogsAtom } from "../../store/atoms/blogs"

type Blog = {
    id: string,
    title: string,
    content: string
}

export default function MainPage() {
  const [allBlogs, setAllBlogs] = useRecoilState(allBlogsAtom)

  async function getAllBlogs() {
    const url = 'http://localhost:8787/api/v1/blogs/blog/bulk'
    try {
      const res = await axios.get(url)
      if (res.status === 200) {
        setAllBlogs(res.data.msg)
      }
    } catch(err) {
      console.error("Error is there")
    }
  }


  useEffect(() => {
    getAllBlogs()
  }, [])

  return (
    <div className="">
      {allBlogs.map((blog: Blog) => (
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
        </div>
      ))}
    </div>
  )
}
