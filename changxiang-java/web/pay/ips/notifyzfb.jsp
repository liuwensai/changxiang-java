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


<html>
	
	
  <head>
    <title>异步通知/title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">    
  </head>
  <body>
	  <%
	  	StringBuilder buffer = new StringBuilder();
	    String Secret = "5A4E83405A57948D7F3E0DD57D22A5B6";
		BufferedReader reader = null;
		try {
			reader = new BufferedReader(new InputStreamReader(request.getInputStream(), "UTF-8"));
			String line = null;
			while ((line = reader.readLine()) != null) {
				buffer.append(line);
			}
			String content = new String(buffer.toString());
			//content = "TEST1115&encryptData=eyJyZXNwQ29kZSI6IjAxIiwicmVzcERlc2MiOiLmnKrmlK/ku5giLCJ0cmFueFNOIjoiMjAxNzAyMDYwMDA0NTA5MzkwIiwib3JkZXJObyI6IjczODIyOTcwMDIwMDMxIiwidHJhbnNBbXQiOiIwLjAxIiwib3V0Tm90aWZ5VXJsIjoiaHR0cDovL2ticy5wLmZvb2RtYWxsLmNvbS9vbmxpbmVQYXkvbm90aWZ5LmpzcCIsInBhcnRuZXIiOiJURVNUMTExNSIsIm1lbWJlck5vIjoiODM0NzU1MDczOTkwMDE0In0=&signData=5E496C1BB14EF8C5B61B9706427F812D";
			System.out.println("收到异步通知数据为:"+content);
			int a1 = content.indexOf("&encryptData=");
	        int a2 = content.indexOf("&signData=");
	        String resEncryptData = content.substring(a1+13 , a2);
	        //resEncryptData = new String(resEncryptData.getBytes("ISO-8859-1"),"UTF-8");
	        String ResSignData1 = content.substring(a2+10);
	        String ResDataCheck = new String(base64.decode(new String(resEncryptData)),"UTF-8") + Secret ; 
	        String retStr = new String(base64.decode(new String(resEncryptData)),"UTF-8");
	        System.out.println("解密出来的数据为:"+retStr);
	        if(md5.md5(ResDataCheck).toUpperCase().equals(ResSignData1)) //验签通过
	        {
	        	System.out.println("\r\n" + "Data checking Success !");
	        	JSONObject retJson = JSONObject.fromObject(retStr);
	        	String respCode = retJson.getString("respCode");//响应码
				String tranxSN = retJson.getString("tranxSN");//订单号
				String out_trade_no = retJson.getString("orderNo");//流水（合作方订单号）订单号
				String transAmt = retJson.getString("transAmt");//金额。（元）
				System.out.println("支付异步通知,订单号为:"+out_trade_no);
	        	if("00".equals(respCode)){//交易成功
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
						UserStatic.AddMoney(uen,money+newgive,0,out_trade_no,2,"支付宝充值",(money+newgive)*1);
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
			if (null != reader) {
				try {
					reader.close();
					reader = null;
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	  		
	   %>
	   <div id="img-ewm" class="img-ewm"></div>
	    
<!-- 	     <div id="pngHolder"></div>
 -->  
 </body>
 
</html>
