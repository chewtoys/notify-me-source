<template>
    <div class="form-group">
        <label class="control-label">{{label}}:</label>
        <div class="form-outer">
            <input :value="value" @input="$emit('update:value', $event.target.value)" class="form-control" type="text">
            <small v-if="small" class="small_text">{{small}}</small>
        </div>
    </div>
</template>

<script>
export default {
	props: ['label', 'value', 'small']
}
</script>
