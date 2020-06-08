package com.caipiao.data.listion;

import java.io.PrintStream;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionBindingEvent;

public class OnlineUserListener
  implements HttpSessionAttributeListener
{
  public void attributeAdded(HttpSessionBindingEvent se)
  {
    System.out.println("getSession:" + se.getSession() + ",getName:" + se.getName() + ",getSource:" + se.getSource() + ",getValue:" + se.getValue());
    HttpSession session = se.getSession();
    System.out.println("session+1:id=" + session.getId() + ",getCreatime" + session.getCreationTime() + ",getAName:" + session.getAttributeNames());
  }

  public void attributeRemoved(HttpSessionBindingEvent se) {
    System.out.println("getSession:" + se.getSession() + ",getName:" + se.getName() + ",getSource:" + se.getSource() + ",getValue:" + se.getValue());
    HttpSession session = se.getSession();
    System.out.println("session-1:id=" + session.getId() + ",getCreatime" + session.getCreationTime() + ",getAName:" + session.getAttributeNames());
  }

  public void attributeReplaced(HttpSessionBindingEvent se) {
    System.out.println("getSession:" + se.getSession() + ",getName:" + se.getName() + ",getSource:" + se.getSource() + ",getValue:" + se.getValue());
    HttpSession session = se.getSession();
    System.out.println("session-replace:id=" + session.getId() + ",getCreatime" + session.getCreationTime() + ",getAName:" + session.getAttributeNames());
  }
}