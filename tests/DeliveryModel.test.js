import Delivery from '../client/imports/models/Delivery';
import { expect } from 'chai';

describe("Delivery model tests", () => {
  it('Should have a _isNew set to true property when it is new', () => {
    let d = new Delivery({ shiftId: 1 });
    expect(d._isNew).to.be.true;
  });

  it('Should have a _isNew property when it is not new', () => {
    let d = new Delivery({ shiftId: 1, id: 1 });
    expect(d._isNew).not.to.be.true;
  });

  it('Should throw if instantiated without shiftId', () => {
    expect(() => { new Delivery({ id: 5 }); })
      .to.throw();
  });

  it("shouldn't validate without a delivery number", () => {
    let d = new Delivery({ shiftId: 1 });
    d.validate((er) => {
      expect(er).to.have.length(1);
    });
  });
});