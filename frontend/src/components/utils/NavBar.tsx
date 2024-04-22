import { FaPenFancy } from "react-icons/fa"
import { useState } from 'react'
import Modal from 'react-modal'
import { useNavigate } from "react-router-dom"
import UserProfile from "./UserProfile"
import { IoPersonCircle } from "react-icons/io5"

export default function Navbar() {
  const [modal, setModal] = useState(false)
  const navigate = useNavigate()

  function LogOut() {
    localStorage.removeItem('token')
    navigate('/signin')
  }

  function handleClick() {
    const token = localStorage.getItem('token')
    return token ? navigate('/dashboard') : navigate('/signin')
  }

  return (
    <div className="flex flex-row justify-between mt-2 shadow-md h-14">
      <div className="flex">
        <span className="text-2xl ml-4 font-semibold mt-2 cursor-pointer" onClick={handleClick}>Fuego</span>
        <span className="text-4xl cursor-pointer" onClick={handleClick}>🔥</span>
      </div>
      <div className="flex items-center space-x-8 mr-6">
        <div className="flex items-center space-x-2">
          <FaPenFancy className="h-6 w-6 cursor-pointer" onClick={() => { navigate('/write') }}/>
          <span className="font-semibold text-xl cursor-pointer" onClick={() => { navigate('/write') }}>Write</span>
        </div>
        <div className={`text-center h-12 w-12 rounded-full mr-4 flex items-center justify-center cursor-pointer`}
             onClick={() => setModal(true)}>
          <IoPersonCircle className="w-14 h-14"/>
        </div>
        <button className="bg-gray-500 rounded-lg h-8 w-20" onClick={LogOut}>Logout</button>
      </div>
      <Modal isOpen={modal} onRequestClose={() => setModal(false)} style={{
        overlay: {
            display: 'flex',
            justifyContent: 'center',
        },
        content: {
            position: 'relative',
            width: '30rem',
            height: '30rem',
            padding: '52px'
        }
    }}>
        <UserProfile />
      </Modal>
    </div>
  )
}
