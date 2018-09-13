<template>
    <div class="setting_content_inner">
        <h4 class="setting_title">Privacy Settings</h4>
        <SettingToggle :value.sync="noDiscover" invertSettingView="true" title="Allow my content to appear on Discovery"
                       desc="If you disable this, your posts will not appear in any discovery pages on Notify, such as Trending and the Discover page."/>
        <SettingToggle :value.sync="hideEmail" title="Hide Email"
                       desc="Hide your email and other personal data from view on the site, useful for streamers."/>
        <div class="setting_section_title">How we use your data</div>
        <SettingToggle :value.sync="noCollectData" title="Use data to improve Notify"
                       desc="We'll only collect a tiny amount of habitual data to help improve your experience using Notify. We'll also include you in early testing of new features."/>
    </div>
</template>
<script>
import SettingToggle from '@/components/modals/settings/SettingToggle'
import SettingAction from '@/components/modals/settings/SettingAction'

import Account from '@/core/account.core'

export default {
    components: {
        SettingToggle,
        SettingAction
    },
    data() {
        return {
            noDiscover: this.$store.getters.getSettings.NO_DISCOVERY || false,
            noCollectData: this.$store.getters.getSettings.NO_COLLECT_DATA || false,
            hideEmail: this.$store.getters.getSettings.HIDE_EMAIL || false
        }
    },
    methods: {},
    watch: {
        discover() {
            Account.updateSettings({ NO_DISCOVERY: this.noDiscover })
        },
        collectData() {
            Account.updateSettings({ NO_COLLECT_DATA: this.noCollectData })
        },
        hideEmail() {
            Account.updateSettings({ HIDE_EMAIL: this.hideEmail })
        }
    }
}
</script>
