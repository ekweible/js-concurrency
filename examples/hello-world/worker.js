// listen for messages from the main thread
self.addEventListener('message', function(evt) {
    // reply
    self.postMessage(evt.data + ' Hello World! I am a worker!');
});
