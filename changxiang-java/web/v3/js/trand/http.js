
var base_url = "";

var api_url = base_url;
//var api_url = "http://192.168.2.65:8084/"+"api/data";	
//var pay_url = base_url;
//var file_url = "http://data.xiaomicp.com/data/upload!downLoadFile.action?ftype=1&name=";

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