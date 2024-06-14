import { Button, Grid, TextField, Typography } from '@mui/material';
import { ChangeEvent, FC } from 'react';
import { Address } from 'viem';
import { isAddress } from 'web3-validator';
import { ActionButton } from '../wallet/Connect';
import styled from '@emotion/styled';

type InputProps = {
  walletAddress: Address | '';
  setWalletAddress: (address: Address | '') => void;
  onFetch: () => Promise<void>;
};

const Input: FC<InputProps> = ({
  walletAddress,
  setWalletAddress,
  onFetch,
}) => {
  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) =>
    setWalletAddress(event.target.value as Address);

  return (
    <Grid display="flex" gap="20px" alignItems="center">
      <InputTextField
        placeholder="Ethereum Address"
        variant="outlined"
        value={walletAddress}
        onChange={handleAddressChange}
        fullWidth
        required
      />
      <GetButton onClick={onFetch} disabled={!isAddress(walletAddress)}>
        <Typography variant="body2" textAlign="center" color="white">
          Get Balances
        </Typography>
      </GetButton>
    </Grid>
  );
};

export const GetButton = styled(ActionButton)(() => ({
  width: '300px',
  marginBottom: 0,
  padding: '1.1em 1.2em',
  display: 'flex',
  justifyContent: 'center',

  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
}));

export const InputTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '30px',
    backgroundColor: 'rgba(11, 11, 11, 0.5)',

    '& fieldset': {
      borderColor: '#1D80D9',
    },
    '&:hover fieldset': {
      borderColor: '#1D80D9',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1D80D9',
    },
  },
}));

export default Input;
