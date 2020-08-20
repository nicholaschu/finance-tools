export class AssetAllocationResource {
  symbol?: string;
  shares?: number;
  price?: number;
  value?: number;
  currentWeight?: number;
  targetWeight?: number;
  shareDelta?: number;
  valueDelta?: number;

  constructor(
    symbol?: string,
    shares?: number,
    price?: number,
    currentWeight?: number,
    targetWeight?: number,
    shareDelta?: number
  ) {
    this.symbol = symbol;
    this.shares = shares;
    this.price = price;
    this.currentWeight = currentWeight;
    this.targetWeight = targetWeight;
    this.shareDelta = shareDelta;

    if (this.shares !== undefined && this.price !== undefined) {
      this.value = parseFloat((this.shares * this.price).toFixed(2));
    }

    if (this.shareDelta !== undefined && this.price !== undefined) {
      this.valueDelta = parseFloat((this.shareDelta * this.price).toFixed(2));
    }
  }
}
