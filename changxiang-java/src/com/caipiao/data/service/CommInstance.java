package com.caipiao.data.service;

import com.caipiao.entity.Bc_comm;
import com.caipiao.entity.Bc_user;
import com.caipiao.intface.Bc_commIntface;
import com.caipiao.intfaceImpl.CommIntfaceImpl;
import com.caipiao.service.systeminit.UserStatic;

public class CommInstance
{
  static Bc_commIntface dao = new CommIntfaceImpl();

  public static void InitComm(int userid, String lot, double money, String item, String qihao)
  {
    double cmoney = 0.0D;
    double comm = 0.0D;
    Bc_comm bc_comm = dao.findById(userid);
    if (bc_comm != null) {
      comm = bc_comm.getAll(lot);
    }

    cmoney = comm * money / 100.0D;
    Bc_user useren = UserStatic.find(userid);
    if (cmoney > 0.0D) {
      UserStatic.AddMoney(useren, cmoney, 0, item, 9, item + "第" + qihao + "期返点", 0.0D);
    }

    int user_upid = useren.getUser_upid();
    if (user_upid > 0) {
      double upmon = 0.0D;
      double upcomm = 0.0D;
      Bc_comm bc_upcomm = dao.findById(user_upid);
      if (bc_upcomm != null) {
        upcomm = bc_upcomm.getAll(lot);
      }

      upmon = (upcomm - comm) * money / 100.0D;
      if (upmon > 0.0D) {
        Bc_user bc_user = UserStatic.find(user_upid);
        if ((bc_user != null) && (bc_user.getUser_type() == 1))
          UserStatic.AddMoney(bc_user, upmon, 0, item, 9, "下（" + useren.getUser_name() + "）：" + item + "第" + qihao + "期返点", 0.0D);
      }
    }
  }
}