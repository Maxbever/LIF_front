const { WebSocketServer } =  require('ws');
const net = require('net');

const wss = new WebSocketServer({ port: 8080 });

let client = new net.Socket();
client.connect(9000, '192.168.0.8', async function () {
    console.log('Connected');
    client.write('attach DATA admin');
    while (true) {
        client.write('in (_)');
        await sleep(5000)
    }
});

client.on('data', function(data) {
    if (!data.toString().includes("ERROR")){
        console.log(data.toString())
        wss.on('connection', function connection(ws) {
            ws.send(data);
        });
    }
});

client.on('close', function() {
    console.log('Connection closed');
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}