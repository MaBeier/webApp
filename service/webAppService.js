var fs = require('fs');
exports.get_test_data = function(){
	var content = fs.readFileSync('./mock/test.json','utf-8');
	return content;
}

//book部分
exports.get_book_data = function(id){
	if (!id) {
		id='18218';
	}

	var content = fs.readFileSync('./mock/book/'+id+'.json','utf-8');
	return content;
}

//访问章节数据
exports.get_chapter_data = function(){
	var content = fs.readFileSync('./mock/reader/chapter.json','utf-8');
	return content;
}

//访问章节内容data
exports.get_chapter_content_data=function(id){
	if(!id){id='1';}
	var content=fs.readFileSync('./mock/reader/data/data'+id+'.json','utf-8');
	return content;
}


//home部分
exports.get_index_data = function(){
	var content = fs.readFileSync('./mock/home.json','utf-8');
	return content;
}

//rank部分
exports.get_rank_data = function(){
	var content = fs.readFileSync('./mock/rank.json','utf-8');
	return content;
}

//bookbacket部分
exports.get_bookbacket_data = function(){
	var content = fs.readFileSync('./mock/bookbacket.json','utf-8');
	return content;
}

//category部分
exports.get_category_data = function(){
	var content = fs.readFileSync('./mock/category.json','utf-8');
	return content;
}

//female部分
exports.get_female_data = function(){
	var content = fs.readFileSync('./mock/channel/female.json','utf-8');
	return content;
}

//male部分
exports.get_male_data = function(){
	var content = fs.readFileSync('./mock/channel/male.json','utf-8');
	return content;
}

//----------------------------------------------------------------------

//common-header


//search 连通后端接口的方法
exports.get_search_data = function(start,end,keyword){
	return function(cb){
		var http = require('http');
		var qs = require('querystring');//这个模块是将对象转换成http查询参数
		var data = {
			s : keyword,
			start : start,
			end :end
		};
		//指定发送的接口 地址 端口 路径 方法
		var content = qs.stringify(data);
		var http_request = {
			hostname : 'dushu.xiaomi.com',
			port : 80,
			path : '/store/v0/lib/query/onebox?' +content
		}
		req_obj = http.request(http_request,function(_res){
			var content = '';
			_res.setEncoding('utf8');
			_res.on('data',function(chunk){
				content += chunk;
			});
			_res.on('end',function(){
				cb(null,content);
			});

		});
		//监听
		req_obj.on('error',function(){

		});
		req_obj.end();

	}
}