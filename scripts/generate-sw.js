const fs = require('fs')
const path = require('path')
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv')
  dotenv.config({ path: '.env.local' })
}

// Read environment variables
const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID

// Service worker template
const serviceWorkerTemplate = `importScripts(
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js'
)

// Initialize Firebase directly with your config
firebase.initializeApp({
  apiKey: '${apiKey}',
  projectId: '${projectId}',
  messagingSenderId: '${messagingSenderId}',
  appId: '${appId}'
})

const messaging = firebase.messaging()

// Handle background messages
messaging.onBackgroundMessage(async (payload) => {
  console.log('📩 Background Message received:', payload)

  const notificationTitle = payload.notification?.title || 'New Notification'
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new message!',
    icon: '/images/logo.png',
    data: payload.data,
    tag: payload.data?.type || 'default', // Group similar notifications
    renotify: true // Notify even if there's an existing notification with same tag
  }

  // Check if any window clients are focused
  const checkWindowFocus = async () => {
    const windowClients = await clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    })
    return windowClients.some((client) => client.focused)
  }

  // Only show notification if window is not focused
  const isWindowFocused = await checkWindowFocus()
  if (isWindowFocused) {
    console.log('Window is focused, skipping notification')
    return
  }


  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  )
})

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  const data = event?.notification?.data
  const type = data?.type
  let payload = data
  delete payload.type
  // Construct the full URL using the notification data
  const url =
    '/notification/callback?type=' +
    type +
    '&payload=' +
    JSON.stringify(payload)

  clients.openWindow(url)

  event.notification.close()
})
`

// Write the service worker file
const publicDir = path.join(__dirname, '../public')
fs.writeFileSync(
  path.join(publicDir, 'firebase-messaging-sw.js'),
  serviceWorkerTemplate
)

console.log('Service worker generated successfully with Firebase config!')
