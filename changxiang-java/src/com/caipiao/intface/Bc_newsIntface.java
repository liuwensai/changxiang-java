package com.caipiao.intface;

import com.caipiao.entity.Bc_news;
import java.util.List;
import java.util.Map;

public abstract interface Bc_newsIntface
{
  public abstract boolean add(Bc_news paramBc_news);

  public abstract boolean delete(int paramInt);

  @SuppressWarnings("unchecked")
  public abstract boolean update(int paramInt, Map paramMap);

  public abstract Bc_news find(int paramInt);

  @SuppressWarnings("unchecked")
  public abstract List findByType(String paramString1, String paramString2, String paramString3,
		  String paramString4, String paramString5, int paramInt1, int paramInt2, int paramInt3, int paramInt4, int paramInt5);

  public abstract int findByTypeCount(String paramString1, String paramString2, String paramString3, 
		  String paramString4, String paramString5, int paramInt1, int paramInt2, int paramInt3);
}