import '@testing-library/jest-dom';
import { expect } from 'vitest';
import {
  toBeOk,
  toHaveHeader,
  toHaveStatus,
  toRedirect,
  toSetACookie,
} from './test-utils';
import dotenv from 'dotenv';

dotenv.config();

expect.extend({
  toBeOk,
  toRedirect,
  toHaveStatus,
  toHaveHeader,
  toSetACookie,
});
