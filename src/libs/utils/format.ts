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

export function shortenAddress(address: string) {
  const [first] = address.split(', ');
  return first;
}
