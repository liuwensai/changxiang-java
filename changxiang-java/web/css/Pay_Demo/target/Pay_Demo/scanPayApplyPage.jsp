<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.chinaxzr.test.config.PayConfig"%>
<html>

  <head>
    <title>扫码支付申请</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
  </head>
  <body>
  <%--<form name="MD5form" id="MD5form" method="post" action="/Pay%5FDemo/scanPay/pay">--%>
	  <form name="MD5form" id="MD5form" method="post"  action="">
	    <table width="50%" border="1" cellpadding="1" cellspacing="0" bgColor="#E9F4F9" class="tb26" align="center">
	    	<tr height="35">
	        <td width="100%" colspan="3" align="center" class="tb28">
	          扫码支付申请参数
	        </td>
	      </tr>
	      <tr>
	        <td width="40%" height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	          服务版本号:
	        </td>
	        <td width="60%" class="tb29" valign="bottom">
	          <input name="versionId" class="intext" type="text" size="48" maxlength="50" value="1.0">*
	        </td>
	      </tr>
	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	          订单金额:
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
	          <input name="orderDate" id="orderDate" class="intext" type="text" size="48" maxlength="20" value="">*（yyyyMMddHHmmss）
	        </td>
	      </tr>
	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	          货币类型:
	        </td>
	        <td class="tb29" valign="bottom">
	          <input name="currency" class="intext" type="text" size="48" maxlength="8" value="RMB">*
	        </td>
	      </tr>
	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	          交易类别:
	        </td>
	        <td class="tb29" valign="bottom">
	          <input name="transType" class="intext" type="text" size="48" maxlength="8" value="008">*
	        </td>
	      </tr>
	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	          异步通知URL:
	        </td>
	        <td class="tb29" valign="bottom">
	          <textarea name="asynNotifyUrl" id="asynNotifyUrl" class="intext" rows="2" cols="50" onpropertychange="checkLength(this,200);"
	            oninput="checkLength(this,200);">http://localhost:8080/Pay_Demo/verifyResultServlet</textarea>*
	        </td>
	      </tr>
	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	          同步返回URL:
	        </td>
	        <td class="tb29" valign="bottom">
	          <textarea name="synNotifyUrl" class="intext" rows="2" cols="50" onpropertychange="checkLength(this,120);"
	            oninput="checkLength(this,120);">http://m.test.foodmall.com</textarea>*
	        </td>
	      </tr>
	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	          加密方式:
	        </td>
	        <td class="tb29" valign="bottom">
	          <input name="signType" class="intext" type="text" size="48" maxlength="4" value="MD5">*
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
	          <input name="prdOrdNo" id="prdOrdNo" type="text" size="48"  maxlength="30" value="">*
	        </td>
	      </tr>
	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	             支付方式 :
	        </td>
	        <td class="tb29" valign="bottom">
	          <select name="payMode" id="payMode" >*
                  <option value="00021" >支付宝扫码</option>
                  <option value="00020" >银行卡</option>
                  <option value="00022" >微信扫码</option>
                  <option value="00051" >代付</option>
				  <option value="00032" >QQ扫码</option>
               </select>
	        </td>
	      </tr>
	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	             到账类型:
	        </td>
	        <td class="tb29" valign="bottom">
	          <select name="receivableType" id="receivableType" >*
                  <option value="D00" >D+0</option>
                  <option value="T01" >T+1</option>
               </select>
	        </td>
	      </tr>
	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	          商品单价:
	        </td>
	        <td class="tb29" valign="bottom">
	          <input name="prdAmt" class="intext" type="text" size="48"  maxlength="13" value="1">*（以分为单位）
	        </td>
	      </tr>
	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	          商品展示网址:
	        </td>
	        <td class="tb29" valign="bottom">
	          <textarea name="prdDisUrl" class="intext" rows="2" cols="50" onpropertychange="checkLength(this,120);"
	            oninput="checkLength(this,120);">http://www.icardpay.com</textarea>
	        </td>
	      </tr>
	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	          商品名称:
	        </td>
	        <td class="tb29" valign="bottom">
	          <input name="prdName" class="intext" type="text" size="48" maxlength="48" value="100元移动充值卡">
	        </td>
	      </tr>
	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	          商品简称:
	        </td>
	        <td class="tb29" valign="bottom">
	          <input name="prdShortName" class="intext" type="text" size="48" maxlength="48"  value="充值卡">
	        </td>
	      </tr>
	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	          商品描述:
	        </td>
	        <td class="tb29" valign="bottom">
	          <textarea name="prdDesc" class="intext" rows="2" cols="50" onpropertychange="checkLength(this,500);"
	            oninput="checkLength(this,500);">充值卡</textarea>
	        </td>
	      </tr>
	      <tr>
	        <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
	          扩展参数:
	        </td>
	        <td class="tb29" valign="bottom">
	          <input name="merParam" class="intext" type="text" size="48" maxlength="500" value="">
	        </td>
	      </tr>
			<tr>
				<td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
					加密字符串:
				</td>
				<td class="tb29" valign="bottom">
					<input name="signData" class="intext" type="text" size="48" maxlength="500" value="">
				</td>
			</tr>
	      <tr height="35">

	        <td width="100%" colspan="3" align="center" class="tb28">
			<input type="button" onclick="modify();" value="&nbsp;打印支付链接&nbsp;">
	          <input type="button" class="btn_2" value="&nbsp;提  交&nbsp;"onclick="tj();">
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
     function modify()
     {
         document.MD5form.action="/scanPay/pay?flag=0";
         document.MD5form.submit();
     }
     function tj()
	 {
         document.MD5form.action="/scanPay/pay?flag=1";
         document.MD5form.submit();
     }

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
    var hours = date.getHours();
    var mins = date.getMinutes();
    var secs = date.getSeconds();
    var msecs = date.getMilliseconds();
    if(hours<10) hours = "0"+hours;
    if(mins<10) mins = "0"+mins;
    if(secs<10) secs = "0"+secs;
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + hours+ seperator2 + mins
            + seperator2 + secs;
    return currentdate;
}

	</script>
</html>
