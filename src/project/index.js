import Point from "../models/Point";
import Project from "../models/Project";

const title = document.querySelector('#title')
const pointsTable = document.querySelector('#pointsTable')
const createPointDialog = document.querySelector('#createPointDialog')
const createPointForm = document.querySelector('#createPointForm')
const latitude = document.querySelector('#latitude')
const longitude = document.querySelector('#longitude')
const altitude = document.querySelector('#altitude')
const accuracy = document.querySelector('#accuracy')
const newPointBtn = document.querySelector('#newPointBtn')

const url = new URL(window.location)
const projectUuid = url.searchParams.get('uuid')

const projects = JSON.parse(localStorage.getItem('projects'))

const myProjectJson = projects.find(project => project.uuid === projectUuid)



if (myProjectJson) {
	const myProject = new Project(myProjectJson)
	title.innerText = myProjectJson.name
	document.title = myProjectJson.name

	const updateScreen = () => {
		pointsTable.innerHTML = ''
		myProject.points.forEach(point => {
			const myPoint = new Point(point)
	
			const html_element = document.createElement('tr')

			html_element.innerHTML = `
				<td>${myPoint.fields.name}</td>
				<td>${myPoint.geolocation.latitude}</td>
				<td>${myPoint.geolocation.longitude}</td>
				<td>${myPoint.geolocation.altitude}</td>
				<td>${myPoint.geolocation.accuracy}</td>
				<td><button>X</button></td>
			`
			const rmBtn = html_element.querySelector('button')

			rmBtn.addEventListener('click', () => {
				myProject.removePointByUuid(myPoint.uuid)
				updateScreen()
			})

			pointsTable.appendChild(html_element)
	
		})
	}

	const error = (err) => {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	}
	
	const options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	  };
	
	
	if ('geolocation' in navigator) {
		const watchID = navigator.geolocation.watchPosition((position) => {
			// console.log(position.coords);
			latitude.value = position.coords.latitude ? position.coords.latitude : 0
			longitude.value = position.coords.longitude ? position.coords.longitude : 0
			altitude.value = position.coords.altitude ? position.coords.altitude : 0
			accuracy.value = position.coords.accuracy ? position.coords.accuracy : 0
		  }, error, options);
	
	  } else {
		box.innerText = "no lo hay"
	
	  }

	  updateScreen()
	
	
	newPointBtn.addEventListener('click', () => createPointDialog.showModal())
	
	createPointForm.addEventListener('submit', () => {
		const formData = new FormData(createPointForm);
	
		const point = new Point({
			fields: {
				name: formData.get('name'),
			},
			geolocation: {
				latitude: formData.get('latitude'),
				longitude: formData.get('longitude'),
				altitude: formData.get('altitude'),
				accuracy: formData.get('accuracy'),
			}
		})

		myProject.addPoint(point)
		updateScreen()
	})
	


} else {
	document.body.innerText = 'Project not found'
}

