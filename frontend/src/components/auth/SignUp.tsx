import { useNavigate } from "react-router-dom"

export default function SignUp() {
    const navigate = useNavigate()
    function success() {
        navigate('/dashboard')
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
                <input className="h-8 w-64 border border-black pl-2 rounded-md" placeholder="John Doe" type="text"></input> <br />
                <div className="mb-2">Username</div>
                <input className="h-8 w-64 border border-black pl-2 rounded-md" placeholder="john@gmail.com" type="text"></input> <br />
                <div className="mb-2">Password</div>
                <input className="h-8 w-64 border border-black pl-2 rounded-md" placeholder="pHq!!3xcp" type="text"></input> <br />
                <button className="h-8 w-64 bg-black text-white rounded-md" onClick={success}>Sign Up</button>
            </div>
            <div className="bg-gray-300 flex justify-center items-center min-h-screen">
                <img src="./home.png"
                    alt="Home page image"
                //className="mt-24 mb-36 ml-12 pr-16 pl-12 rounded-md" />
                />
            </div>
        </div>
    )
}