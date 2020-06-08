package com.caipiao.service.my;

import com.caipiao.intface.Bc_detailIntface;
import com.caipiao.intface.Bc_logsIntface;
import com.caipiao.intfaceImpl.DetailIntfaceImpl;
import com.caipiao.intfaceImpl.LogsIntfaceImpl;
import java.util.List;

public class MyDetailService
{
  Bc_detailIntface daodetail = new DetailIntfaceImpl();
  Bc_logsIntface daolog = new LogsIntfaceImpl();

  @SuppressWarnings("unchecked")
  public List finds(int userid, String btime, String etime, int type, int status, int start, int limit)
  {
    return this.daodetail.finds(userid, btime, etime, type, status, start, limit);
  }

  public int findcount(int userid, String btime, String etime, int type, int status) {
    return this.daodetail.findcount(userid, btime, etime, type, status);
  }

  @SuppressWarnings("unchecked")
  public List findLogs(int userid, String btime, String etime, int type, int start, int limit) {
    return this.daolog.finds(userid, btime, etime, type, 0, start, limit);
  }

  public int findLogscount(int userid, String btime, String etime, int type) {
    return this.daolog.findscount(userid, btime, etime, type, 0);
  }
}