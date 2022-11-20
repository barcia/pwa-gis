import Project from './models/Project.js'
import DB from './db.js'

const projectList = document.querySelector('#projectList')
const newProjectBtn = document.querySelector('#newProjectBtn')
const createProjectDialog = document.querySelector('#createProjectDialog')
const createProjectForm = document.querySelector('#createProjectForm')

const db = new DB()


const submitCreateProjectForm = () => {
	const formData = new FormData(createProjectForm);

	const project = new Project({
		name: formData.get('name'),
		description: formData.get('description')
	})	

	project.save()

	getProjectsList()
}


const getProjectsList = () => {
	const projects = db.getProjects()

	if (projects) {
		projectList.innerHTML = '';

		projects.forEach(item => {
			const project = new Project(item)
	
			const html = document.createElement('li')
			html.innerHTML = `
			<a href="./project/?uuid=${project.uuid}"><h3>${project.name}</h3></a>
			<button>X</button>
			`

			const rmBtn = html.querySelector('button')
			rmBtn.addEventListener('click', () => {
				project.remove()
				getProjectsList()
			})
	
			projectList.appendChild(html)
		})
	}
	
}


newProjectBtn.addEventListener('click', () => createProjectDialog.showModal())

createProjectForm.addEventListener('submit', submitCreateProjectForm)

getProjectsList()

