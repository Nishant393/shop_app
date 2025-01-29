import { Rating, Typography } from '@mui/material';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const FeedBack = () => {
    const [value, setValue] = useState(0);
    return (
        <div  >
            <Typography component="legend">How would you rate for this Product.</Typography>
            <Rating
                name="simple-controlled"
                value={value}
                disabled={true}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    console.log(newValue)
                    toast.success("g");
                }}
                className='text-2xl'
                style={{fontSize:"60px"}}
            />
        </div>
    )
}

export default FeedBack