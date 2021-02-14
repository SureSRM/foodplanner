import { writable, derived } from 'svelte/store'
import jsyaml from 'js-yaml'

export const dayNames = ['lun', 'mar', 'mie', 'jue', 'vie', 'sab', 'dom']
export const daySections = ['main', 'mini', 'main', 'mini', 'main']
export const shelfNames = ['recipe', 'veg', 'legumes', 'cereal', 'fruit', 'seednuts', 'dressing', 'process', 'misc']

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

		this.shelfs = {}
		shelfNames.forEach(shelfName => {
			this.shelfs[shelfName] = writable([])
		})

		this.files = writable([])
		this.files.subscribe(this.onFilesChange.bind(this))
	}

	get(key){
		return this.directory[key]
	}

	getKeys(){
		return Object.keys(this.directory)
	}

	onFilesChange(files){
		if (files.length == 0) {
			return
		}
		const reader = new FileReader()
		reader.onload = r => {
			this.loadFoodItems(jsyaml.load(r.target.result))
		}
		reader.readAsText(files[0])
	}

	loadFoodItems(object){
		Object.entries(object.food).forEach(([pantryName, foodItems]) => {
			Object.entries(foodItems).forEach(([foodKey, foodValues]) => {
				const newFoodItem = new FoodItem(
					foodKey, foodKey, pantryName, foodValues
				)
				this.directory[foodKey] = newFoodItem
				this.shelfs[pantryName].update((s) => {s.push(foodKey); return s})
			})
		})
		Object.entries(object.recipe).forEach(([recipeKey, recipeFoodList]) => {
			const newFoodItem = new FoodItem(recipeKey, recipeKey, 'recipe')
			recipeFoodList.forEach(foodKey => {
				newFoodItem.addSubitem(this.directory[foodKey])
			})
			this.directory[recipeKey] = newFoodItem
			this.shelfs.recipe.update((s) => {s.push(recipeKey); return s})
		})
	}
}

export const showSubItems = writable(false)

export const foodDirectory = new FoodDirectory()
export const filesStore = foodDirectory.files
export const pantryStore = foodDirectory.shelfs

// foodDirectory.add(new FoodItem('A', 'Pan', 'cereal', { protein: 8}))
// foodDirectory.add(new FoodItem('B', 'Seitan', 'cereal', {protein: 20}))
// let bocadilloSeitan = new FoodItem('C', 'Bocadillo de Seitan', 'combo')
// bocadilloSeitan.addSubitem(foodDirectory.get('A'))
// bocadilloSeitan.addSubitem(foodDirectory.get('B'))
// foodDirectory.add(bocadilloSeitan)
// console.log(foodDirectory.getKeys())

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


// const initPantry = () =>
// 	shelfNames.reduce( (o, dayName) =>
// 		({...o, [dayName]: writable([])}), {})
//
// export const pantryStore = initPantry()
// pantryStore['veg'].set(foodDirectory.getKeys())
