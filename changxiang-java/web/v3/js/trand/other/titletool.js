/** 黄页支付* */
//Helper method for call Yellowpage native methods by allex.
function callNative(fn) {
	(function(e) {
		var t = "MiuiYellowPageApi", n = function(t) {
			try {
				e(t);
			} catch (n) {
				alert(n.message);
			}
		}, r = window, i = r[t];
		i ? n(i) : document.addEventListener("yellowpageApiReady", function(e) {
			setTimeout(function() {
				n(r[t]);
			}, 1);
		});
	})(function(api) {
		fn(api);
	});
}

//判断是否是黄页,true说明是，false说明不是
//date:2014-11-10
function to_check_huange_page() {
	var ua = window.navigator.userAgent.toLocaleLowerCase();
	if (ua.match("miuiyellowpage") && !ua.match("milife-o2o")) {
		return true;
	} else {
		return false;
	}
}

if(typeof confirm == "function"){confirmDialog = confirm;} //兼容confirm被confirmbuy占用的情况
//退出黄页
function to_close_huangye(t,isMiLife){	
	if (t == 'gohome' || confirmDialog("是否退出小米彩票？")) {
		if(isMiLife !== true){
			callNative(function(api) {
				api.call('goHome');	
			});	
		} else {
			callMIUI(function(api){
				api.finish();
			});
		}
	}
}
var current_huangye_parent_url = "/";
var current_app_from = 0;

//如果不是黄页,则展示导航标题
//date:2014-11-10
var current_huangye_excute = 1;

//加载黄页生活JS-SDK
//date:2015-12-18
function callMIUI(fn){
	loadScript("http://cdn.t.st.huangye.miui.com/yn/sdk/milife-1.0.2.js",function(){
		miui.config({
			debug:false,
			vendor:'xiaomicp',
			features: [
				{name:'listenBackPressed'},
				{name:'setTitle'},
				{name:'finish'},
				{name:'pay'}
			],
			permissions : [{
				origin :"http://cp.mi.com"
			}]
		});
		typeof fn == "function" && fn(miui);
	});
}

//判断是否是生活
//date:2015-12-18
function to_check_milife_page() {
	var ua = window.navigator.userAgent.toLocaleLowerCase();
	return ua.match("milife-o2o");
}

function to_display_title(url, t, b, isReturn) {
	var str = "";
	var back_url = typeof getQueryString == "function" ? getQueryString("back_url") : null;
	url = back_url ? back_url : url;
	if(to_check_milife_page()){ //必选先判断小米生活，因为小米生活ua包含miuiyellowpage
		if (!b) {
			current_huangye_parent_url = url;
		}
		if(current_huangye_excute>1){
			return;
		}
		current_huangye_excute++;
		callMIUI(function(miui){
			miui.ready(function(api){
				api.listenBackPressed({
					'url': location.href,
					'type': 0,
					'success': function(res) {
						var json = JSON.parse(res);
						if (+json.code == 0) {
							if (current_app_from == 10) {
								to_close_huangye(t,true);
							}else if (t == 'gohome') {
								to_close_huangye(t,true);
							} else {
								window.location.href = current_huangye_parent_url;
							}
						}
					}
				});
				/*var titles = document.getElementsByTagName("title")[0].innerHTML;
				api.setTitle({
				    'title':titles
				});*/
			});	
		});
	} else if (to_check_huange_page()) {
		if (!b) {
			current_huangye_parent_url = url;
		}
		if(current_huangye_excute>1){
			return;
		}
		current_huangye_excute++;
		/*var this_href = window.location.href;
		alert("yellow_page_bind_maps:"+yellow_page_bind_maps[this_href]);
		if(yellow_page_bind_maps[this_href]){
			alert(this_href);
			return;
		}
		yellow_page_bind_maps[this_href] = true;*/
		var qparmter = query_url_param();
		if (qparmter && qparmter["agent_type"]) {			
			current_app_from =parseInt(qparmter["agent_type"]);
		}
		// Call api method example
		callNative(function(api) {
			var titles = document.getElementsByTagName("title");
			api.call('setTitle', titles[0].innerHTML);
			api.on('backPressed', function(e) {
				if (current_app_from == 10) {
					api.call('goHome');	
				}else if (t == 'gohome') {
					to_close_huangye(t);
				} else {
					window.location.href = current_huangye_parent_url;
				}
				//return true;
			});
			api.on('homePressed',function(e){
				to_close_huangye(t);
			});
			if (t== 'gohome' || current_app_from != 10) {
				//$.ajax({
				//	type : "post",
				//	url : "/ipub/trade/issue!getAppkey.action",
				//	async : false,
				//	dataType : "text",
				//	success : function(ap) {
				//		var apMsg = eval("(" + ap + ")");
				//		if (apMsg.flag == 1) {
							api.call('setMerchant', ['2882303761517257250', '小米彩票' ]);
				//		}
				//	},
				//	error : function(XMLHttpRequest, textStatus, errorThrown) {
				//	}
				//});
			}
		});
	} else  if(t != 'gohome' && t != 'goindex'){
//		var location = "window.location.href";
//		str += '<div class="Top_head"><div class="Top_title"><div class="btn_Return" onclick="'+location+'=\''
//				+ url
//				+ '\'"><div class="i-Return"></div></div><div class="Returnfx"></div><div class="Top_titel">'
//				+ t + '</div></div></div>';
	}
	
	if(typeof pageloader != "undefined"){
		try{
			var currentPage = pageloader.getCurrentPage();
			if(currentPage){
				if(current_huangye_parent_url == "/"){
			    	current_huangye_parent_url = "index.html";
			    }
				currentPage.setAttribute("backurl",current_huangye_parent_url);
			}
		}catch(e){}
	}
	
	if(isReturn !== true){
		str && document.write(str);
	} else {
		return str;
	}
}

function  is_yellow_page(){
	return	to_check_huange_page();
}


/**
 * 生成tabs的HTML
 * @param on_tab [index|kjgg|recom|usercenter]
 * @returns {String}
 */
function to_display_tabs(on_tab){
	if(typeof appcm != "undefined"){
		return "";
	}
	var str = '';
	on_tab = on_tab ? on_tab : "index";
	
	str = '<link rel="stylesheet" href="/v3.0/css/nav.css?v=1.0" />'
		+ '<footer class="g-index_footer"><ul class="m-index_ft ui-avc">'
		+ '<li class="flex1 js-touch {{index_on}}" onclick="window.location.href=\'{{index_href}}\'"><i class="nav_icona"></i><p>首页</p></li>'
		+ '<li class="flex1 js-touch {{kjgg_on}}" onclick="window.location.href=\'{{kjgg_href}}\'"><i class="nav_iconb"></i><p>开奖信息</p></li>'
		+ '<li class="flex1 js-touch {{recom_on}}" onclick="window.location.href=\'{{recom_href}}\'"><i class="nav_iconc"></i><p>专家推荐</p></li>'
		+ '<li class="flex1 js-touch {{usercenter_on}}" onclick="window.location.href=\'{{usercenter_href}}\'"><i class="nav_icone"></i><p>我的彩票</p></li>'
		+ '</ul></footer>';
	
	var obj = {
		"index_href":"index.html",
		"kjgg_href":"newmicai/lotteryinfo/kjgg.html#?page=kjgg_index",
		"recom_href":"shopmicai/shoppage/recom/recom.html#?page=recom_list",
		"usercenter_href":"newmicai/user/user_center_index.html",
		"index_on":"",
		"kjgg_on":"",
		"recom_on":"",
		"usercenter_on":""
	};
	
	obj[on_tab + "_href"] = "javascript:void(0);";
	obj[on_tab + "_on"] = "on";
	
	for(var k in obj){
		str = str.replace("{{"+k+"}}", obj[k]);
	}
	return str;
}