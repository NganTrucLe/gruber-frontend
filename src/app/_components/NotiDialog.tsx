import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';

import CheckIcon from '@mui/icons-material/CheckCircleRounded';

export function AutoNotiDialog(props: DialogProps) {
  return (
    <>
      <Dialog {...props} onClick={(e) => (props.onClose ? props.onClose(e, 'backdropClick') : {})}>
        <DialogTitle sx={{ bgcolor: 'lightgray', py: 1, textAlign: 'center' }}>GrabBike</DialogTitle>
        <DialogContent sx={{ mt: 2, alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          <DialogContentText>Đã tự động nhận cuốc mới</DialogContentText>
          <CheckIcon sx={{ width: '8rem', height: '8rem' }} color='primary' />
          <DialogContentText>Khách hàng đang chờ bạn</DialogContentText>
        </DialogContent>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={props.open}
        message='Chạm vào vị trí bất kỳ để tiếp tục.'
      />
    </>
  );
}

export function ManualNotiDialog({
  props,
  bookingInfo,
  onAccept,
  onDecline,
}: {
  props: DialogProps;
  bookingInfo: any;
  onAccept: (e: any) => void;
  onDecline: (e: any) => void;
}) {
  return (
    <>
      <Dialog {...props}>
        <DialogTitle sx={{ bgcolor: 'lightgray', py: 1, textAlign: 'center' }}>GrabBike</DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <DialogContentText textAlign='center'>Cuốc xe mới</DialogContentText>
          <DialogContentText color='black' textAlign='left'>
            <b>Địa điểm đón:</b> {bookingInfo?.booking_route.pick_up.formatted_address}
          </DialogContentText>
          <DialogContentText color='black'>
            <b>Địa điểm trả khách:</b> {bookingInfo?.booking_route.destination.formatted_address}
          </DialogContentText>
          <DialogContentText textAlign='center'>Khách hàng đang chờ bạn</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDecline} color='error' variant='outlined' size='large' sx={{ width: '100%' }}>
            Từ chối
          </Button>
          <Button onClick={onAccept} color='primary' size='large' sx={{ width: '100%' }}>
            Nhận cuốc
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
