import React from 'react';
import { AssetAllocationModel } from './asset-allocation.model';
import { AssetAllocationService } from './asset-allocation.service';
import './AssetAllocation.css';
import AssetAllocationTable from './AssetAllocationTable';

class AssetAllocation extends React.Component {
  private assetAllocationService: AssetAllocationService = new AssetAllocationService();
  state: { assetAllocations: AssetAllocationModel[] };

  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {
      assetAllocations: [new AssetAllocationModel('')],
    };
  }

  addRow(): void {
    const assetAllocations: AssetAllocationModel[] = this.state.assetAllocations.slice();

    assetAllocations.push(new AssetAllocationModel(''));
    this.setState({ assetAllocations });
  }

  handleModifyTable(updatedAssetAllocations: AssetAllocationModel[]): void {
    this.setState({ assetAllocations: updatedAssetAllocations }, () =>
      this.refreshData()
    );
  }

  refreshData(): void {
    const symbols: (string | undefined)[] = this.state.assetAllocations.map(
      (assetAllocation: AssetAllocationModel) => assetAllocation.symbol
    );

    const shares: (number | undefined)[] = this.state.assetAllocations.map(
      (assetAllocation: AssetAllocationModel) => assetAllocation.shares
    );

    this.assetAllocationService
      .calculateAssetAllocations(symbols, shares)
      .then((assetAllocations: AssetAllocationModel[]) => {
        console.log(assetAllocations);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }

  removeRow(index: number): void {
    const assetAllocations: AssetAllocationModel[] = this.state.assetAllocations.slice();

    assetAllocations.splice(index, 1);
    this.setState({ assetAllocations });
  }

  render(): JSX.Element {
    return (
      <div>
        <h1>Asset Allocations</h1>
        <br />
        <AssetAllocationTable
          assetAllocations={this.state.assetAllocations}
          onAddRowClicked={() => this.addRow()}
          onChange={(updatedAssetAllocations: AssetAllocationModel[]) =>
            this.handleModifyTable(updatedAssetAllocations)
          }
          onRemoveRowClicked={(i) => this.removeRow(i)}
        />
      </div>
    );
  }
}

export default AssetAllocation;
