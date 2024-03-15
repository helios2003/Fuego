import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUp from "./components/auth/SignUp"
import SignIn from "./components/auth/SignIn"
import Preview from "./components/blogs/Preview"
import Write from "./components/blogs/Write"
import MainPage from "./components/dashboard/MainPage"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/write" element={<Write />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
