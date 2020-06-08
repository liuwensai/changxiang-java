package com.caipiao.intfaceImpl;

import com.caipiao.entity.Bc_detail;
import com.caipiao.intface.Bc_detailIntface;
import com.sysbcjzh.mysql.Mysql;
import com.sysbcjzh.utils.StringUtils;
import java.util.ArrayList;
import java.util.List;

public class DetailIntfaceImpl
  implements Bc_detailIntface
{
  Mysql dao = Mysql.getInstance();

  @SuppressWarnings("unchecked")
  public List finds(int userid, String btime, String etime, int type, int status, int start, int limit)
  {
    String sql = "select * from Bc_detail where User_id=?";
    ArrayList list = new ArrayList();
    list.add(Integer.valueOf(userid));
    if (StringUtils.isNotEmptyAll(new String[] { btime, etime })) {
      sql = sql + " and Detail_time>? and Detail_time<?";
      list.add(btime + " 00:00:00");
      list.add(etime + " 24:00:00");
    }

    if (-1 != type) {
      sql = sql + " and Detail_type=?";
      list.add(Integer.valueOf(type));
    }

    if (-1 != status) {
      if (status == 0)
        sql = sql + " and Detail_addsub>0";
      else {
        sql = sql + " and Detail_addsub<0";
      }
    }

    sql = sql + " order by Detail_id desc limit ?,?";
    list.add(Integer.valueOf(start));
    list.add(Integer.valueOf(limit));
    return this.dao.finds(sql, Bc_detail.class, list.toArray());
  }

  @SuppressWarnings("unchecked")
  public int findcount(int userid, String btime, String etime, int type, int status) {
    String sql = "select count(Detail_id) from Bc_detail where User_id=?";
    ArrayList list = new ArrayList();
    list.add(Integer.valueOf(userid));
    if (StringUtils.isNotEmptyAll(new String[] { btime, etime })) {
      sql = sql + " and Detail_time>? and Detail_time<?";
      list.add(btime + " 00:00:00");
      list.add(etime + " 24:00:00");
    }

    if (-1 != type) {
      sql = sql + " and Detail_type=?";
      list.add(Integer.valueOf(type));
    }

    if (-1 != status) {
      if (status == 0)
        sql = sql + " and Detail_addsub>0";
      else {
        sql = sql + " and Detail_addsub<0";
      }
    }

    return this.dao.getCount(sql, list.toArray());
  }
}