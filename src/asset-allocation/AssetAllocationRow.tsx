import React from 'react';
import Button from 'react-bootstrap/Button';
import { AssetAllocationResource } from './asset-allocation.resource';
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
  assetAllocation: AssetAllocationResource;
  index: number;
  onChange: (
    updatedAssetAllocation: AssetAllocationResource,
    index: number
  ) => void;
  onRemoveRowClicked: (index: number) => void;
}): JSX.Element {
  return (
    <tr>
      <td>
        <input
          type="text"
          defaultValue={assetAllocation.symbol}
          onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
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
          type="number"
          defaultValue={assetAllocation.shares}
          onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
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
      <td>
        <AssetAllocationPrice price={assetAllocation.price} />
      </td>
      <td>
        <AssetAllocationValue value={assetAllocation.value} />
      </td>
      <td>
        <AssetAllocationCurrentWeight
          currentWeight={assetAllocation.currentWeight}
        />
      </td>
      <td>
        <input
          type="number"
          defaultValue={assetAllocation.targetWeight}
          onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleModifyInput(
              event,
              ColumnType.TARGET_WEIGHT,
              assetAllocation,
              index,
              onChange
            )
          }
        />
      </td>
      <td>
        <AssetAllocationShareDelta shareDelta={assetAllocation.shareDelta} />
      </td>
      <td>
        <AssetAllocationValueDelta valueDelta={assetAllocation.valueDelta} />
      </td>
      <td>
        <Button variant="danger" onClick={() => onRemoveRowClicked(index)}>
          Remove
        </Button>
      </td>
    </tr>
  );
}

function AssetAllocationPrice({ price }: { price?: number }): JSX.Element {
  let formattedString: string = '0';

  if (price !== undefined) {
    formattedString = price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return <span>${formattedString}</span>;
}

function AssetAllocationValue({ value }: { value?: number }): JSX.Element {
  let formattedString: string = '0';

  if (value !== undefined) {
    formattedString = value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return <span>${formattedString}</span>;
}

function AssetAllocationCurrentWeight({
  currentWeight,
}: {
  currentWeight?: number;
}): JSX.Element {
  let formattedString: string = '0';

  if (currentWeight !== undefined) {
    formattedString = currentWeight.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return <span>{formattedString}%</span>;
}

function AssetAllocationShareDelta({
  shareDelta,
}: {
  shareDelta?: number;
}): JSX.Element {
  let formattedString: string = '0';

  if (shareDelta !== undefined) {
    formattedString = shareDelta.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return <span>{formattedString}</span>;
}

function AssetAllocationValueDelta({
  valueDelta,
}: {
  valueDelta?: number;
}): JSX.Element {
  let formattedString: string = '0';

  if (valueDelta !== undefined) {
    formattedString = valueDelta.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return <span>${formattedString}</span>;
}

function handleModifyInput(
  event: React.ChangeEvent<HTMLInputElement>,
  columnType: ColumnType,
  originalAssetAllocation: AssetAllocationResource,
  index: number,
  onChange: (
    updatedAssetAllocation: AssetAllocationResource,
    index: number
  ) => void
): void {
  const updatedAssetAllocation: AssetAllocationResource = updateAssetAllocation(
    event,
    columnType,
    originalAssetAllocation
  );

  onChange(updatedAssetAllocation, index);
}

function updateAssetAllocation(
  event: React.ChangeEvent<HTMLInputElement>,
  columnType: ColumnType,
  originalAssetAllocation: AssetAllocationResource
): AssetAllocationResource {
  const newValue: string = event.target.value;

  const assetAllocation: AssetAllocationResource = {
    value: undefined,
    valueDelta: undefined,
    ...originalAssetAllocation,
  };

  console.log('### updateAssetAllocation');
  console.log(assetAllocation);

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
      break;
    case ColumnType.TARGET_WEIGHT:
      assetAllocation.targetWeight = parseFloat(newValue);
      break;
    case ColumnType.SHARE_DELTA:
      break;
    case ColumnType.VALUE_DELTA:
      break;
    default:
      break;
  }

  console.log(assetAllocation);
  return assetAllocation;
}

export default AssetAllocationRow;
