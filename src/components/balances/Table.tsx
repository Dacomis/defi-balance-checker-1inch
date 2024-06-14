import {
  Table as MUITable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { TokenData } from '.';
import styled from '@emotion/styled';

type TableProps = {
  tokenData: TokenData[];
};

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '20px !important',
  backgroundColor: 'rgba(11, 11, 11, 0.5) !important',
  padding: '10px',
}));

const TokenTable: FC<TableProps> = ({ tokenData }) => (
  <StyledTableContainer>
    <MUITable
      sx={{
        minWidth: 850,
        'th, td': { borderColor: 'rgba(29, 128, 217, 0.5)' },
      }}
      aria-label="simple table"
    >
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant="body1" color="white" fontWeight="700">
              Token
            </Typography>
          </TableCell>
          <TableCell align="left">
            <Typography variant="body1" color="white" fontWeight="700">
              Balance
            </Typography>
          </TableCell>
          <TableCell align="left">
            <Typography variant="body1" color="white" fontWeight="700">
              Allowance for 1Inch Router
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tokenData.map(({ token, balance, allowance }, index) => (
          <TableRow
            key={index}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {token}
            </TableCell>
            <TableCell align="left">{balance}</TableCell>
            <TableCell align="left">{allowance}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </MUITable>
  </StyledTableContainer>
);

export default TokenTable;
