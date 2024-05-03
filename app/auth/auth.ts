"use client"
import React, { createContext, useContext } from "react";
import { Cart } from "../admin/Interfaces/Interfaces";

export interface User{
    username:string,
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
export const AuthorizatioContext=createContext();
export const useAuth=()=>useContext(AuthorizatioContext);

