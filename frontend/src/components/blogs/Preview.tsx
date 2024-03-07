import React from 'react';
import ReactMarkdown from 'react-markdown'
import { titleAtom, contentAtom } from '../../store/atoms/preview'
import Navbar from '../utils/NavBar';
import { useRecoilValue } from 'recoil'

const Preview: React.FC = () => {
  const title = useRecoilValue(titleAtom)
  const markdownContent = useRecoilValue(contentAtom)
  return (
    <>
      <Navbar />
      <div className='flex flex-col items-center'>
        <ReactMarkdown className="markdown">{title}</ReactMarkdown>
        <ReactMarkdown className="markdown ml-2 mr-1">{markdownContent}</ReactMarkdown>
      </div>
    </>
  )
}

export default Preview
