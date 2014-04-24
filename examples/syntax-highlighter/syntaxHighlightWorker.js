// load script dependencies
importScripts('sleep.js', 'static/xregexp/xregexp.js', 'static/sh/js/shCore.js', 'static/sh/js/shBrushJScript.js');

var id;

// listen for messages, check the request action, and handle appropriately
self.addEventListener('message', function(evt) {
    switch (evt.data.action) {

        case 'init':
            id = evt.data.id;
            break;

        case 'highlight':
            // get the editor contents
            var contents = evt.data.contents;

            // run the syntax highlighter on it
            var highlighted = SyntaxHighlighter.highlight(contents);

            sleep(500);

            // send the finished result back to the main thread
            self.postMessage({
                id: id,
                contents: highlighted,
                time: evt.data.time,
                duration: new Date().getTime() - evt.data.time
            });
    }
});
