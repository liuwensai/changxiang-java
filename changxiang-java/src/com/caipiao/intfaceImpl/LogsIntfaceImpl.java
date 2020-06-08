package com.caipiao.intfaceImpl;

import com.caipiao.entity.Bc_logs;
import com.caipiao.intface.Bc_logsIntface;
import com.caipiao.utils.TimeUtil;
import com.sysbcjzh.mysql.Mysql;
import com.sysbcjzh.utils.StringUtils;
import java.util.ArrayList;
import java.util.List;

public class LogsIntfaceImpl implements Bc_logsIntface{
	
  Mysql dao = Mysql.getInstance();

  public boolean add(Bc_logs en)
  {
    return this.dao.add(en);
  }

  @SuppressWarnings("unchecked")
  public List finds(int userid, String btime, String etime, int type, int level, int start, int limit) {
    String sql = "select * from Bc_logs where";
    ArrayList list = new ArrayList();
    if (-1 != userid) {
      sql = sql + " User_id=?";
      list.add(Integer.valueOf(userid));
    }

    if (StringUtils.isNotEmptyAll(new String[] { btime, etime })) {
      sql = sql + " and Logs_time>? and Logs_time<?";
      list.add(btime + " 00:00:00");
      list.add(etime + " 24:00:00");
    }

    if (-1 != type) {
      sql = sql + " and Logs_type=?";
      list.add(Integer.valueOf(type));
    }

    if (-1 != level) {
      sql = sql + " and Logs_level=?";
      list.add(Integer.valueOf(level));
    }

    sql = sql + " order by Logs_time desc limit ?,?";
    list.add(Integer.valueOf(start));
    list.add(Integer.valueOf(limit));
    sql = sql.replace("where and", "where");
    sql = sql.replace("where order", "order");
    return this.dao.finds(sql, Bc_logs.class, list.toArray());
  }

  @SuppressWarnings("unchecked")
  public int findscount(int userid, String btime, String etime, int type, int level) {
    String sql = "select count(Logs_id) from Bc_logs where";
    ArrayList list = new ArrayList();
    if (-1 != userid) {
      sql = sql + " User_id=?";
      list.add(Integer.valueOf(userid));
    }

    if (StringUtils.isNotEmptyAll(new String[] { btime, etime })) {
      sql = sql + " and Logs_time>? and Logs_time<?";
      list.add(btime + " 00:00:00");
      list.add(etime + " 24:00:00");
    }

    if (-1 != type) {
      sql = sql + " and Logs_type=?";
      list.add(Integer.valueOf(type));
    }

    if (-1 != level) {
      sql = sql + " and Logs_level=?";
      list.add(Integer.valueOf(level));
    }

    sql = sql.replace("where and", "where");
    if (sql.endsWith("where")) {
      sql = sql.replace("where", "");
    }

    return this.dao.getCount(sql, list.toArray());
  }

  public int findError(int userid, int level) {
    long longtime = System.currentTimeMillis() - 1800000L;
    String time = TimeUtil.LongToString(longtime, "yyyy-MM-dd HH:mm:ss");
    return this.dao.getCount("select count(Logs_id) from Bc_logs where User_id=? and Logs_type=2 and Logs_level=? and Logs_time>?", new Object[] { Integer.valueOf(userid), Integer.valueOf(level), time });
  }
}