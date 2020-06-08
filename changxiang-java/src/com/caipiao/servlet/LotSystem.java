package com.caipiao.servlet;

import com.caipiao.entity.Bc_lottery;
import com.caipiao.utils.NowQihao;
import com.sysbcjzh.utils.IndexAction;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LotSystem extends IndexAction
{
  private static final long serialVersionUID = 1L;

  public void doGet(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException
  {
  }

  public void doPost(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException
  {
  }

  @SuppressWarnings("unchecked")
  public void TempOpenGet(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException
  {
    String lot = request.getParameter("lot");
    List findOpenByLot = NowQihao.findOpenByLot(lot);
    PrintWriter out = response.getWriter();
    String html = "<?xml version=\"1.0\" encoding=\"utf-8\"?><xml>";
    Bc_lottery newOpen;
    String substring;
    for (Iterator var8 = findOpenByLot.iterator(); var8.hasNext(); html = html + "<row expect=\"" + substring + "\" opencode=\"" + newOpen.getLot_haoma() + "\" endtime=\"" + newOpen.getLot_etime() + "\"></row>") {
      newOpen = (Bc_lottery)var8.next();
      substring = newOpen.getLot_qihao().substring(2);
      if (("Gd11x5".equals(lot)) || ("Jxssc".equals(lot))) {
        substring = newOpen.getLot_qihao();
      }
    }

    html = html + "</xml>";
    out.write(html);
    out.flush();
    out.close();
  }
}