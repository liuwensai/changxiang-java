package com.caipiao.utils;

import com.caipiao.entity.Bc_lottery;
import com.caipiao.intface.Bc_lotteryIntface;
import com.caipiao.intfaceImpl.LotteryIntfaceImpl;
import java.util.List;
import java.util.Properties;

public class NowQihao{
	
  static Bc_lotteryIntface dao = new LotteryIntfaceImpl();
  static int time = 90;

  public static boolean CheckBuy(String lot, String[] qihaos)
  {
    String qihao = RetuMin(qihaos);
    return CheckBuy(lot, qihao);
  }

  public static boolean CheckBuy(String lot, String qihao) {
    time = TryStatic.StrToInt(SystemSet.crawler.getProperty(lot + "_ago"), time);
    Bc_lottery find = dao.find(lot, qihao);
    long etime = TimeUtil.StringToLong(find.getLot_etime(), "yyyy-MM-dd HH:mm:ss");
    long ntime = System.currentTimeMillis();
    return ntime + time * 1000 < etime;
  }

  public static String RetuMin(String[] qihao) {
    long nqtemp = -1L;
    String[] as = qihao;
    int j = qihao.length;

    for (int i = 0; i < j; i++) {
      String str = as[i];
      long toInt = TryStatic.StrToLong(str);
      if (-1L != nqtemp) {
        if (toInt < nqtemp)
          nqtemp = toInt;
      }
      else {
        nqtemp = toInt;
      }
    }

    return String.valueOf(nqtemp);
  }

  public static String getNowQihao(String lot) {
    time = TryStatic.StrToInt(SystemSet.crawler.getProperty(lot + "_ago"), time);
    String timestr = TimeUtil.LongToString(System.currentTimeMillis() + time * 1000L, "yyyy-MM-dd HH:mm:ss");
    Bc_lottery findByNowTime = dao.findByNowTime(lot, timestr);
    return findByNowTime != null ? findByNowTime.getLot_qihao() : null;
  }

  public static String getNowTime(String lot) {
    String result = null;
    time = TryStatic.StrToInt(SystemSet.crawler.getProperty(lot + "_ago"), time);
    String timestr = TimeUtil.LongToString(System.currentTimeMillis() + time * 1000L, "yyyy-MM-dd HH:mm:ss");
    Bc_lottery findByNowTime = dao.findByNowTime(lot, timestr);
    if (findByNowTime != null) {
      int isopen = LotSale.getLotSale(lot);
      String etime = findByNowTime.getLot_etime();
      String qihao = findByNowTime.getLot_qihao();
      String ommit = "no";
      String btime = findByNowTime.getLot_btime();
      Bc_lottery findByEtime = dao.findByEtime(lot, btime);
      if (findByEtime != null) {
        if (findByEtime.getLot_ommit().length() > 0) {
          ommit = findByEtime.getLot_ommit();
        } else {
          Bc_lottery findByEtime2 = dao.findByEtime(lot, findByEtime.getLot_btime());
          if (findByEtime2 != null) {
            String lot_ommit = findByEtime2.getLot_ommit();
            if (lot_ommit.length() > 0) {
              ommit = lot_ommit;
            }
          }
        }
      }

      result = qihao + "#" + time + "#" + TimeUtil.getToday("yyyy-MM-dd HH:mm:ss") + "#" + etime + "##" + ommit + "##" + isopen;
    }

    return result;
  }

  public static List getCutList(String lot) {
    time = TryStatic.StrToInt(SystemSet.crawler.getProperty(lot + "_ago"), time);
    String timestr = TimeUtil.LongToString(System.currentTimeMillis() + time * 1000L, "yyyy-MM-dd HH:mm:ss");
    return dao.findNowAfter(timestr, lot, 0, 200);
  }

  public static List findOpenByLot(String lot) {
    return dao.findNewOpen(lot, 10);
  }

  public static Bc_lottery findQihaoId(Integer qihaoid) {
    return dao.find(qihaoid.intValue());
  }

  public static List findOpen() {
    return dao.findAllOpen();
  }

  public static List findOpenByDay(String lot) {
    return dao.findDay(lot, TimeUtil.getToday("yyyy-MM-dd"));
  }
}