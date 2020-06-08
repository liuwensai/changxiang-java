package com.caipiao.entity.out;

import com.caipiao.utils.LotEmun;
import com.caipiao.utils.ShowStatic;
import com.caipiao.utils.UserSession;

public class MyOrderOut {
	
	private String Buyuser_time;
	private double Buyuser_money;
	private double Buyuser_win;
	private String Buy_fqihao;
	private String Buy_lot;
	private String User_name;
	private double Buy_money;
	private String Buy_item;
	private String Buy_status;

	public String getBuyuser_time() {
		return this.Buyuser_time;
	}

	public void setBuyuser_time(String buyuser_time) {
		this.Buyuser_time = buyuser_time;
	}

	public double getBuyuser_money() {
		return this.Buyuser_money;
	}

	public void setBuyuser_money(double buyuser_money) {
		this.Buyuser_money = buyuser_money;
	}

	public double getBuyuser_win() {
		return this.Buyuser_win;
	}

	public void setBuyuser_win(double buyuser_win) {
		this.Buyuser_win = buyuser_win;
	}

	public String getBuy_fqihao() {
		return this.Buy_fqihao.substring(2);
	}

	public void setBuy_fqihao(String buy_fqihao) {
		this.Buy_fqihao = buy_fqihao;
	}

	public String getBuy_lot() {
		return LotEmun.valueOf(this.Buy_lot).namestr;
	}

	public void setBuy_lot(String buy_lot) {
		this.Buy_lot = buy_lot;
	}

	public String getUser_name() {
		return this.User_name;
	}

	public String getUser_nameDis() {
		return UserSession.DisUser(this.User_name);
	}

	public void setUser_name(String user_name) {
		this.User_name = user_name;
	}

	public double getBuy_money() {
		return this.Buy_money;
	}

	public void setBuy_money(double buy_money) {
		this.Buy_money = buy_money;
	}

	public String getBuy_item() {
		return this.Buy_item;
	}

	public void setBuy_item(String buy_item) {
		this.Buy_item = buy_item;
	}

	public String getBuy_status() {
		return ShowStatic.ShowBuyStatus(this.Buy_status);
	}

	public void setBuy_status(String buy_status) {
		this.Buy_status = buy_status;
	}
}