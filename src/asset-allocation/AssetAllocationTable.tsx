import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { AssetAllocationResource } from './asset-allocation.resource';
import AssetAllocationRow from './AssetAllocationRow';
import './AssetAllocationTable.css';

function AssetAllocationTable({
  assetAllocations,
  onAddRowClick,
  onChange,
  onRemoveRowClick,
}: {
  assetAllocations: AssetAllocationResource[];
  onAddRowClick: () => void;
  onChange: (updatedAssetAllocations: AssetAllocationResource[]) => void;
  onRemoveRowClick: (index: number) => void;
}): JSX.Element {
  const rows: JSX.Element[] = assetAllocations.map(
    (assetAllocation: AssetAllocationResource, index: number) => (
      <AssetAllocationRow
        key={assetAllocation.symbol}
        assetAllocation={assetAllocation}
        index={index}
        onChange={(
          updatedAssetAllocation: AssetAllocationResource,
          index: number
        ) =>
          handleModifyRow(
            updatedAssetAllocation,
            index,
            assetAllocations,
            onChange
          )
        }
        onRemoveRowClicked={onRemoveRowClick}
      />
    )
  );

  const disableAddRowButton: boolean =
    assetAllocations.filter(
      (assetAllocation: AssetAllocationResource) =>
        assetAllocation.symbol === undefined
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
      <Button onClick={onAddRowClick} disabled={disableAddRowButton}>
        Add Row
      </Button>
    </div>
  );
}

function handleModifyRow(
  updatedAssetAllocation: AssetAllocationResource,
  index: number,
  originalAssetAllocations: AssetAllocationResource[],
  onChange: (updatedAssetAllocations: AssetAllocationResource[]) => void
): void {
  const updatedAssetAllocations: AssetAllocationResource[] = updateAssetAllocations(
    updatedAssetAllocation,
    index,
    originalAssetAllocations
  );

  onChange(updatedAssetAllocations);
}

function updateAssetAllocations(
  updatedAssetAllocation: AssetAllocationResource,
  index: number,
  originalAssetAllocations: AssetAllocationResource[]
): AssetAllocationResource[] {
  const assetAllocations: AssetAllocationResource[] = originalAssetAllocations.slice();
  assetAllocations[index] = updatedAssetAllocation;

  return assetAllocations;
}

export default AssetAllocationTable;
