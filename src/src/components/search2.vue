<template>
    <div class="search">
        <div class="searchbox">
            <span class="rightbutton"></span>
            <input id="search"
                   :value="query"
                   @input="$emit('input', $event.target.value)"
                   @keyup="$emit('search-bar')"
                   @focus="focus = true"
                   @blur="$emit('focus-up')"
                   placeholder="Search.."
            >
            <i
                    class="fas fa-times"
                    @click="$emit('clear-query')"
                    v-if="query.length > 0"
            ></i>
        </div>
    </div>
</template>


<script>
export default {
	props: ['query']
}
</script>

<style>
.fa-times {
	cursor: pointer;
}
</style>
