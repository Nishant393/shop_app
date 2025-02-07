
import React, { useCallback, useState } from 'react'
import { Button, Divider, Input, Option, Select, Textarea } from '@mui/joy';
import { useDropzone } from 'react-dropzone'
import SvgIcon from '@mui/joy/SvgIcon';
import axios from 'axios';
import server from '../../../../cofig/config';
import toast from 'react-hot-toast';
import { AddBox } from '@mui/icons-material';


export const AddProducts = () => {


    const [file, setFile] = useState(File[0])
    const [currency, setCurrency] = useState('kg');
    const [qty, setQty] = useState(0);
    const [fileUrl, setFileUrl] = useState('')
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

    const handelSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("submit", file[0]);
            await axios.post(`${server}product/addnew`,
                {
                    productName: product.productName,
                    stock: product.stock,
                    quantity: product.quantity,
                    price: product.price,
                    description: product.description,
                    category: product.category,
                    brand: product.brand,
                    // productImage:
                    productImage: file[0]
                }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then((e) => {
                    setIsLoading(false);
                    console.log("false");
                    if (e.data.success) {
                        setProduct({
                            productName: "",
                            stock: "",
                            quantity: "",
                            price: 0,
                            description: "",
                            category: "",
                            brand: "",
                        })
                        setFile([])
                        setFileUrl("")
                    }
                    console.log(e.data.message);
                    toast.success(e.data.message);
                }).catch((e) => {
                    setIsLoading(false)
                    console.log(e)
                    console.log(e.response.data.success)
                    toast.error(e.response.data.error.message);
                })
        } catch (error) {
            console.log(error)
        }
    }

    const qtyChange = (e) => {
        setProduct({ ...product, quantity: `${e.target.value}${currency}` })
        console.log(product)
    }

    const onDrop = useCallback((acceptedFiles) => {
        if (isDragReject) toast.error("something went wrong !!")
        console.log(acceptedFiles, URL.createObjectURL(acceptedFiles[0]))
        console.log("file", acceptedFiles[0])
        setFile(acceptedFiles)
        setFileUrl(URL.createObjectURL(acceptedFiles[0]))
    }, [])

    const { getRootProps, getInputProps, isDragReject } = useDropzone({
        onDrop,
        accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg'],
            'image/jpeg': ['.jpeg'],
            'image/svg': ['.svg'],
        }
    })



    const handelChange = (e) => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
        console.log(product)
    }


    return (
        <div className=' w-full my-5 lg:w-3/4  mx-auto flex rounded-lg shadow-lg justify-center bg-white  flex-col align-middle'>
            <h1 className='playwrite-vn-h1 text-slate-900 my-4 mx-auto' > <AddBox /> Add Product</h1>
            <div className=' w-full mx-auto' >
                <form target="_self"
                    onSubmit={handelSubmit}
                    method='get'
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
                                    <React.Fragment>
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
                                    </React.Fragment>
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
                    <div className=' p-5 flex flex-col gap-5 bg-zinc-100 rounded-xl shadow-md border-slate-600 border-2 mx-auto w-3/4' >

                        <div {...getRootProps()} className=' flex flex-center rounded-3xl cursor-pointe' >
                            <input {...getInputProps()} className=' cursor-pointer' />
                            {
                                fileUrl ? (
                                    <div className=' flex flex-col w-full p-5 lg:p-10'>
                                        <img
                                            src={fileUrl}
                                            alt='uplode img'
                                            className='file_uploder-img'
                                        />
                                    </div>
                                ) : (
                                    <div className='flex flex-col gap-5' >
                                        <h2 className='mx-auto' >Add Product Image</h2>
                                        <p className=' text-light-4' >svg, png , jpg</p>
                                        <Button
                                            sx={{ padding: "10px", width: "75%", margin: "auto" }}
                                            component="label"
                                            role={undefined}
                                            tabIndex={-1}
                                            variant="outlined"
                                            color="neutral"
                                            startDecorator={
                                                <SvgIcon>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                                        />
                                                    </svg>
                                                </SvgIcon>
                                            }
                                        >
                                            select from computer
                                        </Button>
                                    </div>
                                )
                            }
                        </div>
                        <span className='text-zinc-700 mx-auto' >Drop & Down </span>
                    </div>
                    <Button type='submit' sx={{ padding: "6px", margin: "30px" }} loading={isLoading} > Submit </Button>
                </form>
            </div>
        </div>
    )
}

export default AddProducts;