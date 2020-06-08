package com.caipiao.entity.out;

public class OutEntity {
	
	private String Buy_item;
	private double Buy_money;
	private int Buylot_id;
	private int Buylot_status;
	private double Buylot_money;
	private int Buy_ishm;
	private String Buy_lot;
	private String Lot_etime;
	private String Buylot_qihao;

	public String getBuylot_qihao() {
		return this.Buylot_qihao;
	}

	public void setBuylot_qihao(String buylot_qihao) {
		this.Buylot_qihao = buylot_qihao;
	}

	public String getBuy_lot() {
		return this.Buy_lot;
	}

	public void setBuy_lot(String buy_lot) {
		this.Buy_lot = buy_lot;
	}

	public String getLot_etime() {
		return this.Lot_etime;
	}

	public void setLot_etime(String lot_etime) {
		this.Lot_etime = lot_etime;
	}

	public int getBuy_ishm() {
		return this.Buy_ishm;
	}

	public void setBuy_ishm(int buy_ishm) {
		this.Buy_ishm = buy_ishm;
	}

	public double getBuy_money() {
		return this.Buy_money;
	}

	public void setBuy_money(double buy_money) {
		this.Buy_money = buy_money;
	}

	public double getBuylot_money() {
		return this.Buylot_money;
	}

	public void setBuylot_money(double buylot_money) {
		this.Buylot_money = buylot_money;
	}

	public String getBuy_item() {
		return this.Buy_item;
	}

	public void setBuy_item(String buy_item) {
		this.Buy_item = buy_item;
	}

	public int getBuylot_id() {
		return this.Buylot_id;
	}

	public void setBuylot_id(int buylot_id) {
		this.Buylot_id = buylot_id;
	}

	public int getBuylot_status() {
		return this.Buylot_status;
	}

	public void setBuylot_status(int buylot_status) {
		this.Buylot_status = buylot_status;
	}
}