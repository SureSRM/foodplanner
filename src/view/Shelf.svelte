<script>
	import Collection from './Collection.svelte'
	import Section from './Section.svelte'

	export let foodFamily
	export let store
</script>

<Collection type='pantry' title={foodFamily}>
	<Section {store} isSortable={false} />
</Collection>
