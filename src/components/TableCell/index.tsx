import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import ConverterStore from '../../store/ConverterStore/ConverterStore';
import CurrenciesStore from '../../store/CurrenciesStore/CurrenciesStore';
import { observer, inject } from 'mobx-react';

import { typeCoin } from '../../types';

type Index = {
  currenciesStore?: CurrenciesStore;
  converterStore?: ConverterStore;
};

const Index = inject(
  'currenciesStore',
  'converterStore',
)(
  observer(({ currenciesStore }: Index) => {
    const data: typeCoin[] = currenciesStore!.getData;
    React.useEffect(() => {
      if (currenciesStore) {
        currenciesStore.fetchData();
        setInterval(() => {
          currenciesStore.fetchData();
        }, 30 * 1000);
      }
    },[])

    return (
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
              : data.map((coin: typeCoin) => (
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
  }),
);

export default Index;
