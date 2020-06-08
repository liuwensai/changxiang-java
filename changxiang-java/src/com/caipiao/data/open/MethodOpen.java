package com.caipiao.data.open;

import com.caipiao.data.service.CommInstance;
import com.caipiao.entity.Bc_buy;
import com.caipiao.entity.Bc_buyuser;
import com.caipiao.entity.out.OpenEntity;
import com.caipiao.entity.out.OutEntity;
import com.caipiao.intface.Bc_buyIntface;
import com.caipiao.intface.Bc_buylotIntface;
import com.caipiao.intface.Bc_buyuserIntface;
import com.caipiao.intface.Bc_phbIntface;
import com.caipiao.intfaceImpl.BuyIntfaceImpl;
import com.caipiao.intfaceImpl.BuylotIntfaceImpl;
import com.caipiao.intfaceImpl.BuyuserIntfaceImpl;
import com.caipiao.intfaceImpl.PhbIntfaceImpl;
import com.caipiao.service.systeminit.UserStatic;
import com.caipiao.utils.LockList;
import com.caipiao.utils.TimeUtil;
import com.sysbcjzh.mysql.JDBCBatchBean;
import com.sysbcjzh.mysql.Mysql;
import com.sysbcjzh.utils.StringUtils;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

public class MethodOpen
{
  static Bc_buyIntface buydao = new BuyIntfaceImpl();
  static Bc_buylotIntface lotdao = new BuylotIntfaceImpl();
  static Bc_buyuserIntface userdao = new BuyuserIntfaceImpl();
  static Bc_phbIntface phbdao = new PhbIntfaceImpl();
  static final int notout = 0;
  static final int notopen = 1;
  static final int _have = 2;
  static final int _not = 3;
  Mysql dao = Mysql.getInstance();

  public boolean Open(int Buylot_id)
  {
    boolean result = false;
    OpenEntity find = lotdao.findEntityOne(Buylot_id);
    if (find != null) {
      int bs = find.getBuylot_status();
      String bh = find.getBuylot_haoma();
      if ((1 == bs) && (StringUtils.isNotBlank(bh))) {
        result = true;
        Open(find);
      }
    }

    return result;
  }

  @SuppressWarnings("unchecked")
  public void BatchOpen(OpenEntity en) {
    String opentime = TimeUtil.getToday("yyyy-MM-dd HH:mm:ss");
    String qihao = en.getBuylot_qihao();
    int buy_status = en.getBuylot_status();
    String haoma = en.getBuylot_haoma();
    String buyitem = en.getBuy_item();
    if ((1 == buy_status) && (StringUtils.isNotBlank(haoma)) && (!LockList.itemlock.contains(buyitem))) {
      LockList.itemlock.add(buyitem);
      try
      {
        int e = en.getBuylot_id();
        HashMap getWinMoney = MethodOpenCode.GetWinMoney(en.getBuylot_lot(), en.getBuy_code(), en.getBuylot_multiple(), haoma);
        Double money = (Double)getWinMoney.get("money");
        int lotstatus = money.doubleValue() > 0.0D ? 2 : 3;
        UpdateStatus(e, lotstatus, opentime, money.doubleValue());
        List userlist = userdao.findByItem(buyitem);
        if (userlist != null) {
          double buy_iscont = en.getBuy_money();
          double list2 = en.getBuylot_money();
          ArrayList batchBeans = new ArrayList();
          String AddMoneySql = "update Bc_user set User_money=User_money+?,User_level=User_level+?  where User_id=?";
          JDBCBatchBean o = new JDBCBatchBean(AddMoneySql);
          String AddDetailDescSql = "INSERT INTO bc_detail ( Detail_balance,Detail_desc,Detail_item,Detail_addsub,Detail_time,Detail_type,User_id) VALUES (?,?,?,?,?,?,?)";
          JDBCBatchBean AddDetailDescBean = new JDBCBatchBean(AddDetailDescSql);
          String addWinSql = "update Bc_buyuser set Buyuser_win=Buyuser_win+? where Buyuser_id=?";
          JDBCBatchBean addWinBean = new JDBCBatchBean(addWinSql);
          String showSql = "update Bc_user set User_show=IF(User_show-?>0,User_show-?,0) where User_id=?";
          JDBCBatchBean showBean = new JDBCBatchBean(showSql);
          String zgSql1 = "update Bc_phb set Phb_total_c=Phb_total_c+?,Phb_all_c=Phb_all_c+?,Phb_month_c=Phb_month_c+?,Phb_day_c=Phb_day_c+? ,Phb_total=Phb_total+?,Phb_all=Phb_all+?,Phb_month=Phb_month+?,Phb_day=Phb_day+? where Phb_type in(?,'all') and User_id=?";
          JDBCBatchBean zgBean1 = new JDBCBatchBean(zgSql1);
          String zgSql2 = "update Bc_phb set Phb_total_c=Phb_total_c+?,Phb_all_c=Phb_all_c+?,Phb_month_c=Phb_month_c+?,Phb_day_c=Phb_day_c+?  where Phb_type in(?,'all') and User_id=?";
          JDBCBatchBean zgBean2 = new JDBCBatchBean(zgSql2);
          String hmSql1 = "update Bc_phb set Phb_total_c=Phb_total_c+?,Phb_hmall_c=Phb_hmall_c+?,Phb_hmmonth_c=Phb_hmmonth_c+?,Phb_hmday_c=Phb_hmday_c+?,Phb_total=Phb_total+?,Phb_hmall=Phb_hmall+?,Phb_hmmonth=Phb_hmmonth+?,Phb_hmday=Phb_hmday+?  where Phb_type in(?,'all') and User_id=?";
          JDBCBatchBean hmBean1 = new JDBCBatchBean(hmSql1);
          String hmSql2 = "update Bc_phb set Phb_total_c=Phb_total_c+?,Phb_hmall_c=Phb_hmall_c+?,Phb_hmmonth_c=Phb_hmmonth_c+?,Phb_hmday_c=Phb_hmday_c+?  where Phb_type in(?,'all') and User_id=?";
          JDBCBatchBean hmBean2 = new JDBCBatchBean(hmSql2);
          int userid;
          double lotmoneys;
          double winmon;
          for (Iterator var34 = userlist.iterator(); var34.hasNext(); updatephb(userid, en.getBuylot_lot(), winmon, lotmoneys, en.getBuy_ishm(), showBean, zgBean1, zgBean2, hmBean1, hmBean2)) {
            Bc_buyuser user = (Bc_buyuser)var34.next();
            userid = user.getUser_id();
            double usermon = user.getBuyuser_money();
            lotmoneys = list2 * 100.0D / buy_iscont * usermon / 100.0D;
            winmon = 0.0D;
            if (money.doubleValue() > 0.0D) {
              double mon = money.doubleValue() * 100.0D / buy_iscont * usermon / 100.0D;
              o.addBatchParameter(new Object[] { Double.valueOf(mon), Integer.valueOf((int)mon / 10), Integer.valueOf(userid) });
              if (mon != 0.0D) {
                AddDetailDescBean.addBatchParameter(new Object[] { Double.valueOf(UserStatic.find(userid).getUser_money() + money.doubleValue()), "订单" + buyitem + "第" + qihao + "期派奖", buyitem, Double.valueOf(mon), TimeUtil.getToday("yyyy-MM-dd HH:mm:ss"), Integer.valueOf(0), Integer.valueOf(userid) });
              }

              addWinBean.addBatchParameter(new Object[] { Double.valueOf(mon), Integer.valueOf(user.getBuyuser_id()) });
              winmon = mon;
            }
          }

          batchBeans.add(o);
          batchBeans.add(AddDetailDescBean);
          batchBeans.add(addWinBean);
          batchBeans.add(showBean);
          batchBeans.add(zgBean1);
          batchBeans.add(zgBean2);
          batchBeans.add(hmBean1);
          batchBeans.add(hmBean2);
        }

        if (money.doubleValue() > 0.0D) {
          buydao.itemadd(buyitem, money.doubleValue());
          int buy_iscont1 = en.getBuy_iscont();
          if (buy_iscont1 == 0) {
            List list = lotdao.findOutList(buyitem, 0);
            if (list != null) {
              MethodOut list21 = new MethodOut();
              Iterator o1 = list.iterator();

              while (o1.hasNext()) {
                OutEntity out = (OutEntity)o1.next();
                list21.CheOen(out);
              }
            }

            List list22 = lotdao.findOutList(buyitem, 1);
            if (list22 != null) {
              MethodOut out1 = new MethodOut();
              Iterator AddDetailDescSql1 = list22.iterator();

              while (AddDetailDescSql1.hasNext()) {
                OutEntity o2 = (OutEntity)AddDetailDescSql1.next();
                out1.CheOen(o2);
              }
            }
          }
        }

        CheckBuyStatus(buyitem, money.doubleValue());
      } catch (Exception var47) {
        var47.printStackTrace();
        System.out.println("err");
      } finally {
        LockList.itemlock.remove(buyitem);
      }
    } else {
      System.out.println("订单" + en.getBuy_item() + "第" + qihao + "期不是等待开奖或者开奖号码不存在，开奖失败！");
    }
  }

  public void updatephb(int userid, String lot, double win, double xiaofei, int type, JDBCBatchBean showBean, JDBCBatchBean zgBean1, JDBCBatchBean zgBean2, JDBCBatchBean hmBean1, JDBCBatchBean hmBean2)
  {
    showBean.addBatchParameter(new Object[] { Double.valueOf(xiaofei), Double.valueOf(xiaofei), Integer.valueOf(userid) });
    if (type == 0) {
      if (win > 0.0D)
        zgBean1.addBatchParameter(new Object[] { Double.valueOf(xiaofei), Double.valueOf(xiaofei), Double.valueOf(xiaofei), Double.valueOf(xiaofei), Double.valueOf(win), Double.valueOf(win), Double.valueOf(win), Double.valueOf(win), lot, Integer.valueOf(userid) });
      else
        zgBean2.addBatchParameter(new Object[] { Double.valueOf(xiaofei), Double.valueOf(xiaofei), Double.valueOf(xiaofei), Double.valueOf(xiaofei), lot, Integer.valueOf(userid) });
    }
    else if (win > 0.0D)
      hmBean1.addBatchParameter(new Object[] { Double.valueOf(xiaofei), Double.valueOf(xiaofei), Double.valueOf(xiaofei), Double.valueOf(xiaofei), Double.valueOf(win), Double.valueOf(win), Double.valueOf(win), Double.valueOf(win), lot, Integer.valueOf(userid) });
    else
      hmBean2.addBatchParameter(new Object[] { Double.valueOf(xiaofei), Double.valueOf(xiaofei), Double.valueOf(xiaofei), Double.valueOf(xiaofei), lot, Integer.valueOf(userid) });
  }

  @SuppressWarnings("unchecked")
  public void Open(OpenEntity en){
    String opentime = TimeUtil.getToday("yyyy-MM-dd HH:mm:ss");
    String qihao = en.getBuylot_qihao();

    int buy_status = en.getBuylot_status();

    String haoma = en.getBuylot_haoma();
    String buyitem = en.getBuy_item();

    if ((1 == buy_status) && (StringUtils.isNotBlank(haoma)) && (!LockList.itemlock.contains(buyitem))) {
      LockList.itemlock.add(buyitem);
      try
      {
        int e = en.getBuylot_id();
        HashMap getWinMoney = MethodOpenCode.GetWinMoney(en.getBuylot_lot(), en.getBuy_code(), en.getBuylot_multiple(), haoma);
        Double money = (Double)getWinMoney.get("money");
        Double point = (Double)getWinMoney.get("point");

        int lotstatus = money.doubleValue() > 0.0D ? 2 : 3;
        UpdateStatus(e, lotstatus, opentime, money.doubleValue());

        List userlist = userdao.findByItem(buyitem);
        if (userlist != null) {
          double buy_iscont = en.getBuy_money();
          double list2 = en.getBuylot_money();
          int o;
          double lotmoneys;
          double winmon;
          for (Iterator localIterator = userlist.iterator(); localIterator.hasNext(); phbdao.update(o, en.getBuylot_lot(), winmon, lotmoneys, en.getBuy_ishm()))
          {
            Bc_buyuser user = (Bc_buyuser)localIterator.next();
            o = user.getUser_id();

            double usermon = user.getBuyuser_money();

            lotmoneys = list2 * 100.0D / buy_iscont * usermon / 100.0D;

            CommInstance.InitComm(o, en.getBuylot_lot(), list2 * 100.0D / buy_iscont * usermon / 100.0D, buyitem, qihao);
            winmon = 0.0D;
            if (money.doubleValue() > 0.0D) {
              double mon = money.doubleValue() * 100.0D / buy_iscont * usermon / 100.0D;

              int jf = (int)(point.doubleValue() * 100.0D / buy_iscont * usermon / 100.0D);

              UserStatic.AddMoney(UserStatic.find(o), mon, jf, buyitem, 0, "订单" + buyitem + "第" + qihao + "期派奖", 0.0D);
              userdao.addWin(user.getBuyuser_id(), mon);
              winmon = mon;
            }
          }

        }

        if (money.doubleValue() > 0.0D)
        {
          buydao.itemadd(buyitem, money.doubleValue());
          int buy_iscont1 = en.getBuy_iscont();

          if (buy_iscont1 == 0) {
            List list = lotdao.findOutList(buyitem, 0);
            if (list != null) {
              MethodOut list21 = new MethodOut();
              Iterator o1 = list.iterator();

              while (o1.hasNext()) {
                OutEntity out = (OutEntity)o1.next();
                list21.CheOen(out);
              }
            }

            List list22 = lotdao.findOutList(buyitem, 1);
            if (list22 != null) {
              MethodOut out1 = new MethodOut();
              Iterator usermon1 = list22.iterator();

              while (usermon1.hasNext()) {
                OutEntity o2 = (OutEntity)usermon1.next();
                out1.CheOen(o2);
              }
            }
          }

        }

        CheckBuyStatus(buyitem, money.doubleValue());
      } catch (Exception var32) {
        var32.printStackTrace();
        System.out.println("err");
      } finally {
        LockList.itemlock.remove(buyitem);
      }
    } else {
      System.out.println("订单" + en.getBuy_item() + "第" + qihao + "期不是等待开奖或者开奖号码不存在，开奖失败！");
    }
  }

  @SuppressWarnings("unchecked")
  public void CheckBuyStatus(String item, double win)
  {
    if (win > 0.0D) {
      HashMap count = new HashMap();
      count.put("Buy_status", Integer.valueOf(1));
      buydao.update(item, count);
    } else {
      int count1 = lotdao.findItemNotOpen(item);
      if (count1 == 0) {
        Bc_buy findBuyOne = buydao.findBuyOne(item);
        if ((3 != findBuyOne.getBuy_status()) && (1 != findBuyOne.getBuy_status())) {
          HashMap map = new HashMap();
          map.put("Buy_status", Integer.valueOf(2));
          buydao.update(item, map);
        }
      }
    }
  }

  @SuppressWarnings("unchecked")
  private void UpdateStatus(int Buy_id, int status, String opentime, double win)
  {
    HashMap map = new HashMap();
    map.put("Buylot_status", Integer.valueOf(status));
    map.put("Buylot_opentime", opentime);
    if (win > 0.0D) {
      map.put("Buylot_winmon", Double.valueOf(win));
    }

    lotdao.update(Buy_id, map);
  }
}