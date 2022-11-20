
const fieldTypes = ['text', 'longtext', 'number', 'boolean', 'select', 'multi_select', 'datetime', 'media']

export default class Field {
	constructor(name, type, required = false) {
		this.name = name
		this.type = type
		this.required = required

		if (! fieldTypes.includes(type)) {
			console.log("Invalid filed type");
		}
	}
}