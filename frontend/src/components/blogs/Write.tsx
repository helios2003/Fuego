import { ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../utils/NavBar'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { titleAtom, contentAtom } from '../../store/atoms/blogs'
import { idAtom } from '../../store/atoms/auth'
import { useRecoilState, useRecoilValue } from 'recoil'
import axios from 'axios'

export default function Write() {
  const [title, setTitle] = useRecoilState(titleAtom)
  const [markdownContent, setMarkdownContent] = useRecoilState(contentAtom)
  const authorId = useRecoilValue(idAtom)
  const navigate = useNavigate()

  const success = (time: number) => {
    toast.success("Blog successfully published", { autoClose: time })
  }

  const failure1 = (time: number) => {
      toast.error("Invalid data", { autoClose: time })
  }

  const failure2 = (time: number) => {
      toast.error("Oops!!, some error from our side, please try again", { autoClose: time })
  }

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownContent(e.target.value)
  }

  async function Publish() {
    const url = 'http://localhost:8787/api/v1/blog/blog'
    try {
      const res = await axios.post(url, { title: title, content: markdownContent, authorId: authorId })
      if (res.status === 201) {
        success(2000)
        navigate('/dashboard')
      } else if (res.status === 400) {
        failure1(2000)
        navigate('/preview')
      } 
    } catch(err) {
      failure2(2000)
      navigate('/preview')
    }
  }
  async function handlePublish() {
    await Publish()
  }
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <input
          className="border border-gray-500 rounded-md p-2 mb-4 w-full"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter title of the blog"
        />
        <textarea
          className="border border-gray-500 rounded-md p-2 mb-4 w-full"
          value={markdownContent}
          onChange={handleInputChange}
          placeholder="Write your blog post"
          rows={13}
        />
      </div>
      <div className='space-x-4 ml-4'>
        <button
          className='bg-gray-500 h-8 w-20 rounded-md'
          onClick={() =>{ navigate('/preview') }}>
          Preview
        </button>
        <button
          className='bg-gray-500 h-8 w-20 rounded-md'
          onClick={handlePublish}>
          Publish
        </button>
      </div>
      <ToastContainer />
    </>
  )
}
