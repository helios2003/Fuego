import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUp from "./components/auth/SignUp"
import SignIn from "./components/auth/SignIn"
import Navbar from "./components/dashboard/NavBar"
import BlogSkeleton from "./components/dashboard/BlogSkeleton"
import Write from "./components/dashboard/Write"

function App() {
  return (
    <>
<BrowserRouter>
        <Routes>
        <Route path="/" element={<Write />} />  
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Navbar />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
