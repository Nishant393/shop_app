import { Autocomplete, Stack } from '@mui/joy'
import React from 'react'

const SearchProducts = () => {

  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
      title: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    },
  ]
  return (
    <div>
      <Stack spacing={2} sx={{ width: 500 }}>
        <Autocomplete
          placeholder="Search anything"
          type="search"
          width={"41px"}
          freeSolo
          disableClearable
          options={top100Films.map((option) => option.title)}
        />
      </Stack>
    </div>
  )
}

export default SearchProducts