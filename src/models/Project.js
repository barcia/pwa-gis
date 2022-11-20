import { v4 as uuid } from 'uuid';
import Db from '../db.js';
import Field from './Field.js';

const db = new Db()

export default class Project {
	constructor(project) {
		this.uuid = project.uuid ? project.uuid : uuid()
		this.created_date = project.created_date ? project.created_date :new Date().toISOString()
		this.name = project.name
		this.description = project.description
		this.points = project.points ? project.points : []
		this.points_schema = project.points_schema ? project.points_schema : []
	}

	getJson() {
		return {
			uuid: this.uuid,
			created_date: this.created_date,
			name: this.name,
			description: this.description,
			points: this.points
		}
	}

	addPoint(point) {
		this.points.push(point)
		this.save()
	}

	removePointByUuid(uuid) {
		this.points = this.points.filter(point => uuid != point.uuid)
		this.save()
	}

	save() {
		db.saveProject(this)
	}

	remove() {
		db.removeProjectByUuid(this.uuid)
	}

}