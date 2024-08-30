// Place this at the top of your TypeScript file or in a shared file
export interface PositionListResponse {
  success: boolean;
  result: {
    category: string;
    list: Array<{
      symbol: string;
      leverage: string;
      autoAddMargin: number;
      avgPrice: string;
      liqPrice: string;
      positionValue: string;
      positionIM: string;
      positionMM: string;
      unrealisedPnl: string;
      curRealisedPnl: string;
      adlRankIndicator: number;
      tradeMode: number;
      size: string;
      markPrice: string;
      // Add other fields if necessary
    }>;
    nextPageCursor: string;
  };
  message?: string;
  retCode?: number;
  retMsg?: string;
  time?: number;
}
