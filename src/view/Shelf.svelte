<script>
	import Collection from './Collection.svelte'
	import Section from './Section.svelte'

	export let foodFamily
</script>

<Collection type='pantry' title={foodFamily}>
	<Section></Section>
</Collection>
