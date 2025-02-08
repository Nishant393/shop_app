
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { Autocomplete, Button, Divider, Input, Option, Select, Textarea } from '@mui/joy';
import { useDropzone } from 'react-dropzone'

import SvgIcon from '@mui/joy/SvgIcon';
import axios from 'axios';
import server from '../../../../cofig/config';
import toast from 'react-hot-toast';
import { Edit2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';


const EditProduct = () => {

    const [currency, setCurrency] = useState('kg');
    const [qty, setQty] = useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const [product, setProduct] = useState({
        productName: "",
        stock: 0,
        quantity: "",
        price: "0",
        description: "",
        category: "",
        brand: "",
    }) 
    const { id } =useParams()
    const naviagate= useNavigate()

    const getProductData = async()=>{
        try {
            const response = await axios.get(`${server}product/getbyid/${id}`)
            setProduct(response.data.product)
            console.log(response.data.product)
            setIsLoading(false)
          } catch (error) {
            setIsLoading(false)
          }
    }

    const handelSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${server}product/update/${id}`, product,{withCredentials:true})
                .then((e) => {
                    setIsLoading(false)

                    if (e.data.success) {
                        naviagate("/product-management")
                    }
                    console.log(e.data.message)
                    toast.success(e.data.message);
                }).catch((e) => {
                    setIsLoading(false)
                    toast.error(e.response.data.error.message);
                    console.log(e.response.data.error.message)
                    console.log(e.response.data.success)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const handelChange = (e) => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
        console.log(product)
    }
    const qtyChange = (e) => {
        setProduct({ ...product, quantity: `${e.target.value}${currency}` })
        console.log(product)
    }


    useEffect(()=>{
        getProductData()
    },[])

    return (
        <div className=' w-full my-5 lg:w-3/4  mx-auto flex rounded-lg shadow-lg justify-center bg-white  flex-col align-middle'>
            <h1 className='playwrite-vn-h1 text-slate-900 flex my-4 mx-auto' ><Edit2/>Edit Product</h1>
            <div className=' w-full mx-auto' >
            <form
                    onSubmit={handelSubmit}
                    className='flex gap-5 px-7 flex-col' >
                    <div>
                        <span className='text-slate-600' >Product Name</span>
                        <Input
                            fullWidth
                            placeholder="Product Name"
                            required
                            name='productName'
                            value={product.productName}
                            onChange={handelChange}
                            sx={{
                                "--Input-radius": "11px",
                                "--Input-gap": "12px",
                                "--Input-minHeight": "52px",
                                "--Input-paddingInline": "15px"
                            }}
                        />
                    </div>
                    <div className='flex flex-col lg:flex-row  w-full gap-9' >
                        <div className='lg:w-1/2 ' >
                            <span className='text-slate-600' >Cost</span>

                            <Input
                                type="number"
                                fullWidth
                                placeholder="00.00"
                                required
                                name='price'
                                onChange={handelChange}
                                value={product.price}
                                sx={{
                                    "--Input-radius": "11px",
                                    "--Input-gap": "12px",
                                    "--Input-minHeight": "52px",
                                    "--Input-paddingInline": "15px"
                                }}
                            />
                        </div>
                        <div className='lg:w-1/2' >
                            <span className='text-slate-600' >Category</span>
                            <Select name='category' onChange={(e) => setProduct({ ...product, category: e.target.innerHTML })} sx={{ width: "300", height: 50 }}
                                required placeholder="Choose one…">
                                <Option value="dog">Dog</Option>
                                <Option value="cat">Cat</Option>
                            </Select>
                        </div>
                    </div>
                    <div className='flex flex-col lg:flex-row  w-full gap-9' >
                        <div className='lg:w-1/2 ' >
                            <span className='text-slate-600' >Brand</span>
                            <Input
                                fullWidth
                                placeholder="Product Name"
                                required
                                name='brand'
                                value={product.brand}
                                onChange={handelChange}
                                sx={{
                                    "--Input-radius": "11px",
                                    "--Input-gap": "12px",
                                    "--Input-minHeight": "52px",
                                    "--Input-paddingInline": "15px"
                                }}
                            />
                        </div>
                        <div className='lg:w-1/2' >
                            <span className='text-slate-600' >quantity</span>

                            <Input
                                fullWidth
                                placeholder="qty"
                                required
                                name='quantity'
                                value={qty}
                                onChange={(e) => {
                                    setQty(e.target.value)
                                    qtyChange(e)
                                }}
                                sx={{
                                    "--Input-radius": "11px",
                                    "--Input-gap": "12px",
                                    "--Input-minHeight": "52px",
                                    "--Input-paddingInline": "15px",
                                    width: "300",
                                    height: 50
                                }}
                                endDecorator={{ kg: 'kg', L: 'L', g: 'g' }[currency]}

                                startDecorator={
                                    <Fragment>
                                        <Select
                                            variant="plain"
                                            value={currency}
                                            defaultValue={"kilo"}
                                            onChange={(_, value) => setCurrency(value)}
                                            slotProps={{
                                                listbox: {
                                                    variant: 'outlined',
                                                },
                                            }}
                                            sx={{ ml: -1.5, '&:hover': { bgcolor: 'transparent' } }}
                                        >
                                            <Option value="kg">kg</Option>
                                            <Option value="L">L</Option>
                                            <Option value="g">gram</Option>
                                        </Select>
                                        <Divider orientation="vertical" />
                                    </Fragment>
                                }
                            />
                        </div>
                    </div>
                    <div>
                        <span className='text-slate-600' >Description</span>
                        <Textarea
                            placeholder="Type in here…"
                            minRows={3}
                            name='description'
                            value={product.description}
                            onChange={handelChange}
                            sx={{
                                '&::before': {
                                    display: 'none',
                                },
                                '&:focus-within': {
                                    outline: '2px solid var(--Textarea-focusedHighlight)',
                                    outlineOffset: '2px',
                                },
                            }}
                        />
                    </div>
                    <Button type='submit' onClick={handelSubmit} sx={{ padding: "6px", margin: "30px" }} loading={isLoading} > Submit </Button>
                </form>
            </div>
        </div>
    )
}

export default EditProduct;