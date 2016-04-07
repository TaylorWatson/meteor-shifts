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
		this.paymentType = delivery.paymentType || 0;
		this.isOut = delivery.isOut || false;
		this.errors = [];

    if (delivery.id) {
      this.id = delivery.id;
      this._isNew = false;
    } else {
      this._isNew = true;
    }
	}

  save(callback) {
    this.validate((err) => {
      if (err) {
        callback(err);
      } else {
        if (this._isNew) {
          Delivery.addDelivery(this, callback);
        } else {
          Delivery.update(this, callback);
        }
      }
    });
  }

	validate(callback) {

		this.errors.length = 0;

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

  static checkDeliveryNumber(delivery, callback) {
    DatabaseService.db.transaction(tx => {
      let sql = 'SELECT * FROM deliveries WHERE shiftId=? AND deliveryNumber=?';
      let options = [
        delivery.shiftId.toString(),
        delivery.deliveryNumber
      ];

      if (!delivery._isNew) {
        sql += ' AND id<>?';
        options.push(delivery.id);
      }

      tx.execute(sql, options, (tx, result) => {
        if (results.rows.length) {
          callback("Delivery already exists.");
        } else {
          callback();
        }
      }, ErrorHandler);
    }, ErrorHandler);
  }

	static addDelivery(delivery, callback) {
    Delivery.checkDeliveryNumber(delivery, err => {
      if (err) {
        callback("Delivery number already exists in shift.");
      } else {

        DatabaseService.db.transaction(tx => {

          let sql = 'INSERT INTO deliveries ' +
          '(shiftId, deliveryNumber, tipAmount, paymentType) ' +
          'VALUES (?,?,?,?);';

          let options = [
            delivery.shiftId,
            delivery.deliveryNumber,
            delivery.tipAmount || 0,
            delivery.paymentType
          ];

          tx.executeSql(sql, options, (tx, result) => {
            callback(null, result);
          }, ErrorHandler);

        }, ErrorHandler);

      }
    });
  }

  static insert(delivery, callback) {

    DatabaseService.db.transaction(tx => {
      let sql = 'INSERT INTO deliveries' +
      '(shiftId, deliveryNumber, tipAmount, paymentType)' +
      'VALUES (?,?,?,?,?);';

      let options = [
        delivery.shiftId,
        delivery.deliveryNumber,
        delivery.tipAmount,
        delivery.paymentType];

      tx.executeSql(sql, options, (tx, result) => {

        callback && callback(result);
        //if (callback != null) .... callback(result);
      }, ErrorHandler);
    }, ErrorHandler);
  }

  static update(delivery, callback) {

    Delivery.checkDeliveryNumber(delivery, err => {
      if (err) callback(err);
      else {

        DatabaseService.db.transaction(tx => {
          let sql ="UPDATE deliveries SET " +
          'deliveryNumber=?, tipAmount=?, paymentType=? ' +
          'WHERE id=?;';

          let options = [
            delivery.deliveryNumber,
            delivery.tipAmount,
            delivery.paymentType,
            delivery.id];

            tx.executeSql(sql, options, (tx, result) => {

              callback(null, result);
            }, ErrorHandler);
        }, ErrorHandler);

      }
    });
  }

  static delete(number, callback) {
    DatabaseService.db.transaction(tx => {
      let sql = 'DELETE FROM deliveries WHERE id=?;';

      tx.executeSql(sql, [id], (tx, result) => {

        callback(null,result);
      }, ErrorHandler);
    }, ErrorHandler);
  }

  static deliveryList(shiftId, callback) {
    if (!shiftId) throw new Error("Shift ID is required to obtain a list of deliveries.");
    DatabaseService.db.transaction(tx => {
      let sql = 'SELECT * FROM deliveries WHERE shiftId=?;';
      tx.executeSql(sql, [shiftId], (tx, result) => {

        let deliveries = _.map(result.rows, d => new Delivery(d));
        callback(null, deliveries);

  		}, ErrorHandler);
  	}, ErrorHandler);
  }


}

try {
	window.Delivery = Delivery;
} catch (e) {}