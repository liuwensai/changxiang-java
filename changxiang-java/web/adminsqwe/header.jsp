<%@ page language="java" pageEncoding="utf-8"%>
<%@ include file="checkadmin.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
<HEAD>
<META http-equiv=Content-Type content="text/html; charset=utf-8">
<link href="css/admin.css" rel="stylesheet" type="text/css"/>
<script type="text/javascript" src="/js/jquery-1.7.2.min.js"></script>
  
</HEAD>
<BODY>
<div id="msgjj"></div>
<TABLE cellSpacing=0 cellPadding=0 width="100%" background="images/header_bg.jpg" border=0>
	<TR height=56>
    	<TD width=260><IMG height=56 src="images/header_left.jpg" width=260></TD>
    	<TD style="FONT-WEIGHT: bold; COLOR: #fff; PADDING-TOP: 20px" align="middle">
			当前用户：<%=request.getSession().getAttribute(UserSession.adminuser)%> &nbsp;&nbsp; 
			<a style="COLOR: #fff" href="/adminsqwe/UserSetPass.jsp" target=main>修改密码</a>&nbsp;&nbsp;
			<A style="COLOR: #fff" onclick="if (confirm('退出系统?')) return true; else return false;" href="/admin/AdminUser!Out.jzh" target=_top>退出系统</A>&nbsp;&nbsp;
			<a style="COLOR: #fff" target="_blank" href="/Index.jzh">进入网站首页</a> 
    	</TD>
    	<TD align=right width=268><IMG height=56 src="images/header_right.jpg" width=268></TD>
	</TR>
</TABLE>
<TABLE cellSpacing=0 cellPadding=0 width="100%" border=0>
  <TR bgColor=#1c5db6 height=4><TD></TD></TR>
</TABLE>
<audio src="/arrive.mp3" id="imAudio"></audio>

<script>   
     
function drawTip() {
	$.get("/admin/AdminCaiwu!DrawNew.jzh?xoqno="+new Date().getTime(),function(txt){
//$("#msgjj").append(txt);       
		    var audioEle = $("#imAudio")[0];  
		if(txt=="0") {
			//$("#msgjj").append("*");  
		} else {
			//$("#msgjj").append("-");       
			audioEle.play();
			//audioEle.play;	

			$.ajax({  
          type : "get",      
          url : "/admin/AdminCaiwu!DrawUpdate.jzh?xoqno="+new Date().getTime(),  
          async : false,  
          success : function(txt1){       
           //$("#msgjj").append(txt1);  
          }  
          });  
			
		     
		}        
		     
			//audioEle.pause();
			  
	   
		  
	});
	    
}        
setInterval("drawTip()",5000);
</script>


</BODY></HTML>
