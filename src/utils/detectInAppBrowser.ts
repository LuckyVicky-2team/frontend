export const detectInAppBrowser = (agent: any) => {
  const inappRegex = [
    /KAKAOTALK/i,
    /Instagram/i,
    /NAVER/i,
    /zumapp/i,
    /Whale/i,
    /Snapchat/i,
    /Line/i,
    /everytimeApp/i,
    /WhatsApp/i,
    /Electron/i,
    /wadiz/i,
    /AliApp/i,
    /FB_IAB/i,
    /FBAAN/i,
    /FBAV/i,
    /FBIOS/i,
    /FBSS/i,
    /SamsungBrowser/i,
    /GSA/i, // Google Search App (iOS, Android)
    /Google/i, // Google App (iOS, Android)
  ];
  return inappRegex.some(mobile => agent.match(mobile));
};
