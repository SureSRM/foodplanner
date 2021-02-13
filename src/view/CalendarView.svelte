<script>
	import Day from './Day.svelte'
	import { dayNames, calendarStore as store } from '../model'
</script>

<div class="section calendar" >
		<h1 class="section_header">Calendar</h1>
		<div id="calendar_row" class="collection_row">
			{#each dayNames as dayName}
				<Day store={store[dayName]} {dayName}></Day>
			{/each}
		</div>
</div>
