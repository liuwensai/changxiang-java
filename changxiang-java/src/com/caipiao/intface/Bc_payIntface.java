package com.caipiao.intface;

import com.caipiao.entity.Bc_pay;
import java.util.List;
import java.util.Map;

public abstract interface Bc_payIntface{
	
  public abstract boolean add(Bc_pay paramBc_pay);

  public abstract boolean delete(int paramInt);

  @SuppressWarnings("unchecked")
  public abstract boolean update(int paramInt, Map paramMap);

  public abstract Bc_pay find(int paramInt);

  @SuppressWarnings("unchecked")
  public abstract List finds(int paramInt);

  public abstract int findCountByUser(int paramInt);
}