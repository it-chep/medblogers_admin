import { fetchAuth } from "../../../shared/api/ApiService"
import { IBlog, IBlogCategory, IBlogItem, IBlogRequest, IImage } from "../model/types"


class BlogService {

    async saveImage(blogId: string, imageData: ArrayBuffer): Promise<IImage> {
        // Альтернативный метод конвертации ArrayBuffer в base64
        const uint8Array = new Uint8Array(imageData);
        let binary = '';

        for (let i = 0; i < uint8Array.length; i++) {
            binary += String.fromCharCode(uint8Array[i]);
        }

        const base64Image = btoa(binary);

        const payload = {
            blog_id: blogId,
            image_data: base64Image
        };

        const res = await fetchAuth(
            process.env.REACT_APP_SERVER_URL_API + `/v1/admin/blog/${blogId}/save_image`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            }
        );

        const {image}: {image: IImage} = await res.json();
        return image
    }

    async deleteImage(blogId: string, imageId: string){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/blog/${blogId}/delete_image/${imageId}`, {
            method: "POST",
            body: JSON.stringify({blogId, imageId}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async getBlog(blogId: string): Promise<IBlog> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/blog/${blogId}`)
        const blog: IBlog = await res.json()
        return blog
    }

    async updateBlog(blog: IBlogRequest, body: string){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/blog/${blog.blogId}/update`, {
            method: "POST",
            body: JSON.stringify({...blog, body}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async publishBlog(blogId: string, primaryImageId?: string){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/blog/${blogId}/publish`, {
            method: "POST",
            body: JSON.stringify({blogId, primaryImageId}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async unPblishBlog(blogId: string){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/blog/${blogId}/unpublish`, {
            method: "POST"
        })
    }

    async createBlog(title: string, slug: string){
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/blog/create`, {
            method: "POST",
            body: JSON.stringify({title, slug}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
        const {blogId}: {blogId: string} = await res.json()
        return blogId
    }

    async getBlogs(): Promise<IBlogItem[]>{
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/blog`)
        const {blogs}: {blogs: IBlogItem[]} = await res.json()
        return blogs
    }

    async addCategory(blogId: string, categoryId: number){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/blog/${blogId}/add_category`, {
            method: "POST",
            body: JSON.stringify({blogId, categoryId}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }
    
    async deleteCategory(blogId: string, categoryId: number){
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/blog/${blogId}/delete_category`, {
            method: "POST",
            body: JSON.stringify({blogId, categoryId}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async getCategories(): Promise<IBlogCategory[]>{
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/blog/categories`)
        const {categories}: {categories: IBlogCategory[]} = await res.json()
        return categories
    }
}

export const blogService = new BlogService()