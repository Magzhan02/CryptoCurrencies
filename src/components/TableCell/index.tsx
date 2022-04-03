import React from 'react';
import { observer, inject } from 'mobx-react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import ConverterStore from '../../store/ConverterStore/ConverterStore';
import CurrenciesStore from '../../store/CurrenciesStore/CurrenciesStore';

import { typeCoin } from '../../types';

type ICryptoTable = {
  currenciesStore?: CurrenciesStore;
  converterStore?: ConverterStore;
};

const CryptoTable = inject(
  'currenciesStore',
  'converterStore',
)(
  observer(({ currenciesStore, converterStore }: ICryptoTable) => {
    const data: typeCoin[] = currenciesStore!.getItems;

    React.useEffect(() => {
      if (currenciesStore) {
        currenciesStore.fetchCoins();
        setInterval(() => {
          currenciesStore.fetchCoins();
        }, 30 * 1000);
      }
    }, []);

    const onClickRow = (coin: typeCoin) => {
      if (converterStore) {
        converterStore.setSelectedCoin(coin);
      }
    };

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
                  <TableRow 
                  key={coin.name}
                  onClick={() => onClickRow(coin)}>
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

export default CryptoTable
