import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"

export interface Blog {
    [x: string]: any;
    published: string;
    id: string;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

export const useBlogs = (id : string) => {

    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<Blog[]>([])

    useEffect(() => {

        const source = axios.CancelToken.source();

        axios.get(`${BACKEND_URL}/api/v1/blog/${id == 'bulk' ? 'bulk' : `blog/${id}`}`, {
            headers: {
                Authorization: localStorage.getItem("medium_token")
            }
        })
        .then(response => {

            console.log(response)
            setBlogs(response.data.blog)
            setLoading(false)
        }) .catch(error => {
            console.error("Error fetching blogs:", error);
            setLoading(false);
          });

          return () => {
            source.cancel();
        };
    }, [])

    return {
        loading,
        blogs
    }
}