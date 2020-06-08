<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.chinaxzr.test.config.PayConfig"%>
<html>
	
	
  <head>
    <title>提现申请</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
  </head>
  <body>
  <%--<form name="MD5form" id="MD5form" method="post" action="/Pay%5FDemo/withdrawApply/pay">--%>
	  <form name="MD5form" id="MD5form" method="post" action="/withdrawApply/pay">
	    <table width="50%" border="1" cellpadding="1" cellspacing="0" bgColor="#E9F4F9" class="tb26" align="center">
	    	<tr height="35">
	        <td width="100%" colspan="3" align="center" class="tb28">
	          提现申请参数
	        </td>
	      </tr>
	      <tr>
	        <td width="40%" height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	          服务版本号:
	        </td>
	        <td width="60%" class="tb29" valign="bottom">
	          <input name="versionId" class="intext" type="text" size="48" maxlength="50" value="1.0" readonly>*
	        </td>
	      </tr>
	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	          订单金额(必填,分为单位):
	        </td>
	        <td class="tb29" valign="bottom">
	          <input name="orderAmount" class="intext" type="text" size="48" maxlength="13" value="1">*（以分为单位）
	        </td>
	      </tr>
	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	          订单日期:
	        </td>
	        <td class="tb29" valign="bottom">
	          <input name="orderDate" id="orderDate" class="intext" type="text" size="48" maxlength="20" value=""  readonly>*（yyyyMMddHHmmss）
	        </td>
	      </tr>
	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	          货币类型:
	        </td>
	        <td class="tb29" valign="bottom">
	          <input name="currency" class="intext" type="text" size="48" maxlength="8" value="RMB" readonly>*
	        </td>
	      </tr>
	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	          交易类别:
	        </td>
	        <td class="tb29" valign="bottom">
	          <input name="transType" class="intext" type="text" size="48" maxlength="8" value="0008" readonly>*
	        </td>
	      </tr>
	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	          异步通知URL:
	        </td>
	        <td class="tb29" valign="bottom">
	          <textarea name="asynNotifyUrl" class="intext" rows="2" cols="50" onpropertychange="checkLength(this,200);"
	            oninput="checkLength(this,200);">http://localhost:8080/Pay_Demo/verifyResultServlet</textarea>*
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
	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	             商户编号 :
	        </td>
	        <td class="tb29" valign="bottom">
	          <input name="merId" class="intext" type="text" size="48" maxlength="30" value="<%=PayConfig.merId%>">*
	        </td>
	      </tr>
	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	             商品订单号 :
	        </td>
	        <td class="tb29" valign="bottom">
	          <input name="prdOrdNo" id="prdOrdNo" type="text" size="48"  maxlength="30" value="" readonly>*
	        </td>
	      </tr>

	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	             到账类型:
	        </td>
	        <td class="tb29" valign="bottom">
	          <select name="receivableType" id="receivableType" readonly>*
                  <option value="D00" >D+0</option>
                  <option value="T01" >T+1</option>
               </select>
	        </td>
	      </tr>
	      
	      
	      
	      
	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	          对公对私标识(必填):
	        </td>
	        <td class="tb29" valign="bottom">
	          <input name="isCompay" class="intext" type="text" size="48"  maxlength="13" value="0">(0为对私，1为对公)
	        </td>
	      </tr>
	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	          手机号:
	        </td>
	        <td class="tb29" valign="bottom">
	          <input name="phoneNo" class="intext" type="text" size="48" maxlength="48" value="">
	        </td>
	      </tr>
	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	          账户名(必填):
	        </td>
	        <td class="tb29" valign="bottom">
	          <input name="customerName" class="intext" type="text" size="48" maxlength="48"  value="深圳市中林实业发展有限公司">
	        </td>
	      </tr>
	      
	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	          证件类型:
	        </td>
	        <td class="tb29" valign="bottom">
	          <input name="cerdType" class="intext" type="text" size="48" maxlength="48"  value="">
	        </td>
	      </tr>
	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	          证件号:
	        </td>
	        <td class="tb29" valign="bottom">
	          <input name="cerdId" class="intext" type="text" size="48" maxlength="48"  value="">
	        </td>
	      </tr>
	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	          开户行号:
	        </td>
	        <td class="tb29" valign="bottom">
	          <input name="accBankNo" class="intext" type="text" size="48" maxlength="48"  value="">
	        </td>
	      </tr>
	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	          开户行名称:
	        </td>
	        <td class="tb29" valign="bottom">
	          <input name="accBankName" class="intext" type="text" size="48" maxlength="48"  value="">
	        </td>
	      </tr>
	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	          银行账号(必填):
	        </td>
	        <td class="tb29" valign="bottom">
	          <input name="acctNo" class="intext" type="text" size="48" maxlength="48"  value="44201518300050002558">
	        </td>
	      </tr>
	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	         开户行联行名称:
	        </td>
	        <td class="tb29" valign="bottom">
	          <input name="rcvBranchName" class="intext" type="text" size="48" maxlength="48"  value="">
	        </td>
	      </tr>
	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	         开户行联行行号:
	        </td>
	        <td class="tb29" valign="bottom">
	          <input name="rcvBranchCode" class="intext" type="text" size="48" maxlength="48"  value="">
	        </td>
	      </tr>

			<tr>
				<td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
					出账类型:
				</td>
				<td class="tb29" valign="bottom">
					<input name="outaccounttype" class="intext" type="text" size="48" maxlength="48"  value="1">（1-用户（默认为1），2-商户）
				</td>
			</tr>
	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	         摘要:
	        </td>
	        <td class="tb29" valign="bottom">
	          <input name="note" class="intext" type="text" size="48" maxlength="48"  value="">
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
			document.getElementById("prdOrdNo").value=Num; 
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
