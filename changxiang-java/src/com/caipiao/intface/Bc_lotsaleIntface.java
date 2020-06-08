// Decompiled by Jad v1.5.8e2. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://kpdus.tripod.com/jad.html
// Decompiler options: packimports(3) fieldsfirst ansi space 
// Source File Name:   Bc_lotsaleIntface.java

package com.caipiao.intface;

import com.caipiao.entity.Bc_lotsale;
import java.util.List;

public interface Bc_lotsaleIntface
{

	public abstract Bc_lotsale find(String s);

	public abstract boolean update(String s, int i);
	@SuppressWarnings("unchecked")
	public abstract List finds();
}
