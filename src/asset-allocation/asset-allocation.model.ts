export class AssetAllocationModel {
  symbol?: string;
  shares?: number;
  targetWeight?: number;

  constructor(symbol?: string, shares?: number, targetWeight?: number) {
    this.symbol = symbol;
    this.shares = shares;
    this.targetWeight = targetWeight;
  }
}
