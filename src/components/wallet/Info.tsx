import { FC } from 'react';
import { formatAddress } from '~/utils';
import { Avatar, Button, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { BorderWrapper, ActionButton, Wrapper } from './Connect';

type InfoProps = {
  wallet: EIP6963ProviderDetail;
  userAccount: string;
  onDisconnect: () => Promise<void>;
};

const Info: FC<InfoProps> = ({ wallet, userAccount, onDisconnect }) => (
  <BorderWrapper>
    <Wrapper
      display="flex"
      flexDirection="column"
      position="relative"
      padding="20px 30px"
      overflow="hidden"
      alignItems="center"
      gap="10px"
    >
      <Grid display="flex" flexDirection="column" alignItems="center">
        <IconWrapper>
          <img src={wallet.info.icon} alt={wallet.info.name} />
        </IconWrapper>
        <Typography variant="body1" color="white">
          {wallet.info.name}
        </Typography>
        <Typography variant="body1" color="white">
          ({formatAddress(userAccount)})
        </Typography>
      </Grid>
      <ActionButton onClick={onDisconnect}>
        <Typography variant="body2" color="white">
          Disconnect
        </Typography>
      </ActionButton>
    </Wrapper>
  </BorderWrapper>
);

const IconWrapper = styled(Avatar)(({ theme }) => ({
  width: '50px',
  height: '50px',
  margin: '0',
  display: 'flex',
  marginBottom: '15px',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.paper,
  boxShadow: `0 0 0 3px ${theme.palette.primary.main}`,

  '& > img': {
    width: '50px',
    height: '50px',
  },
}));

export default Info;
