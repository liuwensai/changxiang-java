<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>Forward</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
  </head>
  <% 
  		request.setCharacterEncoding("utf-8");
  		String MerNo = request.getParameter("MerNo");
  		String BillNo = request.getParameter("BillNo");
  		String Amount = request.getParameter("Amount");
  		String ReturnURL = request.getParameter("ReturnURL");
  		String AdviceURL = request.getParameter("AdviceURL");
  		String SignInfo = request.getParameter("SignInfo");
  		String Remark = request.getParameter("Remark");
  		String defaultBankNumber = request.getParameter("defaultBankNumber");
  		String orderTime = request.getParameter("orderTime");
  		String products = request.getParameter("products");
  	%>
  <body onLoad="javascript:document.yeepay.submit()">
	<!---->
  	<form name="yeepay" action="https://gwapi.yemadai.com/pay/sslpayment" method="POST">
					<table align="center">
    					<tr>
      						<td></td>
      						<td><input type="hidden" name="MerNo" value="<%=MerNo%>"></td>
    					</tr>
					    <tr>
					      <td></td>
					      <td><input type="hidden" name="BillNo" value="<%=BillNo%>"></td>
					    </tr>
					    <tr>
					      <td></td>
					      <td><input type="hidden" name="Amount" value="<%=Amount%>"></td>
					    </tr>
					    <tr>
					      <td></td>
					      <td><input type="hidden" name="ReturnURL" value="<%=ReturnURL%>" ></td>
					    </tr>
						 <tr>
					      <td></td>
					      <td><input type="hidden" name="AdviceURL" value="<%=AdviceURL%>" ></td>
					    </tr>
					    <tr>
					      <td></td>
					      <td><input type="hidden" name="SignInfo" value="<%=SignInfo%>"></td>
					    </tr>
					    <tr>
					      <td></td>
					      <td><input type="hidden" name="Remark" value="<%=Remark%>"></td>
					    </tr>
						 <tr>
					      <td></td>
					      <td><input type="hidden" name="defaultBankNumber" value="<%=defaultBankNumber%>"></td>
					    </tr>
						 <tr>
					      <td></td>
					      <td><input type="hidden" name="OrderTime" value="<%=orderTime%>"></td>
					    </tr>
					    <tr>
					      <td></td>
					      <td><input type="hidden" name="products" value="<%=products%>"></td>
					    </tr>
  					</table>
				</form>
  </body>
</html>
