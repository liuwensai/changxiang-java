package com.pay;

import java.security.MessageDigest;

public class md5
{
  public static String md5(String value)
  {
    try
    {
      MessageDigest e = MessageDigest.getInstance("MD5");
      e.update(value.getBytes("UTF-8"));
      byte[] arr = e.digest();
      StringBuffer sb = new StringBuffer();

      for (int i = 0; i < arr.length; i++) {
        sb.append(Integer.toHexString(arr[i] & 0xFF | 0x100).substring(1, 3));
      }

      return sb.toString();
    } catch (Exception var5) {
      return var5.toString();
    }
  }
}