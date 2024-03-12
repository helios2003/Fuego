import React from 'react';
import ReactMarkdown from 'react-markdown'
import { titleAtom, contentAtom } from '../../store/atoms/blogs'
import Navbar from '../utils/NavBar';
import { useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom';
import { nameAtom } from '../../store/atoms/auth';

const Preview: React.FC = () => {
  const title = useRecoilValue(titleAtom)
  const markdownContent = useRecoilValue(contentAtom)
  const name = useRecoilValue(nameAtom)
  const navigate = useNavigate()
  const date = new Date().toLocaleDateString()
  
  return (
    <>
      <Navbar />
      <div className='flex flex-col items-center'>
        <ReactMarkdown className="markdown">{title ? title : "# No title"}</ReactMarkdown>
        <p className="text-gray-500">Date Published: {date} by {name}</p>
        <ReactMarkdown className="markdown ml-2 mr-1">{markdownContent ? markdownContent : "No content"}</ReactMarkdown>
      </div>
      <div>
        <button className='bg-gray-500 ml-2 h-8 w-16 rounded-lg mt-4' onClick={() => navigate('/write')}>Edit</button>
      </div>
    </>
  )
}

export default Preview
