import { ChangeEvent, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../utils/NavBar'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { titleAtom, contentAtom } from '../../store/atoms/blogs'
import { idAtom } from '../../store/atoms/auth'
import { useRecoilState, useRecoilValue } from 'recoil'
import Confetti from 'react-confetti'
import axios from 'axios'

export default function Write() {
  const [title, setTitle] = useRecoilState(titleAtom)
  const [markdownContent, setMarkdownContent] = useRecoilState(contentAtom)
  const authorId = useRecoilValue(idAtom)
  const navigate = useNavigate()
  const [showConfetti, setShowConfetti] = useState(false)

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

  useEffect(() => {
    window.addEventListener('beforeunload', alertUser)
    return () => {
      window.removeEventListener('beforeunload', alertUser)
    }
  })

  const alertUser = (e: BeforeUnloadEvent) => {
    e.preventDefault()
    e.returnValue = "You have unsaved changes, do you want to leave?"
  }

  async function Publish() {
    const url = 'http://localhost:8787/api/v1/blogs/blog'
    try {
      if (title.length === 0 || markdownContent.length === 0) {
        failure1(2000)
        return
      }
      const res = await axios.post(url, { title: title, content: markdownContent, authorId: authorId })
      if (res.status === 201) {
        success(2000)
        setShowConfetti(true)
        const blogId = res.data.id
        setTimeout(() => {
          navigate(`/blog/${blogId}`)
          setShowConfetti(false)
        }, 3000)
      } else if (res.status === 400) {
        failure1(2000)
        navigate('/preview')
      }
    } catch (err) {
      failure2(2000)
      navigate('/preview')
    }
  }

  async function handlePublish() {
    await Publish()
  }

  return (
    <>
      {showConfetti && <Confetti />}
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
          rows={12}
        />
      </div>
      <div className='space-x-4 ml-4'>
        <button
          className='bg-gray-500 h-8 w-20 rounded-md'
          onClick={() => { navigate('/preview') }}>
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
