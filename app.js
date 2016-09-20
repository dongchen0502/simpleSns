var http = require('http');
var parseUrl = require('url').parse;

function homeController(req, res){
	res.end('home\n');
}

function userController(req, res){
	res.end('user\n');
}

function notFountController(req, res){
	res.writeHead(404);
	res.end('404\n');
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
		controller : homeController
	},
	{
		path : '/user', 
		controller : userController
	}
];

var server = http.createServer(function(req, res){
	var urlInfo = parseUrl(req.url);
	console.log('url:', req.url, 'urlInfo：', urlInfo);

	var rule = find(rules, function(rule){
		return rule.path == urlInfo.pathname;
	});
	var controller = rule && rule.controller || notFountController
	controller(req, res);
});

server.listen(3000);