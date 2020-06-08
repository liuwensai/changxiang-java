package com.caipiao.intfaceImpl;

import com.caipiao.entity.Bc_comm;
import com.caipiao.entity.Bc_detail;
import com.caipiao.entity.Bc_phb;
import com.caipiao.entity.Bc_point;
import com.caipiao.entity.Bc_user;
import com.caipiao.entity.out.UserOut;
import com.caipiao.intface.Bc_userIntface;
import com.sysbcjzh.mysql.Mysql;
import com.sysbcjzh.utils.StringUtils;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class UserIntfaceImpl implements Bc_userIntface
{
  Mysql dao = Mysql.getInstance();

  public boolean add(Bc_user en)
  {
    return this.dao.add(en);
  }

  public boolean add(Bc_detail en) {
    return this.dao.add(en);
  }

  public boolean add(Bc_point en) {
    return this.dao.add(en);
  }

  public boolean add(Bc_comm en) {
    return this.dao.add(en);
  }

  public boolean add(Bc_phb en) {
    return this.dao.add(en);
  }

  public boolean delete(int User_id) {
    return this.dao.delete("delete from Bc_user where User_id=?", new Object[] { Integer.valueOf(User_id) });
  }

  public boolean delete(String User_name) {
    return this.dao.delete("delete from Bc_user where User_name=?", new Object[] { User_name });
  }

  @SuppressWarnings("unchecked")
  public boolean update(int User_id, Map map) {
    return this.dao.updateMap("update Bc_user set ", " where User_id=?", map, new Object[] { Integer.valueOf(User_id) });
  }

  @SuppressWarnings("unchecked")
  public boolean update(String User_name, Map map) {
    return this.dao.updateMap("update Bc_user set ", " where User_name=?", map, new Object[] { User_name });
  }

  public Bc_user find(int User_id) {
    return (Bc_user)this.dao.find("select * from Bc_user where User_id=?", Bc_user.class, new Object[] { Integer.valueOf(User_id) });
  }

  public Bc_user find(String user_name) {
    return (Bc_user)this.dao.find("select * from Bc_user where User_name=?", Bc_user.class, new Object[] { user_name });
  }

  public boolean EmailIsExist(String email) {
    return this.dao.isExist("select count(User_email) from Bc_user where User_email=?", new Object[] { email });
  }

  public boolean NameIsExist(String name) {
    return this.dao.isExist("select count(User_name) from Bc_user where User_name=?", new Object[] { name });
  }

  public boolean MoneyToDongjie(int user_id, double money) {
    return this.dao.update("update Bc_user set User_money=User_money-?,User_dong=User_dong+? where User_id=?", new Object[] { Double.valueOf(money), Double.valueOf(money), Integer.valueOf(user_id) });
  }

  @SuppressWarnings("unchecked")
  public boolean addMoney(int user_id, double money, int red, int point, double show) {
    ArrayList list = new ArrayList();
    String sql = "update Bc_user set ";
    if (money != 0.0D) {
      sql = sql + "User_money=User_money+?,";
      list.add(Double.valueOf(money));
    }

    if (red != 0) {
      sql = sql + "User_red=User_red+?,";
      list.add(Integer.valueOf(red));
    }

    if (point != 0) {
      sql = sql + "User_point=User_point+?,";
      list.add(Integer.valueOf(point));
    }

    if (show > 0.0D) {
      sql = sql + "User_show=User_show+?,";
      list.add(Double.valueOf(show));
    }

    sql = sql.substring(0, sql.length() - 1);
    sql = sql + " where User_id=?";
    list.add(Integer.valueOf(user_id));
    return this.dao.update(sql, list.toArray());
  }

  @SuppressWarnings("unchecked")
  public boolean addMoney(int user_id, double money, int point) {
    ArrayList list = new ArrayList();
    String sql = "update Bc_user set User_money=User_money+?,User_level=User_level+?,";
    list.add(Double.valueOf(money));
    list.add(Integer.valueOf((int)money / 10));
    if (point != 0) {
      sql = sql + "User_point=User_point+?,";
      list.add(Integer.valueOf(point));
    }

    sql = sql.substring(0, sql.length() - 1);
    sql = sql + " where User_id=?";
    list.add(Integer.valueOf(user_id));
    return this.dao.update(sql, list.toArray());
  }

  public boolean DongSub(int user_id, double money) {
    return this.dao.update("update Bc_user set User_dong=User_dong-? where User_id=?", new Object[] { Double.valueOf(money), Integer.valueOf(user_id) });
  }

  public boolean DongToMoney(int user_id, double money) {
    return this.dao.update("update Bc_user set User_money=User_money+?,User_dong=User_dong-? where User_id=?", new Object[] { Double.valueOf(money), Double.valueOf(money), Integer.valueOf(user_id) });
  }

  @SuppressWarnings("unchecked")
  public List findlist(String name, String realname, double yue, int type, int stauts, int uid, String btime, String etime, int strat, int limit) {
    String sql = "select a.*,b.User_name as User_upname";
    sql = sql + " from Bc_user a LEFT JOIN Bc_user b on a.User_upid=b.User_id where";
    ArrayList list = new ArrayList();
    if (yue > 0.0D) {
      sql = sql + " and a.User_money>=?";
      list.add(Double.valueOf(yue));
    }

    if (StringUtils.isNotBlank(name)) {
      sql = sql + " and a.User_name like ?";
      list.add("%" + name + "%");
    }

    if (StringUtils.isNotBlank(realname)) {
      sql = sql + " and a.User_realname like ?";
      list.add("%" + realname + "%");
    }

    if (-1 != type) {
      sql = sql + " and a.User_type=?";
      list.add(Integer.valueOf(type));
    }

    if (-1 != stauts) {
      sql = sql + " and a.User_status=?";
      list.add(Integer.valueOf(stauts));
    }

    if (uid > 0) {
      sql = sql + " and a.User_upid=?";
      list.add(Integer.valueOf(uid));
    }

    if (StringUtils.isNotEmptyAll(new String[] { btime, etime })) {
      sql = sql + " and a.User_regtime>? and a.User_regtime<?";
      list.add(btime + " 00:00:00");
      list.add(etime + " 24:00:00");
    }

    sql = sql + " order by a.User_regtime desc limit ?,?";
    list.add(Integer.valueOf(strat));
    list.add(Integer.valueOf(limit));
    sql = sql.replace("where and", "where");
    sql = sql.replace("where order", "order");
    return this.dao.finds(sql, UserOut.class, list.toArray());
  }

  
  @SuppressWarnings("unchecked")
  public int findlistCount(String name, String realname, double yue, int type, int stauts, int uid, String btime, String etime) {
    String sql = "select count(User_id) from Bc_user where";
    ArrayList list = new ArrayList();
    if (yue > 0.0D) {
      sql = sql + " and User_money>=?";
      list.add(Double.valueOf(yue));
    }

    if (StringUtils.isNotBlank(name)) {
      sql = sql + " and User_name like ?";
      list.add("%" + name + "%");
    }

    if (StringUtils.isNotBlank(realname)) {
      sql = sql + " and User_realname like ?";
      list.add("%" + realname + "%");
    }

    if (-1 != type) {
      sql = sql + " and User_type=?";
      list.add(Integer.valueOf(type));
    }

    if (-1 != stauts) {
      sql = sql + " and User_status=?";
      list.add(Integer.valueOf(stauts));
    }

    if (uid > 0) {
      sql = sql + " and User_upid=?";
      list.add(Integer.valueOf(uid));
    }

    if (StringUtils.isNotEmptyAll(new String[] { btime, etime })) {
      sql = sql + " and User_regtime>? and User_regtime<?";
      list.add(btime + " 00:00:00");
      list.add(etime + " 24:00:00");
    }

    sql = sql.replace("where and", "where");
    if (sql.endsWith("where")) {
      sql = sql.replace(" where", "");
    }

    return this.dao.getCount(sql, list.toArray());
  }

  public boolean updatetimeip(int user_id, String time, String ip) {
    return this.dao.update("update Bc_user set User_lgtimeold=User_lgtime,User_lgipold=User_lgip,User_lgip=?,User_lgtime=? where User_id=?", new Object[] { ip, time, Integer.valueOf(user_id) });
  }

  public boolean updateUserPass(int user_id, String pass) {
    return this.dao.update("update Bc_user set User_pass=?,User_paypass=? where User_id=?", new Object[] { pass, pass, Integer.valueOf(user_id) });
  }

  
  @SuppressWarnings("unchecked")
  public List findInlist(int User_id, int cus, String btime, String etime, int start, int limit) {
    String sql = "select * from Bc_user where User_upid=?";
    ArrayList list = new ArrayList();
    list.add(Integer.valueOf(User_id));
    if (cus == 0)
      sql = sql + " and User_money>0";
    else if (1 == cus) {
      sql = sql + " and User_money<=0";
    }

    if (StringUtils.isNotEmptyAll(new String[] { btime, etime })) {
      sql = sql + " and User_regtime>? and User_regtime<?";
      list.add(btime + " 00:00:00");
      list.add(etime + " 24:00:00");
    }

    sql = sql + " order by User_regtime desc limit ?,?";
    list.add(Integer.valueOf(start));
    list.add(Integer.valueOf(limit));
    return this.dao.finds(sql, Bc_user.class, list.toArray());
  }

  
  @SuppressWarnings("unchecked")
  public int findInlistCount(int User_id, int cus, String btime, String etime) {
    String sql = "select count(User_id) from Bc_user where User_upid=?";
    ArrayList list = new ArrayList();
    list.add(Integer.valueOf(User_id));
    if (cus == 0)
      sql = sql + " and User_money>0";
    else if (1 == cus) {
      sql = sql + " and User_money<=0";
    }

    if (StringUtils.isNotEmptyAll(new String[] { btime, etime })) {
      sql = sql + " and User_regtime>? and User_regtime<?";
      list.add(btime + " 00:00:00");
      list.add(etime + " 24:00:00");
    }

    return this.dao.getCount(sql, list.toArray());
  }
  
  public List findByUser_type(String User_type){
	  String sql = "SELECT * from bc_user  WHERE User_status = 0 AND User_type = ? ";	   
	    return this.dao.finds(sql, Bc_user.class, new Object[] { User_type });
  }
  
  public Bc_user findRandByUser_type(String User_type) {
	    return (Bc_user)this.dao.find("SELECT * from bc_user  WHERE User_status = 0 AND User_type = ? order by rand() limit 1", Bc_user.class, new Object[] { User_type });
	  }
  
}