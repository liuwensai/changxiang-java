package com.caipiao.utils;

import java.io.PrintStream;

public class StaticItem
{
  static int l_buy = 0;
  static int l_draw = 0;
  static int l_chong = 0;
  static int l_auto = 0;
  static int l_point = 0;

  public static String GetBuyItem(String s, String q)
  {
    String itqh = q.substring(q.length() - 3);
    String format = String.format("%03d", new Object[] { Integer.valueOf(l_buy) });
    l_buy = l_buy == 999 ? 0 : l_buy + 1;
    return TimeUtil.getToday("MMddHHmmss") + s + itqh + format;
  }

  public static String GetAutoItem() {
    String format = String.format("%03d", new Object[] { Integer.valueOf(l_auto) });
    l_auto = l_auto == 999 ? 0 : l_auto + 1;
    return "A" + TimeUtil.getToday("MMddHHmmss") + format;
  }

  public static String GetDrawitem() {
    String format = String.format("%03d", new Object[] { Integer.valueOf(l_draw) });
    l_draw = l_draw == 999 ? 0 : l_draw + 1;
    return "D" + TimeUtil.getToday("MMddHHmmss") + format;
  }

  public static String GetRechitem() {
    String format = String.format("%03d", new Object[] { Integer.valueOf(l_chong) });
    l_chong = l_chong == 999 ? 0 : l_chong + 1;
    return "C" + TimeUtil.getToday("MMddHHmmss") + format;
  }

  public static String GetPointitem() {
    String format = String.format("%03d", new Object[] { Integer.valueOf(l_point) });
    l_point = l_point == 999 ? 0 : l_point + 1;
    return "P" + TimeUtil.getToday("MMddHHmmss") + format;
  }

  public static void main(String[] args) {
    for (int i = 0; i < 20; i++)
      System.out.println(GetBuyItem("Cqssc", "123456789"));
  }
}