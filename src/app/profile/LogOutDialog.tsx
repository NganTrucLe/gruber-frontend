import { useRouter } from 'next/navigation';

import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useLocalStorage } from '@/hooks';

export default function LogOutDialog(props: DialogProps) {
  const router = useRouter();
  const localStorage = useLocalStorage();

  const handleLogOut = () => {
    localStorage.removeStoredValue('idToken');
    localStorage.removeStoredValue('localId');
    router.push('/log-in');
  };

  return (
    <Dialog {...props}>
      <DialogTitle variant='h6'>Đăng xuất</DialogTitle>
      <DialogContent>
        <DialogContentText>Bạn có chắc chắn muốn đăng xuất khỏi Gruber không?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          size='large'
          variant='text'
          onClick={() => {
            if (props.onClose) {
              props.onClose({}, 'backdropClick');
            }
          }}>
          Hủy
        </Button>
        <Button size='large' variant='text' color='error' onClick={handleLogOut}>
          Đăng xuất
        </Button>
      </DialogActions>
    </Dialog>
  );
}
