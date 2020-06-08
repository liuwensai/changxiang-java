<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.io.*"%>
<%@ page import="java.util.*"%> 
<%@ page import="java.text.SimpleDateFormat"%>
<%@page import="com.caipiao.utils.TryStatic"%>
<%@page import="com.caipiao.entity.Bc_user"%>
<%@page import="com.caipiao.service.systeminit.UserStatic"%>
<%@page import="com.caipiao.service.my.MyRechangeService"%> 
<%@page import="com.caipiao.utils.StaticItem"%>
<%@page import="com.caipiao.utils.TimeUtil"%> 
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<%
	///////////////////////////////////  接收请求参数  ////////////////////////////////////

	// 接收表单提交参数
	request.setCharacterEncoding("UTF-8");
	String appid = "3079911318";
	String money = request.getParameter("p_money");
	String lb = request.getParameter("p_type");
	String app_key = "7d67484d7570c5b70f4f58eb36650948";
	String Remark = request.getParameter("p_username") + "";
	//String order_no = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
	String  order_no = StaticItem.GetRechitem();//订单编号
	String data = order_no;
	String paytime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
	String url = "http://www.pk1175.com/my/Rechange!RechDesc.jzh";  
	StringBuffer signSrc = new StringBuffer();
	if (!"".equals(order_no)) {
		signSrc.append("ddh=").append(order_no).append("&");
	}
	if (!"".equals(data)) {
		signSrc.append("&name=").append(data).append("&");
	}
	if (!"".equals(money)) {
		signSrc.append("money=").append(money).append("&");
	}
	if (!"".equals(app_key)) {
		signSrc.append("key=").append(app_key);
	}



	double money1 = TryStatic.StrToInt(money);
	if (money1 >= 0 && null != Remark) {
		Bc_user find = UserStatic.find(Remark);
		if (null != find) {
			int uid = find.getUser_id();
			//Remark = uid+"";
			MyRechangeService dao = new MyRechangeService();
			int type=0;//对应网站的充值方式
			String zhifuway="";
			if(lb.equals("1")){//支付宝
				type=3;
				zhifuway="支付宝支付";
			}else if(lb.equals("2")){//qq				
				type=2;
				zhifuway="qq支付";
			}else if(lb.equals("3")){//微信
				type=6;
				zhifuway="微信支付";
			}
			dao.Rech(find.getUser_name(), uid, order_no, money1, 0, 8, "在线支付");
%>


<body onLoad="document.myform.submit();">
	<form name="myform" action="http://pay1.youyunnet.com/pay/"	 method="post">

		<input name="pid" type="hidden" id="pid" value="<%=appid%>" />
		<input name="data" type="hidden" id="data" value="<%=data%>" /> 
		<input name="money"type="hidden" id="money" value="<%=money%>" /> 
		<input name="url"type="hidden" id="url" value="<%=url%>" /> 
			
	</form>

</body>
<%
	} else {
%><body>用户名不存在
</body>
<%
	}
	} else {
%><body>用户名或者金额（最小50）错误
</body>
<%
	}
%>
</html>
