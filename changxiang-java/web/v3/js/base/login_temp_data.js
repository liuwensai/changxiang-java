//验证是否登录了
function checkLoginByAjax() {
	var isLogin = false;
	$.ajax({
		type : 'post',
		url : "/user/login!ajaxCheckLogin.action?t=" + new Date().getTime(),
		//url : "/ipub/user/user!toMain.action",
		async : false,
		cache : false,
		dataType : "text",
		success : function(data) {
			var returnObject = eval("(" + data + ")");
			if(returnObject.flag == 0){//没有登录
				isLogin = false;
			}else{
				isLogin = true;
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			showMessage(errorThrown);
		}
	});
	return isLogin;
}

//登陆
function to_login(bakUrl){
	window.location.href="/user/login.action?backurl="+bakUrl ;
}

//登陆之前写临时数据
function write_temp_login(temp_key , temp_value){
	var storage = window.localStorage ;
	if(storage){
		storage.setItem(temp_key,temp_value);
	}
	
//	var date = new Date();
//	date.setTime(date.getTime() + (5 * 60 * 1000));
//	$.cookie(temp_key, temp_value, { expires: date });
}

//登陆之后读临时数据，还原登陆前的场景
function read_temp_login(temp_key){
	var temp = "" ;
	var storage = window.localStorage ;
	if(storage){
		temp = storage.getItem(temp_key);
		storage.removeItem(temp_key);
	}
//	var temp = $.cookie(temp_key); //读取出cookie中的值
//	$.removeCookie(temp_key); //再删除cookie中的值
	return temp ;
}

function read_temp_noDel(temp_key){
	var temp = "" ;
	var storage = window.localStorage ;
	if(storage){
		temp = storage.getItem(temp_key);
	}
	return temp ;
}

//删了缓存标记
function del_temp_login(temp_mark){
	var storage = window.localStorage ;
	if(storage){
		storage.removeItem(temp_mark);
	}
	//$.removeCookie(temp_mark);
}

//判断临时值是否存在
function temp_login_exist(temp_mark){
	var isexist = true ;
	var tp_mark =read_temp_login(temp_mark); //读取出cookie中的值
	if(!tp_mark){
		isexist = false ;
	}
	return isexist ;
}

