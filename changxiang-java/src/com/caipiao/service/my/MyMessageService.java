package com.caipiao.service.my;

import com.caipiao.intface.Bc_msgIntface;
import com.caipiao.intfaceImpl.MsgIntfaceImpl;
import java.util.List;

public class MyMessageService
{
  Bc_msgIntface dao = new MsgIntfaceImpl();

  @SuppressWarnings("unchecked")
  public List finds(int userid, String btime, String etime, int type, int status, int start, int limit)
  {
    return this.dao.finds(userid, btime, etime, type, status, start, limit);
  }

  public int findcount(int userid, String btime, String etime, int type, int status) {
    return this.dao.findscount(userid, btime, etime, type, status);
  }

  public void UpRead(int id, int user_id) {
    this.dao.update(id, user_id);
  }

  public boolean Delete(int id, int user_id) {
    return this.dao.delete(id, user_id);
  }
}