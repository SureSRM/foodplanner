<script>
	import Day from './Day.svelte'

	const days = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']

	export let store = days.map(() => Array(5).fill([]))
	store[0][1]=['A']
</script>

<div class="section calendar" >
		<h1 class="section_header">Calendar</h1>
		<div id="calendar_row" class="collection_row">
			{#each days as day, i}
				<Day store={store[i]} dayName={day}></Day>
			{/each}
		</div>
</div>
