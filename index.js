import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { Server as io } from 'socket.io';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

const randomNameConfig = {
  dictionaries: [colors, adjectives, animals],
  separator: '',
  length: 1,
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = http.createServer((request, response) => {
    if (request.method === 'GET') {
        const filePath = path.join(__dirname, 'index.html');
        const readStream = fs.createReadStream(filePath);
        readStream.pipe(response);
    } else if (request.method === 'POST') {
        let data = '';
        request.on('data', chunk => {
            data += chunk;
        });
        request.on('end', () => {
            const parsedData = JSON.parse(data);
            console.log(parsedData);
            response.writeHead(200, { 'Content-Type': 'json' });
            response.end(data);
        });
    } else {
        response.statusCode = 405;
        response.end();
    }
});

const sockets = new io(app);

sockets.on('connection', function (socket) {
    console.log('New connection');
    const userName = uniqueNamesGenerator(randomNameConfig);
    socket.broadcast.emit('NEW_CONN_EVENT', { msg: userName + ' connected' });
    socket.emit('GET_USER_NAME', {user: userName});
    socket.on('CLIENT_MSG', (data) => {
        sockets.emit('SERVER_MSG', { user: userName, msg: data.msg.split('').reverse().join('') });
    });
    socket.on('disconnect', () => {
        socket.broadcast.emit('DISCONNECT', { msg: userName + ' disconnected' });
    })
});

app.listen(3000, 'localhost');
