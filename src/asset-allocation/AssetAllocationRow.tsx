import React from 'react';
import Button from 'react-bootstrap/Button';
import { AssetAllocationModel } from './asset-allocation.model';
import './AssetAllocationRow.css';

export enum ColumnType {
  SYMBOL,
  SHARES,
  PRICE,
  VALUE,
  CURRENT_WEIGHT,
  TARGET_WEIGHT,
  SHARE_DELTA,
  VALUE_DELTA,
}

function AssetAllocationRow({
  assetAllocation,
  index,
  onChange,
  onRemoveRowClicked,
}: {
  assetAllocation: AssetAllocationModel;
  index: number;
  onChange: (
    updatedAssetAllocation: AssetAllocationModel,
    index: number
  ) => void;
  onRemoveRowClicked: (index: number) => void;
}): JSX.Element {
  return (
    <tr>
      <td>
        <input
          defaultValue={assetAllocation.symbol}
          onChange={(event: React.ChangeEvent) =>
            handleModifyInput(
              event,
              ColumnType.SYMBOL,
              assetAllocation,
              index,
              onChange
            )
          }
        />
      </td>
      <td>
        <input
          defaultValue={assetAllocation.shares}
          onChange={(event: React.ChangeEvent) =>
            handleModifyInput(
              event,
              ColumnType.SHARES,
              assetAllocation,
              index,
              onChange
            )
          }
        />
      </td>
      <td>{assetAllocation.price}</td>
      <td>{assetAllocation.value}</td>
      <td>{assetAllocation.currentWeight}</td>
      <td>
        <input
          defaultValue={assetAllocation.targetWeight}
          onChange={(event: React.ChangeEvent) =>
            handleModifyInput(
              event,
              ColumnType.CURRENT_WEIGHT,
              assetAllocation,
              index,
              onChange
            )
          }
        />
      </td>
      <td>{assetAllocation.shareDelta}</td>
      <td>{assetAllocation.valueDelta}</td>
      <td>
        <Button variant="danger" onClick={() => onRemoveRowClicked(index)}>
          Remove
        </Button>
      </td>
    </tr>
  );
}

function handleModifyInput(
  event: any,
  columnType: ColumnType,
  originalAssetAllocation: AssetAllocationModel,
  index: number,
  onChange: (
    updatedAssetAllocation: AssetAllocationModel,
    index: number
  ) => void
): void {
  const updatedAssetAllocation: AssetAllocationModel = updateAssetAllocation(
    event,
    columnType,
    originalAssetAllocation
  );

  onChange(updatedAssetAllocation, index);
}

function updateAssetAllocation(
  event: any,
  columnType: ColumnType,
  originalAssetAllocation: AssetAllocationModel
): AssetAllocationModel {
  const newValue: string = event.target.value;

  const assetAllocation: AssetAllocationModel = {
    value: undefined,
    valueDelta: undefined,
    ...originalAssetAllocation,
  };

  switch (columnType) {
    case ColumnType.SYMBOL:
      assetAllocation.symbol = newValue;
      break;
    case ColumnType.SHARES:
      assetAllocation.shares = parseFloat(newValue);
      break;
    case ColumnType.PRICE:
      break;
    case ColumnType.VALUE:
      break;
    case ColumnType.CURRENT_WEIGHT:
      assetAllocation.currentWeight = parseFloat(newValue);
      break;
    case ColumnType.TARGET_WEIGHT:
      break;
    case ColumnType.SHARE_DELTA:
      break;
    case ColumnType.VALUE_DELTA:
      break;
    default:
      break;
  }

  return assetAllocation;
}

export default AssetAllocationRow;
