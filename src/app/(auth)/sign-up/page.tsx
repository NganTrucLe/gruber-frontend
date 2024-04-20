import Link from 'next/link';

import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';

import EmailIcon from '@mui/icons-material/EmailRounded';

import { InputLayout } from '@/libs/ui';

export default function SignUp() {
  return (
    <>
      <Typography variant='h5' fontWeight='bold'>
        Get Started
      </Typography>
      <InputLayout
        label='Email'
        inputProps={{
          name: 'email',
          placeholder: 'Nhập địa chỉ email của bạn',
          endAdornment: (
            <InputAdornment position='end'>
              <EmailIcon />
            </InputAdornment>
          ),
        }}
      />
      <Typography>
        Gửi mã xác thực cho tôi qua <b>email</b>
      </Typography>
      <Link href='/sign-up/otp'>
        <Button size='large' sx={{ width: '100%' }}>
          Tiếp theo
        </Button>
      </Link>
    </>
  );
}
