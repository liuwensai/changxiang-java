package com.sysbcjzh.utils;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class ConfigurationFactory
{
  public static Properties getConfigDir(String file)
  {
    Properties prop = new Properties();
    try
    {
      InputStream e = ConfigurationFactory.class.getClassLoader().getResourceAsStream(file);
      prop.load(e);
      e.close();
    } catch (FileNotFoundException var3) {
      var3.printStackTrace();
    } catch (IOException var4) {
      var4.printStackTrace();
    }

    return prop;
  }
}