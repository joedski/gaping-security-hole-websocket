const path = require('path');
const Koa = require('koa');
const KoaStatic = require('koa-static');
const WebSocket = require('ws');

const child_process = require('child_process');

const WS_PORT = process.env.WS_PORT || 9090;
const wss = new WebSocket.Server({ port: WS_PORT });

wss.on('connection', ws => {
  console.log('Socket opened!');

  ws.on('message', message => {
    console.log('received: %s', message);

    child_process.exec(message, (error, stdout, stderr) => {
      console.log('Executed command!');
      if (error) {
        ws.send(JSON.stringify({ error }));
      }
      else {
        ws.send(JSON.stringify({ stdout, stderr }));
      }
    });
  });

  ws.on('error', error => {
    console.error(error);
  });

  ws.on('close', event => {
    console.log('Socket closed:', event);
  });
});

console.log(`websocket server listening on ${WS_PORT}`);

const HTTP_PORT = process.env.HTTP_PORT || 8080;

const app = new Koa();

app.use(KoaStatic(path.resolve(__dirname, 'static')));

app.listen(HTTP_PORT);

console.log(`http server listening on ${HTTP_PORT}`);
