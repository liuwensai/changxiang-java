package com.caipiao.service.my;

import com.caipiao.entity.Bc_phb;
import com.caipiao.intface.Bc_buyIntface;
import com.caipiao.intface.Bc_phbIntface;
import com.caipiao.intfaceImpl.BuyIntfaceImpl;
import com.caipiao.intfaceImpl.PhbIntfaceImpl;
import java.util.List;

public class MyBuyService{
  Bc_buyIntface dao = new BuyIntfaceImpl();
  Bc_phbIntface phbdao = new PhbIntfaceImpl();

  @SuppressWarnings("unchecked")
  public List findBuy(int userid)
  {
    return this.dao.findBuy(userid, null, null, null, -2, -1, 0, 10);
  }

  @SuppressWarnings("unchecked")
  public Bc_phb findphb(int user_id) {
    return this.phbdao.findByUser(user_id);
  }

  @SuppressWarnings("unchecked")
  public List findBuy(int userid, String btime, String etime, String lottery, int status, int ishm, int start, int limit) {
    return this.dao.findBuy(userid, btime, etime, lottery, status, ishm, start, limit);
  }

  public int findBuyCount(int userid, String btime, String etime, String lottery, int status, int ishm) {
    return this.dao.findBuyCount(userid, btime, etime, lottery, status, ishm);
  }
}