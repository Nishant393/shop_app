import React, { useCallback, useState } from 'react'
import { Button, Divider, Input, Option, Select, Textarea } from '@mui/joy';
import { useDropzone } from 'react-dropzone'
import SvgIcon from '@mui/joy/SvgIcon';
import axios from 'axios';
import server from '../../../../cofig/config';
import toast from 'react-hot-toast';
import { AddBox } from '@mui/icons-material';
import { Send } from 'lucide-react';

export const AddProducts = () => {
    const [file, setFile] = useState(null);
    const [currency, setCurrency] = useState('kg');
    const [qty, setQty] = useState('');
    const [fileUrl, setFileUrl] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [product, setProduct] = useState({
        productName: "",
        stock: 0,
        quantity: "",
        price: "",
        description: "",
        category: "",
        brand: "",
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const formData = new FormData();
            Object.keys(product).forEach(key => {
                formData.append(key, product[key]);
            });
            if (file && file[0]) {
                formData.append('productImage', file[0]);
            }

            const response = await axios.post(`${server}product/addnew`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data.success) {
                toast.success(response.data.message);
                resetForm();
            }
        } catch (error) {
            toast.error(error.response?.data?.error?.message || 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    }

    const resetForm = () => {
        setProduct({
            productName: "",
            stock: "",
            quantity: "",
            price: "",
            description: "",
            category: "",
            brand: "",
        });
        setFile(null);
        setFileUrl("");
        setQty("");
    }

    const qtyChange = (e) => {
        const value = e.target.value;
        setQty(value);
        setProduct(prev => ({ 
            ...prev, 
            quantity: `${value}${currency}` 
        }));
    }

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles);
            setFileUrl(URL.createObjectURL(acceptedFiles[0]));
        }
    }, [])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg'],
            'image/jpeg': ['.jpeg'],
            'image/svg': ['.svg'],
        },
        maxFiles: 1
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
        console.log(product)
    }

    return (
        <div className='w-full my-5 lg:w-3/4 mx-auto flex rounded-lg shadow-lg justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 flex-col align-middle'>
            <h1 className='text-white text-2xl my-4 mx-auto flex items-center'>
                <AddBox className='mr-2' /> Add Product
            </h1>
            <form onSubmit={handleSubmit} className='flex gap-5 px-7 flex-col'>
                {/* Product Name Input */}
                <div>
                    <Input
                        fullWidth
                        placeholder="Product Name"
                        required
                        name='productName'
                        value={product.productName}
                        onChange={handleChange}
                        sx={{
                            "--Input-radius": "11px",
                            "--Input-minHeight": "52px",
                        }}
                    />
                </div>

                {/* Price and Category Row */}
                <div className='flex flex-col lg:flex-row w-full gap-9'>
                    <div className='lg:w-1/2'>
                        <Input
                            type="number"
                            fullWidth
                            placeholder="Price"
                            required
                            name='price'
                            onChange={handleChange}
                            value={product.price}
                            sx={{
                                "--Input-radius": "11px",
                                "--Input-minHeight": "52px",
                            }}
                        />
                    </div>
                    <div className='lg:w-1/2'>
                        <Select 
                            name='category' 
                            onChange={(e) => handleChange({ 
                                target: { 
                                    name: 'category', 
                                    value: e.target.value 
                                } 
                            })}
                            placeholder="Select Category"
                            required
                        >
                            <Option value="staple" >Staple</Option>
                            <Option value="ghee&oil" >Ghee & Oil</Option>
                            <Option value="dryFruits">Dry Fruits</Option>
                            <Option value="packageFood">Package Food</Option>
                            <Option value="snacks">Snacks</Option>
                            <Option value="houseHold">House Hold Care</Option>
                            <Option value="dog">dog</Option>
                        </Select>
                    </div>
                </div>

                {/* Brand and Quantity Row */}
                <div className='flex flex-col lg:flex-row w-full gap-9'>
                    <div className='lg:w-1/2'>
                        <Input
                            fullWidth
                            placeholder="Brand"
                            required
                            name='brand'
                            value={product.brand}
                            onChange={handleChange}
                            sx={{
                                "--Input-radius": "11px",
                                "--Input-minHeight": "52px",
                            }}
                        />
                    </div>
                    <div className='lg:w-1/2'>
                        <Input
                            fullWidth
                            placeholder="Quantity"
                            required
                            type="number"
                            name='stock'
                            value={qty}
                            onChange={qtyChange}
                            endDecorator={
                                <Select
                                    variant="plain"
                                    value={currency}
                                    onChange={(_, value) => setCurrency(value)}
                                    sx={{ ml: -1.5 }}
                                >
                                    <Option value="kg">kg</Option>
                                    <Option value="L">L</Option>
                                    <Option value="g">gram</Option>
                                </Select>
                            }
                        />
                    </div>
                </div>

                {/* Description */}
                <Textarea
                    placeholder="Product Description"
                    minRows={3}
                    name='description'
                    value={product.description}
                    onChange={handleChange}
                />

                {/* File Upload */}
                <div className='p-5 bg-zinc-100 rounded-xl shadow-md border-slate-600 border-2 mx-auto w-3/4'>
                    <div {...getRootProps()} className='flex justify-center items-center'>
                        <input {...getInputProps()} />
                        {fileUrl ? (
                            <img
                                src={fileUrl}
                                alt='Product'
                                className='max-h-64 object-contain'
                            />
                        ) : (
                            <div className='flex flex-col items-center gap-4'>
                                <p className='text-gray-600'>Drag 'n' drop or click to upload</p>
                                <Button 
                                    variant="outlined" 
                                    component="label"
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
                                    Select Image
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <Button 
                    type='submit' 
                    loading={isLoading}
                    sx={{ margin: "30px auto", width: '200px' }}
                > 
                    Submit Product 
                <Send className='mx-4' />
                </Button>
            </form>
        </div>
    )
}

export default AddProducts;