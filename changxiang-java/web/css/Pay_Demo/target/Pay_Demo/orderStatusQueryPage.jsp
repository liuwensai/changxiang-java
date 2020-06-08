<%@ page language="java" pageEncoding="UTF-8"%>
<html>
	
	
  <head>
    <title>订单状态查询</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
  </head>
  <body>
	  <form name="MD5form" id="MD5form" method="post" action="/orderStatus/query">
	    <table width="50%" border="1" cellpadding="1" cellspacing="0" bgColor="#E9F4F9" class="tb26" align="center">
	    	<tr height="35">
	        <td width="100%" colspan="3" align="center" class="tb28">
	          订单状态查询参数
	        </td>
	      </tr>
	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	             商户编号 :
	        </td>
	        <td class="tb29" valign="bottom">
	          <input name="merId" class="intext" type="text" size="48" maxlength="30" value="">*
	        </td>
	      </tr>
	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	             订单号 :
	        </td>
	        <td class="tb29" valign="bottom">
	          <input name="prdOrdNo" id="prdOrdNo" type="text" size="80"  maxlength="30" value="">*
	        </td>
	      </tr>
	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	          加密方式:
	        </td>
	        <td class="tb29" valign="bottom">
	          <input name="signType" class="intext" type="text" size="48" maxlength="4" value="MD5" readonly>*
	        </td>
	      </tr>

	      <tr height="35">
	        <td width="100%" colspan="3" align="center" class="tb28">
	          <input type="submit" class="btn_2" value="&nbsp;提  交&nbsp;">
	          &nbsp;
	          <input type="reset" name="reset" class="btn_2"
	            value="&nbsp;返  回&nbsp;"
	            onClick="javascript:window.location='<%=request.getContextPath()%>/index.jsp'">
	        </td>
	      </tr>
	    </table>
	  </form>
  </body>
 <script type="text/javascript">
 function getNewID() { 	
		var Num=""; 
		for(var i=0;i<14;i++){ 
			Num+=Math.floor(Math.random()*10); 
		}
		//document.getElementById("prdOrdNo").value=Num; 
		var dateStr = getNowFormatDate(); 
		document.getElementById("orderDate").value=dateStr; 
	}
	getNewID();
	
function getNowFormatDate() {
var date = new Date();
var seperator1 = "";
var seperator2 = "";
var month = date.getMonth() + 1;
var strDate = date.getDate();
if (month >= 1 && month <= 9) {
 month = "0" + month;
}
if (strDate >= 0 && strDate <= 9) {
 strDate = "0" + strDate;
}

var Hour =  date.getHours();
if (Hour >= 0 && Hour <= 9) {
 Hour = "0" + Hour;
}

var Minute =  date.getMinutes();
if (Minute >= 0 && Minute <= 9) {
 Minute = "0" + Minute;
}

var Second =  date.getSeconds();
if (Second >= 0 && Second <= 9) {
 Second = "0" + Second;
}
var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
     + Hour + seperator2 + Minute
     + seperator2 + Second;
return currentdate;
}	
	</script>
</html>
