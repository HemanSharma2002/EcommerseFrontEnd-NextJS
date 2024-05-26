"use client"
import React, { createContext, useContext } from "react";
import { Cart } from "../admin/Interfaces/Interfaces";

export interface User{
    username:string,
    name:string,
    role:string,
    token:string,
    auth:boolean
}
export interface Auths{
    login:Function,
    logout:Function,
    user:User,
    Auth:boolean,itemInCart:number,setitemInCart:Function,prefetchdata:Function
    
}
export const AuthorizatioContext=createContext<Auths>({
    login:()=>{},
    logout:()=>{},
    user:{
        username:"",
        name:"",
        role:"Admin",
        token:"",
        auth:true
    },
    Auth:true,
    itemInCart:0,
    setitemInCart:()=>{},
    prefetchdata:()=>{}

});
export const useAuth=():Auths=>useContext(AuthorizatioContext);

