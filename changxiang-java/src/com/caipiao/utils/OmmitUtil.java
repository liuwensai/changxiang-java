package com.caipiao.utils;

import java.util.ArrayList;
import java.util.List;

public class OmmitUtil
{
  public static String K3(String oldommit, String haoma)
  {
    return "";
  }

  public static String Ssc(String oldommit, String haoma) {
    String omit = "1,14,4,10,12,0,2,8,7,5#2,0,14,10,3,5,8,1,13,4#2,15,1,0,37,4,36,0,6,5#4,10,2,15,22,29,3,0,14,1#0,14,6,4,8,2,11,3,28,20#0,0,0,0,0,0,0,0,0,0#0,0,0,0,0,0,0,0,0,0#0,1,2,0#0,1,2,0";
    if ((oldommit != null) && (oldommit.length() > 0)) {
      omit = "";
      String omge = "";
      String omshi = "";
      String[] hm = haoma.split(",");
      String[] om = oldommit.split("#");
      ArrayList l3 = new ArrayList();
      ArrayList l2 = new ArrayList();

      for (int i = 0; i < hm.length; i++) {
        int h = -1;
        try
        {
          h = Integer.valueOf(hm[i]).intValue();
        }
        catch (Exception localException)
        {
        }
        omit = omit + oneOmmit(om[i], h) + "#";

        if (3 == i) {
          ArrayList arrayList = new ArrayList();
          if (h >= 5)
            arrayList.add(Integer.valueOf(0));
          else {
            arrayList.add(Integer.valueOf(1));
          }

          if (h % 2 == 0)
            arrayList.add(Integer.valueOf(3));
          else {
            arrayList.add(Integer.valueOf(2));
          }

          omshi = oneOmmit(om[7], arrayList);
        }

        if (4 == i) {
          ArrayList arrayList = new ArrayList();
          if (h >= 5)
            arrayList.add(Integer.valueOf(0));
          else {
            arrayList.add(Integer.valueOf(1));
          }

          if (h % 2 == 0)
            arrayList.add(Integer.valueOf(3));
          else {
            arrayList.add(Integer.valueOf(2));
          }

          omge = oneOmmit(om[8], arrayList);
        }

        if (i > 1) {
          l3.add(Integer.valueOf(h));
        }

        if (i > 2) {
          l2.add(Integer.valueOf(h));
        }
      }

      omit = omit + oneOmmit(om[5], l3) + "#";
      omit = omit + oneOmmit(om[6], l2) + "#";
      omit = omit + omshi + "#" + omge;
    }

    return omit;
  }

  public static String _11x5(String oldommit, String haoma) {
    String omit = "1,14,4,10,12,0,2,8,7,5,5#5,2,0,14,10,3,5,8,1,13,4#5,2,15,3,0,10,4,1,0,6,5#6,4,10,2,15,5,3,3,0,14,1#1,0,14,6,4,8,2,11,3,1,5#1,0,0,6,4,1,2,0,3,0,0";
    if ((oldommit != null) && (oldommit.length() > 0)) {
      omit = "";
      String[] hm = haoma.split(",");
      String[] om = oldommit.split("#");
      ArrayList l3 = new ArrayList();

      for (int i = 0; i < hm.length; i++) {
        int h = -1;
        try
        {
          h = Integer.valueOf(hm[i]).intValue();
        }
        catch (Exception localException)
        {
        }
        h--;
        omit = omit + oneOmmit(om[i], h) + "#";
        l3.add(Integer.valueOf(h));
      }

      omit = omit + oneOmmit(om[5], l3);
    }

    return omit;
  }

  public static String Fc3d_Pl3(String oldommit, String haoma) {
    String omit = "5,2,15,3,0,10,4,1,0,6#6,4,10,2,15,5,3,3,0,1#1,0,14,6,4,8,2,11,3,1#1,0,0,6,4,1,2,0,3,1";
    if ((oldommit != null) && (oldommit.length() > 0)) {
      omit = "";
      String[] hm = haoma.split(",");
      String[] om = oldommit.split("#");
      ArrayList l3 = new ArrayList();

      for (int i = 0; i < hm.length; i++) {
        int h = -1;
        try
        {
          h = Integer.valueOf(hm[i]).intValue();
        }
        catch (Exception localException)
        {
        }
        omit = omit + oneOmmit(om[i], h) + "#";
        l3.add(Integer.valueOf(h));
      }

      omit = omit + oneOmmit(om[3], l3);
    }

    return omit;
  }

  public static String Pl5(String oldommit, String haoma) {
    String omit = "1,14,4,10,12,0,2,8,7,5#5,2,0,14,10,3,5,8,1,4#5,2,15,3,0,10,4,1,0,6#6,4,10,2,15,5,3,3,0,1#1,0,14,6,4,8,2,3,1,5";
    if ((oldommit != null) && (oldommit.length() > 0)) {
      omit = "";
      String[] hm = haoma.split(",");
      String[] om = oldommit.split("#");

      for (int i = 0; i < hm.length; i++) {
        int h = -1;
        try
        {
          h = Integer.valueOf(hm[i]).intValue();
        }
        catch (Exception localException)
        {
        }
        omit = omit + oneOmmit(om[i], h) + "#";
      }

      omit = omit.substring(0, omit.length() - 1);
    }

    return omit;
  }

  private static String oneOmmit(String old, List num) {
    String result = "";
    String[] split = old.split(",");

    for (int s = 0; s < split.length; s++) {
      int h = -1;
      try
      {
        h = Integer.valueOf(split[s]).intValue();
      }
      catch (Exception localException)
      {
      }
      if (num.contains(Integer.valueOf(s)))
        split[s] = "0";
      else {
        split[s] = String.valueOf(h + 1);
      }
    }

    String[] var8 = split;
    int var7 = split.length;

    for (int var6 = 0; var6 < var7; var6++) {
      String var10 = var8[var6];
      result = result + var10 + ",";
    }

    return result.substring(0, result.length() - 1);
  }

  private static String oneOmmit(String old, int num) {
    String result = "";
    String[] split = old.split(",");

    for (int s = 0; s < split.length; s++) {
      int h = -1;
      try
      {
        h = Integer.valueOf(split[s]).intValue();
      }
      catch (Exception localException)
      {
      }
      if (num == s)
        split[s] = "0";
      else {
        split[s] = String.valueOf(h + 1);
      }
    }

    String[] var8 = split;
    int var7 = split.length;

    for (int var6 = 0; var6 < var7; var6++) {
      String var10 = var8[var6];
      result = result + var10 + ",";
    }

    return result.substring(0, result.length() - 1);
  }
}