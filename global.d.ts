declare global {
  interface Navigator {
    standalone?: boolean;
    // getInstalledRelatedApps?: () => Promise<
    //   Array<{
    //     platform: string;
    //     url?: string;
    //     id?: string;
    //   }>
    // >;
  }
}

export {};
