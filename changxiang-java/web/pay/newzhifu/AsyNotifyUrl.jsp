<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.pay.*"%>
<%@ page import="java.io.*"%>
<%@page import="com.caipiao.service.my.MyRechangeService"%>
<%@page import="com.caipiao.entity.Bc_rech"%>
<%@page import="com.caipiao.service.systeminit.UserStatic"%>
<%@page import="com.caipiao.entity.Bc_user"%>
<%@page import="java.net.URLEncoder"%>
<%@page import="com.caipiao.utils.TryStatic"%>
<%@ page import="net.sf.json.JSONObject"%>
<%@ page import="java.text.*"%>
<%System.out.println("收到异步通知");
//Version=[V1.0]MerchantCode=[E00000]OrderId=[MR00000000]OrderDate=[2013120
//1112211]TradeIp=[127.0.0.1]PayCode =[100001]State=[8888]TokenKey=[123456]
String Version = request.getParameter("Version");
String MerchantCode = request.getParameter("MerchantCode");
String OrderId = request.getParameter("OrderId");
if(!LockMap.lockOrder(OrderId)){
 System.out.println("订单正在处理中");
 out.print("fail");

}else{
	System.out.println("订单加锁正在处理中");
	String OrderDate = request.getParameter("OrderDate");
	String TradeIp = request.getParameter("TradeIp");
	String SerialNo = request.getParameter("SerialNo");
	String Amount = request.getParameter("Amount");
	String PayCode = request.getParameter("PayCode");
	String State = request.getParameter("State");
	String FinishTime = request.getParameter("FinishTime");
	String TokenKey ="abbbAAABCD1234JDSA";
	String  SignValue = request.getParameter("SignValue");
	System.out.println("收到签名值为:"+SignValue);
	 StringBuilder signStr = new StringBuilder();
		signStr.append("Version=["+Version+"]")
			   .append("MerchantCode=["+MerchantCode+"]")
			   .append("OrderId=["+OrderId+"]")
			   .append("OrderDate=["+OrderDate+"]")
			   .append("TradeIp=["+TradeIp+"]")
			   .append("SerialNo=["+SerialNo+"]")
			   .append("Amount=["+Amount+"]")
			   .append("PayCode=["+PayCode+"]")
			   .append("State=["+State+"]")
			   .append("FinishTime=["+FinishTime+"]")
			   .append("TokenKey=["+TokenKey+"]");
		  System.out.println("加密前的值"+signStr.toString());
	 String  SignValue1 = md5.md5(signStr.toString()).toUpperCase();//签名值
	 System.out.println("加密后签名值为:"+SignValue1);
	 if(SignValue1.equals(SignValue)){
		System.out.println("验签成功");
		//请在这里加上商户的业务逻辑程序代码
			MyRechangeService dao =new MyRechangeService();
			Bc_rech en= dao.find(OrderId);
			if(null!=en){
				int sta = en.getRech_status();
				if(0==sta){
					double money = en.getRech_money();
					double rechmoney = en.getRech_money();
					if(rechmoney==money){
						double newgive = 0;
						int tk=0;
					/* 	try{
							tk = dao.findUserDrawCount(en.getUser_id());
						}finally{} */
						//+++++++++++++++++++++++++++++++注释原有的充值规则
						//if(tk==0){
							//if(money>=5000){
							//	newgive = money*0.05;
							//}else if(money>=100){
							//	newgive = money*0.03;
							//}
							//newgive = newgive>=5000?5000:newgive;//赠送金额最高5000
						//}
						//+++++++++++++++++++++++++++++++注释原有的充值规则

						//+++++++++++++++++++++++++++++++添加新的充值规则
						if(money>=100){
							newgive = money*0.1;
						}
						newgive = newgive>=6000?6000:newgive;//赠送金额最高6000
						//+++++++++++++++++++++++++++++++添加新的充值规则


						 boolean up = dao.updateRech(en.getRech_id(),1,newgive);
						if(up){
							Bc_user uen = UserStatic.find(en.getUser_id());
							String text = "";
							 if("100067".equals(PayCode))
								text = "支付宝充值"; //支付宝
							 else  if("100040".equals(PayCode))
								text = "微信充值"; //微信
							 else
								text = "银行卡充值"; //银行卡
							UserStatic.AddMoney(uen,money+newgive,0,OrderId,2,text,(money+newgive)*1);
						}
						out.print("OK");
						 
					}
				}else{
						System.out.println("订单状态不正确");
						out.print("FAIL");
					}
			 }else{
				System.out.println("订单没找到");
				out.print("FAIL");
			 }

	}else{
	System.out.println("验签失败");
		out.print("fail");
	}
	LockMap.unlockOrder(OrderId);
		System.out.println("订单解锁成功");

}

	 %>

