import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"

export const useBlogs = () => {

    interface Blog {
        id: string; // Assuming id is a string, adjust type accordingly
        authorName: string;
        title: string;
        content: string;
        publishedDate: string;
      }

    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<Blog[]>([])

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(response => {

            console.log(response)
            setBlogs(response.data.blog)
            setLoading(false)
        })
    }, [])

    return {
        loading,
        blogs
    }
}