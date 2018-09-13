import * as store from '@/core/store'
import * as methods from '@/utils/methods'
import * as api from '@/core/api'
import {
    debounce
} from 'lodash'

export const init = async query => {
    // If there's nothing in the search bar, exit
    if (query.length === 0) return

    // get all the channels from state storage
    let subscriptions = store.getter('getSubscriptions')
    let suggested = store.getter('getSuggested')

    // search them first
    let merged = subscriptions.concat(suggested)
    let lilQuery = query.toLowerCase()
    let searchResults = merged.filter(m => (m.username + m.displayName).toLowerCase().includes(lilQuery))

    // commit local results
    store.commit('searchResults', searchResults)

    // if results less than x trigger server search
    if (searchResults.length < 8) {
        store.commit('searchWaiting', true)
        getResults(query)
    }
}

export const getResults = debounce(async query => {
    try {
        const results = await api.search(query)
        console.log(results.data.channels)
        store.commit('addChannelsToLoaded', results.data.channels)
        store.commit('mergeResultsWithLocal', results.data.channels)
        store.commit('searchWaiting', false)

        if (results.data.length === 0) store.commit('searchResults', false)

        return results
    } catch (e) {
        store.commit('searchWaiting', false)
        return new Error('Search Failed')
    }
}, 1000)