package com.caipiao.utils;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class Writefile
{
  public void wt(String url, String count)
  {
    try
    {
      BufferedWriter e = new BufferedWriter(new FileWriter(url));
      e.write(count);
      e.flush();
      e.close();
    } catch (IOException var4) {
      var4.printStackTrace();
    }
  }

  public static void main(String[] args1)
    throws IOException
  {
  }
}