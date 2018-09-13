import * as methods from '@/utils/methods'

import * as api from '@/core/api'

export default {
    state: {
        subscriptionManagerOpened: false,

        lists: [],
        listPositions: [],
        hiddenLists: [],

        // stores the local index arrays for ALL loaded columns, public columns will be sent to the API from column.store
        columns: {
            // example
            // 23325: [234, 3423, 34, 35]
        },

        defaultColumns: [{
                id: 1,
                type: 'GETTING_NOTIFIED',
                title: 'Getting Notified',
                description: 'These are the channels that will be sending you notifications.'
            },
            {
                id: 2,
                type: 'FAVORITES',
                title: 'Favorites',
                description: `Favorites show up in more places than the rest, just so you don't miss them.`
            },
            {
                id: 3,
                type: 'MUTED',
                title: 'Muted',
                description: `Favorites show up in more places than the rest, just so you don't miss them.`
            },
            {
                id: 4,
                type: 'PREVIOUSLY_SUBSCRIBED',
                title: 'Previously Subscribed',
                description: `Favorites show up in more places than the rest, just so you don't miss them.`
            }
        ]
    },
    mutations: {
        populateLists: (state, lists) => {
            state.lists = lists.lists
            state.listPositions = lists.listsPosition || [2, 1, 3, 4]
            state.hiddenLists = lists.hiddenLists
            state.columns = lists.columns
            console.log('populateLists: ', lists)
        },
        subscriptionManagerToggle: state => {
            state.subscriptionManagerOpened = !state.subscriptionManagerOpened
        },
        closeSubscriptionManager: state => {
            state.subscriptionManagerOpened = false
        },
        addColumnContent: (state, {
            content,
            columnID,
            removeFromColumns
        }) => {
            // content supports both object and array of objects
            if (!Array.isArray(content)) content = [content]
            // create index array
            const arrayFromContent = content.map(channel => channel.id)

            // if no column data, create empty object (redundant since addTheDamnColumn)
            if (!state.columns[columnID]) state.columns[columnID] = {}
            // // create a new object because Vue can't detect object property changes: https://vuejs.org/v2/guide/list.html#Caveats
            const x = Object.assign({}, state.columns)

            x[columnID] = arrayFromContent

            // for each in removeFromColumns we want to remove the moved items (dragable clone override)
            if (removeFromColumns) {
                removeFromColumns.forEach(colToPurge => {
                    x[colToPurge] = x[colToPurge].filter(id => !x[columnID].includes(id))
                })
            }
            // remove any remaining dupicates
            x[columnID] = Array.from(new Set(arrayFromContent))

            // // replace state
            state.columns = x
        },
        pushNewSubscriptionIntoNotified: (state, id) => {
            const x = Object.assign({}, state.columns)
            x[1].unshift(id)
            state.columns = x
        },
        updateColumnContent: (state, {
            columnID,
            things
        }) => {
            if (!Array.isArray(things)) things = [things]
            const x = Object.assign({}, state.columns)
            x[columnID] = x[columnID].concat(things)
            state.columns = x
        },
        removeColumnContent: (state, {
            columnID,
            things
        }) => {
            // prepare the data
            if (!Array.isArray(things)) things = [things]
            let x = Object.assign({}, state.columns)
            // if no column is set to 0 (no specific column), remove things from all subscription dependent columns.
            if (columnID === 0) {
                const subscriptionDependentColumns = [1, 2, 3]
                subscriptionDependentColumns.forEach(column => {
                    x[column] = x[column].filter(id => !things.includes(id))
                })
            } else x[columnID] = x[columnID].filter(id => !things.includes(id)) // else remove from the selected column
            state.columns = x
            return

            // x[columnID] = x[columnID].filter(id => !things.includes(id))
            // state.columns = x
        },
        changeColumnPositions: (state, columns) => {
            const positions = columns.map(column => column.id)
            api.updateListPositions({
                listsPosition: positions
            })
            // console.log({ listsPosition: positions })
            state.listPositions = positions
        },
        hideColumn: (state, columnID) => {
            if (!state.columns.hiddenColumns.includes(columnID)) state.columns.hiddenColumns = state.columns.hiddenColumns.push(columnID)
        },
        // addNewColumn: (state, columnName, columnDescription) => {
        // 	const newColumn = {
        // 		id: Math.floor(Math.random() * 20000000) + 1,
        // 		type: 'CUSTOM',
        // 		title: columnName,
        // 		description: columnDescription
        // 	}
        // 	state.columns[newColumn.id] = newColumn
        // 	console.log(newColumn)
        // },
        removeColumn: (state, columnID) => {
            delete state.columns[columnID]
        }
    },
    actions: {},
    getters: {
        subscriptionManagerOpened: state => state.subscriptionManagerOpened,

        // SUBSCRIPTION MANGER GETTERS
        getColumns: (state, getters) => {
            // duplicate the state
            const columns = Object.assign({}, state.columns)

            // itterate though the default columns
            state.defaultColumns.map(defaultColumn => {
                // if we have content value insert it into the defaultColumn object
                if (columns[defaultColumn.id]) defaultColumn.content = columns[defaultColumn.id].content
                // either way, set the default column
                columns[defaultColumn.id] = defaultColumn
            })

            // convert columns object to an array ignoring any properties that are not indexed in the columnPostions
            // console.log(state.listPositions)
            const columnPostions = state.listPositions || [2, 1, 3, 4]
            return columnPostions.map(columnID => columns[columnID])

            // sort the columns by the columnPostions
            // console.log(columnsArray)
            // return methods.sortByIndexArray(columnsArray, state.columns.columnPostions)
        },
        getNotified: (state, getters) => {
            const columnID = 1
            if (!state.columns[columnID]) return []
            return methods.sortByIndexArray(getters.getAllChannels, state.columns[columnID])
        },
        getFavorites: (state, getters) => {
            const columnID = 2
            if (!state.columns[columnID]) return []
            return methods.sortByIndexArray(getters.getAllChannels, state.columns[columnID])
        },
        getMuted: (state, getters) => {
            const columnID = 3
            if (!state.columns[columnID]) return []
            return methods.sortByIndexArray(getters.getAllChannels, state.columns[columnID])
        }
    }
}