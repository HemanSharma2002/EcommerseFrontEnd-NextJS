"use client"
import { Close } from '@mui/icons-material'
import { Box, Button, createTheme, FormControl, FormGroup, Input, InputLabel, Menu, MenuItem, Select, TextareaAutosize, TextField, ThemeProvider } from '@mui/material'
import axios from 'axios'
import { BoxIcon } from 'lucide-react'
import React, { useRef, useState } from 'react'
//@author Heman Sharma
type Props = {}
interface Size {
    name: String,
    quantity: number
}
interface Image {
    no: number,
    data?: File
}
interface Products {
    title: String,
    brand: String,
    price: String,
    discountedPrice: String,
    discountPresent: String,
    description: String,
    color: String,
    sizes: Size[],
    images: String[],
    topLevelCategory: String,
    secondLevelCategory: String,
    thirdLevelCategory: String,
    pattern: String,
    quantity: String
}
const defaultTheme = createTheme({
    typography: {
        fontFamily: [
            "Montserrat", "sans-serif"
        ].join(',')
    }
});

export default function
    ({ }: Props) {
    const [title, settitle] = useState("")
    const [brand, setbrand] = useState("")
    const [price, setprice] = useState("")
    const [discountedPrice, setdiscountedPrice] = useState("")
    const [discountPresent, setdiscountPresent] = useState("")
    const [description, setdescription] = useState("")
    const [color, setcolor] = useState("")
    const [selectedImage, setselectedImages] = useState<File>()
    const [selectedSize, setSelectedSize] = useState("")
    const [selectedSizeQuantity, setSelectedSizeQuantity] = useState("")
    const [sizes, setsizes] = useState<Size[]>([])

    const [imagesFile, setimagesFile] = useState()
    const [images, setImages] = useState([])
    const [topLevelCategory, settopLevelCategory] = useState("")
    const [secondLevelCategory, setsecondLevelCategory] = useState("")
    const [thirdLevelCategory, setthirdLevelCategory] = useState("")
    const [pattern, setpattern] = useState("")
    const [quantity, setquantity] = useState("0")
    const [img, setimg] = useState([])
    const file=useRef<HTMLInputElement>()
    async function addProduct() {

    }
    return (
        <ThemeProvider theme={defaultTheme} >
            <div className='p-4'>
                <FormGroup className=' flex flex-col gap-6 py-5' >
                    <FormControl fullWidth >
                        <InputLabel >Title</InputLabel>
                        <Input type='text' value={title} name='title' onChange={e => settitle(e.target.value)} />
                    </FormControl>
                    <FormControl fullWidth >
                        <InputLabel >Brand</InputLabel>
                        <Input type='text' value={brand} name='brand' onChange={e => setbrand(e.target.value)} />
                    </FormControl>
                    <FormControl fullWidth >
                        <InputLabel >Price</InputLabel>
                        <Input type='text' value={price} name='price' onChange={e => setprice(e.target.value)} />
                    </FormControl>
                    <FormControl fullWidth >
                        <InputLabel >Discounted Price</InputLabel>
                        <Input type='text' value={discountedPrice} name='discountedPrice' onChange={e => setdiscountedPrice(e.target.value)} />
                    </FormControl>

                    <FormControl fullWidth >
                        <InputLabel >Discount Present</InputLabel>
                        <Input type='text' value={discountPresent} name='discountPresent' onChange={e => setdiscountPresent(e.target.value)} />
                    </FormControl>
                    <TextareaAutosize placeholder='Description' minRows={6} maxRows={10} value={description} name='description' onChange={(e) => setdescription(e.target.value)}
                        className=' border border-black border-opacity-20 rounded-md p-2'>
                    </TextareaAutosize>
                    <FormControl fullWidth>
                        <InputLabel >Color</InputLabel>
                        <Select name='color' onChange={e => setcolor(e.target.value)} value={color} label="Color">
                            <MenuItem value="White" >White</MenuItem>
                            <MenuItem value="Black" >Black</MenuItem>
                            <MenuItem value="Beige" >Beige</MenuItem>
                            <MenuItem value="Blue" >Blue</MenuItem>
                            <MenuItem value="Red" >Red</MenuItem>
                            <MenuItem value="Grey" >Grey</MenuItem>
                        </Select>
                    </FormControl>
                    <div className=' flex flex-col gap-6'>
                        <div className=' opacity-50'>Images Section</div>
                        {/* <FormControl fullWidth>
                        <InputLabel >Total Images</InputLabel>
                        <Select name='numberOfImages' onChange={async (e) => {
                            setnumberofImages(e.target.value)
                            let arr = []
                            for (let img = 1; img <= Number(e.target.value); img++) {
                                arr.push(img)
                            }
                            setImageData(arr);
                            console.log(arr)
                        }} value={numberofImages} label="numberOfImages">
                            <MenuItem value="1" >1</MenuItem>
                            <MenuItem value="2" >2</MenuItem>
                            <MenuItem value="3" >3</MenuItem>
                            <MenuItem value="4" >4</MenuItem>
                            <MenuItem value="5" >5</MenuItem>
                            <MenuItem value="6" >6</MenuItem>
                            <MenuItem value="7" >7</MenuItem>
                            <MenuItem value="8" >8</MenuItem>
                            <MenuItem value="9" >9</MenuItem>
                            <MenuItem value="10" >10</MenuItem>
                        </Select>
                    </FormControl>
                    {
                        imageData.map(no => (
                            <FormControl fullWidth key={no} >
                                
                                <Input type='file' name='image' className=' ' onChange={e => {
                                    const img = e.target.files[0]
                                    if (!img) {
                                        return
                                    }

                                    fd.append(`file`, img)
                                }} />
                            </FormControl>
                        ))
                    } */}
                        <div key={"addimage"} className='flex flex-row gap-6'>
                            <input type='file' rel='' ref={file} placeholder='Image'  onChange={(e) => {
                                if(e.target.files[0]){
                                    setselectedImages(e.target.files[0])
                                    return
                                }
                            }} />
                            <p onClick={()=>file.current}><BoxIcon/></p>
                            <Button onClick={async e => {
                                e.preventDefault()
                                if (selectedImage == null) {
                                    return
                                }
                                console.log(selectedImage)
                                const fd = new FormData()
                                fd.append("file", selectedImage)
                                const data = await axios.post(`http://localhost:8085/api/save`, fd)
                                const image = data.data[0]
                                setselectedImages(null)
                                console.log(image)
                                setimg([...img, image])
                                console.log(img)
                            }
                            }>Add Image</Button>
                        </div>
                        <div className=' w-full flex flex-wrap gap-3  p-2 border border-black border-opacity-20 rounded-md'>
                            {
                                img.map(i => (
                                    <div key={i} className='h-80 w-72 bg-red-200 object object-top rounded-md relative'>
                                        <img src={i} alt="Add to Cart" className=' h-full w-full rounded-md' />
                                        <p className=' absolute top-2 right-2 bg-white rounded-md' onClick={e => {
                                            e.preventDefault()
                                            setimg(img.filter(img => img !== i))
                                        }}><Close /></p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className=' flex flex-col gap-6'>
                        <div className=' opacity-50'>Add Sizes</div>
                        <div className=' flex flex-row gap-2'>
                            <FormControl fullWidth>
                                <InputLabel>Sizes</InputLabel>
                                <Select name="selectSize" label="Sizes" value={selectedSize} onChange={e => setSelectedSize(e.target.value)}>
                                    {!sizes.some(s => s.name === "XXS") && <MenuItem value="XXS" >XXS</MenuItem>}
                                    {!sizes.some(s => s.name === "XS") && <MenuItem value="XS" >XS</MenuItem>}
                                    {!sizes.some(s => s.name === "S") && <MenuItem value="S" >S</MenuItem>}
                                    {!sizes.some(s => s.name === "M") && <MenuItem value="M" >M</MenuItem>}
                                    {!sizes.some(s => s.name === "L") && <MenuItem value="L" >L</MenuItem>}
                                    {!sizes.some(s => s.name === "XL") && <MenuItem value="XL" >XL</MenuItem>}
                                    {!sizes.some(s => s.name === "XXL") && <MenuItem value="XXL" >XXL</MenuItem>}
                                    {!sizes.find(s => s.name === "XXXL") && <MenuItem value="XXXL" >XXXL</MenuItem>}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel>Quantity</InputLabel>
                                <Input type='text' value={selectedSizeQuantity} name='selectedSizeQuantity' onChange={e => setSelectedSizeQuantity(e.target.value)} />
                            </FormControl>
                        </div>
                        <div><Button onClick={e => {
                            if (selectedSize === "" || selectedSizeQuantity === "") {
                                return
                            }
                            e.preventDefault()
                            const size = {
                                name: selectedSize,
                                quantity: selectedSizeQuantity
                            }
                            setSelectedSize("")
                            setSelectedSizeQuantity("")
                            setsizes([...sizes, size])
                            let qty = Number(selectedSizeQuantity)
                            sizes.map(size => (qty += Number(size.quantity)))
                            setquantity(String(qty))
                        }}> Add Quantity</Button></div>
                        <div className=' min-h-20 w-full border border-black flex flex-wrap gap-2 rounded-md border-opacity-25'>
                            {
                                sizes.map(size => (
                                    <div className='flex flex-row gap-3 m-1 pl-3 mx-2 h-min bg-slate-200 rounded-3xl' key={size.name}>
                                        <p>Size: {size.name}</p>
                                        <p>Quantity:{size.quantity}</p>
                                        <p onClick={e => {
                                            e.preventDefault()
                                            setsizes(sizes.filter(s => s.name !== size.name))
                                            let qty = -(Number(size.quantity))
                                            sizes.map(size => (qty += Number(size.quantity)))
                                            setquantity(String(qty))
                                        }}><Close className='p-[5px]' /></p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <FormControl fullWidth >
                        <InputLabel >Top Level Category</InputLabel>
                        <Input type='text' value={topLevelCategory} name='topLevelCategory' onChange={e => settopLevelCategory(e.target.value)} />
                    </FormControl>
                    <FormControl fullWidth >
                        <InputLabel >Second Level Category</InputLabel>
                        <Input type='text' value={secondLevelCategory} name='secondLevelCategory' onChange={e => setsecondLevelCategory(e.target.value)} />
                    </FormControl>
                    <FormControl fullWidth >
                        <InputLabel > Level Category</InputLabel>
                        <Input type='text' value={thirdLevelCategory} name='thirdLevelCategory' onChange={e => setthirdLevelCategory(e.target.value)} />
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel >Pattern</InputLabel>
                        <Select name='pattern' onChange={e => setpattern(e.target.value)} value={pattern} label="Pattern">
                            <MenuItem value="Solids" >Solids</MenuItem>
                            <MenuItem value="Check" >Check</MenuItem>
                            <MenuItem value="Printed" >Printed</MenuItem>
                            <MenuItem value="Pattern" >Pattern</MenuItem>

                        </Select>
                    </FormControl>
                    <FormControl fullWidth >
                        <InputLabel > Quantity</InputLabel>
                        <Input type='text' value={quantity} name='quantity' onChange={e => setquantity(e.target.value)} readOnly />
                    </FormControl>
                    <Button type='submit' onClick={async e => {
                        try {
                            e.preventDefault()
                            console.log(sizes)

                            const product: Products = {
                                title,
                                brand,
                                price,
                                discountedPrice,
                                discountPresent,
                                description,
                                color,
                                sizes: sizes,
                                images: img,
                                topLevelCategory,
                                secondLevelCategory,
                                thirdLevelCategory,
                                pattern,
                                quantity
                            }

                            await axios.post(`http://localhost:8085/api/products/add`, product).then(resp => console.log(resp)).catch(resp => console.log(resp))

                        }
                        catch (erro) {
                            console.log(erro)
                        }
                    }}>Submitt</Button>
                </FormGroup>

            </div>
        </ThemeProvider >
    )
}