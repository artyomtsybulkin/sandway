import { Sandway } from './modules/sandway.mjs';
import { Template } from './modules/sandway.mjs';

/* 1. Initialize Class with single property: routes */
const app = new Sandway();

/* 2. While execting this method add middleware property to Class instance
   In this case middleware is arrow function */
app.use((req, res) => {
    console.log(req.method, req.url);
});

app.get('/', (req, res) => {
    /* 3. route = '/' and handler is arrow function
        Next perform actions like in express - 8 in sandway.mjs. */
    req.on('data', (data) => {
        console.log('Data received: %s', data);
    });
    /* Working on templates here */
    const templateString = 'Hello, {{name}}! Welcome to our website.';
    const template = new Template(templateString);
    const data = {
        name: 'John'
    };
    const renderedTemplate = template.render(data);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(renderedTemplate);
});

app.post('/', (req, res, queryParams) => {
    /* 4. Same way as for GET request - 8 in sandway.mjs. */
    req.on('data', (data) => {
        console.log('Data received: %s', JSON.parse(data));
    });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(`Received POST request with query parameters: ${JSON.stringify(queryParams)}`);
});

/* 5. Return http.createServer instance */
const server = app.createServer();
const PORT = process.env.PORT || 3000;

/* 5. Listen is inher3ted from node http module */
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
