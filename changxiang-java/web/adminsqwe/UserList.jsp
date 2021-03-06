﻿<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title></title>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="/adminsqwe/css/admin.css">
<script language="javascript" type="text/javascript" src="/js/jquery-1.7.2.min.js"></script>
<script language="javascript" type="text/javascript" src="/js/My97DatePicker/WdatePicker.js"></script>
</head>
<body>
	<table class="mtb" cellspacing="0" style="width:95%;margin:auto"> 
		<caption>用户列表管理</caption>
		<tr>
			<td><form action="/admin/AdminUser.jzh" method="get">条件查询：用户名：<input style="width:100px" name="u" type="text" value="${user}"/> | 真实姓名：<input style="width:100px" name="rm" type="text" value="${real}"/> | 余额大于：<input style="width:80px" name="m" type="text" value="${m}"/> | 状态：<select name="s"><option value="-1">全部</option><option value="0">正常</option><option value="1">停用</option></select> | 
			类型：<select name="t"><option value="-1">全部</option><option value="0">普通</option><option value="2">测试</option><option value="1">代理</option><option value="7">客服</option><option value="8">财务</option><option value="9">超级</option><option value="13">自动跟单账号</option><option value="14">自动发单账号</option></select> | 时间：<input onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})" style="width:100px" name="bt" value="${bt}"/> - <input onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})" style="width:100px" name="et" value="${et}"/> <input type="submit" value="搜索"/></form></td>
		</tr>
		<tr><td>便捷筛选：<a href="/admin/AdminUser.jzh">全部</a> | <a href="/admin/AdminUser.jzh?t=0">普通</a> | <a href="/admin/AdminUser.jzh?t=2">测试</a> | <a href="/admin/AdminUser.jzh?t=1">代理</a> | <a href="/admin/AdminUser.jzh?t=7">客服</a> | <a href="/admin/AdminUser.jzh?t=8">财务</a> | <a href="/admin/AdminUser.jzh?t=9">超级</a> | <a href="/admin/AdminUser.jzh?t=13">自动跟单账号</a> | <a href="/admin/AdminUser.jzh?t=14">自动发单账号</a></td></tr>
		<tr>
			<td align="center"><div class="my_page" style="height:40px;">
                <div id="page_wrapper" class="page">${page}</div>
            </div></td>
		</tr>
		<tr>
			<td>
				<table width="100%" id="databody">
					<thead>
					<tr class="tit">
						<td>用户名</td>
						<td>余额</td>
						<td>冻结金额</td>
						<td>红包</td>
						<td>积分</td>
						<td>类型</td>
						<td>状态</td>
						<td>真实姓名</td>
						<td>手机</td>
						<td>QQ</td>
						<td>上级</td>
						<td>注册时间</td>
						<td>最新登录</td>
						<td>登录IP</td>
						<td>操作</td></tr>
					<thead>
					<tbody>
<c:forEach var="d" items="${find}">
	<tr><td><a href="/admin/AdminUser!Desc.jzh?i=${d.user_id}">${d.user_name}</a></td>
		<td>￥<c:choose>
<c:when test="${d.user_money>0}"><span style="color:red">${d.user_money}</span></c:when>
<c:otherwise>${d.user_money}</c:otherwise></c:choose></td>
		<td>￥<c:choose>
<c:when test="${d.user_dong>0}"><font style="color:#ff6600">${d.user_dong}</font></c:when>
<c:otherwise>${d.user_dong}</c:otherwise></c:choose></td>
		<td>￥${d.user_red}</td>
		<td>${d.user_point}</td>
		<td>
<c:choose>
<c:when test="${14 eq d.user_type}"><span style="color:#FF00FF">自动发单账号</span></c:when>
<c:when test="${13 eq d.user_type}"><span style="color:#00EC00">自动跟单账号</span></c:when>
<c:when test="${9 eq d.user_type}"><span style="color: red">超级</span></c:when>
<c:when test="${8 eq d.user_type}"><span style="color: red">财务</span></c:when>
<c:when test="${7 eq d.user_type}"><span style="color: red">客服</span></c:when>
<c:when test="${2 eq d.user_type}"><span style="color:#C75F3E">测试</span></c:when>
<c:when test="${1 eq d.user_type}"><span style="color:#C75F3E">代理</span>|[<a href="/admin/AdminUser.jzh?uid=${d.user_id}">更多</a>]</c:when>
<c:when test="${0 eq d.user_type}"><span>普通</span></c:when>
<c:otherwise>--</c:otherwise></c:choose>
		</td>
		<td>
<c:choose>
<c:when test="${1 eq d.user_status}"><span style="color:red">停用</span></c:when>
<c:when test="${0 eq d.user_status}"><span>正常</span></c:when>
<c:otherwise>--</c:otherwise></c:choose>
		</td>
		<td>${d.user_realname}</td>
		<td>${d.user_phone}</td>
		<td>${d.user_qq}</td>
		<td><div><c:choose>
			<c:when test="${d.user_upid>0}"><a style="color:red" href="/admin/AdminUser.jzh?uid=${d.user_upid}">${d.user_upname}</a></c:when>
			<c:otherwise>--</c:otherwise>
			</c:choose><a href="javascript:" style="color:" class="zkf">[更改]</a></div><div style="display:none;"><input type="text" value="${d.user_upname}"/><input type="button" class="zhuan" ids="${d.user_id}" value="确认"/><input type="button" class="quxiao" value="取消"/></div></td>
		<td>${d.user_regtime}</td>
		<td>${d.user_lgtime}</td>
		<td>${d.user_lgip}</td>
		<td><a href="/admin/AdminUser!UserEdit.jzh?uid=${d.user_id}">编辑</a></td></tr>
</c:forEach></tbody>
				</table>
			</td>
		</tr>
		<tr>
			<td align="center"><div class="my_page" style="height:40px">
                <div id="page_wrapper" class="page">${page}</div>
            </div></td>
		</tr>
	</table>
</body>
<script type="text/javascript">
$(function(){
	$('select[name=t]').val(${t});
	$('select[name=s]').val(${s});
	$('#databody .zkf').click(function(){
		var par = $(this).parent();
		par.hide();
		par.next().show();
	});
	$('#databody input.quxiao').click(function(){
		var par = $(this).parent();
		par.hide();
		par.prev().show();
	});
	$('#databody input.zhuan').click(function(){
		var usid = $(this).attr('ids');
		var upname = $(this).prev().val();
		$.post('/admin/AdminUser!Zhuan.jzh',{ids:usid,user:upname,t:new Date()},function(data){
			if(data=='0'){
				alert('修改上级成功！');location.reload();
			}else if(data=='-1'){
				alert('客户不存在，修改失败！');
			}else if(data=='1'){
				alert('上级不存在！客户转变为公共客户！');location.reload();
			}else if(data=='2'){
				alert('上级不是代理，修改失败！');
			}else if(data=='nologin'){
				alert('您权限不够或未登陆！');
				parent.location.href='/adminsqwe/login.jsp';
			}
		});
	});
});
</script>
</html>