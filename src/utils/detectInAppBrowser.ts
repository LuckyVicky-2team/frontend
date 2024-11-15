export const detectInAppBrowser = (agent: any) => {
  if (typeof window !== 'undefined') {
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
    ];
    return inappRegex.some(mobile => agent.match(mobile));
  }
};
