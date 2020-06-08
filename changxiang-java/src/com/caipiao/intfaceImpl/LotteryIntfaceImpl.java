package com.caipiao.intfaceImpl;

import com.caipiao.entity.Bc_lottery;
import com.caipiao.intface.Bc_lotteryIntface;
import com.sysbcjzh.mysql.Mysql;
import com.sysbcjzh.utils.StringUtils;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class LotteryIntfaceImpl implements Bc_lotteryIntface
{
  Mysql dao = Mysql.getInstance();

  public boolean add(Bc_lottery en){
    return this.dao.add(en);
  }

  public boolean delete(int lot_id) {
    return this.dao.delete("delete from Bc_lottery where Lot_id=?", new Object[] { Integer.valueOf(lot_id) });
  }

  public Bc_lottery find(String lot_name, String lot_qihao) {
    return (Bc_lottery)this.dao.find("select * from Bc_lottery where Lot_name=? and Lot_qihao=?", Bc_lottery.class, new Object[] { lot_name, lot_qihao });
  }

  public Bc_lottery findByNowTime(String lot_name, String nowtime) {
    return (Bc_lottery)this.dao.find("select * from Bc_lottery where Lot_name=? and Lot_btime<=? and Lot_etime>?", Bc_lottery.class, new Object[] { lot_name, nowtime, nowtime });
  }

  public Bc_lottery findByEtime(String lot_name, String etime) {
    return (Bc_lottery)this.dao.find("select * from Bc_lottery where Lot_name=? and Lot_etime=?", Bc_lottery.class, new Object[] { lot_name, etime });
  }

  public Bc_lottery find(int Lot_id) {
    return (Bc_lottery)this.dao.find("select * from Bc_lottery where Lot_id=?", Bc_lottery.class, new Object[] { Integer.valueOf(Lot_id) });
  }

  @SuppressWarnings("unchecked")
  public boolean update(String lot_name, String lot_qihao, Map map) {
    if (map.containsKey("Lot_haoma")) {
      this.dao.update("update Bc_buylot set Buylot_haoma=? where Buylot_lot=? and Buylot_qihao=?", new Object[] { map.get("Lot_haoma"), lot_name, lot_qihao });
    }

    return this.dao.updateMap("update Bc_lottery set ", " where Lot_name=? and Lot_qihao=?", map, new Object[] { lot_name, lot_qihao });
  }

  @SuppressWarnings("unchecked")
  public boolean update(int lot_id, Map map) {
    return this.dao.updateMap("update Bc_lottery set ", " where Lot_id=?", map, new Object[] { Integer.valueOf(lot_id) });
  }

  @SuppressWarnings("unchecked")
  public List findAllOpen() {
    return this.dao.finds("select * from (select * from Bc_lottery WHERE LENGTH(Lot_haoma)>0 order by Lot_etime desc) temp group by Lot_name", Bc_lottery.class, new Object[0]);
  }

  @SuppressWarnings("unchecked")
  public List findNowAfter(String nowtime, String lot, int start, int limit) {
    return this.dao.finds("select * from Bc_lottery where Lot_name=? and Lot_etime>? order by Lot_etime asc limit ?,?", Bc_lottery.class, new Object[] { lot, nowtime, Integer.valueOf(start), Integer.valueOf(limit) });
  }

  public int findNowAfterCount(String nowtime, String lot) {
    return this.dao.getCount("select count(Lot_id) from Bc_lottery where Lot_name=? and Lot_etime>?", new Object[] { lot, nowtime });
  }

  @SuppressWarnings("unchecked")
  public List findNotOpenByTime(String btime, String nowtime) {
    return this.dao.finds("select * from (select * from Bc_lottery WHERE LENGTH(Lot_haoma)<=0 and Lot_etime>=? and Lot_etime<=? order by Lot_etime desc) temp group by Lot_name", Bc_lottery.class, new Object[] { btime, nowtime });
  }

  @SuppressWarnings("unchecked")
  public List findNowAgo(String nowtime, String lot, int start, int limit) {
    return this.dao.finds("select * from Bc_lottery where Lot_name=? and Lot_etime<? order by Lot_etime desc limit ?,?", Bc_lottery.class, new Object[] { lot, nowtime, Integer.valueOf(start), Integer.valueOf(limit) });
  }

  @SuppressWarnings("unchecked")
  public List findHaveWithOpen(int open) {
    return this.dao.finds("select * from Bc_lottery where LENGTH(Lot_haoma)>0 and Lot_isopen=?", Bc_lottery.class, new Object[] { Integer.valueOf(open) });
  }

  @SuppressWarnings("unchecked")
  public List findDay(String lot, String day) {
    return this.dao.finds("select Lot_qihao,Lot_haoma from Bc_lottery where Lot_name=? and Lot_etime like ?", Bc_lottery.class, new Object[] { lot, "%" + day + "%" });
  }

  @SuppressWarnings("unchecked")
  public List findNewOpen(String lot, int num) {
    return this.dao.finds("select Lot_qihao,Lot_haoma,Lot_id from Bc_lottery WHERE LENGTH(Lot_haoma)>0 and Lot_name=? order by Lot_etime desc limit 0,?", Bc_lottery.class, new Object[] { lot, Integer.valueOf(num) });
  }

  @SuppressWarnings("unchecked")
  public List finds(String lot, String qihao, int havehm, int isopen, String btime, String etime, int start, int limit) {
    String sql = "select * from Bc_lottery where";
    ArrayList list = new ArrayList();
    if (StringUtils.isNotBlank(lot)) {
      sql = sql + " Lot_name=?";
      list.add(lot);
    }

    if (StringUtils.isNotBlank(qihao)) {
      sql = sql + " and Lot_qihao=?";
      list.add(qihao);
    }

    if (-1 != havehm) {
      if (havehm == 0)
        sql = sql + " and LENGTH(Lot_haoma)=0";
      else if (1 == havehm) {
        sql = sql + " and LENGTH(Lot_haoma)>0";
      }
    }

    if (-1 != isopen) {
      sql = sql + " and Lot_isopen=?";
      list.add(Integer.valueOf(isopen));
    }

    if (StringUtils.isNotBlank(btime)) {
      sql = sql + " and Lot_btime>?";
      list.add(btime);
    }

    if (StringUtils.isNotBlank(etime)) {
      sql = sql + " and Lot_etime<?";
      list.add(etime);
    }

    sql = sql + " order by Lot_id desc limit ?,?";
    list.add(Integer.valueOf(start));
    list.add(Integer.valueOf(limit));
    sql = sql.replace("where and", "where");
    sql = sql.replace("where order", "order");
    return this.dao.finds(sql, Bc_lottery.class, list.toArray());
  }

  @SuppressWarnings("unchecked")
  public int findsCount(String lot, String qihao, int havehm, int isopen, String btime, String etime) {
    String sql = "select count(Lot_id) from Bc_lottery where";
    ArrayList list = new ArrayList();
    if (StringUtils.isNotBlank(lot)) {
      sql = sql + " Lot_name=?";
      list.add(lot);
    }

    if (StringUtils.isNotBlank(qihao)) {
      sql = sql + " and Lot_qihao=?";
      list.add(qihao);
    }

    if (-1 != havehm) {
      if (havehm == 0)
        sql = sql + " and LENGTH(Lot_haoma)=0";
      else if (1 == havehm) {
        sql = sql + " and LENGTH(Lot_haoma)>0";
      }
    }

    if (-1 != isopen) {
      sql = sql + " and Lot_isopen=?";
      list.add(Integer.valueOf(isopen));
    }

    if (StringUtils.isNotBlank(btime)) {
      sql = sql + " and Lot_btime>?";
      list.add(btime);
    }

    if (StringUtils.isNotBlank(etime)) {
      sql = sql + " and Lot_etime<?";
      list.add(etime);
    }

    sql = sql.replace("where and", "where");
    if (sql.endsWith("where")) {
      sql = sql.replace("where", "");
    }

    return this.dao.getCount(sql, list.toArray());
  }
}