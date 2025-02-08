import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { Send } from '@mui/icons-material';
import { Bell, LayoutDashboardIcon } from 'lucide-react';
import axios from 'axios';
import server from '../../../../cofig/config';

const SendNotification = () => {
  const [formData, setFormData] = useState({
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      console.log('Form submitted:', formData);
      axios.post(`${server}email/send-email`,formData,{ withCredentials: true})
      setFormData({
        subject: '',
        message: ''
      });
    } catch (error) {
      console.log(error)
    }

  };

  return (
    <div className='w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900'>
      <div className='w-5/6 max-w-2xl'>
        <h1 className='text-white flex items-center gap-3 mb-6 text-3xl font-bold'>
          <Bell size={36} className='text-white' />
          Send Notification
        </h1>

        <div className='bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-8'>
          <Typography
            variant="h5"
            className="text-white font-semibold mb-6 text-center"
          >
            Send Notification
          </Typography>

          <form
            className='flex gap-6 flex-col'
            onSubmit={handleSubmit}
          >
            <TextField
              fullWidth
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: 'white',
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255,255,255,0.7)',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255,255,255,0.3)',
                },
              }}
            />

            <TextField
              fullWidth
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              multiline
              rows={5}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: 'white',
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255,255,255,0.7)',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255,255,255,0.3)',
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              className="bg-blue-600 hover:bg-blue-700 py-3 text-lg"
              endIcon={<Send />}
            >
              Send Notification
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SendNotification