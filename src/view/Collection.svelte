<script>
	export let type;
	export let title;
</script>

<div class="collection {type} {title}">
	<h2 class="collection_header">{title}</h2>
	<slot></slot>
</div>
