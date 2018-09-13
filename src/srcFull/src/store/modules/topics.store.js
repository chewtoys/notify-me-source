export default {
    state: {
        topics: [],
        tempTopics: [{
                topic: 'Gaming',
                id: Math.random()
            },
            {
                topic: 'Vlogging',
                id: Math.random()
            },
            {
                topic: 'Lifestyle',
                id: Math.random()
            },
            {
                topic: 'Comedy',
                id: Math.random()
            },
            {
                topic: 'Sci-Fi',
                id: Math.random()
            },
            {
                topic: 'Horror',
                id: Math.random()
            },
            {
                topic: 'Fortnite',
                id: Math.random()
            },
            {
                topic: 'Overwatch',
                id: Math.random()
            },
            {
                topic: 'Events',
                id: Math.random()
            },
            {
                topic: 'IRL',
                id: Math.random()
            },
            {
                topic: 'Music',
                id: Math.random()
            },
            {
                topic: 'Programming',
                id: Math.random()
            },
            {
                topic: 'How-To',
                id: Math.random()
            }
        ]
    },
    mutations: {
        populateTopics: (state, payload) => {
            state.topics = payload
        }
    },
    actions: {},
    getters: {
        getTopics: state => state.topics,
        getTempTopics: state => state.tempTopics
    }
}