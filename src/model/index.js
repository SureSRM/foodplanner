import { writable, derived } from 'svelte/store'
import jsyaml from 'js-yaml'

export const dayNames = ['lun', 'mar', 'mie', 'jue', 'vie', 'sab', 'dom']
export const daySections = ['main', 'mini', 'main', 'mini', 'main']
export const shelfNames = ['recipe', 'veg', 'legumes', 'cereal', 'fruit', 'seednuts', 'dressing', 'process', 'misc']

function usePersistence(key, defaultValue){
	const value = JSON.parse(localStorage.getItem(key)) || defaultValue
	const update = (s) => localStorage.setItem(key, JSON.stringify(s))
	return [value, update]
}

function persistentWritable(key, defaultValue){
	// console.log('Writable', key, localStorage.getItem(key))
	const [value, update] = usePersistence(key, defaultValue)
	const store = writable(value)
	store.subscribe(update)
	return store
}

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
		const [dir, update] = usePersistence('directory', {})
		this.directory = dir
		this.persistDirectory = () => update(this.directory)
		this.shelfs = {}
		shelfNames.forEach(shelfName => {
			this.shelfs[shelfName] = persistentWritable('shelf-'+shelfName, [])
		})

		this.files = writable([])
		this.files.subscribe(this.onFilesChange.bind(this))
	}

	get(key){
		const item = this.directory[key]
		if (!item) {
			console.warn('Item not found in directory', key);
		}
		return item
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
			const pantryList = []
			Object.entries(foodItems).forEach(([foodKey, foodValues]) => {
				const newFoodItem = new FoodItem(
					foodKey, foodKey, pantryName, foodValues
				)
				this.directory[foodKey] = newFoodItem
				pantryList.push(foodKey)
			})
			this.shelfs[pantryName].update((s) => s.concat(pantryList))
		})
		const recipeList = []
		Object.entries(object.recipe).forEach(([recipeKey, recipeFoodList]) => {
			const newFoodItem = new FoodItem(recipeKey, recipeKey, 'recipe')
			recipeFoodList.forEach(foodKey => {
				newFoodItem.addSubitem(this.get(foodKey))
			})
			this.directory[recipeKey] = newFoodItem
			recipeList.push(recipeKey)
		})
		this.shelfs.recipe.update((s) => s.concat(recipeList))
		this.persistDirectory()
	}

	clear(){
		Object.values(this.shelfs).forEach(shelfStore => {
			shelfStore.set([])
		})
		this.directory = {}
		this.persistDirectory()
	}
}

export const showSubItems = persistentWritable('showSubItems',true)

export const foodDirectory = new FoodDirectory()
export const filesStore = foodDirectory.files
export const pantryStore = foodDirectory.shelfs

// foodDirectory.loadFoodItems({
// 	food: {
// 		'veg': {
// 			testA: {protein: 8},
// 			testB: {protein: 5},
// 		},
// 	},
// 	recipe: {
// 		testC: ['testA', 'testB'],
// 	},
// })

class Calendar {
	constructor() {
		this.calendarStore = {}
		this.nutrivaluesStore = {}

		dayNames.forEach(dayName => {
			this.calendarStore[dayName] = []
			daySections.forEach( (_, index) => {
					this.calendarStore[dayName][index] = persistentWritable(dayName+index, [])
			})

			this.nutrivaluesStore[dayName] = derived(
				this.calendarStore[dayName],
				this.computeNutrivalues.bind(this)
			)
		})
	}

	computeNutrivalues(sections) {
		const itemKeys = sections.flat(2)
		let items = itemKeys.map(k => foodDirectory.get(k))
		return {
			'protein': items.reduce((o, i) => o+i.nutrivalues.protein, 0)
		}
	}

	clear(){
		Object.values(this.calendarStore).forEach( day => {
			const stores = day.flat(1)
			stores.forEach(store => {
				store.set([])
			})
		})
	}
}

export const calendar = new Calendar()
export const calendarStore = calendar.calendarStore
export const nutrivaluesStore = calendar.nutrivaluesStore

nutrivaluesStore['lun'].subscribe((e) => console.log('Nutrifacts Lun', e))
