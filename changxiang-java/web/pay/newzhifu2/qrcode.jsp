<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
    <head>
        <script src="/jquery/jquery-1.8.2.min.js" type="text/javascript"></script>
        <script src="/jquery/jquery.qrcode.min.js" type="text/javascript"></script>
        
        <script type="text/javascript">
        	var retCode = '<%=request.getSession().getAttribute("retCode")%>';
        	var retMsg = '<%=request.getSession().getAttribute("retMsg")%>';	
        	var qrcode = '<%=request.getSession().getAttribute("qrcode")%>';
			$(document).ready(function(){
				if(retCode == '1'){
					$('#img-ewm').qrcode({width:260,height:260,correctLevel:0,text:qrcode,render:"table"});
				}else{
					alert(retCode+":"+retMsg);
				}
			});
			//window.open("lianjie.jsp");
		</script>
    </head>

    <body>
	    <div id="img-ewm" class="img-ewm"></div>

    </body>
</html>
