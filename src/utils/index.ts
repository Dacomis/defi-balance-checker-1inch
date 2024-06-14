import { mainnet } from 'viem/chains';
import { createPublicClient, formatUnits, http, parseAbi } from 'viem';

export const formatBalance = (rawBalance: string) => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
  return balance;
};

export const formatChainAsNum = (chainIdHex: string) => {
  const chainIdNum = parseInt(chainIdHex);
  return chainIdNum;
};

export const formatAddress = (addr: string) => {
  const upperAfterLastTwo = addr.slice(0, 2) + addr.slice(2);
  return `${upperAfterLastTwo.substring(0, 5)}...${upperAfterLastTwo.substring(39)}`;
};

export const formatAllowance = (allowance: number, decimals: number) => {
  // Convert string to bigint for safe comparison and arithmetic
  const allowanceBigInt = BigInt(allowance);
  // Check if the allowance is the maximum uint256 value
  return allowanceBigInt === MAX_UINT256
    ? 'Unlimited'
    : formatUnits(allowanceBigInt, decimals);
};

export const TOKEN_ADDRESSES = {
  DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  LINK: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
  UNI: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
  AAVE: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
  ONEINCH: '0x111111111117dC0aa78b770fA6A738034120C302',
  WBTC: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  MATIC: '0x455e53CBB86018Ac2B8092FdCd39d8444aFFC3F6',
};

export const TOKEN_DECIMALS = {
  DAI: 18,
  USDC: 6,
  USDT: 6,
  LINK: 18,
  UNI: 18,
  AAVE: 18,
  ONEINCH: 18,
  WBTC: 8,
  MATIC: 18,
};

export const ROUTER_ADDRESS = '0x111111125421ca6dc452d289314280a0f8842a65';

export const BALANCE_ABI = parseAbi([
  'function balanceOf(address owner) external view returns (uint256)',
]);

export const ALLOWANCE_ABI = parseAbi([
  'function allowance(address owner, address spender) external view returns (uint256)',
]);

export const MAX_UINT256 = 2n ** 256n - 1n;

export const ETH_CLIENT = createPublicClient({
  chain: mainnet,
  transport: http(import.meta.env.VITE_RPC_URL),
});
