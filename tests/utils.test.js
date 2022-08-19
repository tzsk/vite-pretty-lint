import enquirer from 'enquirer';
import { describe, expect, test, vi } from 'vitest';
import { askForProjectType, getOptions } from '../lib/utils';

describe('Utils', () => {
  test('It can get a list of templates', () => {
    expect(getOptions()).toHaveLength(4);
  });

  test('it has list of project types to ask for', async () => {
    vi.spyOn(enquirer, 'prompt').mockImplementation((value) =>
      Promise.resolve(value)
    );
    const result = await askForProjectType();
    expect(result).toMatchSnapshot();
  });
});
