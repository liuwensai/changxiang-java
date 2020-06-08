package com.caipiao.data.service;

import com.caipiao.entity.Bc_lottery;
import com.caipiao.intface.Bc_lotteryIntface;
import com.caipiao.intfaceImpl.LotteryIntfaceImpl;
import com.caipiao.utils.LotEmun;
import com.caipiao.utils.TimeUtil;
import com.caipiao.utils.TryStatic;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class AddCaiqiService
{
  Bc_lotteryIntface dao = new LotteryIntfaceImpl();

  public void AddQiHao(String lot, int days, String riqi, String qihao)
  {
    String today = riqi;
    int type = LotEmun.valueOf(lot).type;
    if (1 == type) {
      String old = TimeUtil.LongToString(TimeUtil.StringToLong(riqi + " 11:11:00", "yyyy-MM-dd HH:mm:ss") - 86400000L, "yyyy-MM-dd HH:mm:ss").substring(0, 10);

      for (int i = 0; i < days; i++) {
        if (lot.equals(LotEmun.Cqssc.name))
          addCqssc(today);
        else if (lot.equals(LotEmun.Txffc.name))
            addTxffc(old, today);
        else if (lot.equals(LotEmun.Jxssc.name))
          addJxssc(old, today);
        else if (lot.equals(LotEmun.Hnssc.name))
          addHnssc(old, today);
        else if (lot.equals(LotEmun.Ynssc.name))
          addYnssc(old, today);
        else if (lot.equals(LotEmun.Sd11x5.name))
          addSd11x5(old, today);
        else if (lot.equals(LotEmun.Jx11x5.name))
          addJx11x5(old, today);
        else if (lot.equals(LotEmun.Gd11x5.name))
          addGd11x5(old, today);
        else if (lot.equals(LotEmun.Cq11x5.name))
          addCq11x5(old, today);
        else if (lot.equals(LotEmun.Sh11x5.name))
          addSh11x5(old, today);
        else if (lot.equals(LotEmun.Jsk3.name))
          addJsk3(old, today);
        else if (lot.equals(LotEmun.Gxk3.name))
          addGxk3(old, today);
        else if (lot.equals(LotEmun.Ahk3.name)) {
          addAhk3(old, today);
        }

        old = today;
        today = TimeUtil.LongToString(TimeUtil.StringToLong(today, "yyyy-MM-dd") + 86400000L, "yyyy-MM-dd");
      }
    } else if (type == 0) {
      if (lot.equals(LotEmun.Pl3.name))
        addPl3ForNum(days, qihao, riqi);
      else if (lot.equals(LotEmun.Pl5.name))
        addPl5ForNum(days, qihao, riqi);
      else if (lot.equals(LotEmun.Fc3d.name))
        addFc3dForNum(days, qihao, riqi);
      else if (lot.equals(LotEmun.Ssq.name))
        addSsqForNum(days, qihao, riqi);
      else if (lot.equals(LotEmun.Dlt.name))
        addDltForNum(days, qihao, riqi);
    }
  }

  private boolean addJsk3(String old, String day)
  {
    String replace = day.replace("-", "");
    String lot = LotEmun.Jsk3.name;
    boolean flag = false;
    Bc_lottery find = this.dao.find(lot, replace + "082");
    if (find == null) {
      for (int i = 1; i < 83; i++)
      {
        String qihao;
        if (i < 10)
          qihao = replace + "00" + i;
        else {
          qihao = replace + "0" + i;
        }

        if (i == 1)
          add(lot, qihao, old + " 22:10:00", day + " " + com.caipiao.utils.CaiqiTime.Jsk3[(i - 1)]);
        else {
          add(lot, qihao, day + " " + com.caipiao.utils.CaiqiTime.Jsk3[(i - 2)], day + " " + com.caipiao.utils.CaiqiTime.Jsk3[(i - 1)]);
        }
      }

      flag = true;
    }

    return flag;
  }

  private boolean addGxk3(String old, String day) {
    String replace = day.replace("-", "");
    String lot = LotEmun.Gxk3.name;
    boolean flag = false;
    Bc_lottery find = this.dao.find(lot, replace + "078");
    if (find == null) {
      for (int i = 1; i < 79; i++)
      {
        String qihao;
        if (i < 10)
          qihao = replace + "00" + i;
        else {
          qihao = replace + "0" + i;
        }

        if (i == 1)
          add(lot, qihao, old + " 22:29:00", day + " " + com.caipiao.utils.CaiqiTime.Gxk3[(i - 1)]);
        else {
          add(lot, qihao, day + " " + com.caipiao.utils.CaiqiTime.Gxk3[(i - 2)], day + " " + com.caipiao.utils.CaiqiTime.Gxk3[(i - 1)]);
        }
      }

      flag = true;
    }

    return flag;
  }

  private boolean addAhk3(String old, String day) {
    String replace = day.replace("-", "");
    String lot = LotEmun.Ahk3.name;
    boolean flag = false;
    Bc_lottery find = this.dao.find(lot, replace + "080");
    if (find == null) {
      for (int i = 1; i < 81; i++)
      {
        String qihao;
        if (i < 10)
          qihao = replace + "00" + i;
        else {
          qihao = replace + "0" + i;
        }

        if (i == 1)
          add(lot, qihao, old + " 22:00:00", day + " " + com.caipiao.utils.CaiqiTime.Ahk3[(i - 1)]);
        else {
          add(lot, qihao, day + " " + com.caipiao.utils.CaiqiTime.Ahk3[(i - 2)], day + " " + com.caipiao.utils.CaiqiTime.Ahk3[(i - 1)]);
        }
      }

      flag = true;
    }

    return flag;
  }

//  private boolean addCqssc(String day) {
//    String replace = day.replace("-", "");
//    String lot = LotEmun.Cqssc.name;
//    boolean flag = false;
//    Bc_lottery find = this.dao.find(lot, replace + "120");
//    if (find == null) {
//      for (int i = 1; i < 121; i++)
//      {
//        String qihao;
//        if (i < 10) {
//          qihao = replace + "00" + i;
//        }
//        else
//        {
//          if ((i >= 10) && (i < 100))
//            qihao = replace + "0" + i;
//          else {
//            qihao = replace + i;
//          }
//        }
//        if (i == 1)
//          add(lot, qihao, day + " 00:00:00", day + " " + com.caipiao.utils.CaiqiTime.Cqssc[(i - 1)]);
//        else {
//          add(lot, qihao, day + " " + com.caipiao.utils.CaiqiTime.Cqssc[(i - 2)], day + " " + com.caipiao.utils.CaiqiTime.Cqssc[(i - 1)]);
//        }
//      }
//
//      flag = true;
//    }
//
//    return flag;
//  }

  
//  private boolean addCqssc(String day) {
//	    DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
//	    Date dd = null;
//			try {
//				dd = df.parse(day);
//			} catch (ParseException e) {
//				e.printStackTrace();
//			}	
//	    Calendar calendar = Calendar.getInstance();
//		calendar.setTime(dd);
//		calendar.add(Calendar.DAY_OF_MONTH, 1);
//	    String replace = day.replace("-", "");
//	    String lot = LotEmun.Cqssc.name;
//	    boolean flag = false;
//	    Bc_lottery find = this.dao.find(lot, replace + "120");
//	    if (find == null) {
//	      for (int i = 1; i < 121; i++)
//	      {
//	        String qihao;
//	        if (i < 10) {
//	          qihao = replace + "00" + i;
//	        }
//	        else
//	        {
//	          if ((i >= 10) && (i < 100))
//	            qihao = replace + "0" + i;
//	          else {
//	            qihao = replace + i;
//	          }
//	        }
//	        if(i<120){
//	        	add(lot, qihao, day + " " + com.caipiao.utils.CaiqiTime.Cqssc[(i-1)], day + " " + com.caipiao.utils.CaiqiTime.Cqssc[(i)]);
//	        }else {
//	        	add(lot, qihao, day + " " + com.caipiao.utils.CaiqiTime.Cqssc[(i-1)], df.format(calendar.getTime()) + " " + com.caipiao.utils.CaiqiTime.Cqssc[(i-120)]);
//			}
//	      }
//
//	      flag = true;
//	    }
//
//	    return flag;
//	  }
  
  private boolean addCqssc(String day) {
	    DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	    Date dd = null;
			try {
				dd = df.parse(day);
			} catch (ParseException e) {
				e.printStackTrace();
			}	
	    Calendar calendar = Calendar.getInstance();
		calendar.setTime(dd);
		calendar.add(Calendar.DAY_OF_MONTH, 1);
	    String replace = day.replace("-", "");
	    String lot = LotEmun.Cqssc.name;
	    boolean flag = false;
	    Bc_lottery find = this.dao.find(lot, replace + "59");
	    if (find == null) {
	      for (int i = 1; i < 60; i++)
	      {
	        String qihao;
	        if (i < 10) {
	          qihao = replace + "00" + i;
	        }
	        else
	        {
	          if ((i >= 10) && (i < 100))
	            qihao = replace + "0" + i;
	          else {
	            qihao = replace + i;
	          }
	        }
	        if(i<59){
	        	add(lot, qihao, day + " " + com.caipiao.utils.CaiqiTime.Cqssc[(i-1)], day + " " + com.caipiao.utils.CaiqiTime.Cqssc[(i)]);
	        }else {
	        	add(lot, qihao, day + " " + com.caipiao.utils.CaiqiTime.Cqssc[(i-1)], df.format(calendar.getTime()) + " " + com.caipiao.utils.CaiqiTime.Cqssc[(i-59)]);
			}
	      }

	      flag = true;
	    }

	    return flag;
	  }
  
  private boolean addJxssc(String old, String day) {
    String replace = day.replace("-", "");
    String lot = LotEmun.Jxssc.name;
    boolean flag = false;
    Bc_lottery find = this.dao.find(lot, replace + "084");
    if (find == null) {
      for (int i = 1; i < 85; i++)
      {
        String qihao;
        if (i < 10)
          qihao = replace + "00" + i;
        else {
          qihao = replace + "0" + i;
        }

        if (i == 1)
          add(lot, qihao, old + " 23:12:02", day + " " + com.caipiao.utils.CaiqiTime.Jxssc[(i - 1)]);
        else {
          add(lot, qihao, day + " " + com.caipiao.utils.CaiqiTime.Jxssc[(i - 2)], day + " " + com.caipiao.utils.CaiqiTime.Jxssc[(i - 1)]);
        }
      }

      flag = true;
    }

    return flag;
  }
  
  
  private boolean addTxffc(String old, String day) {
	    DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	    Date dd = null;
			try {
				dd = df.parse(day);
			} catch (ParseException e) {
				e.printStackTrace();
			}	
	    Calendar calendar = Calendar.getInstance();
		calendar.setTime(dd);
		calendar.add(Calendar.DAY_OF_MONTH, 1);
	    String replace = day.replace("-", "");
	    String lot = LotEmun.Txffc.name;
	    boolean flag = false;
	    Bc_lottery find = this.dao.find(lot, replace + "1440");
	    if (find == null) {
	      for (int i = 1; i < 1441; i++)
	      {
	        String qihao;
	        if (i < 10) {
	          qihao = replace + "000" + i;
	        }
	        else
	        {     
	          if (i < 100)
	            qihao = replace + "00" + i;
	          else if(i<1000){
	        	  qihao = replace + "0" + i;
	          }else{
	        	  qihao = replace + i;
	          }
	        }
/*	        if(i<1440){
	        	add(lot, qihao, day + " " + com.caipiao.utils.CaiqiTime.Txffc[(i-1)], day + " " + com.caipiao.utils.CaiqiTime.Txffc[(i)]);
	        }else {
	        	add(lot, qihao, day + " " + com.caipiao.utils.CaiqiTime.Txffc[(i-1)], df.format(calendar.getTime()) + " " + com.caipiao.utils.CaiqiTime.Txffc[(i-1440)]);
			}*/
	        
	        if (i==1) {
	        	add(lot, qihao, old +" 23:59:00", day + " " + com.caipiao.utils.CaiqiTime.Txffc[(i-1)]);
			}else{
				add(lot, qihao, day + " " + com.caipiao.utils.CaiqiTime.Txffc[(i-2)], day + " " + com.caipiao.utils.CaiqiTime.Txffc[(i-1)]);
			}
	        
	      }

	      flag = true;
	    }

	    return flag;
	  }

  
  
  private boolean addHnssc(String old, String day) {
	    String replace = day.replace("-", "");
	    DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	    Date dd = null;
			try {
				dd = df.parse(day);
			} catch (ParseException e) {
				e.printStackTrace();
			}	
	    Calendar calendar = Calendar.getInstance();
		calendar.setTime(dd);
		calendar.add(Calendar.DAY_OF_MONTH, 1);
	    String lot = LotEmun.Hnssc.name;
	    boolean flag = false;
	    Bc_lottery find = this.dao.find(lot, replace + "288");
	    if (find == null) {
	      for (int i = 1; i < 289; i++)
	      {
	        String qihao;
	        if (i < 10) {
	          qihao = replace + "00" + i;
	        }
	        else
	        {
	          if (i < 100)
	            qihao = replace + "0" + i;
	          else
	            qihao = replace + i;
	        }
//	        if (i == 1)
//	          add(lot, qihao, old + " 00:00:50", day + " " + com.caipiao.utils.CaiqiTime.Hnssc[(i - 1)]);
////	        	add(lot, qihao, old + " 23:59:50", day + " " + com.caipiao.utils.CaiqiTime.Hnssc[(i - 1)]);
//	        else {
//	          add(lot, qihao, day + " " + com.caipiao.utils.CaiqiTime.Hnssc[(i - 2)], day + " " + com.caipiao.utils.CaiqiTime.Hnssc[(i - 1)]);
//	        }
	        if(i<288){
	        	add(lot, qihao, day + " " + com.caipiao.utils.CaiqiTime.Hnssc[(i-1)], day + " " + com.caipiao.utils.CaiqiTime.Hnssc[(i)]);
	        }else {
	        	add(lot, qihao, day + " " + com.caipiao.utils.CaiqiTime.Hnssc[(i-1)], df.format(calendar.getTime()) + " " + com.caipiao.utils.CaiqiTime.Hnssc[(i-288)]);
			}
	        
	      }
	      flag = true;
	    }
	    return flag;
	  }

  private boolean addYnssc(String old, String day) {
    String replace = day.replace("-", "");
    String lot = LotEmun.Ynssc.name;
    boolean flag = false;
    Bc_lottery find = this.dao.find(lot, replace + "288");
    if (find == null) {
      for (int i = 1; i < 289; i++)
      {
        String qihao;
        if (i < 10) {
          qihao = replace + "00" + i;
        }
        else
        {     
          if (i < 100)
            qihao = replace + "0" + i;
          else {
            qihao = replace + i;
          }
        }
        if (i == 1)
          add(lot, qihao, old + " 23:59:50", day + " " + com.caipiao.utils.CaiqiTime.Ynssc[(i - 1)]);
        else {
          add(lot, qihao, day + " " + com.caipiao.utils.CaiqiTime.Ynssc[(i - 2)], day + " " + com.caipiao.utils.CaiqiTime.Ynssc[(i - 1)]);
        }
      }

      flag = true;
    }

    return flag;
  }

  private boolean addSd11x5(String old, String day) {
    String replace = day.replace("-", "");
    String lot = LotEmun.Sd11x5.name;
    boolean flag = false;
    Bc_lottery find = this.dao.find(lot, replace + "78");
    if (find == null) {
      for (int i = 1; i < 79; i++)
      {
        String qihao;
        if (i < 10)
          qihao = replace + "0" + i;
        else {
          qihao = replace + i;
        }

        if (i == 1)
          add(lot, qihao, old + " 21:55:00", day + " " + com.caipiao.utils.CaiqiTime.Sd11x5[(i - 1)]);
        else {
          add(lot, qihao, day + " " + com.caipiao.utils.CaiqiTime.Sd11x5[(i - 2)], day + " " + com.caipiao.utils.CaiqiTime.Sd11x5[(i - 1)]);
        }
      }

      flag = true;
    }

    return flag;
  }

  private boolean addJx11x5(String old, String day) {
    String replace = day.replace("-", "");
    String lot = LotEmun.Jx11x5.name;
    boolean flag = false;
    Bc_lottery find = this.dao.find(lot, replace + "78");
    if (find == null) {
      for (int i = 1; i < 79; i++)
      {
        String qihao;
        if (i < 10)
          qihao = replace + "0" + i;
        else {
          qihao = replace + i;
        }

        if (i == 1)
          add(lot, qihao, old + " 22:00:00", day + " " + com.caipiao.utils.CaiqiTime.Jx11x5[(i - 1)]);
        else {
          add(lot, qihao, day + " " + com.caipiao.utils.CaiqiTime.Jx11x5[(i - 2)], day + " " + com.caipiao.utils.CaiqiTime.Jx11x5[(i - 1)]);
        }
      }

      flag = true;
    }

    return flag;
  }

  private boolean addGd11x5(String old, String day) {
    String replace = day.replace("-", "");
    String lot = LotEmun.Gd11x5.name;
    boolean flag = false;
    Bc_lottery find = this.dao.find(lot, replace + "42");
    if (find == null) {
      for (int i = 1; i < 43; i++)
      {
        String qihao;
        if (i < 10)
          qihao = replace + "0" + i;
        else {
          qihao = replace + i;
        }

        if (i == 1)
          add(lot, qihao, old + " 23:10:00", day + " " + com.caipiao.utils.CaiqiTime.Gd11x5[(i - 1)]);
        else {
          add(lot, qihao, day + " " + com.caipiao.utils.CaiqiTime.Gd11x5[(i - 2)], day + " " + com.caipiao.utils.CaiqiTime.Gd11x5[(i - 1)]);
        }
      }

      flag = true;
    }

    return flag;
  }

  private boolean addCq11x5(String old, String day) {
    String replace = day.replace("-", "");
    String lot = LotEmun.Cq11x5.name;
    boolean flag = false;
    Bc_lottery find = this.dao.find(lot, replace + "85");
    if (find == null) {
      for (int i = 1; i < 86; i++)
      {
        String qihao;
        if (i < 10)
          qihao = replace + "0" + i;
        else {
          qihao = replace + i;
        }

        if (i == 1)
          add(lot, qihao, old + " 23:00:00", day + " " + com.caipiao.utils.CaiqiTime.Cq11x5[(i - 1)]);
        else {
          add(lot, qihao, day + " " + com.caipiao.utils.CaiqiTime.Cq11x5[(i - 2)], day + " " + com.caipiao.utils.CaiqiTime.Cq11x5[(i - 1)]);
        }
      }

      flag = true;
    }

    return flag;
  }

  private boolean addSh11x5(String old, String day) {
    String replace = day.replace("-", "");
    String lot = LotEmun.Sh11x5.name;
    boolean flag = false;
    Bc_lottery find = this.dao.find(lot, replace + "90");
    if (find == null) {
      for (int i = 1; i < 91; i++)
      {
        String qihao;
        if (i < 10)
          qihao = replace + "0" + i;
        else {
          qihao = replace + i;
        }

        if (i == 1)
          add(lot, qihao, old + " 23:50:00", day + " " + com.caipiao.utils.CaiqiTime.Sh11x5[(i - 1)]);
        else {
          add(lot, qihao, day + " " + com.caipiao.utils.CaiqiTime.Sh11x5[(i - 2)], day + " " + com.caipiao.utils.CaiqiTime.Sh11x5[(i - 1)]);
        }
      }

      flag = true;
    }

    return flag;
  }

  private void addPl3ForNum(int num, String qihao, String begin) {
    String lot = LotEmun.Pl3.name;
    String beday = begin;
    int qihaos = TryStatic.StrToInt(qihao, 0);

    for (int i = 0; i < num; i++) {
      String enday = TimeUtil.LongToString(TimeUtil.StringToLong(beday, "yyyy-MM-dd") + 86400000L, "yyyy-MM-dd");
      add(lot, String.valueOf(qihaos), beday + " 20:00:00", enday + " 20:00:00");
      qihaos++;
      beday = enday;
    }
  }

  private void addPl5ForNum(int num, String qihao, String begin)
  {
    String lot = LotEmun.Pl5.name;
    String beday = begin;
    int qihaos = TryStatic.StrToInt(qihao, 0);

    for (int i = 0; i < num; i++) {
      String enday = TimeUtil.LongToString(TimeUtil.StringToLong(beday, "yyyy-MM-dd") + 86400000L, "yyyy-MM-dd");
      add(lot, String.valueOf(qihaos), beday + " 20:00:00", enday + " 20:00:00");
      qihaos++;
      beday = enday;
    }
  }

  private void addFc3dForNum(int num, String qihao, String begin)
  {
    String lot = LotEmun.Fc3d.name;
    String beday = begin;
    int qihaos = TryStatic.StrToInt(qihao, 0);

    for (int i = 0; i < num; i++) {
      String enday = TimeUtil.LongToString(TimeUtil.StringToLong(beday, "yyyy-MM-dd") + 86400000L, "yyyy-MM-dd");
      add(lot, String.valueOf(qihaos), beday + " 20:00:00", enday + " 20:00:00");
      qihaos++;
      beday = enday;
    }
  }

  private boolean addSsqForNum(int num, String qihao, String bday)
  {
    boolean result = false;
    String lot = LotEmun.Ssq.name;
    String bd = bday;
    String ed = "";
    int qihaos = TryStatic.StrToInt(qihao, 0);
    long time = TimeUtil.StringToLong(bday, "yyyy-MM-dd");
    int weekOfDate = getWeekOfDate(time);
    if ((2 == weekOfDate) || (4 == weekOfDate) || (weekOfDate == 0)) {
      result = true;

      for (int i = 0; i < num; i++) {
        time = TimeUtil.StringToLong(bd, "yyyy-MM-dd");
        weekOfDate = getWeekOfDate(time);
        if ((2 != weekOfDate) && (weekOfDate != 0)) {
          if (4 == weekOfDate)
            ed = TimeUtil.LongToString(time + 259200000L, "yyyy-MM-dd");
        }
        else {
          ed = TimeUtil.LongToString(time + 172800000L, "yyyy-MM-dd");
        }

        add(lot, String.valueOf(qihaos), bd + " 20:00:00", ed + " 20:00:00");
        bd = ed;
        qihaos++;
      }
    }

    return result;
  }

  private boolean addDltForNum(int num, String qihao, String bday) {
    boolean result = false;
    String lot = LotEmun.Dlt.name;
    String bd = bday;
    String ed = "";
    int qihaos = TryStatic.StrToInt(qihao, 0);
    long time = TimeUtil.StringToLong(bday, "yyyy-MM-dd");
    int weekOfDate = getWeekOfDate(time);
    if ((1 == weekOfDate) || (3 == weekOfDate) || (6 == weekOfDate)) {
      result = true;

      for (int i = 0; i < num; i++) {
        time = TimeUtil.StringToLong(bd, "yyyy-MM-dd");
        weekOfDate = getWeekOfDate(time);
        if ((1 != weekOfDate) && (6 != weekOfDate)) {
          if (3 == weekOfDate)
            ed = TimeUtil.LongToString(time + 259200000L, "yyyy-MM-dd");
        }
        else {
          ed = TimeUtil.LongToString(time + 172800000L, "yyyy-MM-dd");
        }

        add(lot, String.valueOf(qihaos), bd + " 20:00:00", ed + " 20:00:00");
        bd = ed;
        qihaos++;
      }
    }

    return result;
  }

  private static int getWeekOfDate(long time) {
    Calendar cal = Calendar.getInstance();
    cal.setTime(new Date(time));
    int w = cal.get(7) - 1;
    if (w < 0) {
      w = 0;
    }

    return w;
  }

  private void add(String lot, String qihao, String btime, String etime) {
    Bc_lottery en = new Bc_lottery();
    en.setLot_btime(btime);
    en.setLot_etime(etime);
    en.setLot_haoma("");
    en.setLot_isopen(0);
    en.setLot_name(lot);
    en.setLot_ommit("");
    en.setLot_qihao(qihao);
    this.dao.add(en);
  }
}