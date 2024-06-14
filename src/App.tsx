import { Buffer } from 'buffer';
window.Buffer = Buffer;

import { CssBaseline, Container, Typography, Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import WalletProvider from './components/wallet';
import Balances from './components/balances';
import { useState } from 'react';
import { Address } from 'viem';
import styled from '@emotion/styled';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: 'rgba(11,9,47,0.8)',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.87)',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  },
});

const App = () => {
  const [walletAddress, setWalletAddress] = useState<Address | ''>('');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid
        display="flex"
        flexDirection="column"
        maxWidth="1000px"
        gap="100px"
        margin="100px auto 50px"
      >
        <Grid display="flex" gap="150px">
          <Grid>
            <Typography variant="h2"> Find out an address balance </Typography>
            <Typography variant="body1">
              Either by connecting your wallet to autocomplete the input with
              your address or by using any valid Ethereum address
            </Typography>
          </Grid>
          <WalletProvider setWalletAddress={setWalletAddress} />
        </Grid>
        <Balances
          walletAddress={walletAddress}
          setWalletAddress={setWalletAddress}
        />
      </Grid>
    </ThemeProvider>
  );
};

export default App;
