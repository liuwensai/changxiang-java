package com.caipiao.admin.service;

import com.caipiao.entity.Bc_comm;
import com.caipiao.entity.Bc_rech;
import com.caipiao.entity.Bc_user;
import com.caipiao.intface.Bc_autoIntface;
import com.caipiao.intface.Bc_commIntface;
import com.caipiao.intface.Bc_detailIntface;
import com.caipiao.intface.Bc_pointIntface;
import com.caipiao.intface.Bc_rechIntface;
import com.caipiao.intface.Bc_redsIntface;
import com.caipiao.intface.Bc_userIntface;
import com.caipiao.intfaceImpl.AutoIntfaceImpl;
import com.caipiao.intfaceImpl.CommIntfaceImpl;
import com.caipiao.intfaceImpl.DetailIntfaceImpl;
import com.caipiao.intfaceImpl.PointIntfaceImpl;
import com.caipiao.intfaceImpl.RechIntfaceImpl;
import com.caipiao.intfaceImpl.RedsIntfaceImpl;
import com.caipiao.intfaceImpl.UserIntfaceImpl;
import com.caipiao.service.systeminit.LogsStatic;
import com.caipiao.service.systeminit.UserStatic;
import com.caipiao.utils.StaticItem;
import com.caipiao.utils.TimeUtil;
import com.sysbcjzh.utils.IPUtils;
import com.sysbcjzh.utils.StringUtils;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

public class AdminUserService
{
  Bc_userIntface userdao = new UserIntfaceImpl();
  Bc_rechIntface rechdao = new RechIntfaceImpl();
  Bc_detailIntface descdao = new DetailIntfaceImpl();
  Bc_commIntface commdao = new CommIntfaceImpl();
  Bc_autoIntface autodao = new AutoIntfaceImpl();
  Bc_pointIntface pointdao = new PointIntfaceImpl();
  Bc_redsIntface redsdao = new RedsIntfaceImpl();


  public List findsUser(String name, String realname, double yue, int type, int stauts, int uid, String btime, String etime, int strat, int limit)
  {
    return this.userdao.findlist(name, realname, yue, type, stauts, uid, btime, etime, strat, limit);
  }

  public int findsUserCount(String name, String realname, double yue, int type, int stauts, int uid, String btime, String etime) {
    return this.userdao.findlistCount(name, realname, yue, type, stauts, uid, btime, etime);
  }

  public boolean AddMoney(Bc_user user, double money, double song, String desc, String admin, double show) {
    String item = StaticItem.GetRechitem();
    boolean addMoney = UserStatic.AddMoney(user, money + song, 0, item, 2, desc, show);
    if (addMoney) {
      String time = TimeUtil.getToday("yyyy-MM-dd HH:mm:ss");
      Bc_rech en = new Bc_rech();
      int user_id = user.getUser_id();
      en.setUser_id(user_id);
      en.setUser_name(user.getUser_name());
      en.setRech_money(money);
      en.setRech_give(song);
      en.setRech_desc(desc);
      en.setRech_dotime(time);
      en.setRech_douser(admin);
      en.setRech_status(1);
      en.setRech_item(item);
      en.setRech_time(time);
      en.setRech_type(0);
      this.rechdao.add(en);
    }

    return addMoney;
  }

  public List findsDesc(int userid, String btime, String etime, int type, int start, int limit) {
    return this.descdao.finds(userid, btime, etime, type, -1, start, limit);
  }

  public int findsDescCount(int userid, String btime, String etime, int type) {
    return this.descdao.findcount(userid, btime, etime, type, -1);
  }

  public List findsComm(String username, int start, int limit) {
    return this.commdao.finds(username, start, limit);
  }

  public int findsCommCount(String username) {
    return this.commdao.findsCount(username);
  }

  public Bc_comm findcomm(int uid) {
    return this.commdao.findById(uid);
  }

  public List findsAuto(String user, String lot, int status, String btime, String etime, int start, int limit) {
    return this.autodao.finds(user, lot, status, btime, etime, start, limit);
  }

  public int findsAutoCount(String user, String lot, int status, String btime, String etime) {
    return this.autodao.findsCount(user, lot, status, btime, etime);
  }

  public List findsPoint(int userid, String btime, String etime, int type, int subadd, int start, int limit) {
    return this.pointdao.finds(userid, btime, etime, type, subadd, start, limit);
  }

  public int findsPointCount(int userid, String btime, String etime, int type, int subadd) {
    return this.pointdao.findscount(userid, btime, etime, type, subadd);
  }

  public List findsReds(int userid, String btime, String etime, int type, int subadd, int start, int limit) {
    return this.redsdao.finds(userid, btime, etime, type, subadd, start, limit);
  }

  public int findsRedsCount(int userid, String btime, String etime, int type, int subadd) {
    return this.redsdao.findscount(userid, btime, etime, type, subadd);
  }

  public boolean updateUserPass(int userid, String pass) {
    return this.userdao.updateUserPass(userid, StringUtils.md5String(pass));
  }

  @SuppressWarnings("unchecked")
  public boolean upadteUserComm(int userid, double cqssc, double jxssc, double hnssc, double jx11x5, double sd11x5, double cq11x5, double gd11x5, double jsk3, double fc3d, double dlt, double ssq, double pl5, double pl3) {
    HashMap map = new HashMap();
    map.put("Ssq", Double.valueOf(ssq));
    map.put("Dlt", Double.valueOf(dlt));
    map.put("Pl5", Double.valueOf(pl5));
    map.put("Fc3d", Double.valueOf(fc3d));
    map.put("Pl3", Double.valueOf(pl3));
    map.put("Cqssc", Double.valueOf(cqssc));
    map.put("Jxssc", Double.valueOf(jxssc));
    map.put("Hnssc", Double.valueOf(hnssc));
    map.put("Jx11x5", Double.valueOf(jx11x5));
    map.put("Sd11x5", Double.valueOf(sd11x5));
    map.put("Gd11x5", Double.valueOf(gd11x5));
    map.put("Cq11x5", Double.valueOf(cq11x5));
    map.put("Jsk3", Double.valueOf(jsk3));
    return this.commdao.update(userid, map);
  }

  @SuppressWarnings("unchecked")
  public boolean updateUserType(int userid, int type, int status) {
    HashMap map = new HashMap();
    map.put("User_type", Integer.valueOf(type));
    map.put("User_status", Integer.valueOf(status));
    return this.userdao.update(userid, map);
  }

  @SuppressWarnings("unchecked")
  public String ChangeUserUp(int userid, String admin, String upuser, HttpServletRequest request) {
    String result = "-1";
    Bc_user find2 = this.userdao.find(userid);
    if (find2 != null) {
      Bc_user find = this.userdao.find(upuser);
      int upid = 0;
      boolean isdl = false;
      if (find != null) {
        int oldup = find.getUser_type();
        if (1 == oldup) {
          isdl = true;
          upid = find.getUser_id();
          result = "0";
        } else {
          result = "2";
        }
      } else {
        result = "1";
        upuser = "";
        isdl = true;
      }

      if (isdl) {
        String oldup1 = " ";
        Bc_user find3 = this.userdao.find(find2.getUser_upid());
        if (find3 != null) {
          oldup1 = find3.getUser_name();
        }

        HashMap map = new HashMap();
        map.put("User_upid", Integer.valueOf(upid));
        this.userdao.update(userid, map);
        LogsStatic.AddLogs(this.userdao.find(admin).getUser_id(), admin, 3, 1, IPUtils.GetIP(request), find2.getUser_name() + ":" + oldup1 + "-->" + upuser);
      }
    }

    return result;
  }
}