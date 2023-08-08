import { Sandway } from './modules/sandway.mjs';
import { Template } from './modules/sandway.mjs';

const app = new Sandway();

app.use((req, res) => {
    console.log(req.method, req.url);
});

app.get('/', (req, res) => {
    req.on('data', (data) => {
        console.log('Data received: %s', data);
    });

    const templateString = '<h1>Hello, {{name}}!</h1><p>Welcome to our website.</p>';
    const template = new Template(templateString);
    const data = {
        name: 'John'
    };
    const renderedTemplate = template.render(data);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(renderedTemplate);
});

app.post('/', (req, res, queryParams) => {
    req.on('data', (data) => {
        console.log('Data received: %s', JSON.parse(data));
    });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(`Received POST request with query parameters: ${JSON.stringify(queryParams)}`);
});

const server = app.createServer();
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
