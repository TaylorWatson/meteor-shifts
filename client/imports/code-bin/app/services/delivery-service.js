import { DatabaseService } from './database-service';
import { ErrorHandler } from './error-handler';
//import delivery when done.
import _ from 'lodash';

class DeliveryService {
  constructor() {}


  addDelivery(delivery, callback) {
    DatabaseService.db.transaction(tx => {


      let sql = 'SELECT * FROM deliveries WHERE shiftId=? AND deliveryNumber=?';
      let options = [
        delivery.shiftId.toString(),
        delivery.deliveryNumber
      ];


      tx.executeSql(sql, options, (tx, result) => {


        if (result.rows.length) {
          callback("Duplicate delivery number in this shift.");
          console.log(result);
          return;
        }
        console.log('inserting into deliveries');
        let sql = 'INSERT INTO deliveries ' +
        '(shiftId, deliveryNumber, tipAmount, paymentType, deliveryAmount) ' +
        'VALUES (?,?,?,?,?);';

        let options = [
          delivery.shiftId,
          delivery.deliveryNumber,
          delivery.tipAmount,
          delivery.paymentType,
          delivery.deliveryAmount
        ];

        tx.executeSql(sql, options, (tx, result) => {
          callback(null, result);
        }, ErrorHandler);

      }, ErrorHandler);

    }, ErrorHandler, () => { console.log('SUCCESS ADDED DELIVERY W00T'); });
  }

  insert(delivery, callback) {

    DatabaseService.db.transaction(tx => {
      let sql = 'INSERT INTO deliveries' +
      '(shiftId, deliveryNumber, tipAmount, paymentType, deliveryAmount)' +
      'VALUES (?,?,?,?,?);';

      let options = [
        delivery.shiftId,
        delivery.deliveryNumber,
        delivery.tipAmount,
        delivery.paymentType,
        delivery.deliveryAmount];

      tx.executeSql(sql, options, (tx, result) => {

        callback && callback(result);
        //if (callback != null) .... callback(result);
      }, ErrorHandler);
    }, ErrorHandler);
  }

  update(delivery, callback) {

    DatabaseService.db.transaction(tx => {
      let sql ="UPDATE deliveries SET" +
      'deliveryNumber=?, tipAmount=?, paymentType=?, deliveryAmount=?' +
      'WHERE id=?;';

      let options = [
        delivery.deliveryNumber,
        delivery.tipAmount,
        delivery.paymentType,
        delivery.deliveryAmount,
        delivery.id];

        tx.executeSql(sql, options, (tx, result) => {

          callback(null, result);
        }, ErrorHandler);
    }, ErrorHandler);
  }

  delete(number, callback) {
    DatabaseService.db.transaction(tx => {
      let sql = 'DELETE FROM deliveries WHERE id=?;';

      tx.executeSql(sql, [id], (tx, result) => {

        callback(null,result);
      }, ErrorHandler);
    }, ErrorHandler);
  }

  deliveryList(shiftId, callback) {
    DatabaseService.db.transaction(tx => {
      let sql = 'SELECT * FROM deliveries WHERE shiftId=?;';
      tx.executeSql(sql, [shiftId], (tx, result) => {

        let deliveries = _.map(result.rows, d => new Delivery(d));
        console.log(deliveries);
    callback(null, deliveries);
  		}, ErrorHandler);
  	}, ErrorHandler);
  }

}

DeliveryService = new DeliveryService();

window.DeliveryService = DeliveryService;

export { DeliveryService };


