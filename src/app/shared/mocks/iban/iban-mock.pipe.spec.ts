import { IbanMockPipe } from './iban-mock.pipe';

describe('IbanMockPipe', () => {
  it('create an instance', () => {
    const pipe = new IbanMockPipe();
    expect(pipe).toBeTruthy();
  });
});
