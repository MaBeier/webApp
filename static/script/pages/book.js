var id=location.href.split('?id=').pop();
$.get('/ajax/book',function(d){
	new Vue({
		el:'#app',
		data:d,
		methods:{
			readBook:function(){
				location.href='/reader'
			}
		}
	});
},'json');