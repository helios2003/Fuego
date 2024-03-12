import { ChangeEvent, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../utils/NavBar'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { titleAtom, contentAtom } from '../../store/atoms/blogs'
import { idAtom } from '../../store/atoms/auth'
import { useRecoilState, useRecoilValue } from 'recoil'
import { WithContext as ReactTags } from 'react-tag-input'
import Confetti from 'react-confetti'
import axios from 'axios'

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter]

export default function Write() {
  const [title, setTitle] = useRecoilState(titleAtom)
  const [markdownContent, setMarkdownContent] = useRecoilState(contentAtom)
  const authorId = useRecoilValue(idAtom)
  const [tags, setTags] = useState<Tag[]>([]);
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

  type Tag = {
    id: string;
    text: string;
  };

  const handleDelete = (i: number): void => {
    setTags(tags.filter((tag, index) => index !== i));
  }

  const handleAddition = (tag: Tag): void => {
    setTags([...tags, tag]);
  }


  async function Publish() {
    const url = 'http://localhost:8787/api/v1/blogs/blog'
    try {
      const res = await axios.post(url, { title: title, content: markdownContent, authorId: authorId, tags: tags.map(tag => tag.text)
      })
      if (res.status === 201) {
        success(2000)
        setShowConfetti(true)
        setTimeout(() => {
          navigate('/dashboard')
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
        <div id="tags">
          <ReactTags
            tags={tags}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            inputFieldPosition="bottom"
            autocomplete
            allowDragDrop={false}
          />
        </div>

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
