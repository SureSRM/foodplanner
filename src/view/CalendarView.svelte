<script>
	import Day from './Day.svelte'
	import { FoodItem } from '../model'

	const dayNames = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']

	export let store = dayNames.reduce( (o, dayName) => ({...o, [dayName]: []}), {})

	store['Lun'][1]=[new FoodItem('A')]
</script>

<div class="section calendar" >
		<h1 class="section_header">Calendar</h1>
		<div id="calendar_row" class="collection_row">
			{#each dayNames as dayName}
				<Day store={store[dayName]} {dayName}></Day>
			{/each}
		</div>
</div>
