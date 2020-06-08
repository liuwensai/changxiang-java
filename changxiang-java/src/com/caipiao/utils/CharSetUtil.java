package com.caipiao.utils;

import java.io.UnsupportedEncodingException;

public class CharSetUtil
{
  public static final String UTF_8 = "UTF-8";
  public static final String GB2312 = "gb2312";
  public static final String ISO_8859_1 = "ISO-8859-1";

  public static String changeCharset(String str, String oldCharset, String newCharset)
    throws UnsupportedEncodingException{
    if (str != null) {
      byte[] bs = str.getBytes(oldCharset);
      return new String(bs, newCharset);
    }
    return null;
  }
}