﻿<%@ page language="java" pageEncoding="UTF-8"%><%@ page import="com.caipiao.pay.huichao.MD5" %>
<%@page import="com.caipiao.utils.TryStatic"%>
<%@page import="com.caipiao.entity.Bc_user"%>
<%@page import="com.caipiao.service.systeminit.UserStatic"%>
<%@page import="com.caipiao.service.my.MyRechangeService"%>
<%@page import="com.caipiao.utils.StaticItem"%>
<%@page import="com.caipiao.utils.TimeUtil"%>
<%@ page import="com.pay.*"%>
<%@ page import="java.text.*"%>
<%@ page import="java.util.*"%>
<%@ page import="java.net.*"%>
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%!	String formatString(String text){ 
			if(text == null) {
				return ""; 
			}
			return text;
		}
%>

</head>
<body>

<%
	request.setCharacterEncoding("utf-8");
    String BillNo = StaticItem.GetRechitem();//订单编号
    String Amount = formatString(request.getParameter("p3_Amt"));  //支付金额
	System.out.println(Amount);
	String pa_MP = formatString(request.getParameter("pa_MP")); //用户
	double money = TryStatic.StrToInt(Amount);
	if (money>=50&&null!=pa_MP){
	    Bc_user find = UserStatic.find(pa_MP);
	    if (null!=find){
	     int uid = find.getUser_id();
		 //Amount="0.01"; //先写死一yuan
	     MyRechangeService dao = new MyRechangeService();
	     dao.Rech(find.getUser_name(), uid, BillNo, money, 0, 5, pa_MP);
		 String Version = "V1.0";
		 String OrderId = BillNo;
		 String AsyNotifyUrl = "http://www.520babe.com/pay/newzhifu/AsyNotifyUrl.jsp"; //异步地址
		 String SynNotifyUrl = "http://www.520babe.com/my/Rechange.jzh"; //同步地址
		 SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		 String OrderDate = sdf.format(new Date()); //订单时间
    String TradeIp = request.getRemoteAddr(); //ip
     String PayCode =  request.getParameter("pd_FrpId");// "100067"支付宝 "100040"微信   其他是银行卡
     String MerchantCode = "";
     if("100067".equals(PayCode))
     	MerchantCode = "E04264"; //支付宝
     else  if("100040".equals(PayCode))
     	MerchantCode = "E04263"; //微信
     else
     	MerchantCode = "E04265"; //银行卡
     String TokenKey = "abbbAAABCD1234JDSA";
     StringBuilder signStr = new StringBuilder();
    signStr.append("Version=["+Version+"]")
           .append("MerchantCode=["+MerchantCode+"]")
           .append("OrderId=["+OrderId+"]")
           .append("Amount=["+Amount+"]")
           .append("AsyNotifyUrl=["+AsyNotifyUrl+"]")
           .append("SynNotifyUrl=["+SynNotifyUrl+"]")
           .append("OrderDate=["+OrderDate+"]")
           .append("TradeIp=["+TradeIp+"]")
           .append("PayCode=["+PayCode+"]")
           .append("TokenKey=["+TokenKey+"]");
      System.out.println(signStr.toString());
     String  SignValue = md5.md5(signStr.toString()).toUpperCase();//签名值
	 %>
	 <form id="form1" name="form1" method="post" action="https://gws.xbeionline.com/Gateway/XbeiPay">
    <input type="hidden" id="Version" name="Version" value="<%=Version%>"/>
    <input type="hidden" id="MerchantCode" name="MerchantCode" value="<%=MerchantCode%>" />
    <input type="hidden" id="OrderId" name="OrderId" value="<%=OrderId%>"/>
    <input type="hidden" id="Amount" name="Amount" value="<%=Amount%>" />
    <input type="hidden" id="AsyNotifyUrl" name="AsyNotifyUrl" value="<%=AsyNotifyUrl%>" />
    <input type="hidden" id="SynNotifyUrl" name="SynNotifyUrl" value="<%=SynNotifyUrl%>" />
    <input type="hidden" id="OrderDate" name="OrderDate" value="<%=OrderDate%>"  />
    <input type="hidden" id="TradeIp" name="TradeIp" value="<%=TradeIp%>" />
    <input type="hidden" id="PayCode" name="PayCode" value="<%=PayCode%>" />
    <input type="hidden" id="CardNo" name="CardNo" value="" />
    <input type="hidden"  id="CardPassword" name="CardPassword" value="" />
    <input type="hidden"  id="QQ" name="QQ" value="" />
    <input type="hidden"  id="Telephone" name="Telephone" value="" />
    <input type="hidden"  id="GoodsName" name="GoodsName" value="" />
    <input type="hidden"  id="GoodsDescription" name="GoodsDescription" value="" />
    <input type="hidden"  id="Remark1" name="Remark1" value="" />
    <input type="hidden"  id="Remark2" name="Remark2" value="" />
    <input type="hidden"  id="SignValue" name="SignValue" value="<%=SignValue%>" />
</form>
 </body>
  <script type="text/javascript">
        document.all.form1.submit();
</script>
	 <%
		}
	}
               %>
	
</html>
