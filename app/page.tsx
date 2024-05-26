"use client"
import HomeMainCarosal from "@/components/HomeMainCarosal";
import ProductCarosal from "@/components/ProductCarosal";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getProductsBySecondLevelCategory} from "./backendApiCalls/api";
import { error, log } from "console";
import { AxiosError } from "axios";
import { Page, Product } from "./admin/Interfaces/Interfaces";


const obj = {
  sort: "price_low",
  colors: [],
  pattern: []
}
export default function Home() {
  useEffect(()=>loadPage(),[])
  function loadPage(){
    const Men_T_Shirt={
      top:"Men",
      second:"Casual"
    }
    const Men_Shirt={
      top:"Men",
      second:"Formal"
    }
    const Women_T_Shirt={
      top:"Women",
      second:"Casual"
    }
    const Women_Shirt={
      top:"Women",
      second:"Formal"
    }
    getProductsBySecondLevelCategory(Men_T_Shirt,obj,0).then(resp=>{
      const response:Page=resp.data
      const product:Product[]=response.content
      console.log(resp.data.content);
      setmenTShirt(product)
    }).catch(error=>{
      const respError=new AxiosError(error)
      console.log("error",respError)
    })
    getProductsBySecondLevelCategory(Men_Shirt,obj,0).then(resp=>{
      const response:Page=resp.data
      const product:Product[]=response.content
      console.log(resp.data.content);
      setmenShirt(product)
    }).catch(error=>{
      const respError=new AxiosError(error)
      console.log("error",respError)
    })
    getProductsBySecondLevelCategory(Women_T_Shirt,obj,0).then(resp=>{
      const response:Page=resp.data
      const product:Product[]=response.content
      console.log(resp.data.content);
      setwomenTShirt(product)
    }).catch(error=>{
      const respError=new AxiosError(error)
      console.log("error",respError)
    })
    getProductsBySecondLevelCategory(Women_Shirt,obj,0).then(resp=>{
      const response:Page=resp.data
      const product:Product[]=response.content
      console.log(resp.data.content);
      setwomenShirt(product)
    }).catch(error=>{
      const respError=new AxiosError(error)
      console.log("error",respError)
    })
  }
  const [menShirt, setmenShirt] = useState<Product[]>([])
  const [womenShirt, setwomenShirt] = useState<Product[]>([])
  const [menTShirt, setmenTShirt] = useState<Product[]>([])
  const [womenTShirt, setwomenTShirt] = useState<Product[]>([])
  return (
    <main className=" flex flex-col gap-4 ">
      <HomeMainCarosal/>
      <ProductCarosal products={menTShirt} category="Men Casual Wear"/>
      <ProductCarosal products={womenTShirt} category="Women Casual Wear"/>
      <ProductCarosal products={menShirt} category="Men Formal Wear"/> 
      <ProductCarosal products={womenShirt} category="Women Formal Wear"/>
    </main>
  );
}
