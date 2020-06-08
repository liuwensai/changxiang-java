package com.caipiao.entity.out;

public class HemaiEntity {
	
	private int Buy_id;
	private int User_id;
	private String Buy_item;
	private double Buy_money;
	private double Buy_baodi;
	private double Buy_have;
	private String Buy_fqihao;
	private String Buy_lot;
	private int Buy_status;

	public String getBuy_lot() {
		return this.Buy_lot;
	}

	public void setBuy_lot(String buy_lot) {
		this.Buy_lot = buy_lot;
	}

	public int getBuy_id() {
		return this.Buy_id;
	}

	public void setBuy_id(int buy_id) {
		this.Buy_id = buy_id;
	}

	public int getBuy_status() {
		return this.Buy_status;
	}

	public void setBuy_status(int buy_status) {
		this.Buy_status = buy_status;
	}

	public int getUser_id() {
		return this.User_id;
	}

	public void setUser_id(int user_id) {
		this.User_id = user_id;
	}

	public String getBuy_item() {
		return this.Buy_item;
	}

	public void setBuy_item(String buy_item) {
		this.Buy_item = buy_item;
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

	public String getBuy_fqihao() {
		return this.Buy_fqihao;
	}

	public void setBuy_fqihao(String buy_fqihao) {
		this.Buy_fqihao = buy_fqihao;
	}
}