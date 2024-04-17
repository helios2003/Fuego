import { useRecoilValue } from "recoil"
import { emailAtom, nameAtom } from "../../store/atoms/auth"
import { blogsAtom } from "../../store/atoms/blogs"
import { IoPersonCircle } from "react-icons/io5"

export default function UserProfile() {
  const name = useRecoilValue(nameAtom)
  const email = useRecoilValue(emailAtom)
  const numberOfBlogs = useRecoilValue(blogsAtom)
  
  return (
    <div className="flex flex-col justify-center items-center space-y-4 mt-16">
      <div className="text-4xl w-20 h-20 text-center rounded-full flex justify-center items-center">
        <IoPersonCircle className="w-40 h-40"/>
      </div>
      <div className="text-xl font-semibold">Name: {name}</div>
      <div className="text-xl font-semibold">Username: {email}</div>
      <div className="text-xl font-semibold">Blogs Published: {numberOfBlogs}</div>
    </div>
  )
}
