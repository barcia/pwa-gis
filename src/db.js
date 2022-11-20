export default class Db {
	getProjects() {
		return this.#get_data()
	}

	getProjectByUuid(uuid) {
		const projects = this.#get_data()
		const project = projects.filter(project => project.uuid === uuid)
		return project.length > 0 ? project : null
	}

	removeProjectByUuid(uuid) {
		const projects = this.#get_data()
		const rest = projects.filter(project => project.uuid != uuid)
		this.#save_data(rest)
	}

	saveProject(project) {
		const projects = this.#get_data()
		const uuids = projects.map(project => project.uuid)

		const index = uuids.indexOf(project.uuid)

		if (index >= 0) {
			projects[index] = project
		} else {
			projects.push(project)
		}

		this.#save_data(projects)
	}

	#save_data(projects) {
		localStorage.setItem('projects', JSON.stringify(projects))
	}

	#get_data() {
		return JSON.parse(localStorage.getItem('projects')) || []
	}
}