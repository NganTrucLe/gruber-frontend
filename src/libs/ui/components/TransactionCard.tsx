import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import MuiMoneyIcon from '@mui/icons-material/MonetizationOnRounded';

interface TransactionCardProps {
  variant: 'send' | 'receive';
  primary: string;
  secondary: string;
  children?: React.ReactNode;
}
export function TransactionCard(props: TransactionCardProps) {
  return (
    <Paper variant='outlined' component={Stack} alignItems={'center'} sx={{ width: '12rem', p: 1 }}>
      <Typography variant='button'>{props.variant == 'send' ? 'Gửi' : 'Nhận'}</Typography>
      {props.children ? props.children : <MuiMoneyIcon color='primary' sx={{ width: '3rem', height: '3rem' }} />}
      <Typography variant='body1' fontWeight='bold'>
        {props.primary}
      </Typography>
      <Typography>{props.secondary}</Typography>
    </Paper>
  );
}
