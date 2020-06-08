package com.caipiao.activity;

import java.util.Map;

public abstract interface ISignEntity
{
  public abstract SignEntity find(int paramInt, String paramString);

  public abstract int findsur(int paramInt);

  public abstract boolean add(SignEntity paramSignEntity);
  
  @SuppressWarnings("unchecked")
  public abstract boolean update(int paramInt, Map paramMap);
}