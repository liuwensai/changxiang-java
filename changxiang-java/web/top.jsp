﻿<%@ page language="java" pageEncoding="utf-8"%>
<%
/* out.println("require_once EMLOG_ROOT.'/txprotect.jsp';"); */
%>
<%@page import="com.caipiao.utils.UserSession"%>
<%@page import="com.caipiao.service.systeminit.UserStatic"%>
<%@page import="com.caipiao.entity.Bc_user"%>
<%
	String user="";
	double money=0d;
	Object obj = session.getAttribute(UserSession.bcjzhuser);
	if(null!=obj){
		Bc_user find = UserStatic.find(obj.toString());
		if(null!=find){
			user=find.getUser_name();money=find.getUser_money();
		}
	}
 %>
<noscript><div id="noScript"><div><h2>请开启浏览器的Javascript功能</h2><p>亲，没它我们玩不转啊！求您了，开启Javascript吧！<br/>不知道怎么开启Javascript？那就请<a href="http://www.baidu.com/s?wd=%E5%A6%82%E4%BD%95%E6%89%93%E5%BC%80Javascript%E5%8A%9F%E8%83%BD" rel="nofollow" target="_blank">猛击这里</a>！</p></div></div></noscript>
<nav id="topNav">
	<div id="topNavWrap">
		<div id="topNavLeft"><script>local.NavInit("<%=user%>","<%=money%>")</script></div>
		<ul id="topNavRight">
			<li><a href="/Index.jzh" target="_blank">首页</a>&nbsp;&nbsp;|</li>
			<li><a href="/Index!BuyHome.jzh" target="_blank">购彩中心</a>&nbsp;&nbsp;|</li>
			<li><a href="/Index!Award.jzh" target="_blank">全国开奖</a>&nbsp;&nbsp;|</li>
			<li><div class="mcDropMenuBox">
				<a target="_top" class="topNavHolder" href="/my/Index.jzh" rel="nofollow">我的彩票<i></i></a><b class="holderLine">|</b>
				<div class="mcDropMenu">
					<a href="/my/Index!Desc.jzh" rel="nofollow">我的订单</a>
					<a href="/my/Message.jzh" rel="nofollow">消息中心</a>
					<a href="/my/BaseInfo.jzh" rel="nofollow">个人资料</a>
					<!--<a href="/Welfare.jzh" rel="nofollow">公益活动</a>-->
				</div>
			</div></li>
            <li><a target="_blank" href="/News.jzh">资讯</a>&nbsp;&nbsp;|</li>
			<li><a target="_blank" href="/help/">帮助中心</a></li>
		</ul>
	</div>
</nav>
<header id="docHead" style="background-image:url('/ad/img/ad_head.png');"><div id="docHeadWrap">
	<a href="/Index.jzh" class="logoLnk" title="鼎盛网" hidefocus="true"><h1 rel="nofollow"><h1></a>
	<a href="/ad/adhead.html" rel="nofollow" class="guideLnk" target="_blank" hidefocus="true"></a>
	<p>
		<span class="serviceTel">
			<span class="serviceTel_tel"><span>客服QQ</span><br/><strong>14263926</strong></span>
            <a class="onlineService" href="http://wpa.qq.com/msgrd?v=3&uin=14263926&site=qq&menu=yes" target="_blank"></a>
		</span>
	</p>
</div></header>
<nav id="topTabBox">
	<div id="topTab">
		<ul id="funcTab">
			<li id="lotteryListEntry">
				<a class="topNavHolder" hidefocus="true" rel="nofollow">选择彩种<i></i></a>
				<div id="lotteryList" style="left:0px;display:none;">
					<div class="lotteryListWrap">
						<ul>
                    		<li class="zyGame"><a href="/lottery/Buy!Ssq.jzh"><em class="cz_logo35 logo35_ssq"></em><strong>双色球</strong><span class="grayWords" style="color:#9F5CE1">千万奖金不是梦</span></a></li>
                    		<li class="zyGame"><a href="/lottery/Buy!Dlt.jzh"><em class="cz_logo35 logo35_dlt"></em><strong>大乐透</strong><span class="grayWords" style="color:#FE5400">马年马上中大奖</span></a></li>
                            <li class="zyGame"><a href="/lottery/Buy!Fc3d.jzh"><em class="cz_logo35 logo35_x3d"></em><strong>福彩3D</strong><span class="grayWords" style="color:#D90000">2元赢取1000元</span></a></li>
                    		<li class="zyGame"><a href="/lottery/Buy!Pl3.jzh"><em class="cz_logo35 logo35_pl3"></em><strong>排列3</strong><span class="grayWords" style="color:#71B200">天天开奖，奖不停</span></a></li>
                    		<li class="zyGame"><a href="/lottery/Buy!Cqssc.jzh"><em class="cz_logo35 logo35_ssc"></em><strong>重庆时时彩</strong><span class="grayWords">每天120期哦</span></a></li>
                    		<li class="zyGame"><a href="/lottery/Buy!Sd11x5.jzh"><em class="cz_logo35 logo35_d11"></em><strong>十一运夺金</strong><span class="grayWords" style="color:#0091D1">每天开奖78次</span></a></li>
                    		<li class="otherGames clearfix">
								<h3>高频</h3>
                        		<div>
            						<em class="left"><a href="/lottery/Buy!Jxssc.jzh" title="10分钟一期，最高奖11.6万">江西时时彩</a></em>
                                	<em><a href="/lottery/Buy!Jx11x5.jzh" title="每天78期，任猜1-8个号都中奖">江西11选5</a></em>
                                	<em class="left"><a href="/lottery/Buy!Gd11x5.jzh" title="猜对1个号就中奖，每天84期">广东11选5</a></em>
                                	<em><a href="/lottery/Buy!Cq11x5.jzh" title="每10分钟一期，全天85期">重庆11选5</a></em>
                        		</div>
							</li>
                            <li class="otherGames clearfix end">
            					<h3>数字</h3>
                        		<div>
            						<em class="left"><a href="/lottery/Buy!Pl5.jzh" title="2元赢取10万元，天天开奖">排列5</a></em>
                        		</div>
            				</li>
						</ul>
					</div>
				</div>
			</li>
			<li><a href="/Index.jzh">首页</a>|</li>
			<li><a href="/Index!BuyHome.jzh" title="彩票购彩中心">购彩中心</a>|</li>
			<li><a href="/Groupbuy.jzh" title="合买大厅">合买大厅</a>|</li>
			<li><a href="/Index!Award.jzh" title="中国彩票开奖">彩票开奖<i></i></a>|
                <div class="mcDropMenu">
                    <a href="/Index!Award.jzh">开奖公告</a>
                    <a href="/Prize.jzh">大奖排行</a>
                </div>
			</li>
			<li><a href="/Trend.jzh" title="福彩体彩走势图">走势图</a>|</li>
			<li><a href="/News.jzh" title="彩票资讯">彩票资讯</a>|</li>
			<li><a href="/help/" title="帮助中心">帮助中心</a>|</li>
			<li><a href="/my/Index.jzh" title="我的彩票">我的彩票</a>|</li>
		</ul>
	</div>
</nav>
<script type="text/javascript">
$(function(){
	$('div.mcDropMenuBox').mouseover(function(){
		$(this).addClass('dropMenuBoxActive');
	}).mouseout(function(){
		$(this).removeClass('dropMenuBoxActive');
	});
	$('#lotteryListEntry,#lotteryList').mouseover(function(){
		$(this).addClass('open');$('#lotteryList').show();
	}).mouseout(function(){
		$(this).removeClass('open');$('#lotteryList').hide();
	});
	$('.wordsNum2,.wordsNum4,').mouseover(function(){
		$(this).addClass('hover');
	}).mouseout(function(){
		$(this).removeClass('hover');
	});
});
</script>