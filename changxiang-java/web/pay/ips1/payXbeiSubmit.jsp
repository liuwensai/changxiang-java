<%@page language="java" contentType="text/html;charset=utf-8"%>
<%@ page import="com.caipiao.pay.huichao.MD5"%>
<%@page import="com.caipiao.utils.TryStatic"%>
<%@page import="com.caipiao.entity.Bc_user"%>
<%@page import="com.caipiao.service.systeminit.UserStatic"%>
<%@page import="com.caipiao.service.my.MyRechangeService"%>
<%@page import="com.caipiao.utils.StaticItem"%>
<%@page import="com.caipiao.utils.TimeUtil"%>
<%@page import="com.sysbcjzh.utils.IPUtils"%>
<%@page import="com.caipiao.utils.SystemSet"%>
<%@page import="com.caipiao.utils.UserSession"%>

<html>
	<head>
		<title>To Xbei Page</title>
	</head>
	<%
	request.setCharacterEncoding("utf-8");
	
    String amount = request.getParameter("p3_Amt");  //支付金额
    amount = amount == null ? "" : amount;
	String remark = request.getParameter("pa_MP");
	remark = remark == null ? "" : remark;
	
	double money = TryStatic.StrToInt(amount);
	if (money < 50)
	{
		out.println("充值金额错误, 最少充值50!");
		return;
	}
	if (remark == null || "".equals(remark))
	{
		out.println(UserSession.loginstr);
		return;
	}
	
	Bc_user user = UserStatic.find(remark);
	if (user == null)
	{
		out.println("用户名不存在, 无法充值!");
		return;
	}
	
	// 创建充值订单
	String billNo = StaticItem.GetRechitem();//订单编号
	
	// 6 = 微信支付
	new MyRechangeService().Rech(user.getUser_name(), user.getUser_id(), billNo, money, 0, 6, remark);
	
	String md5Key = SystemSet.paytype.getProperty("xbei_md5key");// MD5key值
    String merNo = SystemSet.paytype.getProperty("xbei_merno");// 商户ID
	String remark2 = remark + "为订单(" + billNo + ")冲值";
	String orderTime = TimeUtil.getToday("yyyyMMddHHmmss");
	String asyNotifyUrl = "http://www.xxx.com/pay/xbei/payXbeiResult.jsp";
	String synNotifyUrl = asyNotifyUrl;
	String  payCode = "100040";
	String tradeIp = IPUtils.GetIP(request);
	
	StringBuffer md5Src = new StringBuffer(); 
	md5Src.append("Version=[V1.0]");
	md5Src.append("MerchantCode=[");
	md5Src.append(merNo).append("]");
	md5Src.append("OrderId=[");
	md5Src.append(billNo).append("]");
	md5Src.append("Amount=[");
	md5Src.append(amount).append("]");
	md5Src.append("AsyNotifyUrl=[");
	md5Src.append(asyNotifyUrl).append("]");
	md5Src.append("SynNotifyUrl=[");
	md5Src.append(synNotifyUrl).append("]");
	md5Src.append("OrderDate=[");
	md5Src.append(orderTime).append("]");
	md5Src.append("TradeIp=[");
	md5Src.append(tradeIp).append("]");
	md5Src.append("PayCode=[");
	md5Src.append(payCode).append("]");
	md5Src.append("TokenKey=[");
	md5Src.append(md5Key).append("]");
	
	System.out.println("md5Src:" + md5Src);
	MD5 md5 = new MD5();
	String signValue = md5.getMD5ofStr(md5Src.toString());
	
	out.println("Pay Order Submit Success, Please wait... ...");
%>
	<body onLoad="javascript:document.xbei.submit()">
		<form name="xbei" action="http://gateway.xbeionline.com/Gateway/XbeiPay" method="POST">
			<table align="center">
				<tr>
					<td></td>
					<td>
						<input type="hidden" name="Version" value="V1.0">
					</td>
				</tr>
				<tr>
					<td></td>
					<td>
						<input type="hidden" name="MerchantCode" value="<%=merNo%>">
					</td>
				</tr>
				<tr>
					<td></td>
					<td>
						<input type="hidden" name="OrderId" value="<%=billNo%>">
					</td>
				</tr>
				<tr>
					<td></td>
					<td>
						<input type="hidden" name="Amount" value="<%=amount%>">
					</td>
				</tr>
				<tr>
					<td></td>
					<td>
						<input type="hidden" name="AsyNotifyUrl" value="<%=asyNotifyUrl%>">
					</td>
				</tr>
				<tr>
					<td></td>
					<td>
						<input type="hidden" name="SynNotifyUrl" value="<%=synNotifyUrl%>">
					</td>
				</tr>
				<tr>
					<td></td>
					<td>
						<input type="hidden" name="OrderDate" value="<%=orderTime%>">
					</td>
				</tr>
				<tr>
					<td></td>
					<td>
						<input type="hidden" name="TradeIp" value="<%=tradeIp%>">
					</td>
				</tr>
				<tr>
					<td></td>
					<td>
						<input type="hidden" name="PayCode" value="<%=payCode%>">
					</td>
				</tr>
				<tr>
					<td></td>
					<td>
						<input type="hidden" name="Remark2" value="<%=remark2%>">
					</td>
				</tr>
				<tr>
					<td></td>
					<td>
						<input type="hidden" name="SignValue" value="<%=signValue%>">
					</td>
				</tr>
			</table>
		</form>
	</body>
</html>
