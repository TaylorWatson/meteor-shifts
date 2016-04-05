import Shift from '../client/imports/models/Shift';
import { expect } from 'chai';


describe("Shift Model", () => {
  it('should exist...', () => {
    expect( Shift ).not.to.be.undefined();
  });

  it("it shouldn't not exist...", () => {
    expect( Shift ).to.be.defined();
  })
});