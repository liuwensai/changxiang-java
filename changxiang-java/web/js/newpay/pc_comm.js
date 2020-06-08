/*
 * 通用代码实现。
 */
(function ($) {
    var ajax = $.ajax,
        loadingID;

    $.extend($.fn, {
        tabBox: function (callback) {
            if ($.isFunction(callback)) {
                $(this).find(".tab-head ul li").click(function () {
                    var tag = $(this);

                    if (tag.hasClass("active") || tag.hasClass("disabled") || tag.attr("data-tab") == "false")
                        return;

                    var isChanged = callback.call(tag);

                    if (isChanged !== false)
                        tag.addClass("active").siblings().removeClass("active");
                });
            } else {
                this.tabBox(function () {
                    var contentDoms = this.parent().parent().next("div.tab-content").children();

                    contentDoms.eq(this.index()).show().siblings().hide();
                });
            }
        },
        load: function (url) {
            var tag = this;

            $.loading();

            ajax({
                url: url,
                success: function (data) {
                    tag.html(data);

                    $.closeLoading();
                },
                error: function () {
                    $.alert("数据加载出错！");

                    $.closeLoading();
                },
                dataType: "text",
                type: "post"
            });
        }
    });

    $.extend($, {
        tips: function (text, selected) {
            layer.tips(text.replace(/\n/ig, "<br/>"), selected, {
                tips: [1, '#ff7531']
            });
        },
        ajax: function (url, data, success, error, loading) {
            if ($.isFunction(data)) {
                loading = error;
                error = success;
                success = data;
            }

            if (!$.isFunction(error))
                loading = error;

            if (loading !== false)
                $.loading(loading);

            if (!data)
                data = { platform: 0 };
            else
                data.platform = 0;

            ajax({
                url: url,
                data: data,
                success: function (data) {
                    try {
                        var jsonData = eval("(" + data + ")"),
                            isContinue = true;

                        switch (jsonData.state) {
                            case -1:                //需要登录权限却未登录。
                                $.showLoginBox();
                                break;
                            case 0:
                                $.alert("请求未被处理，请确认请求是否合法！");
                                break;
                            case 2:
                            case 3:
                                $.alert(jsonData.message);
                                break;
                            default:
                                if ($.isFunction(success))
                                    isContinue = success(jsonData.result) !== false;

                                if (isContinue) {
                                    if (jsonData.result && /^\d+$/.test(jsonData.result.state)) {
                                        switch (jsonData.result.state) {
                                            case 1:
                                                $.alert(jsonData.result.message);
                                                break;
                                            case 2:
                                                location.href = jsonData.result.data;
                                                break;
                                            case 3:
                                                $.alert(jsonData.result.message, function () {
                                                    location.href = jsonData.result.data;
                                                });
                                                break;
                                            case 4:
                                                location.reload(true);
                                                break;
                                            case 5:
                                                $.alert(jsonData.result.message, function () {
                                                    location.reload(true);
                                                });
                                                break;
                                        }
                                    }
                                }
                                break;
                        }

                        if (isContinue)
                            $.closeLoading();
                    } catch (e) {
                        if ($.isFunction(error))
                            error("服务器返回数据不正确，请稍后再试！", e);
                        else
                            $.alert("服务器返回数据不正确，请稍后再试！");

                        $.closeLoading();
                    }
                },
                error: function () {
                    if ($.isFunction(error))
                        error("数据请求出错，请稍后再试！");
                    else
                        $.alert("数据请求出错，请稍后再试！");

                    $.closeLoading();
                },
                dataType: "text",
                type: "post"
            });
        },
        loading: function (text) {
            if (loadingID !== undefined)
                return;

            loadingID = layer.msg(text || "数据提交中", {
                icon: 16,
                shade: 0.01,
                time: 0
            });
        },
        closeLoading: function () {
            if (loadingID) {
                layer.close(loadingID);

                loadingID = undefined;
            }
        },
        alert: function (content, callback, title) {
            var btnText, closeTime, pars;

            if ($.type(callback) === "string") {
                var temp = callback;
                callback = title;
                title = temp;
            }

            if ($.type(callback) == "object") {
                pars = callback;
                title = title || callback.title;
                callback = pars.callback;
            } else if ($.type(title) == "object") {
                pars = title;
                title = callback.title;
                callback = callback || pars.callback;
            }

            if (pars) {
                btnText = pars.btnText;
                closeTime = pars.closeTime;
            }

            btnText = btnText || "确定";
            title = title || "系统提示";
            closeTime = closeTime || 0;

            layer.open({
                title: title,
                content: (content || "undefined").replace(/\n/ig, "<br/>"),
                btn: [btnText],
                time: closeTime,
                yes: function (index, layero) {
                    var isClose = true;

                    if ($.isFunction(callback))
                        isClose = callback.call(this, index, layero);

                    if (isClose !== false)
                        layer.close(index);
                },
                closeBtn: false
            });
        },
        getRandomNumber: function (len, maxNumber, allowRepeat, minNumber) {
            if ($.type(allowRepeat) == "number") {
                var temp = minNumber;
                minNumber = allowRepeat;
                allowRepeat = temp;
            }

            allowRepeat = allowRepeat === undefined ? true : allowRepeat;
            minNumber = minNumber === undefined ? 0 : minNumber;

            if (minNumber > maxNumber) {
                var temp = minNumber;
                minNumber = maxNumber;
                maxNumber = temp;
            }

            var result = [];

            for (var i = 0; i < len; i++) {
                var rdVal = parseInt(Math.random() * (maxNumber - minNumber) + minNumber);

                if (!allowRepeat && result.indexOf(rdVal) > -1)
                    i--;
                else
                    result.push(rdVal);
            }

            return result.sort(function (item1, item2) {
                return parseInt(item2) < parseInt(item1);
            });
        },
        confirm: function (content, callback, cancelCallback, title) {
            var okBtnText, cancelBtnText, pars;

            if ($.type(callback) == "string") {
                var temp = callback;
                callback = cancelCallback;
                cancelCallback = title;
                title = temp;
            }

            if ($.type(cancelCallback) == "string") {
                var temp = cancelCallback;
                cancelCallback = title;
                title = temp;
            }

            if ($.type(callback) == "object")
                pars = callback;

            if (pars) {
                okBtnText = pars.okBtnText;
                cancelBtnText = pars.cancelBtnText;
                title = pars.title;
            }

            okBtnText = okBtnText || "确定";
            cancelBtnText = cancelBtnText || "取消";
            title = title || "确认操作";

            layer.open({
                title: title,
                content: (content || "undefined").replace(/\n/ig, "<br/>"),
                btn: [okBtnText, cancelBtnText],
                yes: function (index, layero, e) {
                    var isClose = true;

                    if ($.isFunction(callback))
                        isClose = callback.call(this, index, layero);

                    if (isClose !== false)
                        layer.close(index);
                },
                btn2: function (index, layero) {
                    var isClose = true;

                    if ($.isFunction(cancelCallback))
                        isClose = cancelCallback.call(this, index, layero);

                    if (isClose !== false)
                        layer.close(index);
                },
                closeBtn: false
            });
        },
        isLogined: (function () {
            return !!$("#btnTopLogout").length;
        })(),
        showLoginBox: function (handler) {
            var isDisabledVercode = !!parseInt($("#hidDisabledVercode").val()),
                html = '<div class="dialog-loginbox" id="divDialogLoginBox">',
                dialogIndex;

            html += '<span class="c-main">帐号：</span><div><input name="account" type="text" maxlength="32" class="dialog-textbox" placeholder="请输入登录帐号" /></div>';
            html += '<span class="c-main">密码：</span><div><input name="password" type="password" maxlength="32" class="dialog-textbox" placeholder="请输入登录密码" /></div>';
            if (!isDisabledVercode)
                html += '<span class="c-main">验证码：</span><div><input name="vercode" type="text" maxlength="5" class="dialog-textbox" placeholder="请输入验证码" /><img src="/Data/Vercode?rd=' + new Date().getTime() + '" /></div>';
            html += '<div class="dialog-buttons"><b class="dialog-blue-btn">确认</b><b class="dialog-btn">取消</b></div>'
            html += '</div>';

            dialogIndex = layer.open({
                type: 1,
                area: ['292px', isDisabledVercode ? '252px' : '317px'],
                content: html,
                title: "用户登录"
            });

            $.initLoginBox('divDialogLoginBox', ".dialog-blue-btn", function () {
                layer.close(dialogIndex);

                if ($.isFunction(handler))
                    handler();
            }).find(".dialog-btn").click(function () {
                layer.close(dialogIndex);
            });
        },
        initLoginBox: function (containerID, confirmButton, handler) {
            var container = $("#" + containerID);

            container.find("input").each(function () {
                switch (this.name) {
                    case "account":
                        $(this).attr("data-prompt", "['请输入登录帐号！']").attr("data-regex", "[/^\\S+$/]");
                        break;
                    case "password":
                        $(this).attr("data-prompt", "['请输入登录密码！']").attr("data-regex", "[/^\\S+$/]").attr("data-trim", "false");
                        break;
                    case "vercode":
                        $(this).attr("data-prompt", "['请输入登录验证码！', '登录验证码长度不正确！']").attr("data-regex", "[/^\\S+$/,/^\\S{5}$/]");
                        break;
                }
            }).keydown(function (e) {
                if (e.keyCode === 13)
                    container.find(confirmButton).click();
            });

            container.find("img").click(function () {
                this.src = "/Data/Vercode?rd=" + new Date().getTime();
            });

            container.find(confirmButton).click(function () {
                var data = $.checkForm(containerID);

                if (data) {
                    $.ajax("/Data/Index?c=Account&m=Login", data, function (response) {
                        if (response.state == 200) {
                            $.isLogined = true;

                            if ($.isFunction(handler))
                                handler();
                        } else {
                            $.alert(response.message);
                        }
                    });
                }
            });

            return container;
        },
        buyingChipped: function (bettingID, inputBoxID) {
            if ($.isLogined) {
                var buyMoney = $.trim($("#" + inputBoxID).val());

                if (!buyMoney) {
                    $.alert("请输入您要认购的金额！");

                    return;
                }

                $.ajax("/Data/Index?c=Betting&m=BuyChipped", {
                    money: buyMoney,
                    bid: bettingID
                }, function (msg) {
                    if (msg) {
                        $.alert(msg);
                    } else {
                        $.alert("投注成功，点击确认刷新当前页！", function () {
                            location.reload(true);
                        });
                    }
                });
            } else {
                $.showLoginBox(function () {
                    $.buyingChipped(bettingID, inputBoxID);
                });
            }
        },
        getSameCount: function (number1, number2, number3) {
            if (number1 == number2 && number1 == number3)
                return 3;

            if (number1 == number2 || number1 == number3 || number2 == number3)
                return 2;

            return 1;
        },
        queryString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
    });

    $("#btnTopLogout").click(function () {
        $.ajax("/Data/Index?c=Account&m=Logout", function (msg) {
            if (msg) {
                $.alert(msg);
            } else {
                $.alert("退出成功，点击确认刷新当前页！", function () {
                    location.reload(true);
                });
            }
        });
    });

    //实现最新中奖滚动
    if ($("#tabNewWinning").length) {
        var tableHeight = $("#tabNewWinning").height(),
            direction = false;

        if (tableHeight > 208) {
            setInterval(function () {
                $("#tabNewWinning").animate({
                    marginTop: (direction ? "+=" : "-=") + (tableHeight - 208) + "px"
                });

                direction = !direction;
            }, 7000);
        }
    }
})(jQuery);

//实现公告栏和中奖热门用户的TabBox
$.query("#divNoticeBox", "#divHotUsersBox").tabBox();