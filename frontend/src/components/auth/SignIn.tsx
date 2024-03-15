import { useNavigate } from "react-router-dom"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { emailAtom, idAtom, nameAtom, passwordAtom } from "../../store/atoms/auth"
import { useRecoilState, useSetRecoilState } from "recoil"
import { blogsAtom } from "../../store/atoms/blogs"

export default function SignIn() {
    const navigate = useNavigate()
    const [email, setEmail] = useRecoilState(emailAtom)
    const [password, setPassword] = useRecoilState(passwordAtom)
    const setId = useSetRecoilState(idAtom)
    const setUser = useSetRecoilState(nameAtom)
    const setBlogs = useSetRecoilState(blogsAtom)

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
    const failure4 = (time: number) => {
        toast.error("Invalid password", { autoClose: time })
    }

    async function Login() {
        const url = 'http://localhost:8787/api/v1/user/signin'
        try {
            const res = await axios.post(url, { email, password })
            console.log({ email, password })
            if (res.status === 200) {
                localStorage.setItem('token', res.data.token)
                setId(res.data.authorId)
                setUser(res.data.name)
                setBlogs(res.data.blogs)
            } else if (res.status === 400) {
                failure1(2000)
            } else if (res.status === 401) {
                failure4(2000)
            } else if (res.status === 204) {
                failure2(2000)
            } else {
                failure3(2000)
            }
        } catch (err) {
            failure3(2000)
        }
    }

    async function handleLogin() {
        await Login()
        const token = localStorage.getItem('token')
        if (token) {
            success(2000)
            navigate('/dashboard')
        } else {
            failure3(2000)
            navigate('/')
        }
    }
    return (
        <div className="grid grid-cols-2">
            <div className="flex flex-col items-center">
                <div className="text-4xl mt-6"><b>Welcome to Fuego</b> 🔥</div> <br /><br /><br />
                <div className="text-2xl mb-1"><b>Login to your Account</b> </div>
                <span>New to Fuego?
                    <button
                        onClick={() => { navigate('/') }}
                        className="pl-1 hover:underline"
                    >
                        Register
                    </button>
                </span> <br />
                <div className="mb-2">Username</div>
                <input
                    className="h-8 w-64 border border-black pl-2 rounded-md"
                    placeholder="john@gmail.com"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}>
                </input> <br />
                <div className="mb-2">Password</div>
                <input
                    className="h-8 w-64 border border-black pl-2 rounded-md"
                    placeholder="pHq!!3xcp"
                    type="text"
                    onChange={(e) => setPassword(e.target.value)}>
                </input> <br />
                <button className="h-8 w-64 bg-black text-white rounded-md" onClick={handleLogin}>Sign In</button>
            </div>
            <div className="bg-gray-300 flex justify-center items-center min-h-screen">
                <img src="./home.png"
                    alt="Home page image"
                    className=""
                //className="mt-24 mb-36 ml-12 pr-16 pl-12 rounded-md" />
                />
            </div>
            <ToastContainer />
        </div>
    )
}
