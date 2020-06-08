package com.caipiao.intfaceImpl;

import com.caipiao.entity.Bc_draw;
import com.caipiao.entity.out.Draw;
import com.caipiao.intface.Bc_drawIntface;
import com.sysbcjzh.mysql.Mysql;
import com.sysbcjzh.utils.StringUtils;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class DrawIntfaceImpl
  implements Bc_drawIntface
{
  Mysql dao = Mysql.getInstance();

  public boolean add(Bc_draw en)
  {
    return this.dao.add(en);
  }

  public boolean delete(int Draw_id) {
    return this.dao.delete("delete from Bc_draw where Draw_id=?", new Object[] { Integer.valueOf(Draw_id) });
  }

  public Bc_draw find(int Draw_id) {
    return (Bc_draw)this.dao.find("select * from Bc_draw where Draw_id=?", Bc_draw.class, new Object[] { Integer.valueOf(Draw_id) });
  }

  @SuppressWarnings("unchecked")
  public boolean update(int Draw_id, Map map) {
    return this.dao.updateMap("update Bc_draw set ", " where Draw_id=?", map, new Object[] { Integer.valueOf(Draw_id) });
  }

  @SuppressWarnings("unchecked")
  public List finds(int user_id, String btime, String etime, int type, int utype, int status, int start, int limit) {
    String sql = "select a.Banks_add,a.Draw_id,a.User_id,a.User_name,a.Draw_item,a.Draw_time,a.Draw_money,a.Draw_surgery,a.Draw_dotime,a.Draw_douser,a.Draw_desc,a.Draw_type,a.Pay_id,a.User_realname,a.Banks_bank,a.Banks_card,a.Draw_status,b.User_type,c.User_name as User_upname";
    sql = sql + " from Bc_draw a LEFT JOIN Bc_user b ON a.User_id=b.User_id LEFT JOIN Bc_user c ON b.User_upid=c.User_id where";
    ArrayList list = new ArrayList();
    if (-1 != user_id) {
      sql = sql + " a.User_id=?";
      list.add(Integer.valueOf(user_id));
    }

    if (StringUtils.isNotEmptyAll(new String[] { btime, etime })) {
      sql = sql + " and a.Draw_time>? and a.Draw_time<?";
      list.add(btime + " 00:00:00");
      list.add(etime + " 24:00:00");
    }

    if (-1 != type) {
      sql = sql + " and a.Draw_type=?";
      list.add(Integer.valueOf(type));
    }

    if (-1 != utype) {
      sql = sql + " and b.User_type=?";
      list.add(Integer.valueOf(utype));
    }

    if (-1 != status) {
      sql = sql + " and a.Draw_status=?";
      list.add(Integer.valueOf(status));
    }

    sql = sql + " order by a.Draw_time desc limit ?,?";
    list.add(Integer.valueOf(start));
    list.add(Integer.valueOf(limit));
    sql = sql.replace("where and", "where");
    sql = sql.replace("where order", "order");
    return this.dao.finds(sql, Draw.class, list.toArray());
  }

  @SuppressWarnings("unchecked")
  public int findscount(int user_id, String btime, String etime, int type, int utype, int status) {
    String sql = "select count(a.Draw_id) from Bc_draw a LEFT JOIN Bc_user b ON a.User_id=b.User_id where";
    ArrayList list = new ArrayList();
    if (-1 != user_id) {
      sql = sql + " a.User_id=?";
      list.add(Integer.valueOf(user_id));
    }

    if (StringUtils.isNotEmptyAll(new String[] { btime, etime })) {
      sql = sql + " and a.Draw_time>? and a.Draw_time<?";
      list.add(btime + " 00:00:00");
      list.add(etime + " 24:00:00");
    }

    if (-1 != type) {
      sql = sql + " and a.Draw_type=?";
      list.add(Integer.valueOf(type));
    }

    if (-1 != utype) {
      sql = sql + " and b.User_type=?";
      list.add(Integer.valueOf(utype));
    }

    if (-1 != status) {
      sql = sql + " and a.Draw_status=?";
      list.add(Integer.valueOf(status));
    }

    sql = sql.replace("where and", "where");
    if (sql.endsWith("where")) {
      sql = sql.replace("where", "");
    }

    return this.dao.getCount(sql, list.toArray());
  }

  @SuppressWarnings("unchecked")
  public List finds(int user_id, String btime, String etime, int type, int status, int start, int limit) {
    String sql = "select * from Bc_draw where";
    ArrayList list = new ArrayList();
    if (-1 != user_id) {
      sql = sql + " User_id=?";
      list.add(Integer.valueOf(user_id));
    }

    if (StringUtils.isNotEmptyAll(new String[] { btime, etime })) {
      sql = sql + " and Draw_time>? and Draw_time<?";
      list.add(btime + " 00:00:00");
      list.add(etime + " 24:00:00");
    }

    if (-1 != type) {
      sql = sql + " and Draw_type=?";
      list.add(Integer.valueOf(type));
    }

    if (-1 != status) {
      sql = sql + " and Draw_status=?";
      list.add(Integer.valueOf(status));
    }

    sql = sql + " order by Draw_time desc limit ?,?";
    list.add(Integer.valueOf(start));
    list.add(Integer.valueOf(limit));
    sql = sql.replace("where and", "where");
    sql = sql.replace("where order", "order");
    return this.dao.finds(sql, Bc_draw.class, list.toArray());
  }

  @SuppressWarnings("unchecked")
  public int findscount(int user_id, String btime, String etime, int type, int status) {
    String sql = "select count(Draw_id) from Bc_draw where";
    ArrayList list = new ArrayList();
    if (-1 != user_id) {
      sql = sql + " User_id=?";
      list.add(Integer.valueOf(user_id));
    }

    if (StringUtils.isNotEmptyAll(new String[] { btime, etime })) {
      sql = sql + " and Draw_time>? and Draw_time<?";
      list.add(btime + " 00:00:00");
      list.add(etime + " 24:00:00");
    }

    if (-1 != type) {
      sql = sql + " and Draw_type=?";
      list.add(Integer.valueOf(type));
    }

    if (-1 != status) {
      sql = sql + " and Draw_status=?";
      list.add(Integer.valueOf(status));
    }

    sql = sql.replace("where and", "where");
    if (sql.endsWith("where")) {
      sql = sql.replace("where", "");
    }

    return this.dao.getCount(sql, list.toArray());
  }

  public int findUserDrawCount(int Userid) {
    return this.dao.getCount("select count(Draw_id) from Bc_draw where to_days(Draw_time)=to_days(now()) and Draw_status = 2 and User_id=?", new Object[] { Integer.valueOf(Userid) });
  }

  public int findNowDraw() {
    return this.dao.getCount("select count(Draw_id) from Bc_draw where Draw_status in(0,1)", new Object[0]);
  }
}