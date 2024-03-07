import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Navbar from '../utils/NavBar'

export default function BlogSkeleton() {
    return (
        <>
        <Navbar /> <br />
        <Skeleton count={5}/>
        </>
    )
}
