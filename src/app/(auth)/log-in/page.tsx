import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import EmailIcon from '@mui/icons-material/EmailRounded';

import { colors } from '@/libs/ui';

export default function SignIn() {
  return (
    <>
      <Typography variant='h6' fontWeight='bold'>
        Your everyday everything app
      </Typography>
      <Stack spacing={2}>
        <Button variant='secondary' size='large'>
          Tiếp tục với Facebook
        </Button>
        <Button variant='secondary' size='large'>
          Tiếp tục với Google
        </Button>
        <Divider>
          <Typography sx={{ color: colors.neutral[200] }}>or</Typography>
        </Divider>
        <Button variant='secondary' size='large' startIcon={<EmailIcon />}>
          Tiếp tục với Email
        </Button>
      </Stack>
    </>
  );
}
