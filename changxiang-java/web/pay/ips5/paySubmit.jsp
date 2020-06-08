<%@page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="com.caipiao.utils.TryStatic"%>
<%@page import="com.caipiao.entity.Bc_user"%>
<%@page import="com.caipiao.service.systeminit.UserStatic"%>
<%@page import="com.caipiao.service.my.MyRechangeService"%>
<%@page import="com.caipiao.utils.StaticItem"%>
<%@page import="com.caipiao.utils.TimeUtil"%>
<%@page import="com.caipiao.utils.SystemSet"%>
<%@page import="com.caipiao.utils.UserSession"%>
<%@page import="java.text.DecimalFormat"%>
<%@page import="com.sysbcjzh.utils.StringUtils"%>

<html>
	<head>
		<title>To IPS Pay Page</title>
	</head>
	<%
	request.setCharacterEncoding("utf-8");
	
    String amount = request.getParameter("p3_Amt");  //支付金额
	String username = request.getParameter("pa_MP");
	username = username == null ? "" : username;
	String bankCode = request.getParameter("pd_FrpId");
	bankCode = bankCode == null ? "" : bankCode;
	//amount = "0.02";
	double money = TryStatic.StrToDouble(amount);
	if (money < 100)
	{
		out.println("充值金额错误, 最少充值50!");
		return;
	}
	DecimalFormat df = new DecimalFormat("######0.00");
    amount = df.format(TryStatic.StrToDouble(amount));
	
	if (username == null || "".equals(username))
	{
		out.println(UserSession.loginstr);
		return;
	}
	
	if (bankCode == null || "".equals(bankCode))
	{
		out.println("请选择充值支付银行卡类型!");
		return;
	}
	
	Bc_user user = UserStatic.find(username);
	if (user == null)
	{
		out.println("用户名不存在, 无法充值!");
		return;
	}
	
	// 创建充值订单
	String billNo = StaticItem.GetRechitem();//订单编号
	
	// 1 = 网银在线
	new MyRechangeService().Rech(user.getUser_name(), user.getUser_id(), billNo, money, 0, 1, username + "充值:" + amount);
	
	String md5Key = SystemSet.paytype.getProperty("ips_md5Key");// MD5key值
    String merNo = SystemSet.paytype.getProperty("ips_merchCode");// 商户ID
    String returnHost = SystemSet.paytype.getProperty("ips_returnHost");// 商户ID
    String account = SystemSet.paytype.getProperty("ips_account");// ips账户
    String orderTime = TimeUtil.getToday("yyyyMMddHHmmss");
    String date = TimeUtil.getToday("yyyyMMdd");
    String successUrl = "http://" + returnHost + "/pay/ips/payResult.jsp";
    //+ ":" + request.getServerPort() 
    System.out.print(successUrl);
    StringBuffer body = new StringBuffer();
    body.append("<body>");
    body.append("<MerBillNo>").append(billNo).append("</MerBillNo>");
    body.append("<Amount>").append(amount).append("</Amount>");
    body.append("<Date>").append(date).append("</Date>");
    body.append("<CurrencyType>156</CurrencyType>");
    body.append("<GatewayType>").append("01").append("</GatewayType>");
    body.append("<Lang>GB</Lang>");
    body.append("<Merchanturl><![CDATA[").append(successUrl).append("]]></Merchanturl>");
    body.append("<FailUrl><![CDATA[]]></FailUrl>");
    body.append("<Attach><![CDATA[").append(username).append("]]></Attach>");
    body.append("<OrderEncodeType>5</OrderEncodeType>");
    body.append("<RetEncodeType>17</RetEncodeType>");
    body.append("<RetType>1</RetType>");
    body.append("<ServerUrl><![CDATA[").append(successUrl).append("]]></ServerUrl>");
    body.append("<BillEXP></BillEXP>");
    body.append("<GoodsName><![CDATA[").append(username + "订单" + billNo + "充值" + amount).append("]]></GoodsName>");
    body.append("<IsCredit>1</IsCredit>");
    body.append("<BankCode>").append(bankCode).append("</BankCode>");
    body.append("<ProductType>1</ProductType>");
    body.append("</body>");
    
    String md5Src = body.toString() + merNo + md5Key;
    String signature = StringUtils.md5String(md5Src);
    
	StringBuffer orderXml = new StringBuffer();
    orderXml.append("<Ips><GateWayReq><head>");
    orderXml.append("<Version>v1.0.0</Version>");
    orderXml.append("<MerCode>").append(merNo).append("</MerCode>");
    orderXml.append("<MerName></MerName>");
    orderXml.append("<Account>").append(account).append("</Account>");
    orderXml.append("<MsgId>").append(orderTime).append("</MsgId>");
    orderXml.append("<ReqDate>").append(orderTime).append("</ReqDate>");
    orderXml.append("<Signature>").append(signature).append("</Signature>");
    orderXml.append("</head>");
    orderXml.append(body);
	orderXml.append("</GateWayReq>");
    orderXml.append("</Ips>");
	
	out.println("Payment Order Submit Success, Please wait... ...");
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<title>Payment online</title>
</head>
<body>

<br>
		<form name="xbei" action="https://gwapi.yemadai.com/pay/sslpayment" method="POST">
			<table align="center">
				<tr>
					<td></td>
					<td>
            <td><input type="hidden" name="MerNo" value="<%=MerNo%>"></td>
		</tr>
		<tr>
            <td><input type="hidden" name="BillNo" value="<%=BillNo%>"></td>
		</tr> 
		<tr>  
            <td><input type="hidden" name="Amount" value="<%=Amount%>"></td>
		</tr>		
		<tr>
            <td><input type="hidden" name="ReturnURL" value="<%=ReturnURL%>" ></td>
		</tr>
		<tr>
            <td><input type="hidden" name="AdviceURL" value="<%=AdviceURL%>" ></td>
		</tr>
		<tr>
            <td><input type="hidden" name="SignInfo" value="<%=SignInfo%>"></td>
		</tr>
		<tr>
            <td><input type="hidden" name="OrderTime" value="<%=OrderTime%>"></td>
		</tr>
		<tr> 
            <td><input type="hidden" name="Remark" value="<%=Remark%>"></td>
		</tr>

    </table>
    <p align="center"><input type="submit" name="b1" value="Payment"></p>
</form>
</body>
</html>