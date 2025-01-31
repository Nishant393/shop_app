import { Autocomplete, Stack, TextField } from '@mui/joy';
import axios from 'axios';
import React, { useState } from 'react';
import server from '../cofig/config';
import { useNavigate } from 'react-router-dom';

const SearchProducts = () => {
  const [searchData, setSearchData] = useState('');
  const [product, setProduct] = useState([]);
  const navigate = useNavigate()
  const handleChange = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/product/search?productName=${searchData}`);
      setProduct(response.data.products);
      console.log("option",response.data.products)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Stack spacing={2} sx={{ width: 500 }}>
        <Autocomplete
          placeholder="Search anything"
          inputValue={searchData}
          freeSolo
          disableClearable
          options={product}
          getOptionLabel={(option) => option.productName || ''}
          onInputChange={(event, newInputValue) => {
            setSearchData(newInputValue);
            handleChange();
          }}
          onChange={(event, value) => {
            if (value._id !== undefined) {
              navigate(`/p/${value._id}`)
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </Stack>
    </div>
  );
};

export default SearchProducts;
