
"use client"
import React, { ReactElement, useEffect, useState } from 'react'
import { AuthorizatioContext, User } from './auth'
import { addTokenToBaseUrl, removeTokenFromBaseUrl } from '../backendApiCalls/ApiClient'
import { confirmLoginStatus, getUsername, loginApi } from '../backendApiCalls/api'
import { useRouter } from 'next/navigation'
import { Cart } from '../admin/Interfaces/Interfaces'
import { jwtDecode, JwtPayload } from "jwt-decode";
import Cookies from 'universal-cookie';
import path from 'path'

type Props = {
    children: ReactElement
}

interface UserLogin {
    email: string,
    password: string
}

export default function AuthorizationProvider({ children }: Props) {



    const [user, setuser] = useState<User>({
        username: "",
        token: "",
        auth: false
    })
    const token = window.localStorage.getItem("Token")
    const [Auth, setAuth] = useState((token==null||token==="")?false:true)
    const [cart, setcart] = useState<Cart>()
    
    const router = useRouter()
    const [itemInCart, setitemInCart] = useState(0)
    useEffect( () => prefetchdata(),[])
     function prefetchdata() {
        
        console.log(token)
        if (token ==null || token==="") {
            return
        }
        addTokenToBaseUrl(token)
         confirmLoginStatus().then(resp => {
            // console.log(resp.data)
            if (resp.data) {
                getUsername().then(resp => {
                    // console.log(resp.data)
                    setAuth(auth=>true)
                    setuser({
                        username: String(resp.data),
                        token: String(token),
                        auth: true
                    })
                  

                })

            }  
        }).catch(resp => {
            removeTokenFromBaseUrl()
            window.localStorage.setItem("Token", "")
            router.push(`/user/authorization/signin`)
        })

    }
    function login(prop: UserLogin) {
        removeTokenFromBaseUrl()
        const token = "Basic " + window.btoa(prop.email + ":" + prop.password)
        addTokenToBaseUrl(token)
        loginApi().then(async resp => {
            console.log(resp.data)
            removeTokenFromBaseUrl()
            const user: User = {
                username: prop.email,
                token: "Bearer " + resp.data.token,
                auth: true
            }
            setuser(user)
            setAuth(true)
            addTokenToBaseUrl("Bearer " + resp.data.token)
            window.localStorage.setItem("Token", "Bearer " + resp.data.token)
            router.push(`/`)
            return true
        }).catch(resp => {
            return false 
        })
    }

    function logout() {
        removeTokenFromBaseUrl()
        const user: User = {
            username: "",
            token: "",
            auth: false
        }
        setuser(user)
        setAuth(false)
        window.localStorage.setItem("Token", "")
    }
    return (
        <AuthorizatioContext.Provider value={{ Auth, user, login, logout, itemInCart, setitemInCart,prefetchdata }}>
            {
                children
            }
        </AuthorizatioContext.Provider>
    )
}