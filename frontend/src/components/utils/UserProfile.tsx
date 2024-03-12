import { useRecoilValue } from "recoil"
import { emailAtom, nameAtom } from "../../store/atoms/auth"
import { blogsAtom } from "../../store/atoms/blogs"

export default function UserProfile() {
  const name = useRecoilValue(nameAtom)
  const email = useRecoilValue(emailAtom)
  const numberOfBlogs = useRecoilValue(blogsAtom)

  return (
    <div className="flex flex-col justify-center items-center space-y-4 mt-16">
      <div className="text-4xl bg-green-500 w-20 h-20 text-center rounded-full flex justify-center items-center">
        H
      </div>
      <div className="text-xl font-semibold">Name: {name}</div>
      <div className="text-xl font-semibold">Username: {email}</div>
      <div className="text-xl font-semibold">Blogs Published: {numberOfBlogs}</div>
    </div>
  )
}
