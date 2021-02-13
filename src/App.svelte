<script context="module">
	import { Sortable, MultiDrag } from 'sortablejs';
	Sortable.mount(new MultiDrag());
</script>
<script>
	import CalendarView from './view/CalendarView.svelte'
	import PantryView from './view/PantryView.svelte'
	import ManagementView from './view/ManagementView.svelte'

</script>

<main>
	<CalendarView />
	<PantryView />
	<ManagementView />
</main>
