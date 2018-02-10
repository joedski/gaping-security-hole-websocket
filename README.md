Gaping Security Hole: How Not to Use WebSockets
===============================================

![Tee hee](./docs/lol.png)

The first thing to do with websockets is of course to give someone the ability to execute arbitrary shell commands.  You could do it over HTTP, but this is the future, we do it live, with WebSockets.

Possible improvement: Use some method to open a persistent shell and feed it commands from the client via stdin, sending stdout and stderr back to the client in real time.
