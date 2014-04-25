function sleep(milliseconds) {
    var start = Date.now();
    for (var i = 0; i < 1e7; i++) {
        if ((Date.now() - start) > milliseconds){
            break;
        }
    }
}
