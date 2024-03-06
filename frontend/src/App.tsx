import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUp from "./components/auth/SignUp"
import SignIn from "./components/auth/SignIn"
import Navbar from "./components/dashboard/NavBar"

function App() {
  return (
    <>
<BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Navbar />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
