import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { AssetAllocationModel } from './asset-allocation.model';
import { AssetAllocationResource } from './asset-allocation.resource';
import { AssetAllocationService } from './asset-allocation.service';
import AssetAllocationRow from './AssetAllocationRow';
import './AssetAllocationTable.css';

function AssetAllocationTable({
  assetModels,
  onAddRowClicked,
  onChange,
  onRemoveRowClicked,
}: {
  assetModels: AssetAllocationModel[];
  onAddRowClicked: () => void;
  onChange: (updatedAssetAllocations: AssetAllocationModel[]) => void;
  onRemoveRowClicked: (index: number) => void;
}): JSX.Element {
  const [assetResources, setAssetResources] = useState([
    new AssetAllocationResource(),
  ]);

  const [contribution, setContribution] = useState(0);
  const [roundDeltas, setRoundDeltas] = useState(false);

  useEffect(() => {
    const assetAllocationService = new AssetAllocationService();

    const symbolList: (string | undefined)[] = assetModels.map(
      (assetAllocation: AssetAllocationModel) => assetAllocation.symbol
    );

    const sharesList: (number | undefined)[] = assetModels.map(
      (assetAllocation: AssetAllocationModel) => assetAllocation.shares
    );

    const targetWeights: (number | undefined)[] = assetModels.map(
      (assetAllocation: AssetAllocationModel) => assetAllocation.targetWeight
    );

    setAssetResources(
      assetModels.slice().map((asset: AssetAllocationModel) => {
        return new AssetAllocationResource(asset.symbol, asset.shares);
      })
    );

    assetAllocationService
      .calculateAssetAllocations(
        symbolList,
        sharesList,
        targetWeights,
        contribution
      )
      .then((assetAllocations: AssetAllocationResource[]) => {
        if (roundDeltas) {
          const roundedDeltas: AssetAllocationResource[] = assetAllocations.map(
            (asset: AssetAllocationResource) => {
              if (asset.shareDelta !== undefined) {
                asset.shareDelta = parseFloat(asset.shareDelta.toFixed(0));
              }

              return asset;
            }
          );

          setAssetResources(roundedDeltas);
        } else {
          setAssetResources(assetAllocations);
        }
      })
      .catch((err: any) => {
        console.error(err);
      });
  }, [assetModels, contribution, roundDeltas]);

  const rows: JSX.Element[] = assetResources.map(
    (assetAllocation: AssetAllocationResource, index: number) => (
      <AssetAllocationRow
        key={assetAllocation.symbol || ''}
        assetAllocation={assetAllocation}
        index={index}
        onChange={(
          updatedAssetAllocation: AssetAllocationResource,
          index: number
        ) =>
          handleModifyRow(updatedAssetAllocation, index, assetModels, onChange)
        }
        onRemoveRowClicked={onRemoveRowClicked}
      />
    )
  );

  const disableAddRowButton: boolean =
    assetModels.filter(
      (assetAllocation: AssetAllocationModel) =>
        assetAllocation.symbol === undefined
    ).length >= 1;

  const handleRoundDeltasSwitch = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setRoundDeltas(event.target.checked);
  };

  return (
    <div>
      <TextField
        type="number"
        variant="outlined"
        label="Contribution Amount"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
          setContribution(parseFloat(event.target.value))
        }
      />
      <FormGroup>
        <FormControlLabel
          control={
            <Switch checked={roundDeltas} onChange={handleRoundDeltasSwitch} />
          }
          label="Round Deltas"
        />
      </FormGroup>
      <br />
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
  updatedAssetAllocation: AssetAllocationResource,
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
