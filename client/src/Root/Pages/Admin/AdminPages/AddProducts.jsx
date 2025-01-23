
import React, { useCallback, useState } from 'react'
import { Autocomplete, Button, Input, Option, Select, Textarea } from '@mui/joy';
import { useDropzone } from 'react-dropzone'

import SvgIcon from '@mui/joy/SvgIcon';


const AddProducts = () => {


    const [file, setFile] = useState([])
    const [fileUrl, setFileUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState({
        productName: "",
        stock: 0,
        price: "0",
        description: "",
        category: "",
        brand: "",
        productUrl: [],
    })

    const handelSubmit = async () => {
        try {
        console.log("submit")
        } catch (error) {
            console.log(error)
        }
    }
    const onDrop = useCallback((acceptedFiles) => {
          if (!isDragReject) console.log("something went wrong !!")
        console.log(acceptedFiles, URL.createObjectURL(acceptedFiles[0]))
        setFile(acceptedFiles)
        setProduct({...product , productUrl: URL.createObjectURL(acceptedFiles[0])})
    }, [])

    const { getRootProps, getInputProps, isDragReject } = useDropzone({
        onDrop,
        accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg'],
            'image/jpeg': ['.jpeg'],
            'image/svg': ['.svg'],
            'text/html': ['.html', '.htm'],
        }
    })

    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 }
    ]

    const handelChange = (e) => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
        console.log(product)
    }


    return (
        <div className=' w-full my-5 lg:w-3/4  mx-auto flex rounded-lg shadow-lg justify-center bg-white  flex-col align-middle'>
            <h1 className='playwrite-vn-h1 text-slate-900 my-4 mx-auto' >Add Product</h1>
            <div className=' w-full mx-auto' >
                <form onSubmit={handelSubmit} className='flex gap-5 px-7 flex-col' >
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
                            <Select name='category' onChange={(e)=> setProduct({...product,category:e.target.innerHTML})}  sx={{ width: "300", height: 50 }}
                                required placeholder="Choose one…">
                                <Option value="dog">Dog</Option>
                                <Option value="cat">Cat</Option>
                            </Select>
                        </div>
                    </div>
                    <div>
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
                                product.productUrl ? (
                                    <div className=' flex flex-col w-full p-5 lg:p-10'>
                                        <img
                                            src={product.productUrl}
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
                    <Button halfWidth sx={{ padding: "6px", margin: "30px" }} loading={loading} > Submit </Button>
                </form>
            </div>
        </div>
    )
}

export default AddProducts;