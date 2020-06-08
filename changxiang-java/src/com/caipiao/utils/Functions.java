package com.caipiao.utils;

import java.util.List;

import com.caipiao.admin.service.AdminCaiwuService;

public class Functions {

	public static List<String> getAllAgent()
	{
		AdminCaiwuService service = new AdminCaiwuService();
		return service.findAllAgent();
	}
}
