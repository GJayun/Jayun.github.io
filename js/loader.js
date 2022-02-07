
$(`
	<div id="app">
	</div>
`).appendTo("body");

function load() {
	if (window._feInjection.subject=="404") {
		$(`
			<div class="container">
			<div class="atc-index-content atc-center" id="atcboard" style="padding: 0px !important">
			</div>
			</div>
			`).appendTo("#app");
		$(`
			<div id="article">
				<h1>404 Not Found</h1>
				<strong>很抱歉……</strong>
				当您发现此页面时，可能是相关功能尚未开发！
				<div>
					<a class="btn" href="javascript:history.back()" style="margin-top:10px;">返回上一页</a>
				</div>
			</div>
			`).appendTo("#atcboard");
		return;
	} 
	if (window._feInjection.course) {
		function BeginProblem() {
			$(`<style>
				.problem-settings {
					cursor: pointer;
					position: relative;
					display: inline-block;
					padding: 1px 5px 1px 5px;
					background-color: white;
					border: 1px solid #6495ED;
					color: cornflowerblue;
					border-radius: 3px;
					font-size: 12px;
					position: relative;
					top: -2px;
					margin: auto 4px;
				}
				.problem-settings.selected {
					background-color: cornflowerblue;
					border: 1px solid #6495ED;
					color: white;
				}
				.window {
					position: absolute;
					margin-top: 15px;
					width: 1100px;
					height: 300px;
					padding: 5px;
					background: white;
					color: black;
					border-radius: 7px;
				}
	
				.am-smallbtn {
					cursor: pointer;
					position: relative;
					display: inline-block;
					padding: 1px 5px 1px;
					color: white;
					border-radius: 3px;
					font-size: 12px;
					margin-left: 1px;
					margin-right: 1px;
				}
	
				.am-unselectable {
					-webkit-user-select: none;
					-moz-user-select: none;
					-o-user-select: none;
					user-select: none;
				}
	
				.problem-enabled{
					width: 49%;
					float: left;
				}
				.problem-disabled{
					width: 49%;
					float: right;
				}
	
				.small {
					font-size: 10px;
					color: #7f7f7f;
				}
				
				.inline-up {
					display: inline-block;
					vertical-align: top;
					margin-right: 10px;
				}
	
			</style>`).appendTo("head");
			$(`
				<div class="container">
					<div class="atc-index-content atc-center" id="atcboard" style="padding: 0px !important">
					</div>
				</div>
			`).appendTo("#app");
			
			const $pboard = $(`
				<div id="article">
					<p>请在选项中选择题目范围。如果已选择合适的范围，请按“开始”按钮。</p>
				</div>
			`).appendTo("#atcboard");       
			
			$st = $(`<button class="btn" style="float: right;">开始</button>`).appendTo("#article > p");
	
			const $board = $(`<span class="window">
				
				<ul></ul>
			</span>
			`).appendTo("#atcboard");
	
			var output = document.getElementById('article');
			var result;
			$.get(`/js/${window._feInjection.subject}.json`, function(data){
				const $ul = $board.children("ul").css("list-style-type", "none");
				const $menu = $(`<div id="menu" style="text-align: center;"></div>`).appendTo($ul);
				$("<br>").appendTo($ul);
				let $menuarr = [], $entries = [], chdata = [];
	
				for (var i = 0; i < data.arr.length; i++) {
					if (i == 0) 
						$menuarr.push($(`<div id="${i}" class="smallbtn-list"></div>`).appendTo($ul));
					$menuarr.push($(`<div id="${i}" class="smallbtn-list"></div>`).appendTo($ul).hide());
					$entries.push($(`<div class="problem-settings am-unselectable problem-entry">${data.arr[i].name}</div>`).appendTo($menu));
					if (!localStorage[window._feInjection.subject]) {
						let tmp = [];
						for (var j = 0; j < data.arr[i].arr.length; j++) {
							tmp.push(false);
						}
						chdata.push(tmp);
					}
				}
	
				if (localStorage[window._feInjection.subject]) {
					chdata = JSON.parse(localStorage[window._feInjection.subject]);
				}
	
				$entries[0].addClass("selected");
	
				function clickmenu ([$entry, $div]) {
					$entry.on("click", () => {
						$(".problem-entry").removeClass("selected");
						$entry.addClass("selected");
						$(".smallbtn-list").hide();
						$div.show();
					});
				}
	
				$.double = (func, first, second) => [func(first), func(second)]
	
				function clickitem ([$parent, obj_list, mlist]) {
					const $lists = $.double(([classname, desctext]) => $(`<span class="${classname}">
					<span class="small inline-up am-unselectable">${desctext}</span>
					<br>
					</span>`).appendTo($parent), ["problem-enabled", "已选择"], ["problem-disabled", "未选择"])
	
					obj_list.forEach((obj, index) => {
						const $btn = $.double(($p) => $(`<div class="am-smallbtn am-unselectable">${obj.name}</div>`).css("background-color", `#3498db`).appendTo($p), $lists[0], $lists[1])
						$.double((b) => {
							$btn[b].on("click", () => {
								$btn[b].hide()
								$btn[1 - b].show()
								mlist[index] = !! b
								localStorage.setItem(`${window._feInjection.subject}`, JSON.stringify(chdata));
							})
							if (mlist[index] == (!! b)) $btn[b].hide()
						}, 0, 1)
					})
				}
	
				for (var i = 0; i < data.arr.length; i++) {
					clickmenu([$entries[i], $menuarr[i]]);
					clickitem([$menuarr[i], data.arr[i].arr, chdata[i]]);
				}
	
				function Cog() {
					var ques = [];
	
					function startproblem () {
						$pboard.empty();
						$board.remove();
	
						if (ques.length == 0) {
							$pboard.remove();
							Swal.fire({
								title: '恭喜！',
								text: '您已做完所有题目！',
								type: 'success',
								showConfirmButton: false,
								timer: 1500
							}).then(() => {
								localStorage.removeItem("Now");
								BeginProblem();
							})
							return;
						}
	
						localStorage.Now = `{"subject": "${window._feInjection.subject}", "course": "${window._feInjection.course}", "ques": ${JSON.stringify(ques)}}`;
	
						let wflag = 0;
	
						$problemboard = $(`
							<p style="font-size: 2em;"></p>
						`).appendTo($pboard);
	
						$(`<p style="float: left; -webkit-user-select: none; user-select: none; cursor: pointer; color: #7a7a7a;">还有 ${ques.length} 道题！</p>`).prependTo($pboard);
						$cancel = $(`<p style="float: right; -webkit-user-select: none; user-select: none; cursor: pointer; color: #7a7a7a;"><i class="fa fa-times" style="margin-right: 3px"></i>取消答题</p>`).prependTo($pboard);
						
						$cancel.click(() => {
							Swal.fire({
								title: '您确定吗',
								text: "你将重新做题!",
								type: 'warning',
								showCancelButton: true,
								confirmButtonColor: '#3085d6',
								cancelButtonColor: '#d33',
								confirmButtonText: '是',
								cancelButtonText: '否'
							}).then((result) => {
								if (result.value) {
									localStorage.removeItem("Now");
									$pboard.remove();
									BeginProblem();
									Swal.fire({
										type: 'success',
										title: '成功！',
										text: '您已成功取消做题',
										showConfirmButton: false,
										timer: 1500
									})
								}
							})
							return;
						});
	
						var len = ques.length - 1;
						$problem = $(md.render(`$$\\text{${ques[len].ac[0]}}$$`)).appendTo($problemboard);
	
						$wanswer = [], $aanswer = $(`<button class="btn" style="width: 100%; text-align: left; margin: 3px;">${md.render(data.word[ques[len].ac[0]].zh)}</button>`);
						let index = Math.floor(Math.random() * 4);
						for (var i = 0; i < ques[len].wr.length; i++) {
							if (index == i) $aanswer.appendTo($pboard);
							if (data.word[ques[len].wr[i]]) {
								$wanswer.push($(`<button class="btn" style="width: 100%; text-align: left; margin: 3px;">${md.render(data.word[ques[len].wr[i]].zh)}</button>`).appendTo($pboard));
							}
						}
						if (index == 3) $aanswer.appendTo($pboard);
	
						function solution () {
							let $sol;
							if (data.word[ques[len].ac[0]].so)
							$sol = $problemboard.after($(`
							<p><strong>解析：</strong></p><div>${md.render(data.word[ques[len].ac[0]].so)}</div>
							`));
							for (var i = 0; i < ques[len].wr.length; i++) {
								$(`<div style="float: right; color: #a00;">${md.render(`$\\text{${ques[len].wr[i]}}$`)}</div>`).prependTo($wanswer[i]);
							}    
	
							$problemboard.after(md.render(`**答案：**<div style="color: #22ab00;">${data.word[ques[len].ac[0]].zh}</div>`));
							
							if (wflag == 1) {
								let tmp = ques;
								for (var i = 1.0; ques.length - Math.floor(i) - 1 >= 0; i *= 1.65) {
									if (ques[ques.length - Math.floor(i) - 1] == ques[ques.length-1]) continue;
									tmp.splice(ques.length - Math.floor(i) - 1, 0, ques[ques.length-1]);
								}
								ques = tmp;
							} 
							ques.length--;
	
							$nxtboard = $(`<div style="text-align: center;"></div>`).appendTo($pboard);
							$nxt = $(`<button class="btn orange" style="margin: 3px;">${!ques.length? "完成答题": "下一题"}</button>`).appendTo($nxtboard);
							$nxt.click(() => {
								startproblem();
							})
						}
	
						for (var i = 0; i < $wanswer.length; i++) {
							$wanswer[i].click(() => {
								if (wflag == 0) {
									wflag = 1;
									Swal.fire({
										type: 'error',
										title: '答错了！',
										showConfirmButton: false,
										timer: 1500
									})
									solution(); 
								}
							})
						}
	
						$aanswer.click(() => {
							if (wflag == 0) {
								wflag = 2;
								Swal.fire({
									type: 'success',
									title: '答对了！',
									showConfirmButton: false,
									timer: 1500
								})
								solution(); 
							}
						});
					}
					
					if (localStorage.Now) {
						let dat = JSON.parse(localStorage.Now);
						if (dat.course == "Cognition") {
							ques = dat.ques;
							startproblem();
						} else {
							$board.remove();
							$pboard.empty();
							$(`
								<p>您现在正在做题！</p>
								<a class="btn" href="/${dat.subject}/${dat.course}">返回至题目页面</a>
							`).appendTo($pboard);
						}
					}
	
					$st.click(() => {
						for (var i = 0; i < data.arr.length; i++) {
							for (var j = 0; j < chdata[i].length; j++)
								for (var k = 0; k < data.arr[i].arr[j].arr.length; k++)
									if (chdata[i][j]) ques.push(data.arr[i].arr[j].arr[k]);
						}
	
						function randArr(arr) {
							for (var i = 0; i < arr.length; i++) {
								var iRand = parseInt(arr.length * Math.random());
								var temp = arr[i];
								arr[i] = arr[iRand];
								arr[iRand] = temp;
							}
							return arr;
						}
	
						ques = randArr(ques);
	
						if (!ques.length) {
							Swal.fire({
								type: 'error',
								title: '很抱歉',
								text: '请先选择范围！',
								showConfirmButton: false,
								timer: 1500
							})
							// alert("请先选择范围！")
						} else {
							startproblem();
						}
					})
				}
	
				if (window._feInjection.course == "Cognition") Cog();
	
				// result = md.render(data);
				// output.innerHTML = result;
			});
		}
		BeginProblem();
	} else {
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
			
			var output = document.getElementById('article');
			var result;
			$.get("./index.txt",function(data){
				result = md.render(data);
				output.innerHTML = result;
			});
		});
	}
}

$().ready(function() {
	load();
	$(".load").remove();
	$(`
	<nav class="home">
		<div class="container">
			<a class="item " href="/">
				<div style="display: inline;">	
					<div class="logo">
						<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="100px" height="100px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">  <image width="100" height="100" x="0" y="0" href="data:image/png;base64,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"/></svg>
					</div>
					<div class="siteName">
						JayunWHK
					</div>
				</div>
			</a>
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