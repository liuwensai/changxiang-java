<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.io.*"%> 
<%@ page import="com.caipiao.pay.huichao.MD5"%>
<%@page import="com.caipiao.service.my.MyRechangeService"%>
<%@page import="com.caipiao.entity.Bc_rech"%>
<%@page import="com.caipiao.utils.TryStatic"%>
<%@page import="com.caipiao.entity.Bc_user"%>
<%@page import="com.caipiao.service.systeminit.UserStatic"%>
<%@page import="com.caipiao.pay.xinbei.SignUtil"%>

<%
	////////////////////////////////////  异步通知验签  ////////////////////////////////////

	// 接收智汇付返回的参数
	request.setCharacterEncoding("UTF-8");
	String ddh = (String) request.getParameter("ddh");
	String amount = (String) request.getParameter("money");
	String lb = (String) request.getParameter("lb");
	String name = (String) request.getParameter("name");
	String key1 = "7d67484d7570c5b70f4f58eb36650948";
	String key = (String) request.getParameter("key");
	String paytime = (String) request.getParameter("paytime"); 
	StringBuffer signSrc = new StringBuffer();
	if (!"".equals(ddh)) {
		signSrc.append("ddh=").append(ddh).append("&");
	}
	if (!"".equals(name)) {
		signSrc.append("name=").append(name).append("&");
	}
	if (!"".equals(amount)) {
		signSrc.append("money=").append(amount).append("&");
	}
	if (!"".equals(key)) {
		signSrc.append("key=").append(key1);
	}
	System.out.print("未加密字符串：-----------------------------"+signSrc.toString());
	System.out.print("key：-----------------------------"+key);
	String signInfo = signSrc.toString();
	PrintWriter pw = response.getWriter();
	// 验证签名
	boolean result = SignUtil.verifyData(key, signInfo);
	System.out.print("优云宝：-----------------------------"+result);
	System.out.print("优云宝金额：-----------------------------"+amount);
	if (key.equals(key1)||result) {
		System.out.print("成功：-----------------------------");
		// 验签成功，响应SUCCESS 
		MyRechangeService dao = new MyRechangeService();
		Bc_rech en = dao.find(name);
		
		//去掉分数取整数
		String arr[]=amount.split("[.]");
		String zhengshuString=arr[0];		
		double rechmoney = TryStatic.StrToDouble(zhengshuString);
		if (null != en) {
			int sta = en.getRech_status();
			if (0 == sta) {
				double money = en.getRech_money();
				if (rechmoney == money) {
					double newgive = 0;
					double xf = 1;
					int tk = 0;
					try {
						tk = dao.findUserDrawCount(en.getUser_id());
					} finally {
					}
	
					if (money >= 100) {
						newgive = money* 0.1;
					}
					//newgive = newgive >= 6000 ? 6000 : newgive;//赠送金额最高6000
					//+++++++++++++++++++++++++++++++添加新的充值规则
					//boolean up = dao.updateRech(en.getRech_id(), 1, newgive);
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
					boolean up = dao.updateRechs(en.getRech_id(), 1, newgive,type);
					if (up) {
						Bc_user uen = UserStatic.find(en.getUser_id());
						double cm = money + newgive;
						UserStatic.AddMoney(uen, cm, 0, name, 2, zhifuway, cm * xf);
					}
				}
			}
		}
		pw.write("ok"); // 验签成功，响应SUCCESS 
		System.out.println("验签结果result的值：" + result + " -->SUCCESS");
	} else {
		pw.write("Signature Error"); // 验签失败，业务结束  
		System.out.println("验签结果result的值：" + result + " -->Signature Error");
	}
	pw.flush();
	pw.close();

	System.out.println(
			"---------------------------------------------------------------------------------------------------------------------------------------------");
%>
