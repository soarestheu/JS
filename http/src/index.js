const http = require('http');
const { URL } = require('url');

const bodyParser = require("./helpers/bodyParser")
const routes = require('./routes');
const path = require('path');

const server = http.createServer((request, response) => {
    const parsedUrl = new URL(`http://localhost:3000${request.url}`);

    let { pathname } = parsedUrl
    let id;
    const splitEndpoit = pathname.split('/').filter((Boolean))

    if (splitEndpoit.length > 1) {
        pathname = `/${splitEndpoit[0]}/:id`;
        id = splitEndpoit[1];
    }

    const route = routes.find((routeObj) => (
        routeObj.endpoint === pathname && routeObj.method === request.method
    ))



    if (route) {
        request.query = Object.fromEntries(parsedUrl.searchParams);
        request.params = { id }
        response.send = (statusCode, Body) => {
            response.writeHead(statusCode, { 'Content-type': 'application/json' })
            response.end(JSON.stringify(Body));
        }

        if(['POST', 'PUT', 'PATCH'].includes(request.method)) {
            bodyParser(request, () => route.handler(request,response))
        } else {
            route.handler(request, response);
        }
    } else {
        response.writeHead(200, { 'Content-type': 'text/html' });
        response.end("<h1>TESTE DE TESTE</h1>")
    }

})

server.listen(3000, () => console.log(" SERVIDOR ONLINE http://localhost:3000"))