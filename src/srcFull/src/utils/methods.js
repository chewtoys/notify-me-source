import {
    find,
    remove
} from 'lodash'

export function selectByKey(array, {
    key,
    value
}) {
    return find(array, item => item[key] === value)
}

export function removeByKey(array, {
    key,
    value
}) {
    return remove(array, item => item[key] === value)
}

/**
 * Removes dupicates from an array of objects and returns the entire object
 */
export function removeDuplicates(array) {
    return array.filter(
        (elem, index, self) =>
        self.findIndex(item => {
            return item.id === elem.id
        }) === index
    )
}

/**
 * Takes an array of object with IDs, and an array of IDs where the index is the desired position to sort the array of objects
 */
export function sortByIndexArray(array, indexArray) {
    const objectWithKeys = {}
    array.map(item => (objectWithKeys[item.id] = item))
    const sortedObject = indexArray.map(id => objectWithKeys[id]).filter(item => typeof item !== 'undefined')
    return Object.values(sortedObject)
}
/**
 * Removes dupicates from an array of objects and returns just the new additions
 */
export function removeDuplicatesReturnNew(array, newItems) {
    return newItems.filter(item => !array.find(oldItem => oldItem.id === item.id))
}

export function sortByDate(array) {
    return array.sort((a, b) => (a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0))
}