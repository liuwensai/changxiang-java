var base_url = "http://cp.mi.com/";
var img_url = base_url+"android_asset/www/";
var login_url = base_url;
var api_url = base_url+"api/data";
var act_url = base_url+"api/activity";
var pay_url = base_url;
var file_url = "http://data.xiaomicp.com/data/upload!downLoadFile.action?ftype=1&name=";
var yyag_url = "http://m.lemicp.com/";

/**
 * @param url:
 *            页面跳转到URL
 */
function to_page(url){
	open_page(url);
}

function AsciiToString(asccode) {
	return String.fromCharCode(asccode);
}

function decode(zipStr) {
	var uzipStr = "";
	for (var i = 0; i < zipStr.length; i++) {
		var chr = zipStr.charAt(i);
		if (chr == "+") {
			uzipStr += " ";
		} else if (chr == "%") {
			var asc = zipStr.substring(i + 1, i + 3);
			if (parseInt("0x" + asc) > 0x7f) {
				uzipStr += decodeURI("%" + asc.toString()
						+ zipStr.substring(i + 3, i + 9).toString());
				;
				i += 8;
			} else {
				uzipStr += AsciiToString(parseInt("0x" + asc));
				i += 2;
			}
		} else {
			uzipStr += chr;
		}
	}
	return uzipStr;
}

function open_page(url){
	if(!url){
		url = "index.html";
	}
	if(typeof appcm == "undefined"){
		window.location.href = url;
	} else {
		var reg = /(http|https|file):\/\/[\w\-_]*(\.[\w\-_]+)*([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;
		if(!reg.test(url)){
			if(!url || url == "/"){
				url = "file:///android_asset/www/index.html";
			} else if(url.substring(0,1) != "/"){
				url = "file:///android_asset/www/" + url;
			} else {
				url = "file://" + url;
			}
		}
		window.location.href = "cp://xiaomicp.com/webview?url=" + encodeURIComponent(url);
		
		//appcm.open(url);
	}
}

function cp_back(){
	if(typeof appcm == "undefined"){
		window.history.back();
	} else {
		appcm.finish();
	}
}

//获取参数
/*function getQueryString(name,url) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
}*/

function getQueryString(key, url) {
	if (typeof url === 'undefined') {
		url = location.href;
		if (url.indexOf('#'))
			url = url.split('#')[0];
	}
	var param = {};
	if (url.indexOf('?') == -1)
		return '';
	var tmp = url.split('?')[1].split('&');
	if(!tmp) { return undefined; }
	for(var i = 0;i < tmp.length;i++){
		var keyValue = tmp[i].split('=');
		param[keyValue[0]] = unescape(keyValue[1]);
	}
	return param[key];
}

function query_url_param(search){
	var url = search || location.search;
	var q_param = new Object();
	if(url.indexOf("?") != -1){
		var strs = url.substr(1).split("&");
		for(var i = 0; i < strs.length; i++){
			q_param[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	return q_param;
}

function getDataForAPI(param){
	var returnData = "";
	try{
		$.ajax({
			type : "get",
			url : api_url,
			async : false,
			cache:false,
			data:param,
			dataType : "json",
			success : function(rd) {
				if(rd.flag == 1)
					returnData = rd.msg;
				else{
					returnData = "";
					//open_message(rd.msg);
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
			}
		});
	}catch(e){}
	return returnData;
}

//用jsonp获取后台数据
function dojsonp(param,callbackfun,url){
	try{
		$.ajax({  
	        type : "get",  
	        async:true,
	        cache:false,
	        url : url||api_url,
	        data:param,
	        dataType : "jsonp",
	        jsonp: "jsonp_callback",
	        success : function(data){
	        	callbackfun(data);
	        }
	    }); 
	}catch(e){}
}

function hasScript(url){
	var scripts = document.querySelectorAll("script[src]");
	for(var i = 0; i < scripts.length; i++){
		if(url == scripts[i].src){
			return scripts[i];
		}
	}
	return false;
}

function loadScript(url,callback,reload,async) {
	var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement,
	script;
	
	if(!(url instanceof Array)){
		url = [url];
	}
	
	script = document.createElement("script");
	script.async = async || false;
	script.type = "text/javascript";
	var src = url.shift();
	if(reload === true){
		var suffix = (src.indexOf("?") > 0 ? "&" : "?") + "date=" + new Date().getTime();
		src += suffix;
	}
	script.src = src;
	var isHasScript = hasScript(script.src);
	if(!isHasScript){
		head.insertBefore(script, head.firstChild);
	}
	if(url.length || !!callback){
		if(isHasScript){
			if(url.length){
				loadScript(url,callback,async);
			} else {
				callback();
			}
			return;
		}
		script.onload = script.onreadystatechange = function() {
			if (script.readyState && /loaded|complete/.test(script.readyState)) {
				script.onreadystatechange = null;
			}
			if(url.length){
				loadScript(url,callback,async);
			} else {
				callback();
			}
		};
	}
}