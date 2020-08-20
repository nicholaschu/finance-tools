import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import { AssetAllocationModel } from './asset-allocation.model';
import { AssetAllocationResource } from './asset-allocation.resource';
import { AssetAllocationService } from './asset-allocation.service';
import './AssetAllocation.css';
import AssetAllocationTable from './AssetAllocationTable';

function AssetAllocation(): JSX.Element {
  const [assetModels, setAssetModels] = useState([new AssetAllocationModel()]);

  const [assetResources, setAssetResources] = useState([
    new AssetAllocationResource(),
  ]);

  const [currentChartData, setCurrentChartData] = useState([
    ['Symbol', 'Value'],
  ]);
  const [targetChartData, setTargetChartData] = useState([['Symbol', 'Value']]);

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
        return new AssetAllocationResource(
          asset.symbol,
          asset.shares,
          undefined,
          undefined,
          asset.targetWeight
        );
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
        assetAllocations.map(
          (asset: AssetAllocationResource, index: number) => {
            return (asset.targetWeight = assetModels[index].targetWeight);
          }
        );

        if (roundDeltas) {
          const roundedDeltas: AssetAllocationResource[] = assetAllocations.map(
            (assets: AssetAllocationResource) => {
              if (
                assets.shareDelta !== undefined &&
                assets.price !== undefined
              ) {
                assets.shareDelta = parseFloat(assets.shareDelta.toFixed(0));

                assets.contribution = parseFloat(
                  (assets.shareDelta * assets.price).toFixed(0)
                );
              }

              return assets;
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

  useEffect(() => {
    const chartData: [any, any][] = [['Symbol', 'Value']];

    assetResources.forEach((asset: AssetAllocationResource) => {
      chartData.push([asset.symbol, asset.value]);
    });

    setCurrentChartData(chartData);
  }, [assetResources]);

  useEffect(() => {
    const chartData: [any, any][] = [['Symbol', 'Value']];

    assetResources.forEach((asset: AssetAllocationResource) => {
      if (asset.value !== undefined && asset.contribution !== undefined) {
        chartData.push([asset.symbol, asset.value + asset.contribution]);
      } else {
        chartData.push([asset.symbol, undefined]);
      }
    });

    setTargetChartData(chartData);
  }, [assetResources]);

  const handleContributionChange = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    setContribution(parseFloat(event.target.value));
  };

  const handleRoundDeltasSwitch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRoundDeltas(event.target.checked);
  };

  const addRow = (): void => {
    const assets: AssetAllocationModel[] = assetModels.slice();

    assets.push(new AssetAllocationModel());
    setAssetModels(assets);
  };

  const handleModifyTable = (assets: AssetAllocationResource[]): void => {
    setAssetModels(assets);
  };

  const removeRow = (index: number): void => {
    const assets: AssetAllocationModel[] = assetModels.slice();

    assets.splice(index, 1);
    setAssetModels(assets);
  };

  return (
    <div>
      <h1>Asset Allocations</h1>
      <br />
      <TextField
        type="number"
        variant="outlined"
        label="Contribution Amount"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        onBlur={handleContributionChange}
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
      <div className="container">
        <div className="row">
          <div className="col">
            <Chart
              width={'500px'}
              height={'300px'}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={currentChartData}
              options={{ title: 'Current Asset Allocations' }}
            />
          </div>
          <div className="col">
            <Chart
              width={'500px'}
              height={'300px'}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={targetChartData}
              options={{ title: 'Target Asset Allocations' }}
            />
          </div>
        </div>
      </div>
      <AssetAllocationTable
        assetAllocations={assetResources}
        onAddRowClick={addRow}
        onChange={handleModifyTable}
        onRemoveRowClick={removeRow}
      />
    </div>
  );
}

export default AssetAllocation;
