package com.sysbcjzh.mysql;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;

final class ReflectUtils$1 implements ReflectUtils.FieldFilter {
	public boolean matches(Field field) {
		return (!Modifier.isStatic(field.getModifiers()))
				&& (!Modifier.isFinal(field.getModifiers()));
	}
}