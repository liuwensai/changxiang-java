package com.caipiao.intface;

import com.caipiao.entity.Bc_draw;
import java.util.List;
import java.util.Map;

public abstract interface Bc_drawIntface{
	
  public abstract boolean add(Bc_draw paramBc_draw);

  public abstract boolean delete(int paramInt);

  @SuppressWarnings("unchecked")
  public abstract boolean update(int paramInt, Map paramMap);

  public abstract Bc_draw find(int paramInt);

  @SuppressWarnings("unchecked")
  public abstract List finds(int paramInt1, String paramString1, String paramString2, int paramInt2, int paramInt3, int paramInt4, int paramInt5, int paramInt6);

  public abstract int findscount(int paramInt1, String paramString1, String paramString2, int paramInt2, int paramInt3, int paramInt4);

  @SuppressWarnings("unchecked")
  public abstract List finds(int paramInt1, String paramString1, String paramString2, int paramInt2, int paramInt3, int paramInt4, int paramInt5);

  public abstract int findscount(int paramInt1, String paramString1, String paramString2, int paramInt2, int paramInt3);

  public abstract int findUserDrawCount(int paramInt);

  public abstract int findNowDraw();
}