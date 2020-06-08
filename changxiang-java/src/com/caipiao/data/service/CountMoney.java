package com.caipiao.data.service;

import com.caipiao.utils.PlayType;
import com.caipiao.utils.TryStatic;
import com.sysbcjzh.utils.CheckUtil;
import org.apache.commons.lang.ArrayUtils;

public class CountMoney
{
  static int[] ZLHZ = { 0, 0, 0, 1, 1, 2, 3, 4, 5, 7, 8, 9, 10, 10, 10, 10, 9, 8, 7, 5, 4, 3, 2, 1, 1 };
  static int[] ZSHZ = { 0, 1, 2, 1, 3, 3, 3, 4, 5, 4, 5, 5, 4, 5, 5, 4, 5, 5, 4, 5, 4, 3, 3, 3, 1, 2, 1 };
  static int[] EXHZ = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 };
  static int[] EZBD = { 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1 };
  static int[] SXHZ = { 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 63, 69, 73, 75, 75, 73, 69, 63, 55, 45, 36, 28, 21, 15, 10, 6, 3, 1 };
  static int[] SZBD = { 1, 1, 2, 3, 4, 5, 7, 8, 10, 12, 13, 14, 15, 15, 15, 15, 14, 13, 12, 10, 8, 7, 5, 4, 3, 2, 1, 1 };

  public static Double getAllMoney(int zhushu, int[] beishu)
  {
    Double result = Double.valueOf(2.0D);
    int allbeishu = 0;
    int[] var7 = beishu;
    int var6 = beishu.length;

    for (int var5 = 0; var5 < var6; var5++) {
      int i = var7[var5];
      allbeishu += i;
    }

    return Double.valueOf(result.doubleValue() * zhushu * allbeishu);
  }

  public static int getAllZhushu(String codes, String lot) {
    int zhushu = 0;
    String[] split = codes.split("#");
    String[] var7 = split;
    int var6 = split.length;

    for (int var5 = 0; var5 < var6; var5++) {
      String str = var7[var5];
      int one = getZhushu(str, lot);
      if (one <= 0) {
        return 0;
      }

      zhushu += one;
    }

    return zhushu;
  }

  private static int getZhushu(String code, String lot) {
    int zs = 0;
    if ((!"Cqssc".equals(lot)) && (!"Jxssc".equals(lot)) && (!"Hnssc".equals(lot)) && (!"Ynssc".equals(lot)) && (!"Txffc".equals(lot))) {
      if ((!"Sd11x5".equals(lot)) && (!"Jx11x5".equals(lot)) && (!"Gd11x5".equals(lot)) && (!"Cq11x5".equals(lot)) && (!"Sh11x5".equals(lot))) {
        if ((!"Ssq".equals(lot)) && (!"Dlt".equals(lot)) && (!"Pl5".equals(lot)) && (!"Fc3d".equals(lot)) && (!"Pl3".equals(lot))) {
          if (("Jsk3".equals(lot)) || ("Gxk3".equals(lot)) || ("Ahk3".equals(lot)))
            zs = _Kuai3(code);
        }
        else
          zs = _Def(code);
      }
      else
        zs = _11x5(code);
    }
    else {
      zs = _Ssc(code);
    }

    return zs;
  }

  private static int _Def(String code) {
    int zs = 0;
    String[] co = code.split(":");
    String type = co[0];
    String[] split = co[1].split(",");

    if (ArrayUtils.contains(PlayType._Def_ZuXuan, type)) {
      if (CheckUtil.Regex("[0-9](,[0-9]){1,9}", co[1])) {
        int l0 = split.length;
        byte var13 = 0;
        byte ddmp = 1;
        if (type.equals(PlayType.T114)) {
          ddmp = 2;
          var13 = 2;
        } else if (type.equals(PlayType.T117)) {
          var13 = 3;
        }

        zs = Combination(l0, var13) * ddmp;
      }

      return zs;
    }

    if (ArrayUtils.contains(PlayType._Def_HeZhi, type)) {
      for (int l0 = 0; l0 < split.length; l0++) {
        int l1 = TryStatic.StrToInt(split[l0], 0);
        if (type.equals(PlayType.T113))
          zs += SXHZ[l1];
        else if (type.equals(PlayType.T115))
          zs += ZSHZ[l1];
        else if (type.equals(PlayType.T118)) {
          zs += ZLHZ[l1];
        }
      }

      return zs;
    }if (ArrayUtils.contains(PlayType._Def_DanTuo, type)) {
      if (CheckUtil.Regex("[0-9](,[0-9]){0,1}[$][0-9](,[0-9]){1,9}", co[1])) {
        String[] var14 = co[1].split("\\$");
        int l0 = var14[0].split(",").length;
        int l1 = 0;
        try
        {
          l1 = var14[1].split(",").length;
        }
        catch (Exception localException)
        {
        }
        byte ddmp = 0;
        byte var15 = 0;
        if (type.equals(PlayType.T116)) {
          if (l0 == 1) {
            ddmp = 2;
            var15 = 2;
          }
        } else if ((type.equals(PlayType.T119)) && ((l0 == 1) || (l0 == 2))) {
          ddmp = 1;
          var15 = 3;
        }

        zs = Combination(l1, var15 - l0) * ddmp;
      }

      return zs;
    }
    zs = 1;
    String[] var11 = split;
    int var10 = split.length;

    for (int numbase = 0; numbase < var10; numbase++) {
      String str = var11[numbase];
      zs *= str.length();
    }

    return zs;
  }

  private static int _Ssc(String code)
  {
    int zs = 0;
    String[] co = code.split(":");
    String type = co[0];
    String[] split = co[1].split(",");

    if (ArrayUtils.contains(PlayType._Ssc_HeZhi, type)) {
      for (int l0 = 0; l0 < split.length; l0++) {
        int l1 = TryStatic.StrToInt(split[l0], 0);
        if (type.equals(PlayType.T303))
          zs += EXHZ[l1];
        else if (type.equals(PlayType.T306))
          zs += EZBD[l1];
        else if (type.equals(PlayType.T309))
          zs += SXHZ[l1];
        else if (type.equals(PlayType.T312)) {
          zs += SZBD[l1];
        }
      }

      return zs;
    }

    if (ArrayUtils.contains(PlayType._Ssc_ZuXuan, type)) {
      if (CheckUtil.Regex("[0-9](,[0-9]){1,9}", co[1])) {
        int l0 = split.length;
        byte var13 = 0;
        byte var14 = 1;
        if (type.equals(PlayType.T304)) {
          var13 = 2;
          if ((l0 < 2) || (l0 > 7))
            return 0;
        }
        else if (type.equals(PlayType.T310)) {
          var14 = 2;
          var13 = 2;
        } else if (type.equals(PlayType.T311)) {
          var13 = 3;
        } else if (type.equals(PlayType.T314)) {
          var13 = 3;
          var14 = 6;
          if (l0 < 3) {
            return 0;
          }
        }

        zs = Combination(l0, var13) * var14;
      }

      return zs;
    }if (ArrayUtils.contains(PlayType._Ssc_ChangDu, type)) {
      if (CheckUtil.Regex("[0-9](,[0-9]){0,9}", co[1])) {
        int l0 = split.length;
        if (type.equals(PlayType.T307))
          zs = l0 * 10;
        else if (type.equals(PlayType.T313)) {
          zs = l0 * 55;
        }
      }

      return zs;
    }

    if ((!type.equals(PlayType.T318)) && (!type.equals(PlayType.T319))) {
      if (ArrayUtils.contains(PlayType._Ssc_DanTuo, type)) {
        if (CheckUtil.Regex("[0-9](,[0-9]){0,1}[$][0-9](,[0-9]){1,9}", co[1])) {
          String[] var16 = co[1].split("\\$");
          int l0 = var16[0].split(",").length;
          int l1 = 0;
          try
          {
            l1 = var16[1].split(",").length;
          }
          catch (Exception localException)
          {
          }
          byte var14 = 0;
          byte var17 = 0;
          if (type.equals(PlayType.T320)) {
            if (l0 == 1) {
              var14 = 2;
              var17 = 2;
            }
          } else if ((type.equals(PlayType.T321)) && ((l0 == 1) || (l0 == 2))) {
            var14 = 1;
            var17 = 3;
          }

          zs = Combination(l1, var17 - l0) * var14;
        }

        return zs;
      }
      zs = 1;
      String[] var11 = split;
      int var10 = split.length;

      for (int numbase = 0; numbase < var10; numbase++) {
        String var15 = var11[numbase];
        zs *= var15.length();
      }

      return zs;
    }

    int l0 = split[0].replace("-", "").length();
    int l1 = split[1].replace("-", "").length();
    int ddmp = split[2].replace("-", "").length();
    int str = split[3].replace("-", "").length();
    int numbase = split[4].replace("-", "").length();
    if (type.equals(PlayType.T318))
      zs = l0 + l1 + ddmp + str + numbase;
    else if (type.equals(PlayType.T319)) {
      zs = l0 * (l1 + ddmp + str + numbase) + l1 * (ddmp + str + numbase) + ddmp * (str + numbase) + str * numbase;
    }

    return zs;
  }

  private static int _11x5(String code)
  {
    int zs = 0;
    String[] co = code.split(":");
    String type = co[0];
    String[] split = co[1].split(",");
    if (ArrayUtils.contains(PlayType._11x5_ZuXuan, type)) {
      if (CheckUtil.Regex("[0-1][0-9](,[0-1][0-9]){1,10}", co[1])) {
        int var12 = split.length;
        byte var14 = 0;
        byte var16 = 1;
        if ((!type.equals(PlayType.T355)) && (!type.equals(PlayType.T352))) {
          if ((!type.equals(PlayType.T356)) && (!type.equals(PlayType.T354))) {
            if (type.equals(PlayType.T357))
              var14 = 4;
            else if (type.equals(PlayType.T358))
              var14 = 5;
            else if (type.equals(PlayType.T359))
              var14 = 6;
            else if (type.equals(PlayType.T360))
              var14 = 7;
            else if (type.equals(PlayType.T361))
              var14 = 8;
          }
          else
            var14 = 3;
        }
        else {
          var14 = 2;
        }

        zs = Combination(var12, var14) * var16;
      }

      return zs;
    }

    if (ArrayUtils.contains(PlayType._11x5_DanTuo, type)) {
      if (CheckUtil.Regex("[0-1][0-9](,[0-1][0-9]){0,6}[$][0-1][0-9](,[0-1][0-9]){0,10}", co[1])) {
        String[] tt1 = co[1].split("\\$");
        int var13 = tt1[0].split(",").length;
        int var15 = 0;
        try
        {
          var15 = tt1[1].split(",").length;
        }
        catch (Exception localException)
        {
        }
        byte var17 = 0;
        if ((!type.equals(PlayType.T364)) && (!type.equals(PlayType.T362))) {
          if ((!type.equals(PlayType.T365)) && (!type.equals(PlayType.T363))) {
            if (type.equals(PlayType.T366))
              var17 = 4;
            else if (type.equals(PlayType.T367))
              var17 = 5;
            else if (type.equals(PlayType.T368))
              var17 = 6;
            else if (type.equals(PlayType.T369))
              var17 = 7;
            else if (type.equals(PlayType.T370))
              var17 = 8;
          }
          else
            var17 = 3;
        }
        else {
          var17 = 2;
        }

        if ((var13 < var17) && (var13 > 0) && (var13 + var15 <= 11)) {
          zs = Combination(var15, var17 - var13);
        }
      }

      return zs;
    }if (type.equals(PlayType.T350)) {
      if (CheckUtil.Regex("[0-1][0-9](\\s[0-1][0-9]){0,10}", co[1])) {
        String[] tt1 = co[1].split(" ");
        zs = tt1.length;
      }

      return zs;
    }

    if (type.equals(PlayType.T351)) {
      zs = 0;
      if ((CheckUtil.Regex("([0-1][0-9](\\s[0-1][0-9]){0,10}),([0-1][0-9](\\s[0-1][0-9]){0,10})", co[1])) && (split.length == 2)) {
        String[] tt1 = split[0].split(" ");
        String[] tt2 = split[1].split(" ");

        for (int var15 = 0; var15 < tt1.length; var15++) {
          if (tt1[var15] != " ") {
            for (int i = 0; i < tt2.length; i++) {
              if ((tt2[i] != " ") && (!tt1[var15].equals(tt2[i]))) {
                zs++;
              }
            }
          }
        }
      }

      return zs;
    }if (!type.equals(PlayType.T353)) {
      return 0;
    }
    zs = 0;
    if ((CheckUtil.Regex("([0-1][0-9](\\s[0-1][0-9]){0,10}),([0-1][0-9](\\s[0-1][0-9]){0,10}),([0-1][0-9](\\s[0-1][0-9]){0,10})", co[1])) && (split.length == 3)) {
      String[] tt1 = split[0].split(" ");
      String[] tt2 = split[1].split(" ");
      String[] tt3 = split[2].split(" ");

      for (int i = 0; i < tt1.length; i++) {
        if (tt1[i] != " ") {
          for (int k = 0; k < tt2.length; k++) {
            if (tt2[k] != " ") {
              for (int n = 0; n < tt3.length; n++) {
                if ((tt3[n] != " ") && (!tt1[i].equals(tt3[n])) && (!tt2[k].equals(tt3[n])) && (!tt1[i].equals(tt2[k]))) {
                  zs++;
                }
              }
            }
          }
        }
      }
    }

    return zs;
  }

  private static int _Kuai3(String code)
  {
    int zs = 0;
    String[] co = code.split(":");
    String type = co[0];
    String[] split = co[1].split(",");

    if ((!type.equals(PlayType.T400)) && (!type.equals(PlayType.T402)) && (!type.equals(PlayType.T401)) && (!type.equals(PlayType.T405)) && (!type.equals(PlayType.T406))) {
      if ((!type.equals(PlayType.T403)) && (!type.equals(PlayType.T408)))
      {
        if ((!type.equals(PlayType.T410)) && (!type.equals(PlayType.T409))) {
          if (type.equals(PlayType.T407)) {
            if (!CheckUtil.Regex("(11|22|33|44|55|66)(,(11|22|33|44|55|66)){0,4}[$][1-6](,[1-6]){0,4}", co[1])) {
              return 0;
            }
            split = co[1].split("\\$");
            zs = 0;
            if (split.length == 2) {
              String[] var9 = split[0].split(",");
              String[] var11 = split[1].split(",");

              for (int i = 0; i < var9.length; i++) {
                if (var9[i].trim() != "") {
                  for (int var12 = 0; var12 < var11.length; var12++) {
                    if ((var11[var12].trim() != "") && (!var9[i].equals(var11[var12] + var11[var12]))) {
                      zs++;
                    }
                  }
                }
              }
            }

            return zs;
          }

          return zs;
        }
        if (!CheckUtil.Regex("[1-6](,[1-6]){0,1}[$][1-6](,[1-6]){0,5}", co[1])) {
          return 0;
        }
        String[] var9 = co[1].split("\\$");
        int var10 = var9[0].split(",").length;
        int i = var9[1].split(",").length;

        if (type.equals(PlayType.T409)) {
          if (var10 == 1) {
            byte k = 2;
            zs = Combination(i, k - var10);
          }
        } else if ((type.equals(PlayType.T410)) && ((var10 == 1) || (var10 == 2))) {
          byte k = 3;
          zs = Combination(i, k - var10);
        }

        return zs;
      }
      if (!CheckUtil.Regex("[1-6](,[1-6]){1,5}", co[1])) {
        return 0;
      }
      int tt1 = split.length;
      byte tt2 = 2;
      if (type.equals(PlayType.T403)) {
        tt2 = 3;
      }

      return Combination(tt1, tt2);
    }

    int tt1 = split.length;
    return (type.equals(PlayType.T406)) && (CheckUtil.Regex("(11|22|33|44|55|66)(,(11|22|33|44|55|66)){0,5}", co[1])) ? tt1 : (type.equals(PlayType.T405)) && (co[1].equals("三连号通选")) ? 1 : (type.equals(PlayType.T401)) && (co[1].equals("三同号通选")) ? 1 : (type.equals(PlayType.T402)) && (CheckUtil.Regex("(111|222|333|444|555|666)(,(111|222|333|444|555|666)){0,5}", co[1])) ? tt1 : (CheckUtil.Regex("(3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18)(,(3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18)){0,15}", co[1])) && (type.equals(PlayType.T400)) ? tt1 : 0;
  }

  private static int Combination(int n, int m)
  {
    int n1 = 1;
    int n2 = 1;
    int i = n;

    for (int j = 1; j <= m; n2 *= j++) {
      n1 *= i--;
    }

    return n1 / n2;
  }
}