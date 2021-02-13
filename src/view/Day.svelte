<script>
	import Collection from './Collection.svelte'
	import Section from './Section.svelte'
	import Item from './Item.svelte'

	export let dayName
	export let store = Array(5).fill([])
</script>

<Collection type='day' title={dayName}>
	<Section store={store[0]}></Section>
	<Section store={store[1]} type='mini'></Section>
	<Section store={store[2]}></Section>
	<Section store={store[3]} type='mini'></Section>
	<Section store={store[4]}></Section>
</Collection>
