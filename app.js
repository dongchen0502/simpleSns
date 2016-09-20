var http = require('http');
var parseUrl = require('url').parse;
var controllers = require('./controllers');

function notFountController(req, res){
	res.writeHead(404);
	res.end('Not Found\n');
}

function find(arr, match){
	for(var i in arr){
		if(match(arr[i])){
			return arr[i];
		}
	}
}

const rules = [
	{
		path : '/', 
		controller : controllers.home
	},
	{
		path : '/user', 
		controller : controllers.user
	},
	{
		path : /^\/static(\/.*)/,
		controller : controllers.static
	}
];

var server = http.createServer(function(req, res){
	var urlInfo = parseUrl(req.url);
	console.log('url:', req.url, 'urlInfo：', urlInfo);

	var rule = find(rules, function(rule){
		if(rule.path instanceof RegExp){
			console.log(rule.path);
			return urlInfo.pathname.match(rule.path);
		}
		return rule.path == urlInfo.pathname;
	});
	var controller = rule && rule.controller || notFountController
	controller(req, res);
});

server.listen(3000);
