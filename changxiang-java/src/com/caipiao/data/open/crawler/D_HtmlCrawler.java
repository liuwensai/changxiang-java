package com.caipiao.data.open.crawler;

import java.io.PrintStream;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;


@SuppressWarnings("deprecation")
public class D_HtmlCrawler {
  public static String getHtml(String url)
  {
    String html = null;
    DefaultHttpClient httpClient = new DefaultHttpClient();
    httpClient.getParams().setParameter("http.connection.timeout", Integer.valueOf(10000));
    httpClient.getParams().setParameter("http.socket.timeout", Integer.valueOf(10000));
    HttpGet httpget = new HttpGet(url);
    httpget.setHeader("User-Agent", "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)");
    httpget.setHeader("Content-Type", "application/x-www-form-urlencoded;charset=gb2312");
    try
    {
      HttpResponse e = httpClient.execute(httpget);
      int resStatu = e.getStatusLine().getStatusCode();
      if (resStatu == 200) {
        HttpEntity entity = e.getEntity();
        if (entity != null)
          html = EntityUtils.toString(entity);
      }
    }
    catch (Exception var10) {
      System.out.println("访问【" + url + "】出现异常!");
    } finally {
      httpClient.getConnectionManager().shutdown();
    }

    return html;
  }
}