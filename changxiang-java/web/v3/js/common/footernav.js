function query_url_param(){
	var url = location.search;
	var q_param = new Object();
	if(url.indexOf("?") != -1){
		var strs = url.substr(1).split("&");
		for(var i = 0; i < strs.length; i++){
			q_param[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	return q_param;
}
function to_page_url_footer_nav(url, nav){
	if(url.indexOf("foot_page_nav=") == -1){
		url = url + (url.indexOf("?") == -1 ? "?" : "&") + "foot_page_nav=" + nav;
	}
	window.location.href = url;
}
$(function(){
	var foot_nav_html_value = "<nav class=\"i-navh\"><div class=\"i-nav\"><ul class=\"ui-avc nav_l\"><li id=\"footer_nav_gcdt\" class=\"b-flexi\" onclick=\"to_page_url_footer_nav('/', 'footer_nav_gcdt');\"><span class=\"nav_icon home\"></span><p>购彩大厅</p></li><li id=\"footer_nav_kjgg\" class=\"b-flexi\" onclick=\"to_page_url_footer_nav('/lotteryinfo/kjxx.action', 'footer_nav_kjgg');\"><span class=\"nav_icon kjgg\"></span><p>开奖公告</p></li><li id=\"footer_nav_wdzh\" class=\"b-flexi\"	onclick=\"to_page_url_footer_nav('/user/user-center.action', 'footer_nav_wdzh');\"><span class=\"nav_icon user\"></span><p>我的帐户</p></li></ul></div></nav>";
	$("#footer_nav_content").html(foot_nav_html_value);
	try{
		var q_param = query_url_param();
		var q_param_value = q_param["foot_page_nav"];
		if(!q_param_value){
			q_param_value = "footer_nav_gcdt";
		}
		$("#" + q_param_value).attr("class", "on");
	}catch(e){
	}
});
