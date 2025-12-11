import { fetchAuth } from "../../../shared/api/ApiService"
import { AuthError } from "../../../shared/err/AuthError"


class UserService {

    async login(email: string, password: string){
        const res = await fetch(process.env.REACT_APP_SERVER_URL + '/v1/auth/login', {
            method: "POST",
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
        if(!res.ok && res.status === 400){
            const text = await res.text()
            throw new AuthError(text)
        }
    }

    async logout() {
        await fetchAuth(`${process.env.REACT_APP_SERVER_URL}/v1/auth/logout`, {
            method: "POST"
        })
        localStorage.removeItem('auth_token')
    }

    async register(email: string, password: string){
        const res = await fetch(process.env.REACT_APP_SERVER_URL + '/v1/auth/register', {
            method: "POST",
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
        if(!res.ok && res.status === 400){
            const text = await res.text()
            throw new AuthError(text)
        }
    }
    
    async check(){
        await fetchAuth(process.env.REACT_APP_SERVER_URL + '/v1/auth/check')
    }
}

export const userService = new UserService()