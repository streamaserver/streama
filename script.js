$(document).ready(function () {
	$('#easy-setup-tabs a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	})
});