import 'react-loading-skeleton/dist/skeleton.css'
import axios from 'axios'

export default function Blog() {
    async function getBlogs() {
    const url = "http://localhost:8787/blogs/bulk"
    try {
        const res = await axios.get(url)
        if (res.status === 200) {
            // show the blogs
        }
    } catch(err) {
        // some error happened
    }
    }
    return (
        <>
            
        </>
    )
}