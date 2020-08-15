import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { AssetAllocationModel } from './asset-allocation.model';
import AssetAllocationRow from './AssetAllocationRow';
import './AssetAllocationTable.css';

function AssetAllocationTable({
  assetAllocations,
  onAddRowClicked,
  onChange,
  onRemoveRowClicked,
}: {
  assetAllocations: AssetAllocationModel[];
  onAddRowClicked: () => void;
  onChange: (updatedAssetAllocations: AssetAllocationModel[]) => void;
  onRemoveRowClicked: (index: number) => void;
}): JSX.Element {
  const rows: JSX.Element[] = assetAllocations.map(
    (assetAllocation: AssetAllocationModel, index: number) => (
      <AssetAllocationRow
        key={assetAllocation.symbol}
        assetAllocation={assetAllocation}
        index={index}
        onChange={(
          updatedAssetAllocation: AssetAllocationModel,
          index: number
        ) =>
          handleModifyRow(
            updatedAssetAllocation,
            index,
            assetAllocations,
            onChange
          )
        }
        onRemoveRowClicked={onRemoveRowClicked}
      />
    )
  );

  const disableAddRowButton: boolean =
    assetAllocations.filter(
      (assetAllocation: AssetAllocationModel) => assetAllocation.symbol === ''
    ).length >= 1;

  return (
    <div>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Ticker Symbol</th>
            <th>Shares</th>
            <th>Price</th>
            <th>Value</th>
            <th>Current Weight</th>
            <th>Target Weight</th>
            <th>Share Delta</th>
            <th>Value Delta</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Button onClick={onAddRowClicked} disabled={disableAddRowButton}>
        Add Row
      </Button>
    </div>
  );
}

function handleModifyRow(
  updatedAssetAllocation: AssetAllocationModel,
  index: number,
  originalAssetAllocations: AssetAllocationModel[],
  onChange: (updatedAssetAllocations: AssetAllocationModel[]) => void
): void {
  const updatedAssetAllocations: AssetAllocationModel[] = updateAssetAllocations(
    updatedAssetAllocation,
    index,
    originalAssetAllocations
  );

  onChange(updatedAssetAllocations);
}

function updateAssetAllocations(
  updatedAssetAllocation: AssetAllocationModel,
  index: number,
  originalAssetAllocations: AssetAllocationModel[]
): AssetAllocationModel[] {
  const assetAllocations: AssetAllocationModel[] = originalAssetAllocations.slice();
  assetAllocations[index] = updatedAssetAllocation;

  return assetAllocations;
}

export default AssetAllocationTable;
