<script>
import CalendarView from './view/CalendarView.svelte'
	import PantryView from './view/PantryView.svelte'
	import ManagementView from './view/ManagementView.svelte'

	let pantry = ['a', 'b']
	let calendar
</script>

<main>
	<CalendarView></CalendarView>
	<PantryView {pantry}></PantryView>
	<ManagementView></ManagementView>
</main>
