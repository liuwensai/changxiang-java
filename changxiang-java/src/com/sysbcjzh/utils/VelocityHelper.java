package com.sysbcjzh.utils;

import java.io.PrintWriter;
import java.net.URL;
import java.util.Properties;
import org.apache.log4j.Logger;
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;

public class VelocityHelper
{
  static Logger logger = Logger.getLogger(VelocityHelper.class);
  static Properties properties = new Properties();
  static String path = VelocityHelper.class.getResource("/").toString().replaceAll("^file:/", "").replace("classes/", "") + "template/";
  VelocityContext context = new VelocityContext();
  VelocityEngine velocityEngine = new VelocityEngine();

  static
  {
    properties.setProperty("file.resource.loader.path", path);
    properties.setProperty("ISO-8859-1", "utf-8");
    properties.setProperty("input.encoding", "utf-8");
    properties.setProperty("output.encoding", "utf-8");
  }

  public void init(String vm, PrintWriter out) {
    this.velocityEngine.init(properties);
    Template template = this.velocityEngine.getTemplate(vm);
    if (template != null)
      template.merge(this.context, out);
  }

  public void Put(String name, Object ob)
  {
    this.context.put(name, ob);
  }
}