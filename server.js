const express = require('express');
const app = express();
const port = 8080;

const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

app.use('/', express.static(path.join(__dirname, 'dist/fit2095-lab-week11')));

let auction={
    name: '',              // name of the auction generator
    isBidActive: false,    // true if the auction is still active; false otherwise
    auctionDescription: '',// Describe the auction
    targetPrice: 0         // THe asked price for the auction
};

io.on('connection', function(socket) {
    console.log('new connection made, ' + socket.id);

    socket.emit('onAuctionUpdate', auction);
});

server.listen(port, () => {
    console.log("Listening on port " + port);
});

