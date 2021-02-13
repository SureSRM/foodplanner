import { writable } from 'svelte/store';

export class FoodItem {
	constructor(key, name) {
		this.key = key
		this.name = name || key
	}
}

export const dayNames = ['lun', 'mar', 'mie', 'jue', 'vie', 'sab', 'dom']
export const daySections = ['main', 'mini', 'main', 'mini', 'main']

const initDay = () =>
	daySections.map( () => writable([]))

const initCalendar = () =>
	dayNames.reduce( (o, dayName) =>
		({...o, [dayName]: initDay()}), {})

export const calendarStore =initCalendar()

calendarStore['lun'][0].set([new FoodItem('A')])
calendarStore['lun'][0].subscribe(console.log)


export const shelfNames = ['veg', 'legumes', 'cereal', 'fruit', 'seednuts', 'dressing', 'process', 'misc']
const initPantry = () =>
	shelfNames.reduce( (o, dayName) =>
		({...o, [dayName]: writable([])}), {})

export const pantryStore = initPantry()
pantryStore['veg'].set([new FoodItem('B')])
