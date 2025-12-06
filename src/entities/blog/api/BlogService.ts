import { fetchAuth } from "../../../shared/api/ApiService"
import { IBlog, IBlogItem, IImage } from "../model/types"


class BlogService {

    async saveImage(blogId: string, imageData: ArrayBuffer): Promise<IImage> {
        const formData = new FormData()
        formData.append('blogId', blogId)
        const imageDataBlob = new Blob([imageData])
        formData.append('imageData', imageDataBlob)
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/blog/${blogId}/save_image`, {
            method: "POST",
            body: formData
        })
        const {image}: {image: IImage} = await res.json()
        return image
    }

    async deleteImage(blogId: string, imageId: string){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/blog/${blogId}/delete_image/${imageId}`, {
            method: "POST",
            body: JSON.stringify({blogId, imageId}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async getBlog(blogId: string): Promise<IBlog> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/blog/${blogId}`)
        const blog: IBlog = await res.json()
        return blog
    }

    async updateBlog(blog: IBlog, body: string){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/blog/${blog.blogId}/update`, {
            method: "POST",
            body: JSON.stringify({...blog, body}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async publishBlog(blogId: string, primaryImageId?: string){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/blog/${blogId}/publish`, {
            method: "POST",
            body: JSON.stringify({blogId, primaryImageId}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async unPblishBlog(blogId: string){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/blog/${blogId}/publish`, {
            method: "POST"
        })
    }

    async createBlog(title: string){
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/blog/create`, {
            method: "POST",
            body: JSON.stringify({title}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
        const blogId: string = await res.json()
        return blogId
    }

    async getBlogs(): Promise<IBlogItem[]>{
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/blog`)
        const {blogs}: {blogs: IBlogItem[]} = await res.json()
        return blogs
    }

}

export const blogService = new BlogService()