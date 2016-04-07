import ReportService from '../client/imports/services/ReportService';
import { expect } from 'chai';
import moment from 'moment';

describe("Report Service", () => {
  it('should throw an error trying to generate a report without start date', () => {
    expect(() => { ReportService.generateReport(null, moment()); })
      .to.throw();
  });

  it('should throw an error trying to generate a report without end date', () => {
    expect(() => { ReportService.generateReport(moment(), null); })
      .to.throw();
  });
});