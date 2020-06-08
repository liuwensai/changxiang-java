package com.caipiao.pay.xinbei;

import java.security.MessageDigest;
import org.apache.commons.lang.StringUtils;

public class SignUtil
{
  public static String signByMD5(String sourceData)
    throws Exception
  {
    String data = sourceData;
    MessageDigest md5 = MessageDigest.getInstance("MD5");
    byte[] sign = md5.digest(data.getBytes("UTF-8"));
    return Bytes2HexString(sign).toUpperCase();
  }

  public static boolean verifyData(String signData, String srcData)
    throws Exception
  {
    if (StringUtils.isBlank(signData)) {
      throw new Exception("验证签名--原签名数据为空！");
    }

    return (signData.equalsIgnoreCase(signByMD5(srcData)));
  }

  public static String Bytes2HexString(byte[] b)
  {
    StringBuffer ret = new StringBuffer(b.length);
    String hex = "";
    for (int i = 0; i < b.length; ++i) {
      hex = Integer.toHexString(b[i] & 0xFF);

      if (hex.length() == 1) {
        hex = '0' + hex;
      }
      ret.append(hex.toUpperCase());
    }
    return ret.toString();
  }
}