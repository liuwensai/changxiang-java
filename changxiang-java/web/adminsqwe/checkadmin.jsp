<%@ page language="java" pageEncoding="utf-8"%>
<%@ page import="com.caipiao.utils.UserSession"%>
<%
Object obj = session.getAttribute(UserSession.adminuser);
if(obj==null){
 out.print("<script>parent.location.href='/adminsqwe/login.jsp';</script>");
}
%>