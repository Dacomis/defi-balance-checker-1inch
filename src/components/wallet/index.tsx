import { FC, useState } from 'react';
import { useSyncProviders } from '../../hooks/useSyncProviders';
import { Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';
import Info from './Info';
import Connect from './Connect';
import { Address } from 'viem';

type WalletProviderProps = {
  setWalletAddress: (address: Address | '') => void;
};

const WalletProvider: FC<WalletProviderProps> = ({ setWalletAddress }) => {
  const [selectedWallet, setSelectedWallet] =
    useState<EIP6963ProviderDetail | null>(null);
  const [userAccount, setUserAccount] = useState<string>('');
  const allProviders = useSyncProviders();
  const provider = allProviders.find(
    (provider) => provider.info.name === 'MetaMask'
  );

  const handleConnect = async () => {
    try {
      const accounts = await provider.provider.request({
        method: 'eth_requestAccounts',
      });
      setSelectedWallet(provider);
      setUserAccount(accounts?.[0]);
      setWalletAddress(accounts[0]);
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await selectedWallet.provider.request({
        method: 'wallet_revokePermissions',
        params: [{ eth_accounts: {} }],
      });
      setSelectedWallet(null);
      setUserAccount('');
      setWalletAddress('');
    } catch (error) {
      console.error('Disconnection failed:', error);
    }
  };

  return (
    <AppContainer>
      {userAccount ? (
        <Info
          wallet={selectedWallet}
          userAccount={userAccount}
          onDisconnect={handleDisconnect}
        />
      ) : provider ? (
        <Connect provider={provider} onConnect={handleConnect} />
      ) : (
        <Typography>No MetaMask Provider Available</Typography>
      )}
    </AppContainer>
  );
};

const AppContainer = styled(Grid)(() => ({
  maxWidth: '1280px',
  margin: '0 auto',
  textAlign: 'center',
  borderRadius: '20px',
}));

export default WalletProvider;
