import { ErrorValidationMessagesPipe } from '@shared';

describe('ErrorValidationMessagesPipe', () => {
  it('create an instance', () => {
    const pipe = new ErrorValidationMessagesPipe();
    expect(pipe).toBeTruthy();
  });
});
