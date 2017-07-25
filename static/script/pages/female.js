$.get('/ajax/channel/female',function(d){
	new Vue({
		el:'#channel-h5__female',
		data:{
			items:d.items
			//items:d.items.data.data，
			// attention:d.items[0].data.data,
			// recommadation:d.items[1].data.data,
			// new:d.items[2].data.data,
			// finish:d.items[3].data.data
		}
	})
},'json')