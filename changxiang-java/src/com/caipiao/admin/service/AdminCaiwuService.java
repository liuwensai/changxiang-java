package com.caipiao.admin.service;

import com.caipiao.entity.Bc_draw;
import com.caipiao.entity.out.Achievement;
import com.caipiao.intface.BcCaiwuIntface;
import com.caipiao.intface.Bc_drawIntface;
import com.caipiao.intface.Bc_rechIntface;
import com.caipiao.intfaceImpl.BcCaiwuIntfaceImpl;
import com.caipiao.intfaceImpl.DrawIntfaceImpl;
import com.caipiao.intfaceImpl.RechIntfaceImpl;
import com.caipiao.service.systeminit.UserStatic;
import com.caipiao.utils.TimeUtil;
import java.util.HashMap;
import java.util.List;

public class AdminCaiwuService
{
  private Bc_rechIntface rechdao = new RechIntfaceImpl();
  private Bc_drawIntface drawdao = new DrawIntfaceImpl();
  private BcCaiwuIntface caiwudao = new BcCaiwuIntfaceImpl();

  @SuppressWarnings("unchecked")
  public List findsRech(int user_id, String btime, String etime, int type, int utype, int status, int start, int limit)
  {
    return this.rechdao.finds(user_id, btime, etime, type, utype, status, start, limit);
  }

  public int findsRechcount(int user_id, String btime, String etime, int type, int utype, int status) {
    return this.rechdao.findscount(user_id, btime, etime, type, utype, status);
  }

  @SuppressWarnings("unchecked")
  public List findsDraw(int user_id, String btime, String etime, int type, int utype, int status, int start, int limit) {
    return this.drawdao.finds(user_id, btime, etime, type, utype, status, start, limit);
  }

  public int findsDrawcount(int user_id, String btime, String etime, int type, int utype, int status) {
    return this.drawdao.findscount(user_id, btime, etime, type, utype, status);
  }

  @SuppressWarnings("unchecked")
  public boolean DrawUpdate(int draw_id, String douser, int type, String msg) {
    boolean check = false;
    Bc_draw find = this.drawdao.find(draw_id);
    int draw_status = find.getDraw_status();
    HashMap map = new HashMap();
    map.put("Draw_douser", douser);
    map.put("Draw_dotime", TimeUtil.getToday("yyyy-MM-dd HH:mm:ss"));
    if ((draw_status == 0) && (type == 0)) {
      check = true;
      map.put("Draw_desc", "提款已接受");
      map.put("Draw_status", Integer.valueOf(1));
    } else if ((1 == type) && ((draw_status == 0) || (1 == draw_status))) {
      check = true;
      map.put("Draw_desc", "原因：" + msg);
      map.put("Draw_status", Integer.valueOf(4));
    } else if ((2 == type) && (1 == draw_status)) {
      check = true;
      map.put("Draw_desc", "交易号：" + msg);
      map.put("Draw_status", Integer.valueOf(2));
    }

    if (check) {
      boolean update = this.drawdao.update(draw_id, map);
      if (update) {
        int user_id = find.getUser_id();
        double money = find.getDraw_money() + find.getDraw_surgery();
        if (1 == type)
          UserStatic.DongToMon(UserStatic.find(user_id), money, find.getDraw_item(), 4, "拒绝提款");
        else if (2 == type) {
          UserStatic.DongSub(user_id, money);
        }
      }

      return update;
    }
    return false;
  }

  public int findNowDraw()
  {
    return this.drawdao.findNowDraw();
  }

  public List findAllAgent() {
    return this.caiwudao.findsAllAgent();
  }

  public List findsData(String username, String agent, String btime, String etime, int current, int pageSize) {
    return this.caiwudao.findsAchievementByPage(username, agent, btime, etime, current, pageSize);
  }

  public int findsDataCount(String username, String agent, String btime, String etime) {
    return this.caiwudao.findsAchievementByPageCount(username, agent, btime, etime);
  }

  public Achievement findsDataTotal(String username, String agent, String btime, String etime) {
    return this.caiwudao.findsAchievementByTotal(username, agent, btime, etime);
  }

  public int findsDrawTishiCount() {
    return this.caiwudao.findsDrawTishiCount();
  }

  public void updateDrawTishi() {
    this.caiwudao.updateDrawTishi();
  }
}