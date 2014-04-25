self.addEventListener('message', function(evt) {
    var largeObject = evt.data.obj;
    var payload = {
        obj: largeObject,
        duration: Date.now() - evt.data.time,
        time: Date.now()
    };
    self.postMessage(payload, [largeObject.buffer]);
});
