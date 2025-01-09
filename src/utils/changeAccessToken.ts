export function setAccessToken(token: string) {
  if (typeof window === 'undefined') return;

  localStorage.setItem('accessToken', token);
  window.dispatchEvent(new Event('changeAccessToken'));
}

export function removeAccessToken() {
  if (typeof window === 'undefined') return;

  localStorage.removeItem('accessToken');
  window.dispatchEvent(new Event('changeAccessToken'));
}
