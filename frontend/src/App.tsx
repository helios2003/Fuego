import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUp from "./components/auth/SignUp"
import SignIn from "./components/auth/SignIn"
import Preview from "./components/blogs/Preview"
import Write from "./components/blogs/Write"
import MainPage from "./components/dashboard/MainPage"
import Error from "./components/utils/404"
import PrivateRoute from "./components/utils/PrivateRoute"
import ViewBlog from "./components/blogs/ViewBlog"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/preview"
            element={
              <PrivateRoute>
                <Preview />
              </PrivateRoute>
            } />
          <Route path="/write"
            element={
              <PrivateRoute>
                <Write />
              </PrivateRoute>
            } />
          <Route path="/dashboard"
            element={
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            } />
          <Route path="/blog/:blogId"
            element={
              <PrivateRoute>
                <ViewBlog />
              </PrivateRoute>
            } />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
