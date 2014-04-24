$(function() {
    var $useWorkers = $('#use-workers'),
        $numWorkers = $('#num-workers');

    $useWorkers.change(function() {
        window.useWorkers = $useWorkers.is(':checked');

        if (window.useWorkers) {
            $numWorkers.css('visibility', 'visible');
        } else {
            $numWorkers.css('visibility', 'hidden');
        }
    });

    $numWorkers.change(function() {
        window.currentNumWorkers = parseInt($numWorkers.find(':selected').text(), 10);
    });

});
