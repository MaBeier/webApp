$.get('/ajax/category',function(d){
	new Vue({
			el:'#category',
			data:{
				magazine:d.magazine,
				book:d.book,
				female:d.female,
				male:d.male
			}
		})
},'json')
