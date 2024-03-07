import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './NavBar'

export default function Write() {
  const [title, setTitle] = useState('')
  const [markdownContent, setMarkdownContent] = useState('')
  const navigate = useNavigate()

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownContent(e.target.value)
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
          rows={10}
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
          onClick={() => { navigate('/dashboard') }}>
          Publish
        </button>
      </div>
    </>
  )
}
