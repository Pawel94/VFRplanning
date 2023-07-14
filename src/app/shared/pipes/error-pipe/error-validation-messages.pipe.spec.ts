import { ErrorValidationMessagesPipe } from './error-validation-messages.pipe';

describe('ErrorValidationMessagesPipe', () => {
  it('create an instance', () => {
    const pipe = new ErrorValidationMessagesPipe();
    expect(pipe).toBeTruthy();
  });
});
