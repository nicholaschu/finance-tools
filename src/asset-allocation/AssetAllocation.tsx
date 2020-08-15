import React from 'react';
import { AssetAllocationModel } from './asset-allocation.model';
import './AssetAllocation.css';
import AssetAllocationTable from './AssetAllocationTable';

class AssetAllocation extends React.Component {
  state: { assetModels: AssetAllocationModel[] };

  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {
      assetModels: [new AssetAllocationModel()],
    };
  }

  addRow(): void {
    const assetModels: AssetAllocationModel[] = this.state.assetModels.slice();

    assetModels.push(new AssetAllocationModel());
    this.setState({ assetModels });
  }

  handleModifyTable(assetModels: AssetAllocationModel[]): void {
    console.log('### handleModifyTable');
    console.log(assetModels);

    this.setState({ assetModels });
  }

  removeRow(index: number): void {
    const assetModels: AssetAllocationModel[] = this.state.assetModels.slice();

    assetModels.splice(index, 1);
    this.setState({ assetModels });
  }

  render(): JSX.Element {
    return (
      <div>
        <h1>Asset Allocations</h1>
        <br />
        <AssetAllocationTable
          assetModels={this.state.assetModels}
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
