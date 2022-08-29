import '@testing-library/jest-dom';
import { expect } from 'vitest';
import {
  toBeOk,
  toHaveHeader,
  toHaveStatus,
  toRedirect,
  toSetACookie,
} from './test-utils';

expect.extend({
  toBeOk,
  toRedirect,
  toHaveStatus,
  toHaveHeader,
  toSetACookie,
});
