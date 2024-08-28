const isPC = () => {
  const userAgent = navigator.userAgent;

  // PC에서 주로 사용되는 플랫폼을 체크
  const isWindows = userAgent.indexOf('Windows NT') !== -1;
  const isMac = userAgent.indexOf('Macintosh') !== -1;
  const isLinux =
    userAgent.indexOf('Linux') !== -1 && userAgent.indexOf('Android') === -1;
  const isX11 = userAgent.indexOf('X11') !== -1; // Unix

  // PC에 해당하는 경우 true를 반환
  return isWindows || isMac || isLinux || isX11;
};

export default isPC;
