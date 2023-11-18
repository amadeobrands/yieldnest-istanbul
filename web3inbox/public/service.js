// self.addEventListener("push", async (event) => {
//     console.log("worker sending notification");
//     console.log(event.detail);
//     if (event.detail) {
//       const eventData = await event.detail;
//       showLocalNotification(eventData.title, eventData.body, self.registration);
//     }
//   });
self.addEventListener('push', async (event) => {
  if (event.data) {
    const eventData = await event.data.json()
    showLocalNotification(eventData.title, eventData.body, self.registration)
  }
})

const showLocalNotification = (title, body, swRegistration) => {
  swRegistration.showNotification(title, {
    body,
    icon: '/icons/icon-192.png',
  })
}
