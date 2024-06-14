import { FC } from 'react';
import { Button, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';

type ConnectProps = {
  provider: EIP6963ProviderDetail;
  onConnect: () => Promise<void>;
};

const Connect: FC<ConnectProps> = ({ provider, onConnect }) => (
  <BorderWrapper>
    <Wrapper
      display="flex"
      flexDirection="column"
      position="relative"
      padding="20px 30px"
      overflow="hidden"
      width="100%"
      alignItems="center"
    >
      <Grid
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        gap="20px"
      >
        <Typography variant="h4" color="white">
          Connect your Metamask wallet
        </Typography>
        <ActionButton onClick={onConnect}>
          <img src={provider.info.icon} alt={provider.info.name} />
          <Typography variant="body2" color="white">
            {provider.info.name}
          </Typography>
        </ActionButton>
      </Grid>
    </Wrapper>
  </BorderWrapper>
);

export const ActionButton = styled(Button)(() => ({
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'flex-start',
  padding: '0.6em 1.2em',
  marginBottom: '0.5em',
  fontFamily: 'inherit',
  fontSize: '1em',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'border-color 0.25s',
  border: '1px solid transparent',
  backgroundColor: '#4f46e5',
  borderRadius: '30px',

  '&:hover': {
    borderColor: '#4f46e5',
  },

  '& > img': {
    width: '1.5em',
    height: '1.5em',
    marginRight: '1em',
  },
}));

export const BorderWrapper = styled(Grid)(({ theme }) => ({
  padding: 1,
  backgroundImage: `linear-gradient(20deg, #161A36 0%, #281B92 25%, #1D80D9 50%, #3151FC 100%)`,
  backgroundClip: 'padding-box',
  borderRadius: '20px',
}));

export const Wrapper = styled(Grid)(({ theme }) => ({
  background: '#151F2A',
  color: '#0b0b0b',
  borderRadius: '20px',
  width: '350px',
}));

export default Connect;
