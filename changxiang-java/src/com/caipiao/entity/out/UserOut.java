package com.caipiao.entity.out;

import com.caipiao.utils.UserSession;

public class UserOut {
	
	private int User_id;
	private String User_name;
	private String User_pass;
	private String User_paypass;
	private double User_money;
	private double User_dong;
	private double User_red;
	private int User_point;
	private int User_level;
	private double User_show;
	private String User_word;
	private int User_sex;
	private String User_birth;
	private String User_regtime;
	private String User_lgtime;
	private String User_lgtimeold;
	private String User_lgip;
	private String User_lgipold;
	private String User_liveadd;
	private String User_address;
	private int User_phonecheck;
	private String User_phone;
	private int User_zipcheck;
	private String User_zip;
	private String User_realname;
	private String User_aqasking;
	private String User_aqanswer;
	private String User_email;
	private int User_emailcheck;
	private String User_qq;
	private String User_image;
	private int User_type;
	private int User_status;
	private int User_upid;
	private String User_upname;

	public double getUser_show() {
		return this.User_show;
	}

	public void setUser_show(double user_show) {
		this.User_show = user_show;
	}

	public int getUser_id() {
		return this.User_id;
	}

	public void setUser_id(int user_id) {
		this.User_id = user_id;
	}

	public String getUser_name() {
		return this.User_name;
	}

	public void setUser_name(String user_name) {
		this.User_name = user_name;
	}

	public String getUser_pass() {
		return this.User_pass;
	}

	public void setUser_pass(String user_pass) {
		this.User_pass = user_pass;
	}

	public String getUser_paypass() {
		return this.User_paypass;
	}

	public void setUser_paypass(String user_paypass) {
		this.User_paypass = user_paypass;
	}

	public double getUser_money() {
		return this.User_money;
	}

	public void setUser_money(double user_money) {
		this.User_money = user_money;
	}

	public double getUser_dong() {
		return this.User_dong;
	}

	public void setUser_dong(double user_dong) {
		this.User_dong = user_dong;
	}

	public double getUser_red() {
		return this.User_red;
	}

	public void setUser_red(double user_red) {
		this.User_red = user_red;
	}

	public int getUser_point() {
		return this.User_point;
	}

	public void setUser_point(int user_point) {
		this.User_point = user_point;
	}

	public int getUser_level() {
		return UserSession.getLevel(this.User_level);
	}

	public void setUser_level(int user_level) {
		this.User_level = user_level;
	}

	public String getUser_word() {
		return this.User_word;
	}

	public void setUser_word(String user_word) {
		this.User_word = user_word;
	}

	public int getUser_sex() {
		return this.User_sex;
	}

	public void setUser_sex(int user_sex) {
		this.User_sex = user_sex;
	}

	public String getUser_birth() {
		return this.User_birth;
	}

	public void setUser_birth(String user_birth) {
		this.User_birth = user_birth;
	}

	public String getUser_regtime() {
		return this.User_regtime;
	}

	public void setUser_regtime(String user_regtime) {
		this.User_regtime = user_regtime;
	}

	public String getUser_lgtime() {
		return this.User_lgtime;
	}

	public void setUser_lgtime(String user_lgtime) {
		this.User_lgtime = user_lgtime;
	}

	public String getUser_lgtimeold() {
		return this.User_lgtimeold;
	}

	public void setUser_lgtimeold(String user_lgtimeold) {
		this.User_lgtimeold = user_lgtimeold;
	}

	public String getUser_lgip() {
		return this.User_lgip;
	}

	public void setUser_lgip(String user_lgip) {
		this.User_lgip = user_lgip;
	}

	public String getUser_lgipold() {
		return this.User_lgipold;
	}

	public void setUser_lgipold(String user_lgipold) {
		this.User_lgipold = user_lgipold;
	}

	public String getUser_liveadd() {
		return this.User_liveadd;
	}

	public void setUser_liveadd(String user_liveadd) {
		this.User_liveadd = user_liveadd;
	}

	public String getUser_address() {
		return this.User_address;
	}

	public void setUser_address(String user_address) {
		this.User_address = user_address;
	}

	public int getUser_phonecheck() {
		return this.User_phonecheck;
	}

	public void setUser_phonecheck(int user_phonecheck) {
		this.User_phonecheck = user_phonecheck;
	}

	public String getUser_phone() {
		return this.User_phone;
	}

	public void setUser_phone(String user_phone) {
		this.User_phone = user_phone;
	}

	public int getUser_zipcheck() {
		return this.User_zipcheck;
	}

	public void setUser_zipcheck(int user_zipcheck) {
		this.User_zipcheck = user_zipcheck;
	}

	public String getUser_zip() {
		return this.User_zip;
	}

	public void setUser_zip(String user_zip) {
		this.User_zip = user_zip;
	}

	public String getUser_realname() {
		return this.User_realname;
	}

	public void setUser_realname(String user_realname) {
		this.User_realname = user_realname;
	}

	public String getUser_aqasking() {
		return this.User_aqasking;
	}

	public void setUser_aqasking(String user_aqasking) {
		this.User_aqasking = user_aqasking;
	}

	public String getUser_aqanswer() {
		return this.User_aqanswer;
	}

	public void setUser_aqanswer(String user_aqanswer) {
		this.User_aqanswer = user_aqanswer;
	}

	public String getUser_email() {
		return this.User_email;
	}

	public void setUser_email(String user_email) {
		this.User_email = user_email;
	}

	public int getUser_emailcheck() {
		return this.User_emailcheck;
	}

	public void setUser_emailcheck(int user_emailcheck) {
		this.User_emailcheck = user_emailcheck;
	}

	public String getUser_qq() {
		return this.User_qq;
	}

	public void setUser_qq(String user_qq) {
		this.User_qq = user_qq;
	}

	public String getUser_image() {
		return this.User_image;
	}

	public void setUser_image(String user_image) {
		this.User_image = user_image;
	}

	public int getUser_type() {
		return this.User_type;
	}

	public void setUser_type(int user_type) {
		this.User_type = user_type;
	}

	public int getUser_status() {
		return this.User_status;
	}

	public void setUser_status(int user_status) {
		this.User_status = user_status;
	}

	public int getUser_upid() {
		return this.User_upid;
	}

	public void setUser_upid(int user_upid) {
		this.User_upid = user_upid;
	}

	public String getUser_upname() {
		return this.User_upname;
	}

	public void setUser_upname(String user_upname) {
		this.User_upname = user_upname;
	}
}