<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page import="com.caipiao.pay.huichao.MD5"%>
<%@page import="com.caipiao.service.my.MyRechangeService"%>
<%@page import="com.caipiao.entity.Bc_rech"%>
<%@page import="com.caipiao.utils.TryStatic"%>
<%@page import="com.caipiao.entity.Bc_user"%>
<%@page import="com.caipiao.service.systeminit.UserStatic"%>
<%@page import="com.caipiao.utils.SystemSet"%>

<% 
 //字符编码
    String characterEncoding = "UTF-8";
	request.setCharacterEncoding(characterEncoding);

    String version = request.getParameter("Version");
    String merchNo = request.getParameter("MerchantCode");
    String orderId = request.getParameter("OrderId");
    String orderDate = request.getParameter("OrderDate");
    String amount = request.getParameter("Amount");
    String tradeIp = request.getParameter("TradeIp");
    String serialNo = request.getParameter("SerialNo");
    String payCode = request.getParameter("PayCode");
    String state = request.getParameter("State");
    String message = request.getParameter("Message");
    String finishTime = request.getParameter("FinishTime");
    String signValue = request.getParameter("SignValue");
    String md5Key = SystemSet.paytype.getProperty("xbei_md5key");
    
    StringBuffer md5Src = new StringBuffer(); 
	md5Src.append("Version=[");
	md5Src.append(version).append("]");
	md5Src.append("MerchantCode=[");
	md5Src.append(merchNo).append("]");
	md5Src.append("OrderId=[");
	md5Src.append(orderId).append("]");
	md5Src.append("OrderDate=[");
	md5Src.append(orderDate).append("]");
	md5Src.append("TradeIp=[");
	md5Src.append(tradeIp).append("]");
	md5Src.append("SerialNo=[");
	md5Src.append(serialNo).append("]");
	md5Src.append("Amount=[");
	md5Src.append(amount).append("]");
	md5Src.append("PayCode=[");
	md5Src.append(payCode).append("]");
	md5Src.append("State=[");
	md5Src.append(state).append("]");
	md5Src.append("FinishTime=[");
	md5Src.append(finishTime).append("]");
	md5Src.append("TokenKey=[");
	md5Src.append(md5Key).append("]");
	
	System.out.println("md5Src:" + md5Src);
	MD5 md5 = new MD5();
	String signSrc = md5.getMD5ofStr(md5Src.toString());
	if (signSrc.equals(signValue))
	{
		if ("8888".equals(state))
		{
			MyRechangeService dao =new MyRechangeService();
			Bc_rech en= dao.find(orderId);
			double rechmoney = TryStatic.StrToDouble(amount);
			if( null != en )
			{
				int sta = en.getRech_status();
				double money = en.getRech_money();
				if(0 == sta && rechmoney == money)
				{
					double newgive = 0;
					double xf = 1;
					
					int tk=0;
					try{
						tk = dao.findUserDrawCount(en.getUser_id());
					}finally{}
					
					if (tk == 0)
					{
						newgive = money * 0.1;
						newgive = newgive>= 6000 ? 6000 : newgive;//赠送金额最高6000
					}
					
					//+++++++++++++++++++++++++++++++添加新的充值规则
					boolean up = dao.updateRech(en.getRech_id(), 1, newgive);
					if(up){
						Bc_user uen = UserStatic.find(en.getUser_id());
						double cm =  money + newgive;
						UserStatic.AddMoney(uen, cm, 0, orderId, 2, "微信支付", cm * xf);
						out.print("OK");
					} else 
					{
						out.println("Failed!");
					}
				} else 
				{
					out.println("Failed!");
				}
			} else
			{
				out.println("Failed!");
			}
		} else 
		{
			out.println("Failed, " + message);
		} 
	} else 
	{
    	out.println("Validation failed!");
    }
%>