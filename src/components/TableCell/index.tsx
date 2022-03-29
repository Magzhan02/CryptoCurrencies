import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import axios from 'axios';

type typeCoin = {
    name: string;
    fullname: string;
    imageUrl: string;
    price: number;
    volume24hour: number;
};

function Index() {

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
            price: coin.RAW.USD.PRICE.toFixed(6),
            volume24hour: parseInt(coin.RAW.USD.VOLUME24HOUR),
          }
          return obj;
        });
        setData(coins);
      });
  }, []);

  return(
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left"></TableCell>
            <TableCell align="left">Тикер</TableCell>
            <TableCell align="left">Название</TableCell>
            <TableCell align="left">Цена(USD)</TableCell>
            <TableCell align="left">Объём(24ч) </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!data.length
            ? 'Loading...'
            : data.map((coin: any) => (
                <TableRow key={coin.name}>
                  <TableCell sx={{ paddingTop: 3 }}>
                    <img width={35} src={coin.imageUrl} alt="Coin-icon" />
                  </TableCell>
                  <TableCell align="left">{coin.name}</TableCell>
                  <TableCell align="left">{coin.fullname}</TableCell>
                  <TableCell align="left">{coin.price} $</TableCell>
                  <TableCell align="left">{coin.volume24hour} $</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Index;
