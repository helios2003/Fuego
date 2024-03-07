import { FaPenFancy } from "react-icons/fa"
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"

export default function Navbar() {
    const [color, setColor] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        const colors = ['red', 'blue', 'gray']
        const randomColor = colors[Math.floor(Math.random() * colors.length)]
        console.log(randomColor)
        setColor(`bg-${randomColor}-500`)
        console.log("hello")
    }, [])

    function LogOut() {
        navigate('/signin')
    }
    return (
        <div className="flex flex-row justify-between mt-2 shadow-md h-14">
            <div className="flex">
                <span className="text-2xl ml-4 font-semibold mt-2">
                    Fuego
                </span>
                <span className="text-4xl">
                    🔥
                </span>
            </div>
            <div className="flex items-center space-x-8 mr-6">
                <div className="flex items-center space-x-2">
                    <FaPenFancy
                    className="h-6 w-6"
                    onClick={() => {navigate('/write')}}
                    />
                    <span className="font-semibold text-xl" onClick={() => {navigate('/write')}}>Publish</span>
                </div>
                <div className={`text-2xl text-black ${color} h-12 w-12 rounded-full text-center mr-4 flex items-center justify-center`}>
                    H
                </div>
                <button className="bg-gray-500 rounded-lg h-8 w-20" onClick={LogOut}>
                    Logout
                </button>
            </div>
        </div>
    )
}
