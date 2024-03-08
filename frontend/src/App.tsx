import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUp from "./components/auth/SignUp"
import SignIn from "./components/auth/SignIn"
import Navbar from "./components/utils/NavBar"
import Preview from "./components/blogs/Preview"
import Write from "./components/blogs/Write"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/write" element={<Write />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Navbar />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
