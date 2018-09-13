// Once the service worker is registered set the initial state
import firebase from 'firebase'
import api from '@/core/api'
import Account from '@/core/account.core'

var config = {
    apiKey: 'AIzaSyCLr591ESlYY0lR1H5WjKlWBVaxS9xSuJg',
    authDomain: 'notify-d4538.firebaseapp.com',
    databaseURL: 'https://notify-d4538.firebaseio.com',
    projectId: 'notify-d4538',
    storageBucket: 'notify-d4538.appspot.com',
    messagingSenderId: '909149846527'
}

const register = function() {
    console.log('Starting push register.')
    try {
        firebase.initializeApp(config)
    } catch (err) {
        // we skip the "already exists" message which is
        // not an actual error when we're hot-reloading
        if (!/already exists/.test(err.message)) console.error('Firebase initialization error', err.stack)
    }

    const messaging = firebase.messaging()

    messaging
        .requestPermission()
        .then(() => {
            console.log('Notification permission granted.')

            // Here we would send the token to the server to be used when notifications whan to send
            return messaging.getToken().catch(err => console.error('Error getting token', err))
        })
        .then(token => {
            sendTokenToServer(token)
        })
        .catch(function(err) {
            console.log('Unable to get permission to notify.', err)
        })

    messaging.onMessage(function(payload) {
        console.log('[Firebase Messaging] Received message ', payload)

        const notificationTitle = payload.notification.title
        const notificationOptions = {
            body: payload.notification.body,
            icon: payload.notification.icon
        }

        var notification = new Notification(notificationTitle, notificationOptions)
    })

    function sendTokenToServer(currentToken) {
        console.log('FCM Token: ' + currentToken)
        if (!isTokenSentToServer()) {
            console.log('Sending token to server...')
            // TODO(developer): Send the current token to your server.
            Account.addPushToken(currentToken)
                .then(res => {})
                .catch(e => {})
            setTokenSentToServer(true)
        } else {
            console.log("Token already sent to server so won't send it again unless it changes")
        }
    }

    function isTokenSentToServer() {
        return window.localStorage.getItem('sentToServer') === '1'
    }

    function setTokenSentToServer(sent) {
        window.localStorage.setItem('sentToServer', sent ? '1' : '0')
    }

    function deleteToken() {
        // Delete Instance ID token.
        // [START delete_token]
        messaging
            .getToken()
            .then(function(currentToken) {
                messaging
                    .deleteToken(currentToken)
                    .then(function() {
                        console.log('Token deleted.')
                    })
                    .catch(function(err) {
                        console.log('Unable to delete token. ', err)
                    })
            })
            .catch(function(err) {
                console.log('Error retrieving Instance ID token. ', err)
            })
    }
}

export default register