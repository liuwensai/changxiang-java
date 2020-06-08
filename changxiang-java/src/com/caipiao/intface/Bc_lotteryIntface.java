package com.caipiao.intface;

import com.caipiao.entity.Bc_lottery;
import java.util.List;
import java.util.Map;

public abstract interface Bc_lotteryIntface{
	
  public abstract boolean add(Bc_lottery paramBc_lottery);

  public abstract boolean delete(int paramInt);
  @SuppressWarnings("unchecked")
  public abstract boolean update(String paramString1, String paramString2, Map paramMap);

  @SuppressWarnings("unchecked")
  public abstract boolean update(int paramInt, Map paramMap);

  public abstract Bc_lottery find(String paramString1, String paramString2);

  public abstract Bc_lottery find(int paramInt);

  public abstract Bc_lottery findByNowTime(String paramString1, String paramString2);

  public abstract Bc_lottery findByEtime(String paramString1, String paramString2);

  @SuppressWarnings("unchecked")
  public abstract List findAllOpen();

  @SuppressWarnings("unchecked")
  public abstract List findNowAfter(String paramString1, String paramString2, int paramInt1, int paramInt2);

  public abstract int findNowAfterCount(String paramString1, String paramString2);

  @SuppressWarnings("unchecked")
  public abstract List findDay(String paramString1, String paramString2);

  @SuppressWarnings("unchecked")
  public abstract List findNewOpen(String paramString, int paramInt);
  
  @SuppressWarnings("unchecked")
  public abstract List findNotOpenByTime(String paramString1, String paramString2);

  @SuppressWarnings("unchecked")
  public abstract List findNowAgo(String paramString1, String paramString2, int paramInt1, int paramInt2);

  @SuppressWarnings("unchecked")
  public abstract List findHaveWithOpen(int paramInt);

  @SuppressWarnings("unchecked")
  public abstract List finds(String paramString1, String paramString2, int paramInt1, int paramInt2, String paramString3, String paramString4, int paramInt3, int paramInt4);

  public abstract int findsCount(String paramString1, String paramString2, int paramInt1, int paramInt2, String paramString3, String paramString4);
}