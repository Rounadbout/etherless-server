import { BigNumber } from 'ethers/utils';
import EthSmartManager from '../../src/smart/EthSmartManager';
import RunEventData from '../../src/event/RunEventData';
import DeployEventData from '../../src/event/DeployEventData';

const ethers = require('ethers');

jest.mock('ethers');

const contract = new ethers.Contract();
const smartManager = new EthSmartManager(contract);

test('sendRunResult blockchain exception is captured and managed correctly', () => {
  contract.runResult.mockImplementationOnce(() => { throw new Error('Blockchain Error'); });
  smartManager.sendRunResult('ok response with blockchain exception', new BigNumber(1), true);
  expect(smartManager.sendRunResult).not.toThrow();
});

test('adds run callback', () => {
  const result = smartManager.onRun(() => {});
  expect(result).toBe(true);
});

test('dispatches run event', () => {
  expect.assertions(0);
  try {
    smartManager.dispatchRunEvent(new RunEventData('', [], new BigNumber(1)));
  } catch (err) {
    expect(err).toBeInstanceOf(Error);
  }
});

test('sendDeployResult blockchain exception is captured and managed correctly', () => {
  contract.runResult.mockImplementationOnce(() => { throw new Error('Blockchain Error'); });
  smartManager.sendDeployResult('ok response with blockchain exception', 'someName', new BigNumber(1), true);
  expect(smartManager.sendDeployResult).not.toThrow();
});

test('adds deploy callback', () => {
  const result = smartManager.onDeploy(() => {});
  expect(result).toBe(true);
});

test('dispatches deploy event', () => {
  expect.assertions(0);
  try {
    smartManager.dispatchDeployEvent(new DeployEventData('', 2, '', new BigNumber(1)));
  } catch (err) {
    expect(err).toBeInstanceOf(Error);
  }
});
