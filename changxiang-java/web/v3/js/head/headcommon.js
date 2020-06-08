function userLogin() {
//	   var backUrl = window.location.href;
//	   if(backUrl.indexOf("backurl") == -1) {
//		   location.href = "/user/login.action?backurl="+backUrl;   
//	   }
	if(!checkLoginByAjax()){
		return ;
	}
	
}

function userInflow() {
	location.href = "/pay/user-pay.action";
}

function init_head(){   
	$.ajax({
			type:'post',
			url:"/ipub/user/user!toMain.action?t=" + new Date().getTime(),
			async:false,
			cache:false,
			dataType: "json", 
			success:function(jsonObj) {
				if(jsonObj!=null){
					if(jsonObj.flag==1){
						// 头部的用户名写入
                     var spanWelcome = $("#headWelcome");
						var jsonData=jsonObj.msg;
						spanWelcome.html("<a href=\"/user/user-center.action?handle=nosettle\">"+jsonData.username+"</a> | <a href=\"javaScript:logout()\">退出</a><br />");
						$("#loginbar").html("<a href=\"javaScript:userInflow()\">充值</a>");
						
						//底部写入
						$("#footBar").html("<a href=\"/user/user-center.action?handle=nosettle\">"+jsonData.username+"</a> | <a href=\"javaScript:logout()\">退出</a><br />");
					}else{
						var jsonData=jsonObj.msg;
						if(jsonData.cancellationState != null && jsonData.cancellationState != 0){
							if(location.href.indexOf('/user/login!cancellationResult.action') == -1)
								location.href='/user/login!cancellationResult.action';
							$("#footBar").html("<a href=\"/user/user-center.action?handle=nosettle\">"+jsonData.can_username+"</a> | <a href=\"javaScript:logout()\">退出</a><br />");
							
						}else{
							$("#headWelcome").html("");
							$("#loginbar").html("<a href=\"javaScript:userLogin()\">登录</a>");
							
							//底部写入
							$("#footBar").html("<a href=\"javaScript:userLogin()\">登录</a>");
						}
					}
				}
			}
		});		
}
init_head(); 

function logout() {
	   //1. 用aja调用注销action
		$.ajax({
		   url:"/user/login!ajaxLogout.action",
		   cache: false,
		   async : false,
		   dataType :"json",
		   success : function(data) {
			  if(data.flag == 3)
				  location.href='user/user!login.action';
			   location.reload(true);
		   }
	   });
}