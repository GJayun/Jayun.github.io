$().ready(function() {
	$(".load").remove();
	$(`
	<nav class="home">
		<div class="container">
			<a class="item ${window._feInjection.subject == "home"? "active": ""}" href="/">
				<i class="fa fa-home"></i>
				首页
			</a>
			<a class="item ${window._feInjection.subject == "Chinese"? "active": ""}" href="/Chinese">
				<span style="font-family: 'KaTeX_Main';"><strong>中</strong></span>
				语文
			</a>
			<a class="item ${window._feInjection.subject == "English"? "active": ""}" href="/English">
				<span style="font-family: 'KaTeX_Main';">E</span>
				英语
			</a>
			<a class="item ${window._feInjection.subject == "Morolity-and-Law"? "active": ""}" href="/Morolity-and-Law">
				<i class="fa fa-book"></i>
				道德与法治
			</a>
		</div>
	</nav>
	`).appendTo("body");
});