import axios, { AxiosResponse } from 'axios';
import { AssetAllocationResource } from './asset-allocation.resource';

export class AssetAllocationService {
  calculateAssetAllocations(
    symbolList: (string | undefined)[],
    sharesList: (number | undefined)[],
    targetWeights?: (number | undefined)[],
    contribution: number = 0
  ): Promise<AssetAllocationResource[]> {
    const assetAllocationEndpoint: string = `${process.env.REACT_APP_FINANCE_TOOLS_API_URL}/asset-allocation`;

    let params: {
      symbols: string;
      shares: string;
      targetWeights?: string;
      contribution?: string;
    } = {
      symbols: symbolList.join(),
      shares: sharesList.join(),
    };

    if (targetWeights !== undefined) {
      const totalWeight: number | undefined = targetWeights.reduce(
        (accumulator, targetWeight) => {
          if (accumulator !== undefined && targetWeight !== undefined) {
            return accumulator + targetWeight;
          } else {
            return NaN;
          }
        },
        0
      );

      if (totalWeight === 100) {
        params = {
          symbols: symbolList.join(),
          shares: sharesList.join(),
          targetWeights: targetWeights.join(),
          contribution: contribution.toString(),
        };
      }
    }

    return axios
      .get(assetAllocationEndpoint, {
        params,
      })
      .then((res: AxiosResponse) => {
        return res.data.map((asset: AssetAllocationResource) => {
          return new AssetAllocationResource(
            asset.symbol,
            asset.shares,
            asset.price,
            asset.currentWeight,
            asset.targetWeight,
            asset.shareDelta
          );
        });
      });
  }
}
