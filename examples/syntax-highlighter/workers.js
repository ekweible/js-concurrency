var MAX_WORKERS = 10,
    workerPool = [],
    lastUpdate = 0;

window.useWorkers = true;
window.currentNumWorkers = 4;

console.log('Spinning up ' + MAX_WORKERS + ' workers.');

// method to find the least busy worker and return its ID
function getLeastBusyWorkerID() {
    var lowestLoad = Number.MAX_VALUE,
        lowestLoadID = 0;

    for (var i=0; i<window.currentNumWorkers; i++) {
        if (workerPool[i].load < lowestLoad) {
            lowestLoad = workerPool[i].load;
            lowestLoadID = i;
        }
    }

    return lowestLoadID;
}

// event handler for messages from a worker
function workerResponseHandler(evt) {
    var id = evt.data.id;
    workerPool[id].load--;

    // check the timestamp against the last updated
    if (evt.data.time > lastUpdate) {
        lastUpdate = evt.data.time;
        window.updateIDEPreview(evt.data.contents);
    }

    console.log('[' + evt.data.duration + 'ms] Worker #' + id + ' completed a job.');
}

// expose a method to dispatch a syntax highlighter worker
window.dispatchSyntaxHighlighter = function(contents) {
    // if workers are enabled, dispatch one
    if (window.useWorkers) {
        var workerID = getLeastBusyWorkerID();
        workerPool[workerID].load++;
        workerPool[workerID].worker.postMessage({
            action: 'highlight',
            contents: contents,
            time: new Date().getTime()
        });

        console.log('\tDispatching Worker #' + workerID + '. Current load: ' + workerPool[workerID].load);
    }
    // otherwise, perform the task synchronously
    else {
        var start = new Date().getTime();
        // run the syntax highlighter on it
        var highlighted = SyntaxHighlighter.highlight(contents);
        sleep(500);
        window.updateIDEPreview(highlighted);

        console.log('[' + (new Date().getTime() - start) + 'ms] Synchronous task finished.');
    }
};

// populate the worker pool
for (var i=0; i<MAX_WORKERS; i++) {
    // create a new worker
    var worker = new Worker('syntaxHighlightWorker.js');

    // kick-start the worker so it's ready to go, and give it an ID
    worker.postMessage({action: 'init', id: i});

    // listen for responses
    worker.addEventListener('message', workerResponseHandler);

    // add this worker to the pool along with a load counter
    workerPool.push({
        worker: worker,
        load: 0
    });
}
