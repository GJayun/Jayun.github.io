$().ready(function() {
	$(".load").remove();
	$(`
	<nav class="home">
		<div class="container">
			<a class="item ${window._feInjection.subject == "home"? "active": ""}" href="/">
				<i class="fa fa-home"></i>
				首页
			</a>
			<a class="item ${window._feInjection.subject == "comment"? "active": ""}" href="javascript:void(0)">
				<i class="fa fa-comments"></i>
				讨论
			</a>
		</div>
	</nav>
	`).appendTo("body");
});