/* eslint-disable node/no-unpublished-import */
/* eslint-disable import/no-extraneous-dependencies */
import 'jest-canvas-mock';

Object.defineProperty(window, 'electron', {
  requestVersion: jest.fn(),
  receiveLogout: jest.fn()
});
