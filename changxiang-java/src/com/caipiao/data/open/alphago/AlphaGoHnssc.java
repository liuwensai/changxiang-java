package com.caipiao.data.open.alphago;

import com.caipiao.data.open.crawler.GetOpenNumber;
import com.caipiao.service.systeminit.UserStatic;
import com.caipiao.utils.LotEmun;
import com.caipiao.utils.LotSale;
import com.caipiao.utils.OmmitUtil;
import com.caipiao.utils.TimeUtil;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletException;

public class AlphaGoHnssc extends OpenAlphaGo {
	public AlphaGoHnssc() {
		this.lot = LotEmun.Hnssc.name;
	}

	public void Instance() {
		int isopen = LotSale.getLotSale(this.lot);
		if (isopen != 1) {
			System.out.println(LotEmun.valueOf(this.lot).namestr
					+ " AlphaGo 自动发单中...");
			try {
				// 取值这类用户表中的30%发单
				List userlist = UserStatic.findByUser_type("14");
				int usercount = userlist.size() / 3;
				for (int i = 0; i < usercount; i++) {
					String result = doAlphaGo();
					Thread.sleep(2000L);
					System.out.println("----AlphaGo-期号 -"
							+ LotEmun.valueOf(this.lot).namestr
							+ " ---发单结果------" + result);
				}
			} catch (ServletException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (InterruptedException localInterruptedException) {
			}
		}

	}

}