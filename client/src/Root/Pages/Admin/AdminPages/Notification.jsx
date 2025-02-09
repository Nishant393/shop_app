import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Box,
  IconButton
} from '@mui/material';
import { Send } from '@mui/icons-material';
import server from '../../../../cofig/config';
import toast from 'react-hot-toast';

const Notification = () => {
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

  const handleSubmit = async (e) => {
    try {
      await axios.post(`${server}email/send-email`,formData).then((data)=>{
        console.log(data)
        toast.success(data.message)
      })
    } catch (error) {
      console.log(error)
    }
  };



  return (
    <div className="min-h-screen bg-gray-50">
      <Container maxWidth="lg" className="py-5">
        <Box className="text-center mb-6">
          <Typography variant="h2" component="h1" className="text-4xl text-slate-600 font-bold mb-4">
            Send Notification
          </Typography>
        </Box>

        <Grid item  >
          <Paper className="p-8 flex gap-7 flex-col hover:shadow-lg transition-all duration-300">
            <Typography variant="h5" className="font-semibold">
              Send Notification To All Client
            </Typography>
            <form className='flex gap-4 flex-col' onSubmit={handleSubmit} >
              <TextField
                fullWidth
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                variant="outlined"
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
          </Paper>

        </Grid>
      </Container>
    </div>
  );
};

export default Notification;