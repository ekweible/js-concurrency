var request = new XMLHttpRequest();
request.onload = function() {
    console.log(this.responseText);
}
request.open('get', 'data.txt', true);
request.send();
