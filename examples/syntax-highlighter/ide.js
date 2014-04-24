$(function() {

    // Editor pane
    var $editor = $('#editor');

    // Highlighted preview pane
    var $preview = $('#preview');

    // update whenever the IDE contents change
    $editor.on('input propertychange', function(e) {
        var contents = $editor.val();
        window.dispatchSyntaxHighlighter(contents);
    });

    // expose a method for updating the preview pane that the worker dispatcher can leverage
    window.updateIDEPreview = function(updatedPreview) {
        // wrap the returned html in a div
        var $updatedPreview = $('<div class="hide">' + updatedPreview + '</div>');

        // insert the new, updated preview node into the DOM
        $preview.append($updatedPreview);

        // remove the previous version and show the updated one
        $preview.find('div.shown').remove();
        $preview.find('div.hide').addClass('shown').removeClass('hide');
    };

    // handle some special keypress events
    $editor.keydown(function(e) {
        // convert tab presses into 4-spaces
        if (e.which === 9) {
            e.preventDefault();
            insertTextAtCursor($editor[0], '    ');
            window.dispatchSyntaxHighlighter($editor.val());
        }
    });

    // resize the editor and preview pane whenever window is resized
    $(window).on('resize', function() {
        resizeIDE($editor, $preview);
    });

    // initialize the IDE by resizing it
    resizeIDE($editor, $preview);

});

function insertTextAtCursor(el, text) {
    var val = el.value, endIndex, range;
    if (typeof el.selectionStart != "undefined" && typeof el.selectionEnd != "undefined") {
        endIndex = el.selectionEnd;
        el.value = val.slice(0, el.selectionStart) + text + val.slice(endIndex);
        el.selectionStart = el.selectionEnd = endIndex + text.length;
    } else if (typeof document.selection != "undefined" && typeof document.selection.createRange != "undefined") {
        el.focus();
        range = document.selection.createRange();
        range.collapse(false);
        range.text = text;
        range.select();
    }
}

function resizeIDE($editor, $preview) {
    var viewportHeight = $(window).height(),
        navbarHeight = $('.navbar').outerHeight(),
        ideHeight = viewportHeight - navbarHeight;

    $editor.height(ideHeight);
    $preview.height(ideHeight);
}
