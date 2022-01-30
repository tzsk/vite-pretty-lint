import { describe, expect, test } from 'vitest';
import { getOptions } from '../lib/utils';

describe('Utils', () => {
  test('It can get a list of templates', () => {
    expect(getOptions()).toHaveLength(4);
  });
});
