//验证是否登录了
function toCheckLogin(){
	var flag = false;
	$.ajax({
		type : 'post',
		url : "/ipub/user/authlogin!toCheckLogin.action",
		async : false,
		cache : false,
		dataType : "text",
		success : function(ckdata){
			var returnObject = eval("(" + ckdata + ")");
			if(returnObject.flag == 1 || returnObject.flag == 2){
				flag = true;
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown){
			showMessage(errorThrown);
		}
	});
	return flag;
}
// 去登录
function toAuthLogin(){
	$.ajax({
		type : 'post',
		url : "/ipub/user/authlogin!toCheckLogin.action",
		async : false,
		cache : false,
		dataType : "text",
		success : function(rtdata){
			var returnObject = eval("(" + rtdata + ")");
			if(returnObject.flag == 0){
				location.href = "/ipub/user/authlogin!toLogin.action?backurl=" + location.href;
			}else if(returnObject.flag == 2){
				location.href = "/user/login!bound.action?xmUserId=" + returnObject.msg + "&backurl" + location.href;
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown){
			showMessage(errorThrown);
		}
	});
}

// 注销
function toAuthLogout(){
	location.href = "/user/login!logout.action";
}

// 写临时数据
function toWriteTempData(key, value){
	var flag = false;
	$.ajax({
		type : 'post',
		url : "/ipub/user/authlogin!toWriteTempData.action",
		async : false,
		cache : false,
		data : {
			"key" : key,
			"value" : value
		},
		dataType : "text",
		success : function(wtdata){
			var returnObject = eval("(" + wtdata + ")");
			if(returnObject.flag == 1){
				flag = true;
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown){
			showMessage(errorThrown);
		}
	});
	return flag;
}

// 读取临时数据
function toReadTempData(key, value){
	var value = "";
	$.ajax({
		type : 'post',
		url : "/ipub/user/authlogin!toReadTempData.action",
		async : false,
		cache : false,
		data : {
			"key" : key
		},
		dataType : "text",
		success : function(rddata){
			var returnObject = eval("(" + rddata + ")");
			if(returnObject.flag == 1){
				value = returnObject.msg;
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown){
			showMessage(errorThrown);
		}
	});
	return value;
}