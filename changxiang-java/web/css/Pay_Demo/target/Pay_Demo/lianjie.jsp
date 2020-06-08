<%--
  Created by IntelliJ IDEA.
  User: 宝龙
  Date: 2017/6/22
  Time: 13:09
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@page import="com.chinaxzr.test.controller.ScanPayApplyController" %>
<%@page import="com.chinaxzr.test.util.Signature" %>
<%@ page import="com.chinaxzr.test.config.PayConfig" %>
<script src="/jquery/jquery-1.8.2.min.js" type="text/javascript"></script>
<script src="/jquery/jquery.qrcode.min.js" type="text/javascript"></script>
<%
    String path = request.getContextPath();
%>
<%
 String http = "http://pay.chinaxzf.com:8080/payment/ScanPayApply.do?";
String asynNotifyUrl =request.getParameter("asynNotifyUrl");
String currency= request.getParameter("currency");
String merId= request.getParameter("merId");
String orderAmount=request.getParameter("orderAmount");
String orderDate=request.getParameter("orderDate");
String payMode =request.getParameter("payMode");
String prdAmt =request.getParameter("prdAmt");
String prdDisUrl = request.getParameter("prdDisUrl");
String prdName =request.getParameter("prdName");
//prdName = new String(prdName.getBytes("iso-8859-1"),"utf-8");
String prdOrdNo = request.getParameter("prdOrdNo");
String prdShortName =request.getParameter("prdShortName");
   // prdShortName = new String(prdShortName.getBytes("iso-8859-1"),"utf-8");
    String receivableType=request.getParameter("receivableType");
String synNotifyUrl = request.getParameter("synNotifyUrl");
String transType =request.getParameter("transType");
String signType = request.getParameter("signType");
String versionId = request.getParameter("versionId");


String merParam=request.getParameter("merParam");
String prdDesc =request.getParameter("prdDesc");
//prdDesc = new String(prdDesc.getBytes("iso-8859-1"),"UTF-8");
    //userName = new String(userName.getBytes("iso-8859-1"),"gb2312");
String flag =request.getParameter("flag");
%>

<html>
<head>
    <title>Title</title>

</head>
<body>
<form id="md5" name="md5" action="qrcode.jsp">
<p ><%=http%>asynNotifyUrl=<%=asynNotifyUrl%>&amp;currency=<%=currency%>&flag=<%=flag%>&merId=<%=merId%>&orderAmount=<%=orderAmount%>&orderDate=<%=orderDate%>&payMode=<%=payMode%>&prdAmt=<%=prdAmt%>&prdDesc=<%=prdDesc%>&prdDisUrl=<%=prdDisUrl%>&prdName=<%=prdName%>&prdOrdNo=<%=prdOrdNo%>&prdShortName=<%=prdShortName%>&receivableType=<%=receivableType%>&signType=<%=signType%>&synNotifyUrl=<%=synNotifyUrl%>&transType=<%=transType%>&versionId=<%=versionId%>&key=Cl9vULwaquQV&signData=<%=request.getSession().getAttribute("signData")%></p>

</form>
</body>


</html>
