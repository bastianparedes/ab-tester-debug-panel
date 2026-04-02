declare global {
  interface Window {
    ba_tester: {
      campaignsData: {
        id: number;
        name: string;
        variations: { id: number; name: string }[];
      }[];
    };
  }
}
