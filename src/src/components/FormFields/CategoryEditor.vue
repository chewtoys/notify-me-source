<template>
	<div class="category_editor">
		<!-- Admin View Category Editor  -->
		<div v-if="admin" class="center admin_category_editor">
			<p>Category Edit Bench:</p>
			<div v-if="selectedCategory.name" class="admin_category_editor_inner">
			
				<button class="category coolbtn left topic_tag big_topic_tag"> <span>{{selectedCategory.name}}</span> </button>
				<button v-if="searchWaiting" @click="createCategory" class="coolbtn"><i class="rotating fas fa-spinner"></i></button>
				<div v-else class="">
					<button v-if="creatingNewCategory" @click="createCategory" v-shortkey="['enter']" @shortkey="creatingNewCategory()" class="coolbtn">Create Category</button>
					<div v-else>
					<button @click="createCategory" class="coolbtn">Edit Category</button>
					<button @click="deleteCategory" class="coolbtn">Delete Category</button>
					</div>
				</div>
			</div>
		</div>
		<!-- Current Categories -->
		<div v-else>
			<div v-if="selectedCategories.length > 0" class="categories_loop filters-group">
				<div class="topic_tag_bar filter-options">
					<button @click.prevent="doNothing" v-for="(i, index) in selectedCategories" :key="index" :class="{'editable':editable}" class="category coolbtn left topic_tag">
						<span>{{i.name}}</span>
						<div v-if="editable" @click="removeCategory(i, index)" class="remove_category"><i class="fa fa-times" /></div>
					</button>
				</div>
			</div>
			<div v-else class="">
				<p v-if="isMyChannel">You have no categories, type below to add some.</p>
			</div>
		</div>
	
		<!-- Category Type Box -->
		<div v-if="editable && selectedCategories.length < 3" class="category_type_box ">
			<input v-model="newCategory" @keyup="searchCategories" @focus="focus = true" @blur="focus = false" :placeholder="`Add categories (${3 - selectedCategories.length} remaining)`" class="form-control" v-shortkey="['enter']" @shortkey="addCategory()" />
		</div>
	
		<div v-if="editable && showResults || forceShowResults" class="category_search_results scroll">
			<div class="category_search_results_inner">
				<div v-if="searchWaiting">
					
				</div>
				<div v-for="(i, index) in suggestions" :key="index" class="coolbtn left topic_tag" @click="addCategory(i)">{{i.name}}</div>
			</div>
		</div>
		 <!-- <div ><br/> forceShowResults: {{forceShowResults}}<br/> creatingNewCategory: {{creatingNewCategory}}<br/> selectedCategory: {{selectedCategory}}<br/><br/> selectedCategories: {{selectedCategories}}<br/> newCategory: {{newCategory}}<br/> focus: {{focus}}<br/>		suggestions: {{suggestions}}<br/> searchWaiting: {{searchWaiting}}<br/> editable: {{editable}}<br/> channelToUpdate: {{channelToUpdate}}<br/> ownerChannel: {{ownerChannel}}<br/> </div> -->
		<br/>
	</div>
</template>

<script>
import * as api from '@/core/api'
import { debounce } from 'lodash'
import Channel from '@/core/channel.core'

export default {
    components: {},

    props: ['categories', 'ownerChannel', 'forceShowResults', 'admin', 'newPost'],
    // categories are the defaults
    // ownerChannel is the channel object, if we're editing a channel's caegories
    data() {
        return {
            selectedCategories: [],
            newCategory: '',
            focus: false,
            suggestions: [],
            searchWaiting: false,
            editable: false,
            showResults: false,
            //admin only
            selectedCategory: {},
            creatingNewCategory: true,
            // get the channel the user is currently viewing (about.vue)
            channelToUpdate: this.$store.getters.getChannelData.id
        }
    },
    created() {
        // if the prop categories is passed, populate the selectedCategories

        if (this.admin) {
            this.editable = true
            return
        }
        if (this.categories) {
            const cats = []
            this.categories.forEach(cat => {
                cats.push({ name: cat })
            })
            this.selectedCategories = cats
        }
        if (this.ownerChannel && Channel.isMyChannel(this.ownerChannel.id)) {
            this.editable = true
        }

        // if on channel the results be shown by default

        // get category suggestions
        // if (this.showResults)
        //     api.getCategorySuggestions().then(res => {
        //         this.suggestions = res.data.categories
        //     })
    },
    methods: {
        doNothing() {
            // nothing
        },

        searchCategories: debounce(function() {
            this.showResults = true
            this.searchWaiting = true
            if (this.newCategory.length == 0) return
            api
                .searchCategories(this.newCategory)
                .then(res => {
                    this.suggestions = res.data.topics
                    this.searchWaiting = false

                    // determine if we are creating a new category
                    if (this.admin && this.selectedCategory.name) {
                        if (this.suggestions.filter(cat => cat.name.toLowerCase() === this.selectedCategory.name.toLowerCase()).length > 0) {
                            this.selectedCategory = this.creatingNewCategory = false
                        } else this.creatingNewCategory = true
                        console.log('creatingNewCategory', this.creatingNewCategory)
                    }
                })
                .catch(err => {
                    this.showResults = false
                    this.searchWaiting = false
                    console.log(err)
                    this.$root.$emit('alert', 'error', 'Search failed')
                })
        }, 200),
        addCategory(categoryObject) {
            // admin
            if (this.admin) {
                // set the category
                if (categoryObject) {
                    this.selectedCategory = categoryObject
                    this.creatingNewCategory = false
                } else {
                    this.selectedCategory = {
                        name: this.newCategory
                    }
                    this.creatingNewCategory = true
                }
                return console.log(this.selectedCategory)
            }
            // user can not add more than 3 categories to anything
            if (this.selectedCategories.length > 3) return

            //update the DOM
            if (categoryObject) this.selectedCategories.push(categoryObject)
            else this.selectedCategories.push(this.newCategory)

            // map the categories from objects to an array of names
            const categoriesForChannel = this.selectedCategories.map(cat => cat.name)

            if (this.newPost)
                // If we're creating a new post, emit to parent
                this.$emit('updateCategories', categoriesForChannel)
            else
                // otherwise, update the channel
                this.updateChannelCategories(categoriesForChannel)
        },
        removeCategory(i, index) {
            // update the DOM
            this.selectedCategories.splice(index, 1)
            // map the categories from objects to an array of names
            const categoriesForChannel = this.selectedCategories.map(cat => cat.name)

            if (this.newPost)
                // emit update event
                this.$emit('updateCategories', categoriesForChannel)
            else
                // otherwise, update the channel
                this.updateChannelCategories(categoriesForChannel)
        },
        createCategory() {
            console.log('creating category: ' + this.selectedCategory.name)
            api
                .createTopic(this.selectedCategory)
                .then(() => {
                    this.$root.$emit('alert', 'success', 'Category Created!')
                    this.creatingNewCategory = false
                })
                .catch(err => {
                    this.creatingNewCategory = false
                })
        },
        updateChannelCategories(categories) {
            Channel.update(
                {
                    topics: categories
                },
                this.channelToUpdate
            )
                .then(() => {
                    this.showResults = false
                })
                .catch(err => {
                    console.log(err)
                    this.selectedCategories.pop()
                    this.$root.$emit('alert', 'error', 'Failed to add category')
                })
        },
        deleteCategory() {
            console.log('removing category: ', this.selectedCategory)
            api
                .deleteTopic(this.selectedCategory.id)
                .then(() => {
                    this.$root.$emit('alert', 'success', 'Category Deleted!')
                    this.creatingNewCategory = true
                })
                .catch(err => {
                    this.creatingNewCategory = false
                })
        }
    },
    computed: {
        isMyChannel() {
            return Channel.isMyChannel()
        }
    },
    watch: {
        focus() {
            if (!this.focus)
                setTimeout(() => {
                    this.showResults = false
                }, 400)
        }
    }
}
</script>

<style lang="scss">
.category_editor {
    max-width: 380px;
    .topic_tag_bar .editable.topic_tag {
        position: relative;
        padding-right: 25px !important;
        .remove_category {
            position: absolute;
            right: 9px;
            top: 3px;
        }
    }
}
.category_type_box {
    position: relative;
    z-index: 999;
    input {
        border: none;
    }
}

.category_search_results {
    position: relative;
    z-index: 9;
    width: 100%;
    height: 100px !important;
    margin-top: -4px;
    border-radius: 5px;
    margin-top: 11px;
    border: 1px solid #efefef;
    .category_search_results_inner {
        padding: 10px;
        li {
            list-style: none;
            padding: 5px 15px;
            background: rgb(50, 50, 50);
            cursor: pointer;
            &:hover {
                background: #000;
            }
        }
    }
}

.dark .category_search_results {
    border: 1px solid rgba(0, 0, 0, 0);
    background: #131313;
}
.category.coolbtn.left.topic_tag.big_topic_tag {
    padding: 10px 40px !important;
    font-size: 2rem !important;
}
</style>
