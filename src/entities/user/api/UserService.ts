import { fetchAuth } from "../../../shared/api/ApiService"
import { AuthError } from "../../../shared/err/AuthError"


class UserService {

    async login(email: string, password: string){
        const res = await fetch(process.env.REACT_APP_SERVER_URL + '/auth/login', {
            method: "POST",
            body: JSON.stringify({email, password})
        })
        if(!res.ok && res.status === 400){
            const text = await res.text()
            throw new AuthError(text)
        }
    }

    async logout() {
        await fetchAuth(`${process.env.REACT_APP_SERVER_URL}/auth/logout`, {
            method: "POST"
        })
        localStorage.removeItem('auth_token')
    }

    async register(email: string, password: string){
        const res = await fetch(process.env.REACT_APP_SERVER_URL + '/auth/register', {
            method: "POST",
            body: JSON.stringify({email, password})
        })
        if(!res.ok && res.status === 400){
            const text = await res.text()
            throw new AuthError(text)
        }
    }
    
    async check(){
        await fetchAuth(process.env.REACT_APP_SERVER_URL + '/auth/check')
    }
}

export const userService = new UserService()