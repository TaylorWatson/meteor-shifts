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
}

try {
	window.Delivery = Delivery;
} catch (e) {}