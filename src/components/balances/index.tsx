import { FC, useState } from 'react';
import { Grid } from '@mui/material';
import { formatUnits, Abi, Address } from 'viem';
import Input from './Input';
import Table from './Table';
import {
  ALLOWANCE_ABI,
  BALANCE_ABI,
  ETH_CLIENT,
  formatAllowance,
  ROUTER_ADDRESS,
  TOKEN_ADDRESSES,
  TOKEN_DECIMALS,
} from '~/utils';

type Call = {
  address: Address;
  abi: Abi;
  functionName: string;
  args: string[];
};

export type TokenData = {
  token: string;
  balance: string;
  allowance: string;
};

type BalancesProps = {
  walletAddress: Address | '';
  setWalletAddress: (address: Address | '') => void;
};

const Balances: FC<BalancesProps> = ({ walletAddress, setWalletAddress }) => {
  const [tokenData, setTokenData] = useState<TokenData[] | []>([]);

  const fetchTokenData = async () => {
    const balanceCalls: Call[] = Object.entries(TOKEN_ADDRESSES).map(
      ([token, address]) => ({
        address: address as `0x${string}`,
        abi: BALANCE_ABI,
        functionName: 'balanceOf',
        args: [walletAddress],
      })
    ) as Call[];

    const allowanceCalls: Call[] = Object.entries(TOKEN_ADDRESSES).map(
      ([token, address]) => ({
        address: address as `0x${string}`,
        abi: ALLOWANCE_ABI,
        functionName: 'allowance',
        args: [walletAddress, ROUTER_ADDRESS],
      })
    );

    try {
      // @ts-ignore
      // I cannot seem to resolve this viem type error
      const balances = await (ETH_CLIENT.multicall({
        contracts: balanceCalls,
        allowFailure: false,
      }) as any);

      const allowances = await ETH_CLIENT.multicall({
        contracts: allowanceCalls,
        allowFailure: false,
      });

      const newTokenData = balances.map((balance, index) => {
        const token = Object.keys(TOKEN_ADDRESSES)[index];
        const formattedBalance = formatUnits(
          balance as bigint,
          TOKEN_DECIMALS[token]
        );
        const formattedAllowance = formatAllowance(
          allowances[index] as number,
          TOKEN_DECIMALS[token]
        );
        return {
          token,
          balance: formattedBalance,
          allowance: formattedAllowance,
        };
      });

      setTokenData(newTokenData);
    } catch (error) {
      console.error('Error fetching token data:', error);
    }
  };

  return (
    <Grid display="flex" flexDirection="column" gap="20px" marginBottom="100px">
      <Input
        walletAddress={walletAddress}
        setWalletAddress={setWalletAddress}
        onFetch={fetchTokenData}
      />

      {tokenData.length > 0 && <Table tokenData={tokenData} />}
    </Grid>
  );
};

export default Balances;
