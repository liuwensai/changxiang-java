package com.caipiao.service;

import com.caipiao.entity.Bc_news;
import com.caipiao.intface.Bc_newsIntface;
import com.caipiao.intfaceImpl.NewsIntfaceImpl;
import java.util.List;

public class NewsService{
	
  Bc_newsIntface newsdao = new NewsIntfaceImpl();

  @SuppressWarnings("unchecked")
  public List finds(int type)
  {
    return this.newsdao.findByType(null, null, null, null, null, type, type, 0, 0, 6);
  }

  public Bc_news find(int ids) {
    return this.newsdao.find(ids);
  }

  @SuppressWarnings("unchecked")
  public List findAll() {
    return this.newsdao.findByType(null, null, null, null, null, -1, -1, 0, 0, 25);
  }
}