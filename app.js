var koa = require('koa');
var controller = require('koa-route');//提供路由
var app = koa();//实例化

//渲染模板，1.访问URL返回一个模板 2.把静态文件返回到浏览器端
var views = require('co-views');

var render = views('./view',{
	map:{html : 'ejs'}//模板存放路径在view
});
var koa_static = require('koa-static-server');

var service = require('./service/webAppService.js');


//静态资源
app.use(koa_static({
	rootDir:'./static/',//去这里找资源
	rootPath:'/static/',//输入URL
	maxage : 0 //缓存
}));


//路由器，返回
app.use(controller.get('/route_test',function*(){
	this.set('Cache-Control','no-chache');//页面不缓存，设置http返回头不缓存；
	this.body = 'hello koa~';
}));

//模板渲染
app.use(controller.get('/ejs_test',function*(){
	this.set('Cache-Control','no-chache');//页面不缓存，设置http返回头不缓存；
	this.body = yield render('test',{title:'title_test'});//es6 异步执行
}));


//数据接口
app.use(controller.get('/api_test',function*(){
	this.set('Cache-Control','no-chache');//页面不缓存，设置http返回头不缓存；
	this.body = service.get_test_data();
}));

//-----------------------------------------------------------------------------------------

//chapter部分
app.use(controller.get('/ajax/chapter',function*(){
	this.set('Cache-Control','no-chache');//页面不缓存，设置http返回头不缓存；
	this.body = service.get_chapter_data();
}));


//访问章节内容data
app.use(controller.get('/ajax/chapter_data',function*(){
	this.set('Cache-Control','no-chache');
	var params = querystring.parse(this.req._parsedUrl.query);
	var id = params.id;
		if(!id){
			id="";
		}
	this.body = service.get_chapter_content_data(id);
}));


//book部分
	var querystring = require('querystring');
app.use(controller.get('/book',function*(){
	this.set('Cache-Control','no-chache');//页面不缓存，设置http返回头不缓存；
	var params = querystring.parse(this.req._parsedUrl.query);
	var bookId = params.id;
	this.body = yield render('book',{nav:'书籍详情',bookId:bookId});//es6 异步执行
}));

app.use(controller.get('/ajax/book',function*(){
	this.set('Cache-Control','no-chache');
	var querystring = require('querystring');
	var params = querystring.parse(this.req._parsedUrl.query);
	var id = params.id;
		if(!id){
			id="";
		}
	this.body = service.get_book_data(id);
}));


//home部分

app.use(controller.get('/',function*(){
	this.set('Cache-Control','no-chache');//页面不缓存，设置http返回头不缓存；
	this.body = yield render('index',{title:'书城首页'});//es6 异步执行
}));


app.use(controller.get('/ajax/index',function*(){
	this.set('Cache-Control','no-chache');//页面不缓存，设置http返回头不缓存；
	this.body = service.get_index_data();
}));



//rank部分
app.use(controller.get('/rank',function*(){
	this.set('Cache-Control','no-chache');//页面不缓存，设置http返回头不缓存；
	this.body = yield render('rank',{title:'书籍排行'});//es6 异步执行
}));

app.use(controller.get('/ajax/rank',function*(){
	this.set('Cache-Control','no-chache');//页面不缓存，设置http返回头不缓存；
	this.body = service.get_rank_data();
}));

//bookbacket部分
app.use(controller.get('/bookbacket',function*(){
	this.set('Cache-Control','no-chache');//页面不缓存，设置http返回头不缓存；
	this.body = yield render('bookbacket',{title:'书架'});//es6 异步执行
}));

app.use(controller.get('/ajax/bookbacket',function*(){
	this.set('Cache-Control','no-chache');//页面不缓存，设置http返回头不缓存；
	this.body = service.get_bookbacket_data();
}));

//category部分
app.use(controller.get('/category',function*(){
	this.set('Cache-Control','no-chache');
	this.body = yield render('category',{title:'类型'})
}));

app.use(controller.get('/ajax/category',function*(){
	this.set('Cache-Control','no-chache');
	this.body = service.get_category_data();
}));

//female部分
app.use(controller.get('/female',function*(){
	this.set('Cache-Control','no-chache');//页面不缓存，设置http返回头不缓存；
	this.body = yield render('female',{title:'女生频道'});//es6 异步执行
}));


app.use(controller.get('/ajax/channel/female',function*(){
	this.set('Cache-Control','no-chache');
	this.body = service.get_female_data();
}));

//male部分
app.use(controller.get('/male',function*(){
	this.set('Cache-Control','no-chache');//页面不缓存，设置http返回头不缓存；
	this.body = yield render('male',{title:'男生频道'});//es6 异步执行
}));

app.use(controller.get('/ajax/channel/male',function*(){
	this.set('Cache-Control','no-chache');
	this.body = service.get_male_data();
}));

//搜索添加一个路由接口，这里是通过线上接口
app.use(controller.get('/ajax/search',function*(){
	this.set('Cache-Control','no-chache');//页面不缓存，设置http返回头不缓存；
	var querystring = require('querystring');
	var params = querystring.parse(this.req._parsedUrl.query);//http反解到obj
	var start = params.start;
	var end = params.end;
	var keyword = params.keyword;
	this.body = yield service.get_search_data(start,end,keyword);//yield异步返回
}));

app.use(controller.get('/search',function*(){
	this.set('Cache-Control','no-chache');//页面不缓存，设置http返回头不缓存；
	this.body = yield render('search',{title:'搜索页面'});//es6 异步执行
}));

//reader

app.use(controller.get('/reader',function*(){
	this.set('Cache-Control','no-chache');//页面不缓存，设置http返回头不缓存；
	this.body = yield render('reader');//es6 异步执行
}));


app.listen(3001);
console.log('koa server is started~');