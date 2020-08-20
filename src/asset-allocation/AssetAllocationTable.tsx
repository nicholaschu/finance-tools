import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { roundNumber } from '../utilities/helper';
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
            <th>Contribution</th>
          </tr>
        </thead>
        <tbody>
          {rows}
          <AssetAllocationBlankRow />
          <AssetAllocationAggregateRow assetAllocations={assetAllocations} />
        </tbody>
      </Table>
      <Button onClick={onAddRowClick} disabled={disableAddRowButton}>
        Add Row
      </Button>
    </div>
  );
}

function AssetAllocationBlankRow(): JSX.Element {
  return (
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
  );
}

function AssetAllocationAggregateRow({
  assetAllocations,
}: {
  assetAllocations: AssetAllocationResource[];
}): JSX.Element {
  let totalValue = 0;
  let totalCurrentWeight = 0;
  let totalTargetWeight = 0;
  let totalContribution = 0;

  assetAllocations.forEach((asset: AssetAllocationResource) => {
    if (asset.value !== undefined) {
      totalValue += asset.value;
    }

    if (asset.currentWeight !== undefined) {
      totalCurrentWeight += asset.currentWeight;
    }

    if (asset.targetWeight !== undefined) {
      totalTargetWeight += asset.targetWeight;
    }

    if (asset.contribution !== undefined) {
      totalContribution += asset.contribution;
    }
  });

  return (
    <tr>
      <td>
        <b>Aggregate Values:</b>
      </td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>${roundNumber(totalValue)}</td>
      <td>{roundNumber(totalCurrentWeight)}%</td>
      <td>{roundNumber(totalTargetWeight)}%</td>
      <td>&nbsp;</td>
      <td>${roundNumber(totalContribution)}</td>
      <td>&nbsp;</td>
    </tr>
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
