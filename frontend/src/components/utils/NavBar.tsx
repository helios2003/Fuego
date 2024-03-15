import { FaPenFancy } from "react-icons/fa"
import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useNavigate } from "react-router-dom"
import UserProfile from "./UserProfile"
import { useRecoilValue } from "recoil"
import { nameAtom } from "../../store/atoms/auth"

export default function Navbar() {
  const [color, setColor] = useState('')
  const [modal, setModal] = useState(false)
  const name = useRecoilValue(nameAtom)
  const navigate = useNavigate()

  const firstCharacter = name[0]

  useEffect(() => {
    const colors = ['red', 'blue', 'gray']
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    setColor(`bg-${randomColor}-500`)
  }, [])

  function LogOut() {
    localStorage.removeItem('token')
    navigate('/signin')
  }

  return (
    <div className="flex flex-row justify-between mt-2 shadow-md h-14">
      <div className="flex">
        <span className="text-2xl ml-4 font-semibold mt-2">Fuego</span>
        <span className="text-4xl">🔥</span>
      </div>
      <div className="flex items-center space-x-8 mr-6">
        <div className="flex items-center space-x-2">
          <FaPenFancy className="h-6 w-6 cursor-pointer" onClick={() => { navigate('/write') }}/>
          <span className="font-semibold text-xl cursor-pointer" onClick={() => { navigate('/write') }}>Write</span>
        </div>
        <div className={`text-2xl text-black ${color} h-12 w-12 rounded-full text-center mr-4 flex items-center justify-center cursor-pointer`}
             onClick={() => setModal(true)}>
          {firstCharacter}
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
