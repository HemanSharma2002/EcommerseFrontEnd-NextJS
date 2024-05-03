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
        auth: false,
        role:"ADMIN"
    })
    
    const [Auth, setAuth] = useState(true)
    const [cart, setcart] = useState<Cart>()
    
    const router = useRouter()
    const [itemInCart, setitemInCart] = useState(0)
    useEffect( () => prefetchdata(),[])
     function prefetchdata() {
        const token = window.localStorage.getItem("Token")
        console.log(token)
        if (token ==null || token==="") {
            setAuth(false)
            const user: User = {
                username: "",
                token: "",
                auth: false,role:"USER"
            }
            setuser(user)
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
                        username: String(resp.data.Username),
                        token: String(token),
                        auth: true,
                        role:String(resp.data.Role)
                    })
                  

                })

            }  
        }).catch(resp => {
            removeTokenFromBaseUrl()
            window.localStorage.setItem("Token", "")
            router.push(`/user/authorization/signin`)
        })

    }
    async function login(prop: UserLogin) {
        removeTokenFromBaseUrl()
        const token = "Basic " + window.btoa(prop.email + ":" + prop.password)
        addTokenToBaseUrl(token)
        loginApi().then(async resp => {
            console.log(resp.data)
            removeTokenFromBaseUrl()
            const user: User = {
                username: resp.data.Username,
                token: "Bearer " + resp.data.token,
                auth: true,role:resp.data.Role
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
            auth: false,role:"USER"
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