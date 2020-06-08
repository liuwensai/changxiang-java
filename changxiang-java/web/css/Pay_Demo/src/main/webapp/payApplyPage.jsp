<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>

<%@ page import="com.chinaxzr.test.config.PayConfig"%>

<%@ page import="com.alibaba.fastjson.JSONObject"%>
<%@ page import="com.alibaba.fastjson.JSONArray"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@ page isELIgnored="false"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>

	<style>
		.renzheng{width:600px;margin:auto; border-radius:10px; background:#FFF;}
		.td1{text-align:right; color:#09C; font-size:14px; font-weight:600;}
		.td2{text-align:left;}
		table{ width:60%; border-collapse: collapse; }
		table tr td{
			border: #DDD solid 1px;
			line-height: 30px;
		}
		table td div{display:-moz-inline-box;display:inline-block;width:100px;margin:0;padding:0;border:1px solid #ddd;}
	</style>
	<script type="text/javascript">
        function check(fileName,alertText){
            with(fileName){
                if(value==null || value==""){
                    alert(alertText);
                    return false;
                }else{
                    return true;
                }
            }
        }
        function checks(thisForm){
            with(thisForm){
                if(check(postUrl,"请输入请求地址")==false){
                    postUrl.focus();
                    return false;
                }
                if(check(svcName,"请输入服务名称")==false){
                    svcName.focus();
                    return false;
                }
                if(check(key,"请输入MD5密钥")==false){
                    key.focus();
                    return false;
                }
                if(check(merId,"请输入商户编号")==false){
                    merId.focus();
                    return false;
                }
                if(check(amt,"请输入订单金额")==false){
                    amt.focus();
                    return false;
                }
                if(check(merUrl,"请输入返回商户URL")==false){
                    merUrl.focus();
                    return false;
                }
                if(check(retUrl,"请输入结果通知URL")==false){
                    retUrl.focus();
                    return false;
                }
                if(check(tranChannel,"请选择交易渠道")==false){
                    tranChannel.focus();
                    return false;
                }
            }


        }
	</script>
</head>

<body>
<form name="MD5form" id="MD5form" method="post" action="/payApply/pay">
	<table class="table_ui" align="center">
		<tr>
			<td colspan="5" align="center">API支付</td>
		</tr>
		<tr height="35">
			<td width="100%" colspan="3" align="center" class="tb28">
				支付申请参数
			</td>
		</tr>
		<tr>
			
			<td width="40%" height="25"  class="tb27" align="left" valign="bottom">
				服务版本号:
			</td>
			<td width="60%" class="tb29" valign="bottom">
				<input name="versionId" class="intext" type="text" size="48" maxlength="50" value="1.0">*
			</td>
		</tr>
		<tr>

			<td height="25"  class="tb27" align="left" valign="bottom">
				订单金额:
			</td>
			<td class="tb29" valign="bottom">
				<input name="orderAmount" class="intext" type="text" size="48" maxlength="13" value="1">*（以分为单位）
			</td>
		</tr>
		<tr>

			<td height="25"  class="tb27" align="left" valign="bottom">
				卡类型:
			</td>
			<td class="tb29" valign="bottom">
				<input name="accountType" class="intext" type="text" size="48" maxlength="13" value="0">*（以分为单位）
			</td>
		</tr>
		<tr>

			<td height="25"  class="tb27" align="left" valign="bottom">
				银行编码:
			</td>
			<td class="tb29" valign="bottom">
				<input name="tranChannel" class="intext" type="text" size="48" maxlength="13" value="103">*（以分为单位）
			</td>
		</tr>
		<tr>

			<td height="25"  class="tb27" align="left" valign="bottom">

			</td>
			<td class="tb29" valign="bottom">
				<input name="swithFlg" class="intext" type="text" size="48" maxlength="13" value="0">*（以分为单位）
			</td>
		</tr>
		<tr>
			<td height="25"  class="tb27" align="left" valign="bottom">
				订单日期:
			</td>
			<td class="tb29" valign="bottom">
				<input name="orderDate" id="orderDate" class="intext" type="text" size="48" maxlength="20" value="">*（yyyyMMddHHmmss）
			</td>
		</tr>
		<tr>
			<td height="25"  class="tb27" align="left" valign="bottom">
				货币类型:
			</td>
			<td class="tb29" valign="bottom">
				<input name="currency" class="intext" type="text" size="48" maxlength="8" value="RMB">*
			</td>
		</tr>
		<tr>
			<td height="25"  class="tb27" align="left" valign="bottom">
				交易类别:
			</td>
			<td class="tb29" valign="bottom">
				<input name="transType" class="intext" type="text" size="48" maxlength="8" value="008">*
			</td>
		</tr>
		<tr>
			<td height="25"  class="tb27" align="left" valign="bottom">
				异步通知URL:
			</td>
			<td class="tb29" valign="bottom">
	          <textarea name="asynNotifyUrl" class="intext" rows="2" cols="50" onpropertychange="checkLength(this,200);"
						oninput="checkLength(this,200);">http://localhost:8090/merchant_order_demo/decryptVerifyResultServlet</textarea>*
			</td>
		</tr>
		<tr>
			<td height="25"  class="tb27" align="left" valign="bottom">
				同步返回URL:
			</td>
			<td class="tb29" valign="bottom">
	          <textarea name="synNotifyUrl" class="intext" rows="2" cols="50" onpropertychange="checkLength(this,120);"
						oninput="checkLength(this,120);">http://m.test.foodmall.com</textarea>*
			</td>

		</tr>
		<tr>
			<td height="25"  class="tb27" align="left" valign="bottom">
				加密方式:
			</td>
			<td class="tb29" valign="bottom">
				<input name="signType" class="intext" type="text" size="48" maxlength="4" value="MD5">*
			</td>
		</tr>
		<tr>
			<td height="25"  class="tb27" align="left" valign="bottom">
				商户编号 :
			</td>
			<td class="tb29" valign="bottom">
				<input name="merId" class="intext" type="text" size="48" maxlength="30" value="<%=PayConfig.merId%>">*
			</td>
		</tr>
		<tr>
			<td height="25"  class="tb27" align="left" valign="bottom">
				商品订单号 :
			</td>
			<td class="tb29" valign="bottom">
				<input name="prdOrdNo" id="prdOrdNo" type="text" size="48"  maxlength="30" value="">*
			</td>
		</tr>
		<tr>
			<td height="25"  class="tb27" align="left" valign="bottom">
				支付方式 :
			</td>
			<td class="tb29" valign="bottom">
				<input name="payMode" id="payMode" type="text" size="48"  maxlength="30" value="00020">*
			</td>
		</tr>
		<tr>
			<td height="25"  class="tb27" align="left" valign="bottom">
				到账类型:
			</td>
			<td class="tb29" valign="bottom">
				<input name="receivableType" id="receivableType" type="text" size="48"  maxlength="30" value="D00">*
			</td>
		</tr>
		<tr>
			<td height="25"  class="tb27" align="left" valign="bottom">
				商品单价:
			</td>
			<td class="tb29" valign="bottom">
				<input name="prdAmt" class="intext" type="text" size="48"  maxlength="13" value="1">*（以分为单位）
			</td>
		</tr>
		<tr>
			<td height="25"  class="tb27" align="left" valign="bottom">
				商品展示网址:
			</td>
			<td class="tb29" valign="bottom">
	          <textarea name="prdDisUrl" class="intext" rows="2" cols="50" onpropertychange="checkLength(this,120);"
						oninput="checkLength(this,120);">http://www.icardpay.com</textarea>
			</td>
		</tr>
		<tr>
			<td height="25"  class="tb27" align="left" valign="bottom">
				商品名称:
			</td>
			<td class="tb29" valign="bottom">
				<input name="prdName" class="intext" type="text" size="48" maxlength="48" value="100元移动充值卡">
			</td>
		</tr>
		<tr>
			<td height="25"  class="tb27" align="left" valign="bottom">
				商品简称:
			</td>
			<td class="tb29" valign="bottom">
				<input name="prdShortName" class="intext" type="text" size="48" maxlength="48"  value="充值卡">
			</td>
		</tr>
		<tr>
			<td height="25"  class="tb27" align="left" valign="bottom">
				商品描述:
			</td>
			<td class="tb29" valign="bottom">
	          <textarea name="prdDesc" class="intext" rows="2" cols="50" onpropertychange="checkLength(this,500);"
						oninput="checkLength(this,500);">充值卡</textarea>
			</td>
		</tr>
		<tr>
			<td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
				商品数量:
			</td>
			<td class="tb29" valign="bottom">
				<input name="pnum" class="intext" type="text" size="48" maxlength="500" value="1">
			</td>
		</tr>
		<tr>
			<td height="25"  class="tb27" align="left" valign="bottom">
				扩展参数:
			</td>
			<td class="tb29" valign="bottom">
				<input name="merParam" class="intext" type="text" size="48" maxlength="500" value="">
			</td>
		</tr>

		<tr>
			<td/>
			<td class="tb29" valign="bottom">
				<table>
					<c:forEach var="channels" varStatus="s" items="${obj.channels}" step="1">
						<c:choose>
							<c:when test="${s.index%4 == 0}">
								<tr style="font-size:12px;"></tr>
								<td></td>
								<td>
									<input name="tranChannel" type="radio" value="${channels.channelCode}" align="middle"/><img src="${channels.logoUrl}" style="width:100px;height:30px;" title="${channels.channelName}" alt="${channels.channelName}" align="middle" />
								</td>

							</c:when>
							<c:when test="${s.index%4 != 0}">
								<td>
									<input name="tranChannel" type="radio" value="${channels.channelCode}" align="middle"/><img src="${channels.logoUrl}" style="width:100px;height:30px;" title="${channels.channelName}" alt="${channels.channelName}" align="middle" />
								</td>
							</c:when>
						</c:choose>
					</c:forEach>
				</table>
			</td>
		</tr>
		<tr>
			<td colspan="5" align="center"><input type="submit" id="next" name="next" value="下一步"></td>
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
