import { writable, derived } from 'svelte/store';

export class FoodItem {
	constructor(key, name, type, nutrivalues) {
		this.key = key
		this.name = name || key
		this.type = type
		this.nutrivalues = nutrivalues || {
			protein: 0
		}
		this.subitems = []
	}

	addSubitem(item){
		this.subitems = [...this.subitems, item]
		this.nutrivalues = aggNutrivalues(this.nutrivalues, item.nutrivalues)
	}
}

const aggNutrivalues = (a, b) =>
	Object.fromEntries(Object.entries(a).map( ([k,v]) => [k, v+b[k]]))

export class FoodDirectory {
	constructor() {
		this.directory = {}
	}

	add(item){
		this.directory[item.key] = item
	}

	get(key){
		return this.directory[key]
	}

	getKeys(){
		return Object.keys(this.directory)
	}
}

export const showSubItems = writable(false)

export const foodDirectory = new FoodDirectory()
foodDirectory.add(new FoodItem('A', 'Pan', 'cereal', { protein: 8}))
foodDirectory.add(new FoodItem('B', 'Seitan', 'cereal', {protein: 20}))
let bocadilloSeitan = new FoodItem('C', 'Bocadillo de Seitan', 'combo')
bocadilloSeitan.addSubitem(foodDirectory.get('A'))
bocadilloSeitan.addSubitem(foodDirectory.get('B'))
foodDirectory.add(bocadilloSeitan)
console.log(foodDirectory.getKeys())

export const dayNames = ['lun', 'mar', 'mie', 'jue', 'vie', 'sab', 'dom']
export const daySections = ['main', 'mini', 'main', 'mini', 'main']

const initDay = () =>
	daySections.map( () => writable([]))

const initCalendar = () =>
	dayNames.reduce( (o, dayName) =>
		({...o, [dayName]: initDay()}), {})

export const calendarStore = initCalendar()


function computeValues(sections) {
	const itemKeys = sections.flat(2)
	let items = itemKeys.map(k => foodDirectory.get(k))
	return {
		'protein': items.reduce((o, i) => o+i.nutrivalues.protein, 0)
	}
}

export const test = derived (
	calendarStore['lun'],
	computeValues
)
test.subscribe((e) => console.log('Test', e))


export const shelfNames = ['veg', 'legumes', 'cereal', 'fruit', 'seednuts', 'dressing', 'process', 'misc']
const initPantry = () =>
	shelfNames.reduce( (o, dayName) =>
		({...o, [dayName]: writable([])}), {})

export const pantryStore = initPantry()
pantryStore['veg'].set(foodDirectory.getKeys())
