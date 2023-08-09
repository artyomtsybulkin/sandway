import { createServer as _createServer } from 'http';
import { parse } from 'url';
import { parse as _parse } from 'querystring';

class Sandway {
	constructor() {
		/* 1. Initialize Class with single property:
		routes - empty object */
    	this.routes = {};
  	}
	use(middleware) {
		/* 2. While execting this method add middleware
		property to Class instance */
    	this.middleware = middleware;
  	}
	get(route, handler) {
		/* 3. Method to add property "'GET ' + route" with
		value "handler()" to routes object */
    	this.routes['GET ' + route] = handler;
  	}
	post(route, handler) {
		/* 4. Same way as for GET request */
    	this.routes['POST ' + route] = handler;
  	}
	createServer() {
		/* 5. Return http.createServer instance */
    	return _createServer((req, res) => {
			const method = req.method;
			const parsedUrl = parse(req.url);
			const routeKey = `${method} ${parsedUrl.pathname}`;
			const queryParams = _parse(parsedUrl.query);
			/* 6. If middleware defined then execute */
			if (this.middleware) {
				this.middleware(req, res);
			}
			/* 7. Then handle requests:
			routes[routeKey] - defined by get and/or post methods */
			if (this.routes[routeKey]) {
				const handler = this.routes[routeKey];
				/* 8. Call handler as value of property routes[routeKey].
				Note: this call will execute code in index.js */
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
