import React from 'react'
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function Index() {
  return (
    <>
        <Item>
            <FormControl sx={{ minWidth: '245px' }}>
              <TextField label="Сумма" />
            </FormControl>
            <FormControl sx={{ marginLeft: '30px' }}>
              <Select value={10}>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Item>

          <Item sx={{ marginTop: '20px' }}>
            <FormControl sx={{ minWidth: '245px' }}>
              <TextField label="Сумма" />
            </FormControl>
            <FormControl sx={{ marginLeft: '30px' }}>
              <Select value={10}>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <Typography
              variant="h3"
              gutterBottom
              component="h1"
              sx={{ fontSize: '25px', marginTop: '15px' }}>
              29,62 Украинская гривна
            </Typography>
          </Item>
    </>
  )
}

export default Index