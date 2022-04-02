import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { TableCell, ConverterBlock } from './components';

function App() {

  return (
    <Container maxWidth="lg" sx={{ padding: 10 }}>
      <Grid container spacing={3}>

        <Grid item xs={8}>
        <TableCell/>
        </Grid>

        <Grid item xs={4}>
        <ConverterBlock />
        </Grid>

      </Grid>
    </Container>
  );
}

export default App;
