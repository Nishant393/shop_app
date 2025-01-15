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
import {
  LocationOn,
  Phone,
  Email,
  AccessTime,
  Send,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn
} from '@mui/icons-material';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setOpenSnackbar(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Container maxWidth="lg" className="py-16">
        {/* Header Section */}
        <Box className="text-center mb-16">
          <Typography variant="h2" component="h1" className="text-4xl font-bold mb-4">
            Contact Us
          </Typography>
          <Typography variant="subtitle1" className="text-gray-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={5}>
            <Paper className="p-6 mb-4 hover:shadow-lg transition-all duration-300">
              <Typography variant="h5" className="mb-6 font-semibold">
                Get in Touch
              </Typography>
              
              <Box className="space-y-6">
                <Box className="flex items-center gap-4 group">
                  <Box className="bg-blue-50 p-3 rounded-full group-hover:bg-blue-100 transition-colors">
                    <LocationOn className="text-blue-600" />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" className="font-semibold">Visit Us</Typography>
                    <Typography variant="body2" className="text-gray-600">
                      123 E-commerce Street, Digital City, 12345
                    </Typography>
                  </Box>
                </Box>

                <Box className="flex items-center gap-4 group">
                  <Box className="bg-blue-50 p-3 rounded-full group-hover:bg-blue-100 transition-colors">
                    <Phone className="text-blue-600" />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" className="font-semibold">Call Us</Typography>
                    <Typography variant="body2" className="text-gray-600">
                      +1 (555) 123-4567
                    </Typography>
                  </Box>
                </Box>

                <Box className="flex items-center gap-4 group">
                  <Box className="bg-blue-50 p-3 rounded-full group-hover:bg-blue-100 transition-colors">
                    <Email className="text-blue-600" />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" className="font-semibold">Email Us</Typography>
                    <Typography variant="body2" className="text-gray-600">
                      support@yourecommerce.com
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>

            <Paper className="p-6 hover:shadow-lg transition-all duration-300">
              <Typography variant="h5" className="mb-6 font-semibold">
                Business Hours
              </Typography>
              
              <Box className="flex items-start gap-4">
                <Box className="bg-blue-50 p-3 rounded-full">
                  <AccessTime className="text-blue-600" />
                </Box>
                <Box className="space-y-4">
                  <Box>
                    <Typography variant="subtitle2" className="font-semibold">Weekdays</Typography>
                    <Typography variant="body2" className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" className="font-semibold">Weekend</Typography>
                    <Typography variant="body2" className="text-gray-600">
                      Saturday: 10:00 AM - 4:00 PM
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      Sunday: Closed
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Social Media Links */}
              <Box className="mt-8 pt-6 border-t">
                <Typography variant="subtitle2" className="font-semibold mb-4">
                  Follow Us
                </Typography>
                <Box className="flex gap-4">
                  <IconButton className="bg-blue-50 hover:bg-blue-100">
                    <Facebook className="text-blue-600" />
                  </IconButton>
                  <IconButton className="bg-blue-50 hover:bg-blue-100">
                    <Twitter className="text-blue-600" />
                  </IconButton>
                  <IconButton className="bg-blue-50 hover:bg-blue-100">
                    <Instagram className="text-blue-600" />
                  </IconButton>
                  <IconButton className="bg-blue-50 hover:bg-blue-100">
                    <LinkedIn className="text-blue-600" />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper className="p-8 hover:shadow-lg transition-all duration-300">
              <Typography variant="h5" className="mb-6 font-semibold">
                Send us a Message
              </Typography>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                </Grid>

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
                  Send Message
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" variant="filled">
            Thank you for your message! We'll get back to you soon.
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default Contact;