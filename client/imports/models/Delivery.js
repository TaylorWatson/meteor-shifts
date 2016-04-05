import _ from 'lodash';
import moment from 'moment';
import ErrorHandler from '../services/ErrorHandler';
import { DatabaseService } from '../services/DatabaseService';

export default class Delivery {

	constructor(delivery) {
		if (!delivery.shiftId) throw new Error("Shift ID is required for a delivery.");
		this.shiftId = delivery.shiftId;
		this.deliveryNumber = delivery.deliveryNumber || '';
		this.tipAmount = delivery.tipAmount;
		this.paymentOption = delivery.paymentOption || 1;
		this.isOut = delivery.isOut || false;
		this.deliveryAmount = delivery.deliveryAmount || 0;
		this.errors = [];
	}

	validate(callback) {

		this.errors.length = 0;

		if (!tipAmount) {
			this.errors.push({ tipAmount: "Tip amount is required." });
		}
		if (!deliveryAmount && deliveryAmount !== 0) {
			this.errors.push({ deliveryAmount: "Delivery amount is required." });
		}
		if (!this.deliveryNumber) {
			this.errors.push({ deliveryNumber: "Delivery number is required." });
		}

		callback && callback(this.errors.length ? this.errors : null);
		if (this.errors.length) {
			return this.errors;
		} else {
			return;
		}
	}

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
  	console.log('delivery List starting')
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

try {
	window.Delivery = Delivery;
} catch (e) {}