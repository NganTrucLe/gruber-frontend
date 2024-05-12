import { BookingStatus, VehicleType } from '../enum';

export function hiddenEmail(email: string) {
  const [username, domain] = email.split('@');
  let hiddenUsername = `${username.slice(0, 2)}***${username.slice(-2)}`;
  let missingChars = username.length - 4;
  let aterish = '*'.repeat(missingChars);
  if (username.length <= 4) {
    missingChars = username.length - 1;
    aterish = '*'.repeat(missingChars);
    hiddenUsername = `${username.slice(0, 1)}${aterish}`;
  } else {
    hiddenUsername = `${username.slice(0, 2)}${aterish}${username.slice(-2)}`;
  }
  return `${hiddenUsername}@${domain}`;
}

export function formatDistance(distance: number) {
  if (distance < 1000) {
    return `${distance.toFixed(0)} m`;
  } else return `${(distance / 1000).toFixed(2)} km`;
}

export function formatPrice(price: number | string) {
  if (typeof price === 'string')
    return parseFloat(price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

export function formatBookingStatus(status: BookingStatus) {
  switch (status) {
    case BookingStatus.PENDING:
      return 'Tìm tài xế';
    case BookingStatus.PICKED_UP:
      return 'Đã đón khách';
    case BookingStatus.IN_PROGRESS:
      return 'Đang di chuyển';
    case BookingStatus.ARRIVED:
      return 'Chờ thanh toán';
    default:
      return 'Hoàn thành';
  }
}

export function formatVehicleType(type: VehicleType) {
  switch (type) {
    case VehicleType.MOTORBIKE:
      return 'Xe máy';
    case VehicleType.CAR4:
      return 'Xe 4 chỗ';
    default:
      return 'Xe 7 chỗ';
  }
}

export function shortenAddress(address: string) {
  const [first] = address.split(', ');
  return first;
}
