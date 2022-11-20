import { v4 as uuid } from 'uuid';
import Field from './Field.js';

export default class Point {
	constructor(point) {
		this.uuid = point.uuid ? point.uuid :uuid()
		this.created_date = point.created_date ? point.created_date : new Date().toISOString()
		this.geolocation = point.geolocation
		this.fields = point.fields
	}
}