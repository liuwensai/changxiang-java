<%@ page language="java" pageEncoding="UTF-8"%><%@ page import="com.pay.*"%>
<%@ page import="java.io.*"%>
<%@page import="com.caipiao.service.my.MyRechangeService"%>
<%@page import="com.caipiao.entity.Bc_rech"%>
<%@page import="com.caipiao.service.systeminit.UserStatic"%>
<%@page import="com.caipiao.entity.Bc_user"%>
<%@page import="java.net.URLEncoder"%>
<%@page import="com.caipiao.utils.TryStatic"%>
<%@ page import="net.sf.json.JSONObject"%>
<%!	String formatString(String text){ 
			if(text == null) {
				return ""; 
			}
			return text;
		}
%>
<%
	   String orderNo = formatString(request.getParameter("orderNo"));  //支付金额
		MyRechangeService dao =new MyRechangeService();
		Bc_rech en= dao.find(orderNo); //查询订单信息
		JSONObject retJson  = new JSONObject();
		if(null!=en){
			int status = en.getRech_status();
			retJson.put("respCode", "1");
			retJson.put("status", status);
			out.print(retJson.toString());
		}else{
			retJson.put("respCode", "0");
			out.print(retJson.toString());
		}
	  		
	   %>
	  