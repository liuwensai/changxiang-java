package com.caipiao.data.open;

import com.caipiao.utils.LotEmun;
import com.caipiao.utils.PlayType;
import com.caipiao.utils.SystemSet;
import com.caipiao.utils.TryStatic;
import com.sysbcjzh.utils.StringUtils;
import java.io.PrintStream;
import java.util.HashMap;
import java.util.Properties;

public class MethodOpenCode
{
  static final String money = "money";
  static final String point = "point";
  static final Properties moneyset = SystemSet.money;

  private static double getTryMoney(String lot, String type)
  {
    return TryStatic.StrToDouble(moneyset.getProperty(lot + "_" + type + "_" + "money"));
  }

  private static double getTryPoint(String lot, String type) {
    return TryStatic.StrToDouble(moneyset.getProperty(lot + "_" + type + "_" + "point"));
  }

  public static HashMap GetWinMoney(String lot, String codes, int bs, String haoma) {
    System.out.println(codes + "===codes==" + bs + "===bs==" + haoma + "===haoma==" + lot);
    HashMap temp = new HashMap();
    double moneytemp = 0.0D;
    double pointtemp = 0.0D;
    int type = LotEmun.valueOf(lot).type;
    String[] split = codes.split("#");
    String[] var14 = split;
    int var13 = split.length;

    for (int var12 = 0; var12 < var13; var12++) {
      String s = var14[var12];
      if (1 == type)
      {
        temp = OpenOneSsc(s, lot, haoma, s);
      } else if (type == 0)
      {
        temp = OpenOneSsq(s, lot, haoma);
      }

      moneytemp += ((Double)temp.get("money")).doubleValue();
      pointtemp += ((Double)temp.get("point")).doubleValue();
    }

    temp.put("money", Double.valueOf(moneytemp * bs));
    temp.put("point", Double.valueOf(pointtemp * bs));
    return temp;
  }

  private static HashMap OpenOneSsc(String thecode, String lot, String haoma, String codes) {
    HashMap result = new HashMap();
    double win = 0.0D;
    double winPoint = 0.0D;
    String[] split = thecode.split(":");
    String type = split[0];
    String code = split[1];

    double tryMoney = getTryMoney(lot, type);

    String[] hms = haoma.split(",");

    if ((!LotEmun.Cqssc.name.equals(lot)) && (!LotEmun.Jxssc.name.equals(lot)) && (!LotEmun.Hnssc.name.equals(lot)) && (!LotEmun.Ynssc.name.equals(lot))&& (!LotEmun.Txffc.name.equals(lot)))
    {
      if ((!LotEmun.Sd11x5.name.equals(lot)) && (!LotEmun.Jx11x5.name.equals(lot)) && (!LotEmun.Gd11x5.name.equals(lot)) && (!LotEmun.Cq11x5.name.equals(lot)) && (!LotEmun.Sh11x5.name.equals(lot))) {
        if ((LotEmun.Jsk3.name.equals(lot)) || (LotEmun.Gxk3.name.equals(lot)) || (LotEmun.Ahk3.name.equals(lot))) {
          boolean var36 = false;
          boolean eth = false;
          boolean sbt = false;
          boolean slh = false;
          Integer hz1 = Integer.valueOf(TryStatic.StrToInt(hms[0]));
          Integer hz2 = Integer.valueOf(TryStatic.StrToInt(hms[1]));
          Integer var47 = Integer.valueOf(TryStatic.StrToInt(hms[2]));
          Integer var69 = Integer.valueOf(hz1.intValue() + hz2.intValue() + var47.intValue());
          if ((hms[0].equals(hms[1])) && (hms[1].equals(hms[2])))
          {
            var36 = true;
          } else if ((!hms[0].equals(hms[1])) && (!hms[1].equals(hms[2])))
          {
            sbt = true;
            int var58 = TryStatic.StrToInt(hms[0]);
            int var57 = TryStatic.StrToInt(hms[1]);
            int var59 = TryStatic.StrToInt(hms[2]);
            if ((var58 + 1 == var57) && (var57 + 1 == var59))
              slh = true;
          }
          else
          {
            eth = true;
          }

          String[] var53 = code.split(",");
          if (PlayType.T400.equals(type)) {
            String haos = String.valueOf(var69);
            String[] var65 = var53;
            int var67 = var53.length;

            for (int var66 = 0; var66 < var67; var66++) {
              String var68 = var65[var66];
              boolean var73 = haos.equals(var68);
              if (var73) {
                if ((!"3".equals(haos)) && (!"18".equals(haos))) {
                  if ((!"4".equals(haos)) && (!"17".equals(haos))) {
                    if ((!"5".equals(haos)) && (!"16".equals(haos))) {
                      if ((!"6".equals(haos)) && (!"15".equals(haos))) {
                        if ((!"7".equals(haos)) && (!"14".equals(haos))) {
                          if ((!"8".equals(haos)) && (!"13".equals(haos))) {
                            if ((!"9".equals(haos)) && (!"12".equals(haos))) {
                              if (("10".equals(haos)) || ("11".equals(haos)))
                                tryMoney = getTryMoney(lot, PlayType.T400 + "8");
                            }
                            else
                              tryMoney = getTryMoney(lot, PlayType.T400 + "7");
                          }
                          else
                            tryMoney = getTryMoney(lot, PlayType.T400 + "6");
                        }
                        else
                          tryMoney = getTryMoney(lot, PlayType.T400 + "5");
                      }
                      else
                        tryMoney = getTryMoney(lot, PlayType.T400 + "4");
                    }
                    else
                      tryMoney = getTryMoney(lot, PlayType.T400 + "3");
                  }
                  else
                    tryMoney = getTryMoney(lot, PlayType.T400 + "2");
                }
                else {
                  tryMoney = getTryMoney(lot, PlayType.T400 + "1");
                }

                win = tryMoney;
                break;
              }
            }
          } else if ((!PlayType.T401.equals(type)) && (!PlayType.T402.equals(type))) {
            if ((!PlayType.T403.equals(type)) && (!PlayType.T404.equals(type))) {
              if (PlayType.T405.equals(type)) {
                if ((slh) && (code.equals("三连号通选"))) {
                  win = tryMoney;
                }

              }
              else if ((!PlayType.T406.equals(type)) && (!PlayType.T407.equals(type))) {
                if (PlayType.T408.equals(type)) {
                  if (!var36) {
                    int var57 = 0;
                    if (code.contains(hms[0])) {
                      var57++;
                    }

                    if (code.contains(hms[1])) {
                      var57++;
                    }

                    if (code.contains(hms[2])) {
                      var57++;
                    }

                    if (sbt) {
                      if (2 == var57)
                        win = tryMoney;
                      else if (3 == var57)
                        win = 3.0D * tryMoney;
                    }
                    else if (3 == var57)
                      win = tryMoney;
                  }
                }
                else if ((PlayType.T409.equals(type)) || (PlayType.T410.equals(type))) {
                  String haos = hms[0] + hms[1] + hms[2];
                  String[] var65 = code.split("\\$");
                  String[] var71 = var65[0].split(",");
                  String[] var72 = var65[1].split(",");

                  if (PlayType.T409.equals(type)) {
                    if ((!var36) && (haos.contains(var65[0]))) {
                      haos = haos.replaceAll(var65[0], "");
                      int var70 = 0;
                      String[] var74 = var72;
                      int l4 = var72.length;

                      for (int tm = 0; tm < l4; tm++) {
                        String as9 = var74[tm];
                        if (haos.contains(as9)) {
                          var70++;
                          haos = haos.replaceAll(as9, "");
                        }
                      }

                      win = getTryMoney(lot, PlayType.T408) * var70;
                    }
                  } else if ((PlayType.T410.equals(type)) && (sbt)) {
                    boolean zhong = true;
                    String[] var74 = var71;
                    int l4 = var71.length;

                    for (int tm = 0; tm < l4; tm++) {
                      String as9 = var74[tm];
                      if (!haos.contains(as9)) {
                        zhong = false;
                        break;
                      }

                      haos = haos.replaceAll(as9, "");
                    }

                    if (zhong) {
                      String[] var76 = haos.split("");
                      String[] var77 = var76;
                      int j5 = var76.length;

                      for (int i5 = 0; i5 < j5; i5++) {
                        String str = var77[i5];
                        if ((!StringUtils.isBlank(str)) && (!var65[1].contains(str))) {
                          zhong = false;
                          break;
                        }
                      }
                    }

                    if (zhong)
                      win = getTryMoney(lot, PlayType.T403);
                  }
                }
              }
              else if (eth) {
                String haos = hms[0];
                String var60 = hms[2];
                if (hms[1].equals(hms[2])) {
                  haos = hms[1];
                  var60 = hms[0];
                } else if (hms[0].equals(hms[2])) {
                  var60 = hms[1];
                }

                if ((PlayType.T406.equals(type)) && (code.contains(haos + haos))) {
                  win = tryMoney;
                } else if (PlayType.T407.equals(type)) {
                  String[] var71 = code.split("\\$");
                  if ((var71[0].contains(haos + haos)) && (var71[1].contains(var60))) {
                    win = tryMoney;
                  }
                }
              }
            }
            else if (sbt)
              if (PlayType.T403.equals(type)) {
                boolean var64 = code.contains(hms[0]);
                boolean hao = code.contains(hms[1]);
                boolean dms = code.contains(hms[2]);
                if ((var64) && (hao) && (dms))
                  win = tryMoney;
              }
              else {
                PlayType.T404.equals(type);
              }
          }
          else if (var36) {
            if ((PlayType.T401.equals(type)) && (code.equals("三同号通选")))
              win = tryMoney;
            else if ((PlayType.T402.equals(type)) && (code.contains(hms[0] + hms[1] + hms[2])))
              win = tryMoney;
          }
        }
      }
      else if ((!PlayType.T350.equals(type)) && (!PlayType.T352.equals(type)) && (!PlayType.T354.equals(type))) {
        if ((!PlayType.T351.equals(type)) && (!PlayType.T353.equals(type))) {
          if ((!PlayType.T355.equals(type)) && (!PlayType.T356.equals(type)) && (!PlayType.T357.equals(type)) && (!PlayType.T358.equals(type)) && (!PlayType.T359.equals(type)) && (!PlayType.T360.equals(type)) && (!PlayType.T361.equals(type))) {
            if ((PlayType.T362.equals(type)) || (PlayType.T363.equals(type)) || (PlayType.T364.equals(type)) || (PlayType.T365.equals(type)) || (PlayType.T366.equals(type)) || (PlayType.T367.equals(type)) || (PlayType.T368.equals(type)) || (PlayType.T369.equals(type)) || (PlayType.T370.equals(type))) {
              String[] sth = code.split("\\$");
              String[] var38 = sth[0].split(",");
              String[] var41 = sth[1].split(",");
              byte var43 = 0;
              if (PlayType.T362.equals(type)) {
                var43 = 2;
                tryMoney = getTryMoney(lot, PlayType.T352);
              } else if (PlayType.T363.equals(type)) {
                var43 = 3;
                tryMoney = getTryMoney(lot, PlayType.T354);
              } else if (PlayType.T364.equals(type)) {
                var43 = 2;
                tryMoney = getTryMoney(lot, PlayType.T355);
              } else if (PlayType.T365.equals(type)) {
                var43 = 3;
                tryMoney = getTryMoney(lot, PlayType.T356);
              } else if (PlayType.T366.equals(type)) {
                var43 = 4;
                tryMoney = getTryMoney(lot, PlayType.T357);
              } else if (PlayType.T367.equals(type)) {
                var43 = 5;
                tryMoney = getTryMoney(lot, PlayType.T358);
              } else if (PlayType.T368.equals(type)) {
                var43 = 6;
                tryMoney = getTryMoney(lot, PlayType.T359);
              } else if (PlayType.T369.equals(type)) {
                var43 = 7;
                tryMoney = getTryMoney(lot, PlayType.T360);
              } else if (PlayType.T370.equals(type)) {
                var43 = 8;
                tryMoney = getTryMoney(lot, PlayType.T361);
              }

              if ((var38.length < var43) && (var38.length + var41.length >= var43)) {
                int var51 = 0;
                String var50 = haoma;
                String[] var75 = hms;
                if (PlayType.T362.equals(type)) {
                  var50 = haoma.substring(0, 5);
                  var75 = var50.split(",");
                } else if (PlayType.T363.equals(type)) {
                  var50 = haoma.substring(0, 8);
                  var75 = var50.split(",");
                }

                String[] var56 = var38;
                int var58 = var38.length;

                for (int var57 = 0; var57 < var58; var57++) {
                  String var60 = var56[var57];
                  if (var50.contains(var60)) {
                    var51++;
                  }
                }

                if ((var38.length == var51) || (var38.length - var51 <= var43 - 5)) {
                  int var57 = 0;
                  String[] var65 = var75;
                  int var67 = var75.length;

                  for (int var66 = 0; var66 < var67; var66++) {
                    String var68 = var65[var66];
                    if (sth[1].contains(var68)) {
                      var57++;
                    }
                  }

                  if (var43 > 5) {
                    if (var57 + var51 == 5)
                      win = tryMoney * Comb(var41.length - var57, var43 - var38.length - var57);
                  }
                  else
                    win = tryMoney * Comb(var57, var43 - var38.length);
                }
              }
            }
          }
          else {
            boolean var36 = code.contains(hms[0]);
            boolean eth = code.contains(hms[1]);
            boolean sbt = code.contains(hms[2]);
            boolean slh = code.contains(hms[3]);
            boolean var42 = code.contains(hms[4]);
            int var48 = code.split(",").length;
            if (var48 >= 11) {
              var48 = 11;
            }

            int var52 = 0;
            boolean var54 = false;
            if (var36) {
              var52++;
            }

            if (eth) {
              var52++;
            }

            if (sbt) {
              var52++;
            }

            if (slh) {
              var52++;
            }

            if (var42)
              var52++;
            byte var61;
            if (PlayType.T355.equals(type)) {
              var61 = 2;
            }
            else
            {
              if (PlayType.T356.equals(type)) {
                var61 = 3;
              }
              else
              {
                if (PlayType.T357.equals(type)) {
                  var61 = 4;
                }
                else
                {
                  if (PlayType.T358.equals(type)) {
                    var61 = 5;
                  } else if ((PlayType.T359.equals(type)) && (var52 == 5)) {
                     var61 = 1;
                    var52 = var48 - 5;
                  } else if ((PlayType.T360.equals(type)) && (var52 == 5)) {
                     var61 = 2;
                    var52 = var48 - 5;
                  } else if ((PlayType.T361.equals(type)) && (var52 == 5)) {
                   var61 = 3;
                    var52 = var48 - 5;
                  } else {
                    var61 = 5;
                  }
                }
              }
            }
            win = tryMoney * Comb(var52, var61);
          }
        } else {
          String[] sth = code.split(",");
          String var37 = sth[0];
          String var39 = sth[1];
          String var40 = "";
          try
          {
            var40 = sth[2];
          }
          catch (Exception localException)
          {
          }
          boolean var42 = var37.contains(hms[0]);
          boolean var45 = var39.contains(hms[1]);
          boolean var49 = var40.contains(hms[2]);
          if ((PlayType.T351.equals(type)) && (var42) && (var45))
            win = tryMoney;
          else if ((PlayType.T353.equals(type)) && (var42) && (var45) && (var49))
            win = tryMoney;
        }
      }
      else {
        boolean var36 = code.contains(hms[0]);
        boolean eth = code.contains(hms[1]);
        boolean sbt = code.contains(hms[2]);
        if ((PlayType.T350.equals(type)) && (var36))
          win = tryMoney;
        else if ((PlayType.T352.equals(type)) && (var36) && (eth))
          win = tryMoney;
        else if ((PlayType.T354.equals(type)) && (var36) && (eth) && (sbt)) {
          win = tryMoney;
        }
      }

    }
    else
    {
      String[] sth = code.split(",");
      String t = codes.substring(codes.length() - 2, codes.length());
      String f1 = "";
      String f2 = "";
      String f3 = "";

      if (":1".equals(t)) {
        f1 = hms[0];
        f2 = hms[1];
        f3 = hms[2];
      } else if (":2".equals(t)) {
        f1 = hms[1];
        f2 = hms[2];
        f3 = hms[3];
      } else if (":3".equals(t)) {
        f1 = hms[2];
        f2 = hms[3];
        f3 = hms[4];
      } else {
        f1 = hms[2];
        f2 = hms[3];
        f3 = hms[4];
      }

      sth = code.split(",");
      boolean eth = (f1.equals(f2)) && (f1.equals(f3));
      boolean sbt = (!f1.equals(f2)) && (!f1.equals(f3)) && (!f3.equals(f2));
      boolean slh = f2.equals(f3);

      if (PlayType.T300.equals(type)) {
        Integer hz1 = Integer.valueOf(hms[3]);
        Integer hz2 = Integer.valueOf(hms[4]);
        String hz3 = hz1.intValue() <= 4 ? "小" : "大";
        String HZ = hz1.intValue() % 2 != 0 ? "单" : "双";
        String buyhm = hz2.intValue() <= 4 ? "小" : "大";
        String haos = hz2.intValue() % 2 != 0 ? "单" : "双";
        boolean hao = sth[0].contains(hz3);
        boolean dms = sth[0].contains(HZ);
        boolean tms = sth[1].contains(buyhm);
        boolean zhong = sth[1].contains(haos);
        int as8 = 0;
        int l4 = 0;
        if (hao) {
          as8++;
        }

        if (dms) {
          as8++;
        }

        if (tms) {
          l4++;
        }

        if (zhong) {
          l4++;
        }

        win = as8 * l4 * tryMoney;
      }
      else if ((!PlayType.T303.equals(type)) && (!PlayType.T306.equals(type)) && (!PlayType.T309.equals(type)) && (!PlayType.T312.equals(type)))
      {
        if ((!PlayType.T304.equals(type)) && (!PlayType.T305.equals(type)) && (!PlayType.T314.equals(type)) && (!PlayType.T310.equals(type)) && (!PlayType.T311.equals(type)) && (!PlayType.T322.equals(type)))
        {
          if ((!PlayType.T307.equals(type)) && (!PlayType.T313.equals(type)))
          {
            if ((!PlayType.T320.equals(type)) && (!PlayType.T321.equals(type)))
            {
              boolean var42 = sth[0].contains(hms[0]);
              boolean var45 = sth[1].contains(hms[1]);
              boolean var49 = sth[2].contains(hms[2]);
              boolean var54 = sth[3].contains(hms[3]);
              boolean var55 = sth[4].contains(hms[4]);

              if (PlayType.T308.equals(type))
              {
                if (":1".equals(t))
                {
                  if ((var42) && (var45) && (var49)) {
                    win = tryMoney;
                  }
                  System.out.println(win);
                } else if (":2".equals(t))
                {
                  if ((var45) && (var49) && (var54)) {
                    win = tryMoney;
                  }
                }
                else if (":3".equals(t))
                {
                  if ((var49) && (var54) && (var55)) {
                    win = tryMoney;
                  }
                }

              }
              else if (PlayType.T315.equals(type))
              {
                if ((var45) && (var49) && (var54) && (var55)) {
                  win = tryMoney;
                }

                if (((var45) && (var49) && (var54)) || ((var49) && (var54) && (var55)))
                  win += getTryMoney(lot, PlayType.T315 + "1");
              }
              else if ((!PlayType.T316.equals(type)) && (!PlayType.T317.equals(type))) {
                if (PlayType.T318.equals(type))
                {
                  if (var42) {
                    win += tryMoney;
                  }

                  if (var45) {
                    win += tryMoney;
                  }

                  if (var49) {
                    win += tryMoney;
                  }

                  if (var54) {
                    win += tryMoney;
                  }

                  if (var55)
                    win += tryMoney;
                }
                else if (PlayType.T319.equals(type))
                {
                  int var57 = 0;
                  if (var42) {
                    var57++;
                  }

                  if (var45) {
                    var57++;
                  }

                  if (var49) {
                    var57++;
                  }

                  if (var54) {
                    var57++;
                  }

                  if (var55) {
                    var57++;
                  }

                  win = tryMoney * Comb(var57, 2);
                } else if (PlayType.T301.equals(type))
                {
                  if (var55)
                    win = tryMoney;
                }
                else if ((PlayType.T302.equals(type)) && (var54) && (var55))
                {
                  win = tryMoney;
                }
              }
              else {
                if ((var42) && (var45) && (var49) && (var54) && (var55)) {
                  win = tryMoney;
                }

                if (PlayType.T317.equals(type)) {
                  if ((var42) && (var45) && (var49)) {
                    win += getTryMoney(lot, PlayType.T317 + "1");
                  }

                  if ((var55) && (var54) && (var49)) {
                    win += getTryMoney(lot, PlayType.T317 + "1");
                  }

                  if ((var42) && (var45)) {
                    win += getTryMoney(lot, PlayType.T317 + "2");
                  }

                  if ((var54) && (var55))
                    win += getTryMoney(lot, PlayType.T317 + "2");
                }
              }
            }
            else
            {
              sth = code.split("\\$");
              if ((PlayType.T320.equals(type)) && (!sbt) && (!eth))
              {
                String var46 = f1;
                String var50 = f2;
                if (f1.equals(f2)) {
                  var50 = f3;
                }

                boolean var49 = sth[0].equals(var46);
                boolean var54 = sth[0].equals(var50);
                boolean var55 = sth[1].contains(var46);
                boolean var64 = sth[1].contains(var50);
                if (((var49) && (var64)) || ((var54) && (var55)))
                  win = getTryMoney(lot, PlayType.T310);
              }
              else if ((PlayType.T321.equals(type)) && (sbt))
              {
                String[] var44 = sth[0].split(",");
                String var50 = f1 + f2 + f3;
                boolean var49 = true;
                String[] var56 = var44;
                int var58 = var44.length;

                for (int var57 = 0; var57 < var58; var57++) {
                  String var60 = var56[var57];
                  if (!var50.contains(var60)) {
                    var49 = false;
                    break;
                  }

                  var50 = var50.replaceAll(var60, "");
                }

                if (var49) {
                  String[] var63 = var50.split("");
                  String[] var65 = var63;
                  int var67 = var63.length;

                  for (int var66 = 0; var66 < var67; var66++) {
                    String var68 = var65[var66];
                    if (!sth[1].contains(var68)) {
                      var49 = false;
                      break;
                    }
                  }
                }

                if (var49)
                  win = getTryMoney(lot, PlayType.T311);
              }
            }
          }
          else
          {
            String[] var44 = sth;
            int var48 = sth.length;

            for (int var52 = 0; var52 < var48; var52++) {
              String HZ = var44[var52];
              if (PlayType.T307.equals(type)) {
                if ((HZ.equals(f2)) || (HZ.equals(f3))) {
                  if (slh)
                    win += getTryMoney(lot, PlayType.T302);
                  else
                    win += getTryMoney(lot, PlayType.T304);
                }
              }
              else if ((PlayType.T313.equals(type)) && ((HZ.equals(f1)) || (HZ.equals(f2)) || (HZ.equals(f3)))) {
                if (eth)
                  win += getTryMoney(lot, PlayType.T308);
                else if (sbt)
                  win += getTryMoney(lot, PlayType.T311);
                else {
                  win += getTryMoney(lot, PlayType.T310);
                }
              }
            }

          }

        }
        else
        {
          boolean var42 = code.contains(f1);
          boolean var45 = code.contains(f2);
          boolean var49 = code.contains(f3);
          if (PlayType.T304.equals(type)) {
            if ((!slh) && (var45) && (var49))
              win = tryMoney;
          }
          else if (PlayType.T305.equals(type)) {
            var45 = sth[3].contains(f2);
            var49 = sth[4].contains(f3);
            boolean var54 = sth[3].contains(f3);
            boolean var55 = sth[4].contains(f2);
            if (((var45) && (var49)) || ((var54) && (var55))) {
              if (slh)
                win = getTryMoney(lot, PlayType.T302);
              else
                win = getTryMoney(lot, PlayType.T304);
            }
          }
          else if (PlayType.T310.equals(type)) {
            if ((!sbt) && (!eth) && (var42) && (var45) && (var49))
              win = tryMoney;
          }
          else if (PlayType.T322.equals(type)) {
            if ((!eth) && (!sbt)) {
              String[] var56 = split[1].split(",");
              String buyhm = var56[0];
              String haos = var56[1];
              String var60 = f1;
              String var62 = f2;
              if (var56[1].equals(var56[2])) {
                buyhm = var56[1];
                haos = var56[0];
              } else if (var56[0].equals(var56[1])) {
                haos = var56[2];
              }

              if (hms[3].equals(hms[4])) {
                var60 = hms[3];
                var62 = hms[2];
              } else if (hms[2].equals(hms[3])) {
                var62 = hms[4];
              }

              if ((buyhm.equals(var60)) && (haos.equals(var62)))
                win = getTryMoney(lot, PlayType.T310);
            }
          }
          else if (((PlayType.T314.equals(type)) || (PlayType.T311.equals(type))) && (sbt) && (var42) && (var45) && (var49)) {
            if (PlayType.T314.equals(type)) {
              tryMoney = getTryMoney(lot, PlayType.T308);
            }

            win = tryMoney;
          }
        }

      }
      else
      {
        Integer hz1 = Integer.valueOf(f1);
        Integer hz2 = Integer.valueOf(f2);
        Integer var47 = Integer.valueOf(f3);
        String HZ = "";
        if ((!PlayType.T303.equals(type)) && (!PlayType.T306.equals(type))) {
          if ((PlayType.T309.equals(type)) || (PlayType.T312.equals(type)))
            HZ = String.valueOf(hz1.intValue() + hz2.intValue() + var47.intValue());
        }
        else {
          HZ = String.valueOf(hz2.intValue() + var47.intValue());
        }

        String[] var53 = sth;
        int var57 = sth.length;

        for (int var59 = 0; var59 < var57; var59++) {
          String var62 = var53[var59];
          boolean tms = HZ.equals(var62);
          if (tms) {
            if (PlayType.T303.equals(type))
              tryMoney = getTryMoney(lot, PlayType.T302);
            else if (PlayType.T306.equals(type)) {
              if (slh)
                tryMoney = getTryMoney(lot, PlayType.T302);
              else
                tryMoney = getTryMoney(lot, PlayType.T304);
            }
            else if (PlayType.T309.equals(type))
              tryMoney = getTryMoney(lot, PlayType.T308);
            else if (PlayType.T312.equals(type)) {
              if (eth)
                tryMoney = getTryMoney(lot, PlayType.T308);
              else if (sbt)
                tryMoney = getTryMoney(lot, PlayType.T311);
              else {
                tryMoney = getTryMoney(lot, PlayType.T310);
              }
            }

            win = tryMoney;
            break;
          }
        }
      }

    }

    if (win > 0.0D) {
      winPoint = win * getTryPoint(lot, type);
    }

    result.put("money", Double.valueOf(win));
    result.put("point", Double.valueOf(winPoint));
    return result;
  }

  public static HashMap OpenOneSsq(String thecode, String lot, String haoma) {
    HashMap result = new HashMap();
    double win = 0.0D;
    double winPoint = 0.0D;
    String[] split = thecode.split(":");
    String type = split[0];
    String code = split[1];
    double tryMoney = getTryMoney(lot, type);
    if ((!LotEmun.Fc3d.name.equals(lot)) && (!LotEmun.Pl3.name.equals(lot)) && (!LotEmun.Pl5.name.equals(lot))) {
      "".equals(type);
    } else {
      String[] hms = haoma.split(",");
      String[] buyhm = code.split(",");
      boolean bz = (hms[0].equals(hms[1])) && (hms[0].equals(hms[2]));

      boolean zl = (!hms[0].equals(hms[1])) && (!hms[0].equals(hms[2])) && (!hms[2].equals(hms[1]));

      if ((!PlayType.T114.equals(type)) && (!PlayType.T117.equals(type)) && (!PlayType.T120.equals(type)))
      {
        if ((!PlayType.T116.equals(type)) && (!PlayType.T119.equals(type))) {
          if ((!PlayType.T113.equals(type)) && (!PlayType.T115.equals(type)) && (!PlayType.T118.equals(type))) {
            boolean h0 = buyhm[0].contains(hms[0]);
            boolean h1 = buyhm[1].contains(hms[1]);
            boolean h2 = buyhm[2].contains(hms[2]);
            if (PlayType.T110.equals(type)) {
              boolean var32 = buyhm[3].contains(hms[3]);
              boolean var36 = buyhm[4].contains(hms[4]);
              if ((h0) && (h1) && (h2) && (var32) && (var36))
                win = tryMoney;
            }
            else if ((PlayType.T112.equals(type)) && (h0) && (h1) && (h2)) {
              win = tryMoney;
            }
          } else {
            Integer var29 = Integer.valueOf(hms[0]);
            Integer var31 = Integer.valueOf(hms[1]);
            Integer var34 = Integer.valueOf(hms[2]);
            String var33 = String.valueOf(var29.intValue() + var31.intValue() + var34.intValue());
            String[] var37 = buyhm;
            int var38 = buyhm.length;

            for (int var42 = 0; var42 < var38; var42++) {
              String str = var37[var42];
              boolean var44 = var33.equals(str);
              if (var44) {
                if (PlayType.T113.equals(type)) {
                  win = getTryMoney(lot, PlayType.T112); break;
                }if (PlayType.T115.equals(type)) {
                  if ((zl) || (bz)) break;
                  win = getTryMoney(lot, PlayType.T114); break;
                }
                if ((!PlayType.T118.equals(type)) || (!zl)) break;
                win = getTryMoney(lot, PlayType.T117);

                break;
              }
            }
          }
        } else {
          buyhm = code.split("\\$");

          if ((PlayType.T116.equals(type)) && (!zl) && (!bz)) {
            String var28 = hms[0];
            String var30 = hms[1];
            if (hms[0].equals(hms[1])) {
              var30 = hms[2];
            }

            boolean h2 = buyhm[0].equals(var28);
            boolean var32 = buyhm[0].equals(var30);
            boolean var36 = buyhm[1].contains(var28);
            boolean var40 = buyhm[1].contains(var30);
            if (((h2) && (var40)) || ((var32) && (var36)))
              win = getTryMoney(lot, PlayType.T114);
          }
          else if ((PlayType.T119.equals(type)) && (zl)) {
            String[] var27 = buyhm[0].split(",");
            String var30 = hms[0] + hms[1] + hms[2];
            boolean h2 = true;
            String[] h3 = var27;
            int var35 = var27.length;

            for (int var38 = 0; var38 < var35; var38++) {
              String l = h3[var38];
              if (!var30.contains(l)) {
                h2 = false;
                break;
              }

              var30 = var30.replaceAll(l, "");
            }

            if (h2) {
              String[] var39 = var30.split("");
              String[] var41 = var39;
              int var43 = var39.length;

              for (int equals = 0; equals < var43; equals++) {
                String str1 = var41[equals];
                if (!buyhm[1].contains(str1)) {
                  h2 = false;
                  break;
                }
              }
            }

            if (h2)
              win = getTryMoney(lot, PlayType.T117);
          }
        }
      }
      else {
        boolean h0 = code.contains(hms[0]);
        boolean h1 = code.contains(hms[1]);
        boolean h2 = code.contains(hms[2]);
        if (PlayType.T114.equals(type)) {
          if ((!zl) && (!bz) && (h0) && (h1) && (h2))
            win = tryMoney;
        }
        else if (PlayType.T120.equals(type)) {
          if ((!bz) && (!zl)) {
            String[] h3 = split[1].split(",");
            String h4 = h3[0];
            String j1 = h3[1];
            String l = hms[0];
            String str = hms[1];
            if (h3[1].equals(h3[2])) {
              h4 = h3[1];
              j1 = h3[0];
            } else if (h3[0].equals(h3[1])) {
              j1 = h3[2];
            }

            if (hms[1].equals(hms[2])) {
              l = hms[1];
              str = hms[0];
            } else if (hms[0].equals(hms[1])) {
              str = hms[2];
            }

            if ((h4.equals(l)) && (j1.equals(str)))
              win = getTryMoney(lot, PlayType.T114);
          }
        }
        else if ((PlayType.T117.equals(type)) && (zl) && (h0) && (h1) && (h2)) {
          win = tryMoney;
        }
      }
    }

    result.put("money", Double.valueOf(win));
    result.put("point", Double.valueOf(winPoint));
    return result;
  }

  private static int Comb(int n, int m) {
    int n1 = 1;
    int n2 = 1;
    int i = n;

    for (int j = 1; j <= m; n2 *= j++) {
      n1 *= i--;
    }

    return n1 / n2;
  }
}