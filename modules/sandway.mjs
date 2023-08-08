import { createServer as _createServer } from 'http';
import { parse } from 'url';
import { parse as _parse } from 'querystring';

class Sandway {
	constructor() {
    	this.routes = {};
  	}
	use(middleware) {
    	this.middleware = middleware;
  	}
	get(route, handler) {
    	this.routes['GET ' + route] = handler;
  	}
	post(route, handler) {
    	this.routes['POST ' + route] = handler;
  	}
	createServer() {
    	return _createServer((req, res) => {
			const method = req.method;
			const parsedUrl = parse(req.url);
			const routeKey = `${method} ${parsedUrl.pathname}`;
			const queryParams = _parse(parsedUrl.query);
			if (this.middleware) {
				this.middleware(req, res);
			}
			if (this.routes[routeKey]) {
				const handler = this.routes[routeKey];
				handler(req, res, queryParams);
			} else {
				res.writeHead(404, { 'Content-Type': 'text/plain' });
				res.end('Not Found');
			}
    	});
  	}
}

class Template {
	constructor(template) {
		this.template = template;
	}
	render(data) {
		return this.template.replace(/\{\{(.*?)\}\}/g, (match, key) => {
			return data[key.trim()] || '';
	  	});
	}
}
  
export { Sandway, Template };
