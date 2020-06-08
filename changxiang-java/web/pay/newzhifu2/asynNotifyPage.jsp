<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.chinaxzr.test.config.PayConfig"%>
<html>


<head>
    <title>支付成功异步通知</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
</head>
<body>

<form name="MD5form" id="MD5form" method="post" action="/synNotifyApply/pay">
    <table width="50%" border="1" cellpadding="1" cellspacing="0" bgColor="#E9F4F9" class="tb26" align="center">
        <tr height="35">
            <td width="100%" colspan="3" align="center" class="tb28">
                支付成功异步通知
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
                同步通知URL:
            </td>
            <td class="tb29" valign="bottom">
	          <textarea name="asynNotifyUrl" class="intext" rows="2" cols="50" onpropertychange="checkLength(this,200);"
                        oninput="checkLength(this,200);">http://localhost:8080/Pay_Demo/verifyResultServlet</textarea>*
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
                订单的状态:
            </td>
            <td class="tb29" valign="bottom">
                <select name="orderStatus" id="orderStatus" >*
                    <option value="01" >支付成功</option>
                    <option value="00" >未支付</option>
                    <option value="02" >支付处理中</option>

                </select>
            </td>
        </tr>
        <tr>
            <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
                支付的金额:
            </td>
            <td class="tb29" valign="bottom">
                <input name="transType" class="intext" type="text" size="48" maxlength="8" value="" >*
            </td>
        </tr>
        <tr>
            <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
                商品订单号:
            </td>
            <td class="tb29" valign="bottom">
                <input name="prdOrdNo"  type="text" size="48"  maxlength="30" value="" readonly>*
            </td>
        </tr>
        <tr>
            <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
                支付平台订单号:
            </td>
            <td class="tb29" valign="bottom">
                <input name="payId" type="text" size="48"  maxlength="30" value="" >*
            </td>
        </tr>
        <tr>
            <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
                支付平成功时间:
            </td>
            <td class="tb29" valign="bottom">
                <input name="payTime" id="" type="text" size="48"  maxlength="30" value="" >*
            </td>
        </tr>
        <tr>
            <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
                 加密方式:
            </td>
            <td class="tb29" valign="bottom">
                <input name=signType""  type="text" size="48"  maxlength="30" value="MD5" readonly>*
            </td>
        </tr>
        <tr>
            <td height="25" bgcolor="#DDEEF8" class="tb27" align="left" valign="bottom">
                扩展参数:
            </td>
            <td class="tb29" valign="bottom">
                <input name="merParam"  type="text" size="48"  maxlength="30" value="">*
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
        document.getElementById("payTime").value=dateStr;
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
