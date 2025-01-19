self.addEventListener('push', function (event) {
    console.log('Push event received');

    if (!(self.Notification && self.Notification.permission === 'granted')) {
        console.log('Notification permission not granted.');
        return;
    }

    let data = {};
    if (event.data) {
        try {
            data = event.data.json(); // Pobieranie danych powiadomienia
            console.log('Received Push Data:', data);
        } catch (error) {
            console.error('Error parsing push event data:', error);
        }
    }

    const title = data.title || 'Default Title';
    const message = data.message || 'Default message';
    const icon = data.icon || '/default-icon.png';
    const clickTarget = data.clickTarget || '/';


    event.waitUntil(
        self.registration.showNotification(title, {
            body: message,
            tag: 'push-demo',
            icon: icon,
            badge: icon,
            image: icon
        })
    );

    self.clickTarget = clickTarget;
});

self.addEventListener('notificationclick', function (event) {
    console.log('[Service Worker] Notification click received.');

    event.notification.close();

    if (clients.openWindow) {
        event.waitUntil(clients.openWindow(self.clickTarget));
    }
});
