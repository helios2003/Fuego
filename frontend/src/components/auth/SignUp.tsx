import { useNavigate } from "react-router-dom"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { nameAtom, emailAtom, passwordAtom, idAtom } from "../../store/atoms/auth"
import { useRecoilState, useSetRecoilState } from "recoil"

export default function SignUp() {
    const navigate = useNavigate()
    const [name, setName] = useRecoilState(nameAtom)
    const [email, setEmail] = useRecoilState(emailAtom)
    const [password, setPassword] = useRecoilState(passwordAtom)
    const setUser = useSetRecoilState(idAtom)

    const success = (time: number) => {
        toast.success("Welcome to Fuego", { autoClose: time })
    }
    const failure1 = (time: number) => {
        toast.error("Please provide correct inputs", { autoClose: time })
    }
    const failure2 = (time: number) => {
        toast.error("Someone with the same email already exists", { autoClose: time })
    }
    const failure3 = (time: number) => {
        toast.error("Oops!!, some error from our side, please try again", { autoClose: time })
    }

    async function Register() {
        const url = 'http://localhost:8787/api/v1/user/signup'
        try {
            const res = await axios.post(url, { name, email, password })
            if (res.status === 201) {
                localStorage.setItem('token', res.data.token)
                console.log(res.data.authorId)
                setUser(res.data.authorId)
                //console.log(setUser(res.data.authorId))
            } else if (res.status === 400) {
                failure1(2000)
            } else if (res.status === 204) {
                failure2(2000)
            } else {
                failure3(2000)
            }
        } catch (err) {
            failure3(2000)
        }
    }

    async function handleRegister() {
        await Register()
        const token = localStorage.getItem('token')
        if (token) {
            success(2000)
            navigate('/dashboard')
        } else {
            failure3(2000)
            navigate('/signup')
        }
    }

    return (
        <div className="grid grid-cols-2">
            <div className="flex flex-col items-center">
                <div className="text-4xl mt-6"><b>Welcome to Fuego</b> 🔥</div> <br /><br />
                <div className="text-2xl mb-1"><b>Create an Account</b> </div>
                <span>Already have an account?
                    <button
                        onClick={() => { navigate('/signin') }}
                        className="pl-1 hover:underline"
                    >
                        Login
                    </button>
                </span> <br />
                <div className="mb-2">Name</div>
                <input
                    className="h-8 w-64 border border-black pl-2 rounded-md"
                    placeholder="John Doe"
                    type="text"
                    onChange={(e) => setName(e.target.value)}>
                </input> <br />
                <div className="mb-2">Username</div>
                <input
                    className="h-8 w-64 border border-black pl-2 rounded-md"
                    placeholder="john@gmail.com"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                >
                </input> <br />
                <div className="mb-2">Password</div>
                <input
                    className="h-8 w-64 border border-black pl-2 rounded-md"
                    placeholder="pHq!!3xcp"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                >
                </input>
                <br />
                <button className="h-8 w-64 bg-black text-white rounded-md" onClick={handleRegister}>Sign Up</button>
            </div>
            <div className="bg-gray-300 flex justify-center items-center min-h-screen">
                <img src="./home.png"
                    alt="Home page image"
                //className="mt-24 mb-36 ml-12 pr-16 pl-12 rounded-md" />
                />
            </div>
            <ToastContainer />
        </div>
    )
}
