<%@ page language="java" pageEncoding="UTF-8"%><%@ page import="com.pay.*"%><%@ page import="java.util.*"%><%@ page import="java.io.*"%><%@page import="com.caipiao.service.my.MyRechangeService"%><%@page import="com.caipiao.entity.Bc_rech"%><%@page import="com.caipiao.service.systeminit.UserStatic"%><%@page import="com.caipiao.entity.Bc_user"%><%@page import="java.net.URLEncoder"%><%@page import="com.caipiao.utils.TryStatic"%><%@ page import="net.sf.json.JSONObject"%><%StringBuilder buffer = new StringBuilder();
	    String Secret = "e2FWSquXA2PZ";
		BufferedReader reader = null;
		try {
			Enumeration e = request.getParameterNames();
			SortedMap<String, String> map = new TreeMap<String, String>();
			while (e.hasMoreElements()) {
				String param = (String) e.nextElement();
				map.put(param, request.getParameter(param));
			}
			
			String signData = "";
			if(map.get("signData") != null) {
				signData = map.get("signData").toString();
			}
			
			boolean isSign = false;
			if("MD5".equalsIgnoreCase(map.get("signType").toString())){
				//#.md5编码并转成大写 签名：
				map.remove("signData");
				String sign = Signature.createSign(map,Secret);
				
				isSign = signData.equalsIgnoreCase(sign);
			}
	        if(isSign) //验签通过
	        {
				String out_trade_no = request.getParameter("prdOrdNo");//流水（合作方订单号）订单号
				String tranxSN = request.getParameter("payId");//流水（合作方订单号）订单号
				String transAmt = request.getParameter("orderAmount");//金额。（元）
				System.out.println("支付异步通知,订单号为:"+out_trade_no);
				String orderStatus  = request.getParameter("orderStatus");
				System.out.println("支付异步通知,orderStatus:"+orderStatus);
	        	if("01".equals(orderStatus)){//交易成功
					System.out.println("支付成功,订单号为:"+out_trade_no+"支付平台订单号为:"+tranxSN);
					//////////////////////////////////////////////////////////////////////////////////////////
		//请在这里加上商户的业务逻辑程序代码
		MyRechangeService dao =new MyRechangeService();
		Bc_rech en= dao.find(out_trade_no);
		if(null!=en){
			int sta = en.getRech_status();
			if(0==sta){
				double money = en.getRech_money();
				double rechmoney = en.getRech_money();
				if(rechmoney==money){
					double newgive = 0;
					int tk=0;
					try{
						tk = dao.findUserDrawCount(en.getUser_id());
					}finally{}
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
						UserStatic.AddMoney(uen,money+newgive,0,out_trade_no,2,"微信充值",(money+newgive)*1);
					}
				}
			}
		}
					out.print("SUCCESS");
	        	}else{
					out.print("FAIL");
				}
	        }
	        else
	        {
	        	System.out.println("Data checking Fail !");
				out.print("FAIL");
	        }
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
		}
	  		
	   %>