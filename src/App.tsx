import React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

type typeCoin = {
  name: string;
  fullname: string;
  imageUrl: string;
  price: number;
  volume24hour: number;
};

function App() {
  const [data, setData] = React.useState<typeCoin[]>([]);

  React.useEffect(() => {
    axios
      .get('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD')
      .then(({ data }) => {
        const coins: typeCoin[] = data.Data.map((coin: any) => {
          const obj: typeCoin = {
            name: coin.CoinInfo.Name,
            fullname: coin.CoinInfo.FullName,
            imageUrl: `https://www.cryptocompare.com/${coin.CoinInfo.ImageUrl}`,
            price: coin.RAW.USD.PRICE.toFixed(5),
            volume24hour: parseInt(coin.RAW.USD.VOLUME24HOUR),
          };
          return obj;
        });
        setData(coins);
      });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ padding: 10 }}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">FullName</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">volume24hour</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((coin) => (
                  <TableRow key={coin.name}>
                    <TableCell><img width={30} src={coin.imageUrl} alt='Coin icon'/></TableCell>
                    <TableCell align="left">{coin.name}</TableCell>
                    <TableCell align="left">{coin.fullname}</TableCell>
                    <TableCell align="left">${coin.price}</TableCell>
                    <TableCell align="left">${coin.volume24hour}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={4}>
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
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
