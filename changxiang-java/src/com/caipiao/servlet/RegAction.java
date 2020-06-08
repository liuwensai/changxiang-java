package com.caipiao.servlet;

import com.caipiao.entity.Bc_user;
import com.caipiao.intface.Bc_userIntface;
import com.caipiao.intfaceImpl.UserIntfaceImpl;
import com.caipiao.service.UserRegLoginService;
import com.caipiao.service.systeminit.UserStatic;
import com.caipiao.utils.TryStatic;
import com.caipiao.utils.UserSession;
import com.sysbcjzh.utils.CheckUtil;
import com.sysbcjzh.utils.IndexAction;
import com.sysbcjzh.utils.StringUtils;
import com.sysbcjzh.utils.VelocityHelper;

import java.io.IOException;
import java.io.PrintStream;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class RegAction extends IndexAction {
	private static final long serialVersionUID = -4479746723067536955L;
	UserRegLoginService dao = new UserRegLoginService();
	Bc_userIntface userdao = new UserIntfaceImpl();
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		String name = request.getParameter("name");
		String code = request.getParameter("code");
		String up = request.getParameter("up");
		String qq = request.getParameter("qq");
		Object regemail = request.getSession().getAttribute("regemail");
		Object regpass = request.getSession().getAttribute("regpass");
		if ((regemail != null) && (regpass != null))
			if (StringUtils.isNotEmptyAll(new String[] { name, code })) {
				String sessionmail = regemail.toString();
				String sessionpass = regpass.toString();
				if ((name.equals(sessionmail))
						&& (code.equals(StringUtils.md5String(sessionpass
								+ "code")))) {
					if (StringUtils.CheckName(name)) {
						boolean reg = this.dao.Reg(1, sessionmail, sessionpass,
								qq, TryStatic.StrToInt(up), request);
						if (reg)
							out.print("<script>alert('注册验证成功！');location.href='/';</script>");
						else
							out.print("<script>alert('注册验证失败！');location.href='/regemail.html';</script>");
					} else {
						out.print("<script>alert('用户名不能保护特殊字符！');location.href='/regname.html';</script>");
					}
				} else
					out.print("<script>alert('注册验证错误！');location.href='/regemail.html';</script>");

				request.getSession().removeAttribute("regemail");
				request.getSession().removeAttribute("regpass");
			}
		out.print("<script>alert('注册验证失效！');location.href='/regemail.html';</script>");
		// label265:
		out.flush();
		out.close();
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		String email = request.getParameter("username_r");
		String pass = request.getParameter("password");
		String upid = request.getParameter("upid");
		if (StringUtils.isNotEmptyAll(new String[] { email, pass, upid })) {
			request.getSession().setAttribute("regemail", email);
			request.getSession().setAttribute("regpass", pass);
			String code = StringUtils.md5String(pass + "code");
			int upids = TryStatic.StrToInt(upid);
			this.dao.SendEmail(email, upids, code);
			VelocityHelper velo = new VelocityHelper();
			velo.Put("email", email);
			velo.Put("upid", Integer.valueOf(upids));
			velo.init("regemailend.vm", out);
		} else {
			out.print("<script>alert('注册失败！');location.href='/regemail.html';</script>");
		}

		out.flush();
		out.close();
	}

	public void ReSendGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		String upid = request.getParameter("upid");
		Object regemail = request.getSession().getAttribute("regemail");
		Object regpass = request.getSession().getAttribute("regpass");
		if ((regemail != null) && (regpass != null)
				&& (StringUtils.isNotBlank(upid))) {
			String code = StringUtils.md5String(regpass.toString() + "code");
			this.dao.SendEmail(regemail.toString(), TryStatic.StrToInt(upid),
					code);
			out.print("0");
		} else {
			out.print("-1");
		}

		out.flush();
		out.close();
	}

	public void RegNamePost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		String name = request.getParameter("user_name");
		String pass = request.getParameter("password");
		String upid = request.getParameter("upid");
		String qq = request.getParameter("user_qq");
		System.out.println(name);
		Bc_user finddaili;
		if(upid != null && !upid.equals("0") ){
			 finddaili = this.userdao.find(TryStatic.StrToInt(upid));
			 if ( finddaili == null  || (finddaili != null  && finddaili.getUser_type() != 1 )   ) {
				upid = "0";
			}
		}
	
		if (StringUtils.isNotEmptyAll(new String[] { name, pass, qq })) {
			if (StringUtils.CheckName(name)) {
				boolean reg = this.dao.Reg(0, name, pass, qq,TryStatic.StrToInt(upid), request);
				if (reg)
					out.print("<script>alert('注册成功！');location.href='/';</script>");
				else
					out.print("<script>alert('注册失败！');location.href='/regname.html';</script>");
			} else {
				out.print("<script>alert('用户名不能保护特殊字符！');location.href='/regname.html';</script>");
			}
		} else
			out.print("<script>alert('请填写完整！');location.href='/regname.html';</script>");

		out.flush();
		out.close();
	}

	public void CheckEmailPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		String email = request.getParameter("email");
		PrintWriter out = response.getWriter();
		boolean checkEmail = CheckUtil.checkEmail(email);
		if (checkEmail) {
			boolean isEmailExist = this.dao.IsEmailExist(email);
			if (isEmailExist) {
				out.print("1");
			} else {
				boolean isNameExist = this.dao.IsNameExist(email);
				if (isNameExist)
					out.print("1");
				else
					out.print("0");
			}
		} else {
			out.print("-1");
		}

		out.flush();
		out.close();
	}

	public void CheckNamePost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html");
		String name = request.getParameter("name");
		PrintWriter out = response.getWriter();
		if ((StringUtils.isNotBlank(name)) && (StringUtils.CheckName(name))) {
			boolean isNameExist = this.dao.IsNameExist(name);
			if (isNameExist)
				out.print("1");
			else
				out.print("0");
		} else {
			out.print("-1");
		}

		out.flush();
		out.close();
	}

	public void CheckYZMPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		String yzm = request.getParameter("yzm");
		PrintWriter out = response.getWriter();
		boolean cheackCodeIsRight = UserSession.CheackCodeIsRight(yzm, request);
		if (cheackCodeIsRight)
			out.print("0");
		else {
			out.print("1");
		}

		out.flush();
		out.close();
	}

	public void LoginPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		String loginname = request.getParameter("nm");
		String loginpass = request.getParameter("ps");
		String loginyzm = request.getParameter("ym");
		PrintWriter out = response.getWriter();
		boolean cheackCodeIsRight = UserSession.CheackCodeIsRight(loginyzm,
				request);
		if ((cheackCodeIsRight) && (StringUtils.length(loginname) < 20)
				&& (StringUtils.length(loginpass) < 20)) {
			Bc_user find = UserStatic.find(loginname);
			if (find != null) {
				String userLogin = UserSession.userLogin(find, loginpass,
						request);
				out.print(userLogin);
			} else {
				out.print("-1");
			}
		} else {
			out.print("-2");
		}

		out.flush();
		out.close();
	}
}