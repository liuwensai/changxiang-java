package com.pay;

import java.io.PrintStream;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.SortedMap;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang.StringUtils;

public class Signature
{
  public static String createSign(SortedMap<String, String> packageParams, String partnerKey)
  {
    StringBuffer sb = new StringBuffer();
    Set es = packageParams.entrySet();
    Iterator it = es.iterator();
    while (it.hasNext()) {
      Map.Entry entry = (Map.Entry)it.next();
      String k = (String)entry.getKey();
      String v = (String)entry.getValue();
      if ((StringUtils.isNotEmpty(v)) && (!"sign".equals(k)) && (!"key".equals(k))) {
        sb.append(k + "=" + v + "&");
      }
    }
    sb.append("key=" + partnerKey);
    String sign = null;
    try {
      sign = DigestUtils.md5Hex(sb.toString().getBytes("UTF-8")).toUpperCase();
      System.out.println("签名原串:" + sb.toString() + " ；签名结果：" + sign);
    } catch (UnsupportedEncodingException e) {
      e.printStackTrace();
    }
    return sign;
  }

  public static String formateDateToString(Date date, String format) {
    SimpleDateFormat sdf = new SimpleDateFormat(format);
    return sdf.format(date);
  }
}