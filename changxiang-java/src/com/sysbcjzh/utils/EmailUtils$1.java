package com.sysbcjzh.utils;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;

final class EmailUtils$1 extends Authenticator
{
  protected PasswordAuthentication getPasswordAuthentication()
  {
    return new PasswordAuthentication("123456@qq.com", "725a347bcjzh520q");
  }
}