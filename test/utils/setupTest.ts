import {cleanup} from '@testing-library/react-native';

// Cleanup after each case.
afterEach(cleanup);

process.on('unhandledRejection', (err) => {
  throw new Error(err);
});
