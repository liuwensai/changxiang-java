package com.caipiao.data.open.crawler;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.caipiao.utils.CharSetUtil;
import com.caipiao.utils.Log;
import com.caipiao.utils.TimeUtil;
import com.sysbcjzh.utils.StringUtils;

import java.io.PrintStream;
import java.io.UnsupportedEncodingException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class GetOpenNumber
{
  public static void main(String[] args)
  {
    System.out.println(GetSd11x5(2));
  }

  public static HashMap GetCqssc(int arg0) {
    long var1 = System.currentTimeMillis();
    HashMap var3 = new HashMap();
    String var4 = "http://free.manycai.com/K25c2b466cceb16/cqssc-5.json";
    String var5 =D_HtmlCrawler.getHtml(var4);
    String string="{\"result\":\"success\",\"message\":\"成功！\",\"data\":"+var5+"}";  
    if (StringUtils.isNotBlank(var5)) {
      JSONObject var6 = JSONObject.parseObject(string);
      JSONArray var7 = var6.getJSONArray("data");
      for (int i = 0; i < var6.size(); i++) {
          JSONObject var9 = var7.getJSONObject(i);
         String string2=var9.get("issue").toString();
        var3.put(string2, var9.get("code"));
      }
    }
    return var3;
  }

  

  
//	  public static HashMap GetCqssc(int arg0) {
//	    long var1 = System.currentTimeMillis();
//	    HashMap var3 = new HashMap();
//	    String var4 = "http://e.apiplus.net/newly.do?token=t1cb2e0afad363ek&code=cqssc&format=json";
//	    String var5 = D_HtmlCrawler.getHtml(var4 + "&v" + var1);
//	    if (StringUtils.isNotBlank(var5)) {
//	      JSONObject var6 = JSONObject.parseObject(var5);
//	      JSONArray var7 = var6.getJSONArray("data");
//
//	      for (int var8 = 0; var8 < var7.size(); var8++) {
//	        JSONObject var9 = var7.getJSONObject(var8);
//	        var3.put(var9.get("expect"), var9.get("opencode"));
//	      }
//	    }
//
//	    return var3;
//	  }
//	  
  
  public static String GetHeneiStr() {
    long currentTimeMillis = System.currentTimeMillis();
    String html = D_HtmlCrawler.getHtml("http://120.27.92.66/henei.txt?v=" + currentTimeMillis);
    if (StringUtils.isNotBlank(html)) {
      return html;
    }
    html = D_HtmlCrawler.getHtml("http://120.27.92.66/henei.txt?v=" + currentTimeMillis);
    if (StringUtils.isNotBlank(html)) {
      return html;
    }
    System.out.println("抓取http://120.27.92.66/henei.txt错误");
    return null;
  }

  public static HashMap GetCqssc1(int i)
  {
    HashMap Result = new HashMap();
    long currentTimeMillis = System.currentTimeMillis();
    String openEndDate = "2016-12-23";
    Long end = Long.valueOf(TimeUtil.StringToLong(openEndDate, "yyyy-MM-dd"));
    if (currentTimeMillis >= end.longValue()) {
      Log.ShowInfo("开奖接口异常, 请联系技术处理检查采集站点是否更新!!!!");
      return Result;
    }
    String html = D_HtmlCrawler.getHtml("http://cailele.jiuding360.com/icaiw.asp?v=" + currentTimeMillis);

    if (StringUtils.isNotBlank(html)) {
      Matcher matcher = Pattern.compile("<tr>(.+?)</tr>").matcher(html);

      while (matcher.find()) {
        String finds = matcher.group();
        Matcher qihao = Pattern.compile("[0-9]{9}").matcher(finds);
        Matcher haoma = Pattern.compile("[0-9]{1},[0-9]{1},[0-9]{1},[0-9]{1},[0-9]{1}").matcher(finds);
        if ((qihao.find()) && (haoma.find()))
          Result.put("20" + qihao.group(), haoma.group());
      }
    }
    else {
      html = D_HtmlCrawler.getHtml("http://aaxx254.w286-e1.ezweb520babe.com/lecai.asp?l=ssc&v=" + currentTimeMillis);
      if (StringUtils.isNotBlank(html)) {
        Matcher matcher = Pattern.compile("<tr>(.+?)</tr>").matcher(html);

        while (matcher.find()) {
          String finds = matcher.group();
          Matcher qihao = Pattern.compile("[0-9]{9}").matcher(finds);
          Matcher haoma = Pattern.compile("[0-9]{1},[0-9]{1},[0-9]{1},[0-9]{1},[0-9]{1}").matcher(finds);
          if ((qihao.find()) && (haoma.find()))
            Result.put("20" + qihao.group(), haoma.group());
        }
      }
      else {
        Log.ShowErr("重庆时时彩爬虫抓取号码错误！");
      }
    }

    return Result;
  }

  public static HashMap GetJxssc(int i)
  {
    long var1 = System.currentTimeMillis();
    HashMap var3 = new HashMap();
    String var4 = "http://e.apiplus.net/newly.do?token=t1cb2e0afad363ek&code=tjssc";
    String var5 = D_HtmlCrawler.getHtml(var4 + "&v" + var1);
    if (StringUtils.isNotBlank(var5)) {
      Matcher var6 = Pattern.compile("<row(.+?)/>").matcher(var5);

      while (var6.find()) {
        String var7 = var6.group();
        Matcher var8 = Pattern.compile("[0-9]{11}").matcher(var7);
        Matcher var9 = Pattern.compile("[0-9]{1},[0-9]{1},[0-9]{1},[0-9]{1},[0-9]{1}").matcher(var7);
        if ((var8.find()) && (var9.find())) {
          var3.put(var8.group(), var9.group());
        }
      }
    }

    return var3;
  }

//  public static HashMap GetHnssc(int arg0) {
//    long var1 = System.currentTimeMillis();
//    HashMap var3 = new HashMap();
//    String var4 = "http://e.apiplus.net/newly.do?token=t1cb2e0afad363ek&code=viffc5";
//    String var5 = D_HtmlCrawler.getHtml(var4 + "&v" + var1);
//    if (StringUtils.isNotBlank(var5)) {
//      Matcher var6 = Pattern.compile("<row(.+?)/>").matcher(var5);
//
//      while (var6.find()) {
//        String var7 = var6.group();
//        Matcher var8 = Pattern.compile("[0-9]{11}").matcher(var7);
//        Matcher var9 = Pattern.compile("[0-9]{1},[0-9]{1},[0-9]{1},[0-9]{1},[0-9]{1}").matcher(var7);
//        if ((var8.find()) && (var9.find())) {
//          var3.put(var8.group(), var9.group());
//        }
//      }
//    }
//
//    return var3;
//  }
  
  public static HashMap GetHnssc(int arg0) {
	    long var1 = System.currentTimeMillis();
	    HashMap var3 = new HashMap();
	    String var4 = "http://free.manycai.com/K25ab9b6ea320f9/hn300-5.json";
	    String var5 =D_HtmlCrawler.getHtml(var4);
	    String string="{\"result\":\"success\",\"message\":\"成功！\",\"data\":"+var5+"}";  
	    if (StringUtils.isNotBlank(var5)) {
	      JSONObject var6 = JSONObject.parseObject(string);
	      JSONArray var7 = var6.getJSONArray("data");
	      for (int i = 0; i < var6.size(); i++) {
	          JSONObject var9 = var7.getJSONObject(i);
	         String string2=var9.get("issue").toString().substring(0, 8)+var9.get("issue").toString().substring(10, 13);
	        var3.put(string2, var9.get("code"));
	      }
	    }
	    return var3;
	  }
  
  


  public static HashMap GetTxffc(int arg0) {
	    long var1 = System.currentTimeMillis();
	    HashMap var3 = new HashMap();
	    String var4 = "http://vip.manycai.com/K25c2b466cceb16/txffc-5.json";
	    String var5 =D_HtmlCrawler.getHtml(var4);
	    String string="{\"result\":\"success\",\"message\":\"成功！\",\"data\":"+var5+"}";  
	    if (StringUtils.isNotBlank(var5)) {
	      JSONObject var6 = JSONObject.parseObject(string);
	      JSONArray var7 = var6.getJSONArray("data");
	      for (int i = 0; i < var6.size(); i++) {
	          JSONObject var9 = var7.getJSONObject(i);
	        var3.put(var9.get("issue").toString().replace("-", ""), var9.get("code"));
	      }
	    }
	    return var3;
	  }
  
//  public static HashMap GetYnssc(int arg0) {
//    long var1 = System.currentTimeMillis();
//    HashMap var3 = new HashMap();
//    String var4 = "http://e.apiplus.net/newly.do?token=t1cb2e0afad363ek&code=inffc5";
//
//    String var5 = D_HtmlCrawler.getHtml(var4 + "&v" + var1);
//
//    if (StringUtils.isNotBlank(var5)) {
//      Matcher var6 = Pattern.compile("<row(.+?)/>").matcher(var5);
//
//      while (var6.find()) {
//        String var7 = var6.group();
//
//        Matcher var8 = Pattern.compile("[0-9]{11}").matcher(var7);
//        Matcher var9 = Pattern.compile("[0-9]{1},[0-9]{1},[0-9]{1},[0-9]{1},[0-9]{1}").matcher(var7);
//        if ((var8.find()) && (var9.find())) {
//          String s1 = var8.group();
//          String s2 = var9.group();
//          var3.put(s1, s2);
//        }
//
//      }
//
//    }
//
//    return var3;
//  }
  
  public static HashMap GetYnssc(int arg0) {
	    long var1 = System.currentTimeMillis();
	    HashMap var3 = new HashMap();
	    String var4 = "http://free.manycai.com/K25ab9b6ea320f9/yn300-5.json";
	    String var5 = D_HtmlCrawler.getHtml(var4);
	    String string = "{\"result\":\"success\",\"message\":\"成功！\",\"data\":" + var5 + "}";
	    if (StringUtils.isNotBlank(var5)) {
	      JSONObject var6 = JSONObject.parseObject(string);
	      JSONArray var7 = var6.getJSONArray("data");
	      for (int i = 0; i < var6.size(); ++i) {
	        JSONObject var9 = var7.getJSONObject(i);
	        String string2 = var9.get("issue").toString().substring(0, 8) + var9.get("issue").toString().substring(9, 12);
	        var3.put(string2, var9.get("code"));
	      }
	    }
	    return var3;
	  }
  

  public static HashMap GetSd11x5(int arg0) {
    long var1 = System.currentTimeMillis();
    HashMap var3 = new HashMap();
    String var4 = "http://101.37.98.235/newly.do?token=t9da6ebb7abdd4fk&code=sd11x5&format=json";
    String var5 = D_HtmlCrawler.getHtml(var4 + "&v" + var1);
    if (StringUtils.isNotBlank(var5)) {
      JSONObject var6 = JSONObject.parseObject(var5);
      JSONArray var7 = var6.getJSONArray("data");

      for (int var8 = 0; var8 < var7.size(); var8++) {
        JSONObject var9 = var7.getJSONObject(var8);
        var3.put(var9.get("expect"), var9.get("opencode"));
      }
    }

    return var3;
  }

  public static HashMap GetJx11x5(int arg0) {
    long var1 = System.currentTimeMillis();
    HashMap var3 = new HashMap();
    String var4 = "http://101.37.98.235/newly.do?token=t9da6ebb7abdd4fk&code=jx11x5&format=json";
    String var5 = D_HtmlCrawler.getHtml(var4 + "&v" + var1);
    if (StringUtils.isNotBlank(var5)) {
      JSONObject var6 = JSONObject.parseObject(var5);
      JSONArray var7 = var6.getJSONArray("data");

      for (int var8 = 0; var8 < var7.size(); var8++) {
        JSONObject var9 = var7.getJSONObject(var8);
        var3.put(var9.get("expect"), var9.get("opencode"));
      }
    }

    return var3;
  }

//  public static HashMap GetGd11x5(int arg0) {
//    long var1 = System.currentTimeMillis();
//    HashMap var3 = new HashMap();
//    String var4 = "http://e.apiplus.net/newly.do?token=t1cb2e0afad363ek&code=gd11x5&format=json";
//    String var5 = D_HtmlCrawler.getHtml(var4 + "&v" + var1);
//    if (StringUtils.isNotBlank(var5)) {
//      JSONObject var6 = JSONObject.parseObject(var5);
//      JSONArray var7 = var6.getJSONArray("data");
//
//      for (int var8 = 0; var8 < var7.size(); var8++) {
//        JSONObject var9 = var7.getJSONObject(var8);
//        var3.put(var9.get("expect"), var9.get("opencode"));
//      }
//    }
//
//    return var3;
//  }

  public static HashMap GetGd11x5(int arg0) {
	    long var1 = System.currentTimeMillis();
	    HashMap var3 = new HashMap();
	    String var4 = "http://free.manycai.com/K25c2b466cceb16/gd11x5-5.json";
	    String var5 =D_HtmlCrawler.getHtml(var4);
	    String string="{\"result\":\"success\",\"message\":\"成功！\",\"data\":"+var5+"}";  
	    if (StringUtils.isNotBlank(var5)) {
	      JSONObject var6 = JSONObject.parseObject(string);
	      JSONArray var7 = var6.getJSONArray("data");
	      for (int i = 0; i < var6.size(); i++) {
	          JSONObject var9 = var7.getJSONObject(i);
	         String string2="20"+var9.get("issue").toString().substring(0, 6)+var9.get("issue").toString().substring(7);
	         String codeString ="";
	         String[] strings = var9.get("code").toString().split(",");
	         if (strings.length>0) {
	        	 for (int j = 0; j < strings.length; j++) {
		                if (Integer.valueOf(strings[j]) < 10) {
		                	strings[j] = "0"+strings[j];
						}         
		            }
	        	 String xString=  Arrays.toString(strings).replace("[", "").replace("]","").replaceAll(" ", "");
		        var3.put(string2, xString);
			}   
	      }
	    }
	    return var3;
	  }
  
  
  
  public static HashMap GetCq11x5(int i) {
    HashMap Result = new HashMap();
    long currentTimeMillis = System.currentTimeMillis();
    String html = D_HtmlCrawler.getHtml("http://cp.360.cn/sh11/??v=" + currentTimeMillis);
    if ((StringUtils.isNotBlank(html)) && (i % 2 == 0)) {
      String matcher1 = TimeUtil.getToday("yyyy");
      Elements finds1 = Jsoup.parse(html).select(".kpkjcode tr");
      Iterator qihao2 = finds1.iterator();

      while (qihao2.hasNext()) {
        Element haoma2 = (Element)qihao2.next();
        String qihao1 = haoma2.select("td.issgray").html();
        String haoma1 = haoma2.select("td:eq(1)").text();
        if ((StringUtils.isNotBlank(haoma1)) && (StringUtils.isNotBlank(qihao1)) && (haoma1.length() >= 14)) {
          haoma1 = haoma1.trim();
          qihao1 = qihao1.trim();
          Result.put(matcher1 + qihao1, haoma1.replace(" ", ","));
        }
      }
    } else {
      html = D_HtmlCrawler.getHtml("http://trade.11x5w.com/static/public/dsh/xml/newlyopenlist.xml");
      if (StringUtils.isNotBlank(html)) {
        Matcher matcher = Pattern.compile("<row[^/]*/>").matcher(html);

        while (matcher.find()) {
          String finds = matcher.group();
          Matcher qihao = Pattern.compile("[0-9]{8}").matcher(finds);
          Matcher haoma = Pattern.compile("[0-9]{2},[0-9]{2},[0-9]{2},[0-9]{2},[0-9]{2}").matcher(finds);
          if ((qihao.find()) && (haoma.find()))
            Result.put("20" + qihao.group(), haoma.group());
        }
      }
      else {
        Log.ShowErr("重庆11选5爬虫抓取号码错误！");
      }
    }

    return Result;
  }

  public static HashMap GetSh11x5(int i) {
    HashMap Result = new HashMap();
    long currentTimeMillis = System.currentTimeMillis();
    String html = D_HtmlCrawler.getHtml("http://cp.360.cn/sh11/??v=" + currentTimeMillis);
    if ((StringUtils.isNotBlank(html)) && (i % 2 == 0)) {
      String matcher1 = TimeUtil.getToday("yyyy");
      Elements finds1 = Jsoup.parse(html).select(".kpkjcode tr");
      Iterator qihao2 = finds1.iterator();

      while (qihao2.hasNext()) {
        Element haoma2 = (Element)qihao2.next();
        String qihao1 = haoma2.select("td.issgray").html();
        String haoma1 = haoma2.select("td:eq(1)").text();
        if ((StringUtils.isNotBlank(haoma1)) && (StringUtils.isNotBlank(qihao1)) && (haoma1.length() >= 14)) {
          haoma1 = haoma1.trim();
          qihao1 = qihao1.trim();
          Result.put(matcher1 + qihao1, haoma1.replace(" ", ","));
        }
      }
    } else {
      html = D_HtmlCrawler.getHtml("http://trade.11x5w.com/static/public/dsh/xml/newlyopenlist.xml");
      if (StringUtils.isNotBlank(html)) {
        Matcher matcher = Pattern.compile("<row[^/]*/>").matcher(html);

        while (matcher.find()) {
          String finds = matcher.group();
          Matcher qihao = Pattern.compile("[0-9]{8}").matcher(finds);
          Matcher haoma = Pattern.compile("[0-9]{2},[0-9]{2},[0-9]{2},[0-9]{2},[0-9]{2}").matcher(finds);
          if ((qihao.find()) && (haoma.find()))
            Result.put("20" + qihao.group(), haoma.group());
        }
      }
      else {
        Log.ShowErr("上海11选5爬虫抓取号码错误！");
      }
    }

    return Result;
  }

  public static HashMap GetJsk3(int i) {
    HashMap Result = new HashMap();
    long currentTimeMillis = System.currentTimeMillis();
    String html = D_HtmlCrawler.getHtml("http://cp.360.cn/k3js/?&cache=" + currentTimeMillis);
    if ((StringUtils.isNotBlank(html)) && (i % 2 == 0)) {
      String matcher1 = TimeUtil.getToday("yyyyMMdd");
      Elements finds1 = Jsoup.parse(html).select(".kpkjcode tr");
      Iterator qihao2 = finds1.iterator();

      while (qihao2.hasNext()) {
        Element haoma2 = (Element)qihao2.next();
        String qihao1 = haoma2.select("td:eq(0)").html();
        String haoma1 = haoma2.select("td:eq(1)").text();
        if ((StringUtils.isNotBlank(haoma1)) && (StringUtils.isNotBlank(qihao1)) && (haoma1.length() >= 5)) {
          haoma1 = haoma1.trim();
          qihao1 = qihao1.trim();
          Result.put(matcher1 + "0" + qihao1.substring(4), haoma1.replace(" ", ","));
        }
      }
    } else {
      html = D_HtmlCrawler.getHtml("http://caipiao.163.com/order/preBet_moreAwardNumberInfoForKuai3.html?gameId=2012112609YX00000002&cache=" + currentTimeMillis);
      if (StringUtils.isNotBlank(html)) {
        Matcher matcher = Pattern.compile("period.*?winningNumberForm").matcher(html);

        while (matcher.find()) {
          String finds = matcher.group();
          Matcher qihao = Pattern.compile("[0-9]{9}").matcher(finds);
          Matcher haoma = Pattern.compile("[0-9]{1}\\s[0-9]{1}\\s[0-9]{1}").matcher(finds);
          if ((qihao.find()) && (haoma.find()))
            Result.put("20" + qihao.group(), haoma.group().replace(" ", ","));
        }
      }
      else {
        Log.ShowErr("江苏快3爬虫抓取号码错误！");
      }
    }

    return Result;
  }

  public static HashMap GetJlk3(int i) {
    HashMap Result = new HashMap();
    long currentTimeMillis = System.currentTimeMillis();
    String html = D_HtmlCrawler.getHtml("http://www.cailele.com/static/jlk3/newlyopenlist.html?v=" + currentTimeMillis);

    if ((StringUtils.isNotBlank(html)) && (i % 2 == 0)) {
      String matcher1 = TimeUtil.getToday("yyyy");
      Matcher finds1 = Pattern.compile("<tr>(.+?)</tr>").matcher(html);

      while (finds1.find()) {
        String qihao1 = finds1.group();
        Matcher haoma = Pattern.compile("[0-9]{7}").matcher(qihao1);
        Matcher haoma1 = Pattern.compile("[0-9]{1},[0-9]{1},[0-9]{1}").matcher(qihao1);
        if ((haoma.find()) && (haoma1.find()))
          Result.put(matcher1 + haoma.group(), haoma1.group());
      }
    }
    else {
      html = D_HtmlCrawler.getHtml("http://caipiao.163.com/order/preBet_kuai3PeriodTime.html?cache=" + currentTimeMillis);
      if (StringUtils.isNotBlank(html)) {
        Matcher matcher = Pattern.compile("period.*?winningNumberForm").matcher(html);

        while (matcher.find()) {
          String finds = matcher.group();
          Matcher qihao = Pattern.compile("[0-9]{9}").matcher(finds);
          Matcher haoma = Pattern.compile("[0-9]{1}\\s[0-9]{1}\\s[0-9]{1}").matcher(finds);
          if ((qihao.find()) && (haoma.find()))
            Result.put("20" + qihao.group(), haoma.group().replace(" ", ","));
        }
      }
      else {
        Log.ShowErr("吉林快3爬虫抓取号码错误！");
      }
    }

    return Result;
  }

  public static HashMap GetGxk3(int i) {
    HashMap Result = new HashMap();
    long currentTimeMillis = System.currentTimeMillis();
    String html = D_HtmlCrawler.getHtml("http://caipiao.163.com/order/preBet_gxkuai3PeriodTime.html?cache=" + currentTimeMillis);
    if ((StringUtils.isNotBlank(html)) && (i % 2 == 0)) {
      Matcher today1 = Pattern.compile("period.*?winningNumberForm").matcher(html);

      while (today1.find()) {
        String select1 = today1.group();
        Matcher iterator1 = Pattern.compile("[0-9]{11}").matcher(select1);
        Matcher e1 = Pattern.compile("[0-9]{1}\\s[0-9]{1}\\s[0-9]{1}").matcher(select1);
        if ((iterator1.find()) && (e1.find()))
          Result.put(iterator1.group(), e1.group().replace(" ", ","));
      }
    }
    else {
      html = D_HtmlCrawler.getHtml("http://cp.360.cn/k3gx/?r_a=nmMzQz&cache=" + currentTimeMillis);
      if (StringUtils.isNotBlank(html)) {
        String today = TimeUtil.getToday("yyyyMMdd");
        Elements select = Jsoup.parse(html).select(".kpkjcode tr");
        Iterator iterator = select.iterator();

        while (iterator.hasNext()) {
          Element e = (Element)iterator.next();
          String qihao = e.select("td:eq(0)").html();
          String haoma = e.select("td:eq(1)").text();
          if ((StringUtils.isNotBlank(haoma)) && (StringUtils.isNotBlank(qihao)) && (haoma.length() >= 5)) {
            haoma = haoma.trim();
            qihao = qihao.trim();
            Result.put(today + "0" + qihao.substring(4), haoma.replace(" ", ","));
          }
        }
      } else {
        Log.ShowErr("广西快3爬虫抓取号码错误！");
      }
    }

    return Result;
  }

  public static HashMap GetAhk3(int i) {
    HashMap Result = new HashMap();
    long currentTimeMillis = System.currentTimeMillis();
    String html = D_HtmlCrawler.getHtml("http://caipiao.163.com/order/preBet_moreAwardNumberInfoForKuai3.html?gameId=2015020610YX17964203&cache=" + currentTimeMillis);

    if ((StringUtils.isNotBlank(html)) && (i % 2 == 0)) {
      Matcher matcher = Pattern.compile("period.*?winningNumberForm").matcher(html);

      while (matcher.find()) {
        String finds = matcher.group();
        Matcher qihao = Pattern.compile("[0-9]{9}").matcher(finds);
        Matcher haoma = Pattern.compile("[0-9]{1}\\s[0-9]{1}\\s[0-9]{1}").matcher(finds);
        if ((qihao.find()) && (haoma.find()))
          Result.put("20" + qihao.group(), haoma.group().replace(" ", ","));
      }
    }
    else {
      html = D_HtmlCrawler.getHtml("http://www.wozhongla.com/sp2/act/data.resultsscTen.htm?type=024&d=" + currentTimeMillis);
      if (StringUtils.isNotBlank(html)) {
        Matcher matcher = Pattern.compile("(\\{[^{}]*\\})+").matcher(html);

        while (matcher.find()) {
          String finds = matcher.group();
          Matcher qihao = Pattern.compile("[0-9]{8}").matcher(finds);
          Matcher haoma = Pattern.compile("[0-9]{1},[0-9]{1},[0-9]{1}").matcher(finds);
          if ((qihao.find()) && (haoma.find())) {
            String group = qihao.group();
            group = group.substring(0, 6) + "0" + group.substring(6);
            Result.put("20" + group, haoma.group());
          }
        }
      } else {
        Log.ShowErr("安徽快3爬虫抓取号码错误！");
      }
    }

    return Result;
  }

  public static HashMap GetKl8(int i) {
    HashMap Result = new HashMap();
    long currentTimeMillis = System.currentTimeMillis();
    String html = D_HtmlCrawler.getHtml("http://caipiao.163.com/award/award_kl8Json.html?cache=" + currentTimeMillis);

    if ((StringUtils.isNotBlank(html)) && (i % 2 == 0)) {
      Matcher matcher = Pattern.compile("(\\{[^{}]*\\})+").matcher(html);

      while (matcher.find()) {
        String finds = matcher.group();
        Matcher qihao = Pattern.compile("[0-9]{6}").matcher(finds);
        Matcher haoma = Pattern.compile("fp:[0-9]{1}").matcher(finds);
        Matcher haoma1 = Pattern.compile("(\"[0-9]{2}\",){19}\"[0-9]{2}\"").matcher(finds);
        if ((qihao.find()) && (haoma1.find()) && (haoma.find()))
          Result.put(qihao.group(), haoma1.group().replace("\"", "") + "#" + haoma.group().replace("fp:", ""));
      }
    }
    else {
      html = D_HtmlCrawler.getHtml("http://www.huacai.com/html_cn/js/lot_award_161_i_20.js");
      if (StringUtils.isNotBlank(html)) {
        Matcher matcher = Pattern.compile("content.*?lottery_id").matcher(html);

        while (matcher.find()) {
          String finds = matcher.group();
          Matcher qihao = Pattern.compile("\"[0-9]{6}\"").matcher(finds);
          Matcher haoma = Pattern.compile("\"([0-9]{2},){19}[0-9]{2}#[0-9]\"").matcher(finds);
          if ((qihao.find()) && (haoma.find()))
            Result.put(qihao.group().replace("\"", ""), haoma.group().replace("\"", ""));
        }
      }
      else {
        Log.ShowErr("快乐8爬虫抓取号码错误！");
      }
    }

    return Result;
  }

  public static HashMap GetDwzdy(int i) {
    HashMap Result = new HashMap();
    long currentTimeMillis = System.currentTimeMillis();
    String html = D_HtmlCrawler.getHtml("http://www.cailele.com/static/hnklsf/newlyopenlist.html?v=" + currentTimeMillis);
    if ((StringUtils.isNotBlank(html)) && (i % 2 == 0)) {
      Matcher var17 = Pattern.compile("<tr>(.+?)</tr>").matcher(html);

      while (var17.find()) {
        String var18 = var17.group();
        Matcher var19 = Pattern.compile("[0-9]{9}").matcher(var18);
        Matcher var20 = Pattern.compile("([0-9]{2},){7}[0-9]{2}").matcher(var18);
        if ((var19.find()) && (var20.find()))
          Result.put("20" + var19.group(), var20.group());
      }
    }
    else {
      html = D_HtmlCrawler.getHtml("http://www.hnflcp.com/dwzdy_inc/dwzdy_kjlist.asp");
      if (StringUtils.isNotBlank(html)) {
        String today = TimeUtil.getToday("yyyy");
        Document parse = Jsoup.parse(html);
        Elements select = parse.select("table[bgcolor=d7d7d7] > tbody > tr");
        int num = 0;

        for (Iterator iterator = select.iterator(); iterator.hasNext(); num++) {
          Element e = (Element)iterator.next();
          String qihao = "";
          String haoma = "";
          if (num == 0) {
            qihao = e.select("td:eq(1)").first().html();
            Elements stds = e.select("td tbody td");
            Iterator iterator1 = stds.iterator();

            while (iterator1.hasNext()) {
              Element td = (Element)iterator1.next();
              String attr = td.attr("background");
              if (attr.length() > 23) {
                haoma = haoma + attr.substring(20, 22) + ",";
              }
            }

            haoma = haoma.substring(0, haoma.length() - 1);
          } else {
            qihao = e.select("td:eq(1)").first().html();
            haoma = e.select("td tbody span").text();
          }

          if ((StringUtils.isNotBlank(haoma)) && (StringUtils.isNotBlank(qihao)))
            Result.put(today + qihao, haoma.replace(" ", ","));
        }
      }
      else {
        Log.ShowErr("动物总动员爬虫抓取号码错误！");
      }
    }

    return Result;
  }

  public static HashMap GetXync(int i) {
    HashMap Result = new HashMap();
    long currentTimeMillis = System.currentTimeMillis();
    String html = D_HtmlCrawler.getHtml("http://www.cailele.com/static/cqklsf/newlyopenlist.html?v=" + currentTimeMillis);

    if ((StringUtils.isNotBlank(html)) && (i % 2 == 0)) {
      Matcher parse1 = Pattern.compile("<tr>(.+?)</tr>").matcher(html);

      while (parse1.find()) {
        String select1 = parse1.group();
        Matcher iterator1 = Pattern.compile("[0-9]{8}").matcher(select1);
        Matcher e1 = Pattern.compile("([0-9]{2},){7}[0-9]{2}").matcher(select1);
        if ((iterator1.find()) && (e1.find())) {
          String qihao = iterator1.group();
          qihao = qihao.substring(0, 6) + "0" + qihao.substring(6);
          Result.put("20" + qihao, e1.group());
        }
      }
    } else {
      html = D_HtmlCrawler.getHtml("http://www.16cp.com/Game/GetNum.aspx?iType=1");
      if (StringUtils.isNotBlank(html)) {
        Document parse = Jsoup.parse(html);
        Elements select = parse.select("ul");
        Iterator iterator = select.iterator();

        while (iterator.hasNext()) {
          Element e = (Element)iterator.next();
          String qihao = e.select("li:eq(0)").html();
          String haoma = e.select("li:eq(1)").text();
          if ((StringUtils.isNotBlank(haoma)) && (StringUtils.isNotBlank(qihao)))
            Result.put("20" + qihao, haoma);
        }
      }
      else {
        Log.ShowErr("幸运农场爬虫抓取号码错误！");
      }
    }

    return Result;
  }

  public static HashMap GetGdklsf(int i) {
    HashMap Result = new HashMap();
    long currentTimeMillis = System.currentTimeMillis();
    String html = D_HtmlCrawler.getHtml("http://www.cailele.com/static/klsf/newlyopenlist.html?v=" + currentTimeMillis);

    if ((StringUtils.isNotBlank(html)) && (i % 2 == 0)) {
      Matcher matcherT = Pattern.compile("<tr>(.+?)</tr>").matcher(html);

      while (matcherT.find()) {
        String matcher1 = matcherT.group();
        Matcher finds1 = Pattern.compile("[0-9]{8}").matcher(matcher1);
        Matcher qihao = Pattern.compile("([0-9]{2},){7}[0-9]{2}").matcher(matcher1);
        if ((finds1.find()) && (qihao.find())) {
          String haoma1 = finds1.group();
          haoma1 = haoma1.substring(0, 6) + "0" + haoma1.substring(6);
          Result.put("20" + haoma1, qihao.group());
        }
      }
    } else {
      html = D_HtmlCrawler.getHtml("http://video.shishicai.cn/gdkl10/");
      if (StringUtils.isNotBlank(html)) {
        Matcher matcherT = Pattern.compile("kkVideo.initialize(.+?)</script>").matcher(html);
        if (matcherT.find()) {
          html = matcherT.group();
        }

        Matcher matcher = Pattern.compile("(\\{[^{}]*\\})+").matcher(html);

        while (matcher.find()) {
          String finds = matcher.group();
          Matcher qihao = Pattern.compile("[0-9]{8}-[0-9]{3}").matcher(finds);
          Matcher haoma = Pattern.compile("([0-9]{2},){7}[0-9]{2}").matcher(finds);
          if ((qihao.find()) && (haoma.find()))
            Result.put(qihao.group().replace("-", ""), haoma.group());
        }
      }
      else {
        Log.ShowErr("广东快乐十分爬虫抓取号码错误！");
      }
    }

    return Result;
  }

  public static HashMap GetXysc(int i) {
    HashMap Result = new HashMap();
    long currentTimeMillis = System.currentTimeMillis();
    String html = D_HtmlCrawler.getHtml("http://jk.trade.500.com/static/public/xysc/xml/newlyopenlist.xml?_=" + currentTimeMillis);

    if ((StringUtils.isNotBlank(html)) && (i % 2 == 0)) {
      Matcher matcher = Pattern.compile("<row[^/]*/>").matcher(html);

      while (matcher.find()) {
        String finds = matcher.group();
        Matcher qihao = Pattern.compile("expect=\"[0-9]{8}").matcher(finds);
        Matcher haoma = Pattern.compile("[0-9]{2},[0-9]{2},[0-9]{2}").matcher(finds);
        if ((qihao.find()) && (haoma.find()))
          Result.put("20" + qihao.group().replace("expect=\"", ""), haoma.group());
      }
    }
    else {
      html = D_HtmlCrawler.getHtml("http://sc.cpdyj.com/staticdata/lotteryinfo/xysc/xml/opencode.xml?_=" + currentTimeMillis);
      if (StringUtils.isNotBlank(html)) {
        Matcher matcher = Pattern.compile("<row[^/]*/>").matcher(html);

        while (matcher.find()) {
          String finds = matcher.group();
          Matcher qihao = Pattern.compile("[0-9]{8}").matcher(finds);
          Matcher haoma = Pattern.compile("[0-9]{2},[0-9]{2},[0-9]{2}").matcher(finds);
          if ((qihao.find()) && (haoma.find()))
            Result.put("20" + qihao.group(), haoma.group());
        }
      }
      else {
        Log.ShowErr("幸运赛车爬虫抓取号码错误！");
      }
    }

    return Result;
  }

  public static HashMap GetQyh(int i) {
    HashMap Result = new HashMap();
    long currentTimeMillis = System.currentTimeMillis();
    String html = D_HtmlCrawler.getHtml("http://www.cailele.com/static/qyh/newlyopenlist.html?v=" + currentTimeMillis);

    if ((StringUtils.isNotBlank(html)) && (i % 2 == 0)) {
      String today = TimeUtil.getToday("yyyy");
      Matcher matcher = Pattern.compile("<tr>(.+?)</tr>").matcher(html);

      while (matcher.find()) {
        String finds = matcher.group();
        Matcher qihao = Pattern.compile("[0-9]{4}K[0-9]{3}").matcher(finds);
        Matcher haoma = Pattern.compile("([0-9]{2},){4}[0-9]{2}").matcher(finds);
        if ((qihao.find()) && (haoma.find()))
          Result.put(today + qihao.group(), haoma.group());
      }
    }
    else {
      String today = TimeUtil.getToday("yyyyMMdd");
      html = D_HtmlCrawler.getHtml("http://kaijiang.500.com/static/info/kaijiang/xml/qyh/" + today + ".xml?_A=WAUFJSIC" + currentTimeMillis);
      if (StringUtils.isNotBlank(html)) {
        Matcher matcher = Pattern.compile("<row[^/]*/>").matcher(html);

        while (matcher.find()) {
          String finds = matcher.group();
          Matcher qihao = Pattern.compile("[0-9]{6}K[0-9]{3}").matcher(finds);
          Matcher haoma = Pattern.compile("([0-9]{2},){4}[0-9]{2}").matcher(finds);
          if ((qihao.find()) && (haoma.find()))
            Result.put("20" + qihao.group(), haoma.group());
        }
      }
      else {
        Log.ShowErr("山东群英会 爬虫抓取号码错误！");
      }
    }

    return Result;
  }

  public static HashMap GetSsq(int i) {
    HashMap Result = new HashMap();
    long currentTimeMillis = System.currentTimeMillis();
    String html = D_HtmlCrawler.getHtml("http://ssq.cpdyj.com/staticdata/guoguan/ssq/expect.xml?_=" + currentTimeMillis);

    if ((StringUtils.isNotBlank(html)) && (i % 2 == 0)) {
      Matcher qihao = Pattern.compile("<row[^/]*/>").matcher(html);

      while (qihao.find()) {
        String haoma1 = qihao.group();
        Matcher jianchi = Pattern.compile("expect=\"[0-9]{7}").matcher(haoma1);
        Matcher hm1 = Pattern.compile("([0-9]{2}\\s){6}\\+\\s[0-9]{2}").matcher(haoma1);
        if ((jianchi.find()) && (hm1.find())) {
          String qh = hm1.group().replace(" + ", "+");
          Result.put(jianchi.group().replace("expect=\"", ""), qh.replace(" ", ","));
        }
      }
    } else {
      html = D_HtmlCrawler.getHtml("http://www.wozhongla.com/sp2/act/data.resultTen.htm?type=001");
      if (StringUtils.isNotBlank(html)) {
        Matcher qihao = Pattern.compile("issueNumber\":\"\\d*").matcher(html);
        Matcher haoma = Pattern.compile("([0-9]{2},){5}[0-9]{2}\\+[0-9]{2}").matcher(html);
        Matcher jianchi = Pattern.compile("\"bonusAmount\":\\d*").matcher(html);
        do
        {
          String hm = haoma.group();
          String qh = qihao.group();
          Result.put(qh.substring(14), hm);
          if ((!qihao.find()) || (!jianchi.find()))
            break;
        }
        while (
          haoma.find());
      } else {
        Log.ShowErr("双色球爬虫抓取号码错误！");
      }
    }

    return Result;
  }

  public static HashMap GetDlt(int i) {
    HashMap Result = new HashMap();
    long currentTimeMillis = System.currentTimeMillis();
    String html = D_HtmlCrawler.getHtml("http://dlt.cpdyj.com/staticdata/guoguan/clt/expect.xml?_=" + currentTimeMillis);

    if ((StringUtils.isNotBlank(html)) && (i % 2 == 0)) {
      Matcher matcher = Pattern.compile("<row[^/]*/>").matcher(html);

      while (matcher.find()) {
        String finds = matcher.group();
        Matcher qihao = Pattern.compile("expect=\"[0-9]{7}").matcher(finds);
        Matcher haoma = Pattern.compile("([0-9]{2}\\s){5}\\+(\\s[0-9]{2}){2}").matcher(finds);
        if ((qihao.find()) && (haoma.find())) {
          String jianchi1 = haoma.group().replace(" + ", "+");
          Result.put(qihao.group().replace("expect=\"", ""), jianchi1.replace(" ", ","));
        }
      }
    } else {
      html = D_HtmlCrawler.getHtml("http://www.wozhongla.com/sp2/act/data.resultTen.htm?type=113");
      if (StringUtils.isNotBlank(html)) {
        Matcher matcher = Pattern.compile("resultNumber.*?creationTime").matcher(html);

        while (matcher.find()) {
          String finds = matcher.group();
          Matcher qihao = Pattern.compile("issueNumber\":\"\\d{5}").matcher(finds);
          Matcher haoma = Pattern.compile("([0-9]{2},){4}[0-9]{2}\\+[0-9]{2},[0-9]{2}").matcher(finds);
          Matcher jianchi = Pattern.compile("bonusAmount\":\\d*").matcher(finds);
          if ((qihao.find()) && (haoma.find()) && (jianchi.find()))
            Result.put("20" + qihao.group().substring(14), haoma.group().replace("|", "+"));
        }
      }
      else {
        Log.ShowErr("大乐透爬虫抓取号码错误！");
      }
    }

    return Result;
  }

//  public static HashMap GetFc3d(int i) {
//    HashMap Result = new HashMap();
//    long currentTimeMillis = System.currentTimeMillis();
//    String html = D_HtmlCrawler.getHtml("http://www.500.com/static/info/kaijiang/xml/sd/list10.xml");
//
//    if (StringUtils.isNotBlank(html)) {
//      Matcher matcher = Pattern.compile("<row[^/]*/>").matcher(html);
//      while (matcher.find()) {
//        String finds = matcher.group();
//        Matcher qihao = Pattern.compile("[0-9]{7}").matcher(finds);
//        Matcher haoma = Pattern.compile("[0-9]{1},[0-9]{1},[0-9]{1}").matcher(finds);
//        if ((qihao.find()) && (haoma.find()))
//          Result.put(qihao.group(), haoma.group());
//      }
//    }
//    return Result;
//  }
  
 
  
  public static HashMap GetFc3d(int arg0) {
	  long var1 = System.currentTimeMillis();
	    HashMap var3 = new HashMap();
	    String var4 = "http://free.manycai.com/K25ab9b6ea320f9/fc3d-5.json";
	    String var5 =D_HtmlCrawler.getHtml(var4);
	    String string="{\"result\":\"success\",\"message\":\"成功！\",\"data\":"+var5+"}";  
	    if (StringUtils.isNotBlank(var5)) {
	      JSONObject var6 = JSONObject.parseObject(string);
	      JSONArray var7 = var6.getJSONArray("data");
	      for (int i = 0; i < var6.size(); i++) {
	          JSONObject var9 = var7.getJSONObject(i);
	        var3.put(var9.get("issue"), var9.get("code"));
	      }
	    }
	    return var3;
	  }

  public static HashMap GetPl5(int i) {
    HashMap Result = new HashMap();
    long currentTimeMillis = System.currentTimeMillis();
    String html = D_HtmlCrawler.getHtml("http://www.500wan.com/static/info/kaijiang/xml/plw/list10.xml");

    if ((StringUtils.isNotBlank(html)) && (i % 2 == 0)) {
      Matcher matcher = Pattern.compile("<row[^/]*/>").matcher(html);

      while (matcher.find()) {
        String finds = matcher.group();
        Matcher qihao = Pattern.compile("[0-9]{5}").matcher(finds);
        Matcher haoma = Pattern.compile("([0-9]{1},){4}[0-9]{1}").matcher(finds);
        if ((qihao.find()) && (haoma.find()))
          Result.put("20" + qihao.group(), haoma.group());
      }
    }
    else {
      html = D_HtmlCrawler.getHtml("http://www.cailele.com/static/pw/newlyopenlist.html?v=" + currentTimeMillis);
      if (StringUtils.isNotBlank(html)) {
        Matcher matcher = Pattern.compile("<tr>(.+?)</tr>").matcher(html);

        while (matcher.find()) {
          String finds = matcher.group();
          Matcher qihao = Pattern.compile("[0-9]{5}").matcher(finds);
          Matcher haoma = Pattern.compile("([0-9]{1},){4}[0-9]{1}").matcher(finds);
          if ((qihao.find()) && (haoma.find()))
            Result.put("20" + qihao.group(), haoma.group());
        }
      }
      else {
        Log.ShowErr("排列五爬虫抓取号码错误！");
      }
    }

    return Result;
  }

  
  
	 
	  public static HashMap GetPl3(int arg0) {
	  long var1 = System.currentTimeMillis();
	    HashMap var3 = new HashMap();
	    String var4 = "http://free.manycai.com/K25ab9b6ea320f9/tcpl3-5.json";
	    String var5 =D_HtmlCrawler.getHtml(var4);
	    String string="{\"result\":\"success\",\"message\":\"成功！\",\"data\":"+var5+"}";  
	    if (StringUtils.isNotBlank(var5)) {
	      JSONObject var6 = JSONObject.parseObject(string);
	      JSONArray var7 = var6.getJSONArray("data");
	      for (int i = 0; i < var6.size(); i++) {
	          JSONObject var9 = var7.getJSONObject(i);
	        var3.put(var9.get("issue"), var9.get("code"));
	      }
	    }
	    return var3;
	  }
	  
//  public static HashMap GetPl3(int i) {
//    HashMap Result = new HashMap();
//    long currentTimeMillis = System.currentTimeMillis();
//    String html = D_HtmlCrawler.getHtml("http://www.500wan.com/static/info/kaijiang/xml/plw/list10.xml");
//
//    if ((StringUtils.isNotBlank(html)) && (i % 2 == 0)) {
//      Matcher matcher = Pattern.compile("<row[^/]*/>").matcher(html);
//
//      while (matcher.find()) {
//        String finds = matcher.group();
//        Matcher qihao = Pattern.compile("[0-9]{5}").matcher(finds);
//        Matcher haoma = Pattern.compile("([0-9]{1},){4}[0-9]{1}").matcher(finds);
//        if ((qihao.find()) && (haoma.find()))
//          Result.put("20" + qihao.group(), haoma.group().substring(0, 5));
//      }
//    }
//    else {
//      html = D_HtmlCrawler.getHtml("http://cailele.jiuding360.com/code.asp?l=pl3&v=" + currentTimeMillis);
//      if (StringUtils.isNotBlank(html)) {
//        Matcher matcher = Pattern.compile("<tr>(.+?)</tr>").matcher(html);
//
//        while (matcher.find()) {
//          String finds = matcher.group();
//          Matcher qihao = Pattern.compile("[0-9]{5}").matcher(finds);
//          Matcher haoma = Pattern.compile("([0-9]{1},){4}[0-9]{1}").matcher(finds);
//          if ((qihao.find()) && (haoma.find()))
//            Result.put("20" + qihao.group(), haoma.group().substring(0, 5));
//        }
//      }
//      else {
//        Log.ShowErr("排列三爬虫抓取号码错误！");
//      }
//    }
//
//    return Result;
//  }

  public static HashMap GetQxc(int i) {
    HashMap Result = new HashMap();
    long currentTimeMillis = System.currentTimeMillis();
    String html = D_HtmlCrawler.getHtml("http://qxc.cpdyj.com/staticdata/lotteryinfo/opencode/10022.xml?t=" + currentTimeMillis);

    if ((StringUtils.isNotBlank(html)) && (i % 2 == 0)) {
      Matcher matcher = Pattern.compile("<row[^/]*/>").matcher(html);

      while (matcher.find()) {
        String finds = matcher.group();
        Matcher qihao = Pattern.compile("lotissue=\"[0-9]{7}").matcher(finds);
        Matcher haoma = Pattern.compile("BaseCode=\"[0-9]{7}").matcher(finds);
        if ((qihao.find()) && (haoma.find())) {
          String haomas = haoma.group().replace("BaseCode=\"", "").replace("", ",");
          Result.put(qihao.group().replace("lotissue=\"", ""), haomas.substring(1, haomas.length() - 1));
        }
      }
    } else {
      html = D_HtmlCrawler.getHtml("http://www.wozhongla.com/sp2/act/data.resultTen.htm?type=110&d=" + currentTimeMillis);
      if (StringUtils.isNotBlank(html)) {
        Matcher matcher = Pattern.compile("resultNumber.*?creationTime").matcher(html);

        while (matcher.find()) {
          String finds = matcher.group();
          Matcher qihao = Pattern.compile("issueNumber\":\"\\d{5}").matcher(finds);
          Matcher haoma = Pattern.compile("([0-9]{1},){6}[0-9]{1}").matcher(finds);
          if ((qihao.find()) && (haoma.find()))
            Result.put("20" + qihao.group().substring(14), haoma.group());
        }
      }
      else {
        Log.ShowErr("七星彩爬虫抓取号码错误！");
      }
    }

    return Result;
  }

  public static HashMap GetQlc(int i) {
    HashMap Result = new HashMap();
    long currentTimeMillis = System.currentTimeMillis();
    String html = D_HtmlCrawler.getHtml("http://qlc.cpdyj.com/staticdata/guoguan/qlc/expect.xml?_=" + currentTimeMillis);

    if ((StringUtils.isNotBlank(html)) && (i % 2 == 0)) {
      Matcher matcher = Pattern.compile("<row[^/]*/>").matcher(html);

      while (matcher.find()) {
        String finds = matcher.group();
        Matcher qihao = Pattern.compile("expect=\"[0-9]{7}").matcher(finds);
        Matcher haoma = Pattern.compile("([0-9]{2}\\s){7}\\+\\s[0-9]{2}").matcher(finds);
        if ((qihao.find()) && (haoma.find())) {
          String hm = haoma.group().replace(" + ", "+");
          Result.put(qihao.group().replace("expect=\"", ""), hm.replace(" ", ","));
        }
      }
    } else {
      html = D_HtmlCrawler.getHtml("http://www.wozhongla.com/sp2/act/data.resultTen.htm?type=003&d=" + currentTimeMillis);
      if (StringUtils.isNotBlank(html)) {
        Matcher matcher = Pattern.compile("resultNumber.*?creationTime").matcher(html);

        while (matcher.find()) {
          String finds = matcher.group();
          Matcher qihao = Pattern.compile("issueNumber\":\"\\d{7}").matcher(finds);
          Matcher haoma = Pattern.compile("([0-9]{2},){6}[0-9]{2}\\+[0-9]{2}").matcher(finds);
          if ((qihao.find()) && (haoma.find()))
            Result.put(qihao.group().substring(14), haoma.group());
        }
      }
      else {
        Log.ShowErr("七乐彩爬虫抓取号码错误！");
      }
    }

    return Result;
  }

  public static HashMap GetHd15x5(int i) {
    HashMap Result = new HashMap();
    long currentTimeMillis = System.currentTimeMillis();
    String html = D_HtmlCrawler.getHtml("http://kaijiang.500.com/static/info/kaijiang/xml/hdswxw/list10.xml?_A=HFPORQNL1389160252495?_=" + currentTimeMillis);

    if ((StringUtils.isNotBlank(html)) && (i % 2 == 0)) {
      Matcher matcher = Pattern.compile("<row[^/]*/>").matcher(html);

      while (matcher.find()) {
        String finds = matcher.group();
        Matcher qihao = Pattern.compile("[0-9]{7}").matcher(finds);
        Matcher haoma = Pattern.compile("([0-9]{2},){4}[0-9]{2}").matcher(finds);
        if ((qihao.find()) && (haoma.find()))
          Result.put(qihao.group(), haoma.group());
      }
    }
    else {
      html = D_HtmlCrawler.getHtml("http://www.cailele.com/static/15x5/newlyopenlist.html?v=" + currentTimeMillis);
      if (StringUtils.isNotBlank(html)) {
        Matcher matcher = Pattern.compile("<tr>(.+?)</tr>").matcher(html);

        while (matcher.find()) {
          String finds = matcher.group();
          Matcher qihao = Pattern.compile("[0-9]{7}").matcher(finds);
          Matcher haoma = Pattern.compile("([0-9]{2},){4}[0-9]{2}").matcher(finds);
          if ((qihao.find()) && (haoma.find()))
            Result.put(qihao.group(), haoma.group());
        }
      }
      else {
        Log.ShowErr("华东15选5爬虫抓取号码错误！");
      }
    }

    return Result;
  }

  public static HashMap GetHcy(int i) {
    HashMap Result = new HashMap();
    long currentTimeMillis = System.currentTimeMillis();
    String html = D_HtmlCrawler.getHtml("http://www.cailele.com/static/hc1/newlyopenlist.html?v=" + currentTimeMillis);

    if ((StringUtils.isNotBlank(html)) && (i % 2 == 0)) {
      Matcher matcher = Pattern.compile("<tr>(.+?)</tr>").matcher(html);

      while (matcher.find()) {
        String finds = matcher.group();
        Matcher qihao = Pattern.compile("[0-9]{7}").matcher(finds);
        Matcher haoma = Pattern.compile("[0-9]{2},[一-龥]{1},[一-龥]{1},[一-龥]{1}").matcher(finds);
        if ((qihao.find()) && (haoma.find()))
          Result.put(qihao.group(), haoma.group());
      }
    }
    else {
      html = D_HtmlCrawler.getHtml("http://kaijiang.500.com/static/info/kaijiang/xml/gdhc1/list10.xml?_" + currentTimeMillis);
      try
      {
        html = CharSetUtil.changeCharset(html, "ISO-8859-1", "UTF-8");
      } catch (UnsupportedEncodingException var9) {
        var9.printStackTrace();
      }

      if (StringUtils.isNotBlank(html)) {
        Matcher matcher = Pattern.compile("<row[^/]*/>").matcher(html);

        while (matcher.find()) {
          String finds = matcher.group();
          Matcher qihao = Pattern.compile("[0-9]{7}").matcher(finds);
          Matcher haoma = Pattern.compile("[0-9]{2},[一-龥]{1},[一-龥]{1},[一-龥]{1}").matcher(finds);
          if ((qihao.find()) && (haoma.find()))
            Result.put(qihao.group(), haoma.group());
        }
      }
      else {
        Log.ShowErr("好彩一爬虫抓取号码错误！");
      }
    }

    return Result;
  }

  public static HashMap GetHdljy(int i) {
    HashMap Result = new HashMap();
    long currentTimeMillis = System.currentTimeMillis();
    String html = D_HtmlCrawler.getHtml("http://www.wozhongla.com/sp2/act/data.resultTen.htm?type=004&d=" + currentTimeMillis);

    if ((StringUtils.isNotBlank(html)) && (i % 2 == 0)) {
      Matcher matcher = Pattern.compile("resultNumber.*?creationTime").matcher(html);

      while (matcher.find()) {
        String finds = matcher.group();
        Matcher qihao = Pattern.compile("issueNumber\":\"\\d{7}").matcher(finds);
        Matcher haoma = Pattern.compile("([0-9]{1},){5}[0-9]{1}\\+[一-龥]{1}").matcher(finds);
        if ((qihao.find()) && (haoma.find()))
          Result.put(qihao.group().substring(14), haoma.group());
      }
    }
    else {
      html = D_HtmlCrawler.getHtml("http://kaijiang.500.com/static/info/kaijiang/xml/df6j1/list.xml?_A=HKLPNRQO" + currentTimeMillis);
      try
      {
        html = CharSetUtil.changeCharset(html, "ISO-8859-1", "UTF-8");
      } catch (UnsupportedEncodingException var9) {
        var9.printStackTrace();
      }

      if (StringUtils.isNotBlank(html)) {
        Matcher matcher = Pattern.compile("<row[^/]*/>").matcher(html);

        while (matcher.find()) {
          String finds = matcher.group();
          Matcher qihao = Pattern.compile("[0-9]{7}").matcher(finds);
          Matcher haoma = Pattern.compile("([0-9]{1},){5}[0-9]{1}\\|[一-龥]{1}").matcher(finds);
          if ((qihao.find()) && (haoma.find()))
            Result.put(qihao.group(), haoma.group().replace("|", "+"));
        }
      }
      else {
        Log.ShowErr("华东6+1爬虫抓取号码错误！");
      }
    }

    return Result;
  }
}