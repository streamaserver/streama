(function () {
	_.mixin({
		pushOrReplace: pushOrReplace
	});


	function pushOrReplace(list, object) {
		if(_.find(list, {id: object.id})){
			list[_.indexOf(list, {id: object.id})] = object;
		}else{
			list.push(object);
		}
	}

})();
