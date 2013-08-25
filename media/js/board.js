function Board() {}

Board.prototype.init = function() {
}

$(function() {
    var board = new Board();
    var socket = io.connect();
    socket.on('init', function (msg) {
        board.init();
    });
    socket.on('widget.update', function(data) {
        $('[data-class="weather"]').text(data)
    });
})