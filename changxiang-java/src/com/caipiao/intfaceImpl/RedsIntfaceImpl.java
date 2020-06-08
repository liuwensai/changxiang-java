package com.caipiao.intfaceImpl;

import com.caipiao.entity.Bc_reds;
import com.caipiao.intface.Bc_redsIntface;
import com.sysbcjzh.mysql.Mysql;
import com.sysbcjzh.utils.StringUtils;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class RedsIntfaceImpl
  implements Bc_redsIntface
{
  Mysql dao = Mysql.getInstance();

  public boolean add(Bc_reds en)
  {
    return this.dao.add(en);
  }

  public boolean delete(int Reds_id) {
    return this.dao.delete("delete from Bc_reds where Reds_id=?", new Object[] { Integer.valueOf(Reds_id) });
  }

  public Bc_reds find(int Reds_id) {
    return (Bc_reds)this.dao.find("select * from Bc_reds where Reds_id=?", Bc_reds.class, new Object[] { Integer.valueOf(Reds_id) });
  }

  @SuppressWarnings("unchecked")
  public boolean update(int Reds_id, Map map) {
    return this.dao.updateMap("update Bc_reds set ", " where Reds_id=?", map, new Object[] { Integer.valueOf(Reds_id) });
  }

  
  @SuppressWarnings("unchecked")
  public List finds(int userid, String btime, String etime, int type, int subadd, int start, int limit) {
    String sql = "select * from Bc_reds where";
    ArrayList list = new ArrayList();
    if (-1 != userid) {
      sql = sql + " User_id=?";
      list.add(Integer.valueOf(userid));
    }

    if (StringUtils.isNotEmptyAll(new String[] { btime, etime })) {
      sql = sql + " and Reds_time>? and Reds_time<?";
      list.add(btime + " 00:00:00");
      list.add(etime + " 24:00:00");
    }

    if (-1 != type) {
      sql = sql + " and Reds_type=?";
      list.add(Integer.valueOf(type));
    }

    if (-1 != subadd) {
      if (subadd == 0)
        sql = sql + " and Reds_addsub>0";
      else {
        sql = sql + " and Reds_addsub<0";
      }
    }

    sql = sql + " order by Reds_time desc limit ?,?";
    list.add(Integer.valueOf(start));
    list.add(Integer.valueOf(limit));
    sql = sql.replace("where and", "where");
    sql = sql.replace("where order", "order");
    return this.dao.finds(sql, Bc_reds.class, list.toArray());
  }

  @SuppressWarnings("unchecked")
  public int findscount(int userid, String btime, String etime, int type, int subadd) {
    String sql = "select count(Reds_id) from Bc_reds where";
    ArrayList list = new ArrayList();
    if (-1 != userid) {
      sql = sql + " User_id=?";
      list.add(Integer.valueOf(userid));
    }

    if (StringUtils.isNotEmptyAll(new String[] { btime, etime })) {
      sql = sql + " and Reds_time>? and Reds_time<?";
      list.add(btime + " 00:00:00");
      list.add(etime + " 24:00:00");
    }

    if (-1 != type) {
      sql = sql + " and Reds_type=?";
      list.add(Integer.valueOf(type));
    }

    if (-1 != subadd) {
      if (subadd == 0)
        sql = sql + " and Reds_addsub>0";
      else {
        sql = sql + " and Reds_addsub<0";
      }
    }

    sql = sql.replace("where and", "where");
    if (sql.endsWith("where")) {
      sql = sql.replace("where", "");
    }

    return this.dao.getCount(sql, list.toArray());
  }
}