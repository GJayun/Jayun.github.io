$().ready(function() {
	$(`
		<div class="container">
			<div class="atc-index-content atc-center" id="atcboard" style="padding: 0px !important">
			</div>
		</div>
	`).appendTo("#app");
	$(`
		<div id="article">
		</div>
	`).appendTo("#atcboard");
	
});