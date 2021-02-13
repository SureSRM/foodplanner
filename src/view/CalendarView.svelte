<script>
	import Day from './Day.svelte'

	const days = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']

	export let store = days.map(() => Array(5).fill([]))

</script>

<div class="section calendar" >
		<h1 class="section_header">Calendar</h1>
		<div id="calendar_row" class="collection_row">
			<Day store={store[0]} dayName='Lun'></Day>
			<Day store={store[1]} dayName='Mar'></Day>
			<Day store={store[2]} dayName='Mie'></Day>
			<Day store={store[3]} dayName='Jue'></Day>
			<Day store={store[4]} dayName='Vie'></Day>
			<Day store={store[5]} dayName='Sab'></Day>
			<Day store={store[6]} dayName='Dom'></Day>
		</div>
</div>
