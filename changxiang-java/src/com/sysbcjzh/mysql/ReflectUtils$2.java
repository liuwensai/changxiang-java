package com.sysbcjzh.mysql;

import java.lang.reflect.Method;

final class ReflectUtils$2 implements ReflectUtils.MethodFilter {
	public boolean matches(Method method) {
		return !method.isBridge();
	}
}