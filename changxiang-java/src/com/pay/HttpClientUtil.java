package com.pay;

import java.io.PrintStream;
import java.net.URI;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import org.apache.http.Consts;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.methods.RequestBuilder;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

public class HttpClientUtil
{
  public String doPost(String url, String Data, String charset)
  {
    HttpClient httpClient = null;
    HttpPost httpPost = null;
    String result = null;
    try {
      httpClient = new SSLClient();
      httpPost = new HttpPost(url);
      httpPost.setHeader("Content-Type", "text/plain;charset=utf-8");

      StringEntity entity = new StringEntity(Data, charset);
      httpPost.setEntity(entity);

      HttpResponse response = httpClient.execute(httpPost);
      if (response != null) {
        HttpEntity resEntity = response.getEntity();
        if (resEntity != null) {
          System.out.println(response.getStatusLine());

          result = EntityUtils.toString(resEntity, charset);
        }
      }
    } catch (Exception ex) {
      ex.printStackTrace();
    }
    return result;
  }

  public String post(String url, Map paramMap) throws Exception {
    BasicCookieStore cookieStore = new BasicCookieStore();
    CloseableHttpClient httpclient = HttpClients.custom().setDefaultCookieStore(cookieStore).build();
    try {
      RequestBuilder reguestBuilder = RequestBuilder.post().setUri(new URI(url));
      Iterator iter = paramMap.entrySet().iterator();
      List formparams = new ArrayList();
      while (iter.hasNext()) {
        Map.Entry entry = (Map.Entry)iter.next();
        String key = String.valueOf(entry.getKey());
        String val = String.valueOf(entry.getValue());
        formparams.add(new BasicNameValuePair(key, val));
      }
      reguestBuilder.setEntity(new UrlEncodedFormEntity(formparams, Consts.UTF_8));
      HttpUriRequest httpUriRequest = reguestBuilder.build();
      CloseableHttpResponse response2 = httpclient.execute(httpUriRequest);
      try {
        HttpEntity entity = response2.getEntity();
        String retStr = EntityUtils.toString(entity, "utf-8");
        String str1 = retStr;

        response2.close();

        return str1;
      }
      finally {
        response2.close();
      }
    } finally {
      httpclient.close();
    }
  }
}