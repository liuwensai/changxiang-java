package com.caipiao.entity.out;

import com.caipiao.utils.UserSession;

public class BuyHMOut {
	private int Buy_id;
	private String Buy_item;
	private int Buy_isopen;
	private String User_name;
	private int User_level;
	private String Buy_lot;
	private double Buy_money;
	private double Buy_baodi;
	private double Buy_have;
	private int Buy_hmsort;
	private int Buy_take;
	private int Buy_status;
	private String Buy_fqihao;

	public int getBuy_status() {
		return this.Buy_status;
	}

	public void setBuy_status(int buy_status) {
		this.Buy_status = buy_status;
	}

	public int getBao() {
		return (int) Math.floor(this.Buy_baodi * 100.0D / this.Buy_money);
	}

	public int getJindu() {
		return (int) Math.floor((this.Buy_money - this.Buy_have) * 100.0D
				/ this.Buy_money);
	}

	public String getBuy_fqihao() {
		return this.Buy_fqihao;
	}

	public void setBuy_fqihao(String buy_fqihao) {
		this.Buy_fqihao = buy_fqihao;
	}

	public int getBuy_id() {
		return this.Buy_id;
	}

	public void setBuy_id(int buy_id) {
		this.Buy_id = buy_id;
	}

	public String getBuy_item() {
		return this.Buy_item;
	}

	public void setBuy_item(String buy_item) {
		this.Buy_item = buy_item;
	}

	public int getBuy_isopen() {
		return this.Buy_isopen;
	}

	public void setBuy_isopen(int buy_isopen) {
		this.Buy_isopen = buy_isopen;
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

	public int getUser_level() {
		return UserSession.getLevel(this.User_level);
	}

	public void setUser_level(int user_level) {
		this.User_level = user_level;
	}

	public String getBuy_lot() {
		return this.Buy_lot;
	}

	public void setBuy_lot(String buy_lot) {
		this.Buy_lot = buy_lot;
	}

	public double getBuy_money() {
		return this.Buy_money;
	}

	public void setBuy_money(double buy_money) {
		this.Buy_money = buy_money;
	}

	public double getBuy_baodi() {
		return this.Buy_baodi;
	}

	public void setBuy_baodi(double buy_baodi) {
		this.Buy_baodi = buy_baodi;
	}

	public double getBuy_have() {
		return this.Buy_have;
	}

	public void setBuy_have(double buy_have) {
		this.Buy_have = buy_have;
	}

	public int getBuy_hmsort() {
		return this.Buy_hmsort;
	}

	public void setBuy_hmsort(int buy_hmsort) {
		this.Buy_hmsort = buy_hmsort;
	}

	public int getBuy_take() {
		return this.Buy_take;
	}

	public void setBuy_take(int buy_take) {
		this.Buy_take = buy_take;
	}
}