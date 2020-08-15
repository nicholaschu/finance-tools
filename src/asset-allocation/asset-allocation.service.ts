import axios from 'axios';
import { AssetAllocationModel } from './asset-allocation.model';

export class AssetAllocationService {
  calculateAssetAllocations(
    symbolList: (string | undefined)[],
    sharesList: (number | undefined)[]
  ): Promise<AssetAllocationModel[]> {
    const assetAllocationEndpoint: string = `${process.env.REACT_APP_FINANCE_TOOLS_API_URL}/asset-allocation`;

    return axios.get(assetAllocationEndpoint, {
      params: {
        symbols: symbolList.join(),
        shares: sharesList.join(),
      },
    });
  }
}
