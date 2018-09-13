<template>
    <div class="setting_section">
        <div v-if="icon" class="setting_icon">
            <i class="fas" :class="i"></i>
        </div>
        <div class="setting_information">
            <div class="setting_item_title">{{title}}</div>
            <div class="setting_desc">{{desc}}</div>
        </div>
        <div class="setting_toggle ">
            <input :checked="value" @input="$emit('update:value', $event.target.checked)" class="toggle"
                   type="checkbox"/>
            <!-- <input :value="value" @input="$emit('update:value', $event.target.value)"  />  -->


        </div>
    </div>
</template>


<script>
export default {
    props: ['title', 'desc', 'value', 'icon', 'invertSettingView'],
    data() {
        return {}
    },
    computed: {
        i() {
            return 'fa-' + this.icon
        }
    },
    watch: {
        invertSettingView() {
            if (this.invertSettingView) this.value = !this.value
        }
    }
}
</script>

<style>
</style>
