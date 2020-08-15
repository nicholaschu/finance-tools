export class AssetAllocationResource {
  symbol?: string;
  shares?: number;
  price?: number;
  currentWeight?: number;
  targetWeight?: number;
  shareDelta?: number;

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
  }

  get value(): number | undefined {
    if (this.shares !== undefined && this.price !== undefined) {
      return parseFloat((this.shares * this.price).toFixed(2));
    } else {
      return undefined;
    }
  }

  get valueDelta(): number | undefined {
    if (this.shareDelta !== undefined && this.price !== undefined) {
      return parseFloat((this.shareDelta * this.price).toFixed(2));
    } else {
      return undefined;
    }
  }
}
