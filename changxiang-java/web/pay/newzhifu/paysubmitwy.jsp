<%@ page language="java" pageEncoding="UTF-8"%><%@ page import="com.caipiao.pay.huichao.MD5" %>
<%@page import="com.caipiao.utils.TryStatic"%>
<%@page import="com.caipiao.entity.Bc_user"%>
<%@page import="com.caipiao.service.systeminit.UserStatic"%>
<%@page import="com.caipiao.service.my.MyRechangeService"%>
<%@page import="com.caipiao.utils.StaticItem"%>
<%@page import="com.caipiao.utils.TimeUtil"%>
<%@ page import="com.pay.*"%>
<%@ page import="java.util.*"%>
<%@ page import="org.apache.commons.codec.binary.Base64"%>
<%@ page import="net.sf.json.JSONObject"%>
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
	String tranChannel =  request.getParameter("pd_FrpId");// "100067"支付宝 "100040"微信   其他是银行卡
	double money = TryStatic.StrToInt(Amount);
	if (money>=50&&null!=pa_MP){
	    Bc_user find = UserStatic.find(pa_MP);
	    if (null!=find){
	     int uid = find.getUser_id();
		 //Amount="0.01"; //先写死一yuan
	     MyRechangeService dao = new MyRechangeService();
	     dao.Rech(find.getUser_name(), uid, BillNo, money, 0, 5, pa_MP);
		String charset = "utf-8";  
			String key ="21sWvG3AzTXM"; //商户秘钥
			String postUrl = "http://838pay.com/payment/PayApply.do"; //平台post地址
			String versionId = "1.0";//版本号 
			String orderAmount = Integer.parseInt(Amount)*100+"";//交易金额,分 （M）
			//jsonObject.put("transAmt",Integer.parseInt(Amount)*100);//金额
			//jsonObject.put("transAmt","100");//金额 先写死一分
			String orderDate = Signature.formateDateToString(new Date(), "yyyyMMddHHmmss");//订单日期（M）
			String currency = "RMB";//货币类型：RMB（M）
			String transType = "0008";//默认填写：0008（M）
			//String AdviceURL ="http://www.520babe.com/pay/newzhifu/notifywx.jsp";   //[必填]异步通知地址
			String asynNotifyUrl = "http://www.520babe.com/pay/newzhifu/notifywx.jsp";//支付异步返回地址
			String synNotifyUrl = "http://www.520babe.com/my/Rechange.jzh";//支付同步返回地址
			String signType = "MD5";//默认填写：0008（M）
			String merId =  "00000000518765";//商户ID
			String prdOrdNo =  BillNo;//  商品订单号（M） 
			String payMode =  "00020";//支付方式， 00022-微信扫码(固定值)（M）
			String receivableType = "D00";//到账类型（M）
			String prdName = "在线充值";//商品名称（M）
			String prdDesc =  "在线充值";//商品描述（M）
			SortedMap<String,String> nvps = new TreeMap<String, String>();
			nvps.put("versionId", versionId);
			nvps.put("transType", transType);
			nvps.put("payMode", payMode);
			nvps.put("orderAmount", orderAmount);
			nvps.put("orderDate", orderDate);
			nvps.put("currency", currency);
			nvps.put("asynNotifyUrl", asynNotifyUrl);
			nvps.put("synNotifyUrl", synNotifyUrl);
			nvps.put("signType", signType);
			nvps.put("merId", merId);
			nvps.put("prdOrdNo", prdOrdNo);
			nvps.put("receivableType", receivableType);
			nvps.put("prdName", prdName);
			nvps.put("prdDesc", prdDesc);
			nvps.put("tranChannel", tranChannel);
			nvps.put("pnum", "1");
			
			String sign = Signature.createSign(nvps,key);
			nvps.put("signData", sign);
	 %>
	 <form id="form1" name="form1" method="post" action="http://838pay.com/payment/PayApply.do">
    <input type="hidden" id="versionId" name="versionId" value="<%=versionId%>"/>
    <input type="hidden" id="transType" name="transType" value="<%=transType%>" />
    <input type="hidden" id="payMode" name="payMode" value="<%=payMode%>"/>
    <input type="hidden" id="orderAmount" name="orderAmount" value="<%=orderAmount%>" />

    <input type="hidden" id="orderDate" name="orderDate" value="<%=orderDate%>" />
    <input type="hidden" id="currency" name="currency" value="<%=currency%>" />
    <input type="hidden" id="asynNotifyUrl" name="asynNotifyUrl" value="<%=asynNotifyUrl%>"  />
    <input type="hidden" id="synNotifyUrl" name="synNotifyUrl" value="<%=synNotifyUrl%>" />
    <input type="hidden" id="signType" name="signType" value="<%=signType%>" />
	
	 <input type="hidden" id="merId" name="merId" value="<%=merId%>" />
	  <input type="hidden" id="prdOrdNo" name="prdOrdNo" value="<%=prdOrdNo%>" />
	   <input type="hidden" id="receivableType" name="receivableType" value="<%=receivableType%>" />
	    <input type="hidden" id="prdName" name="prdName" value="<%=prdName%>" />
    	    <input type="hidden" id="prdDesc" name="prdDesc" value="<%=prdDesc%>" />
			 <input type="hidden" id="tranChannel" name="tranChannel" value="<%=tranChannel%>" />	   
			 	 <input type="hidden" id="pnum" name="pnum" value="1" />	   
			<input type="hidden" id="signData" name="signData" value="<%=sign%>" />
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
