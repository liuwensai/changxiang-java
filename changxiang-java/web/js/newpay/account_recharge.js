$("#ulFastInput").children().click(function (e) {
    if ($(this).parent().attr("data-type")) {
        var money = parseInt($(this).text());

        $("#txtRechargeMoney").val(money);
    } else {
        $(this).addClass("active").siblings().removeClass("active");

        $("#txtInputMoney").val(parseInt($(this).children("em").text()));
    }

    $("#divInlineInput").removeClass("show");

    e.stopPropagation();
});

$("#divInlineInput").click(function (e) {
    if (e.target.tagName != "INPUT" || $(e.target).attr("readonly"))
        $(this).addClass("show");
}).hover(function () {
    $(this).removeClass("show");
});

function submitRecharge(type) {
    var money = $.trim($("#txtInputMoney").val());

    if (!money) {
        $.alert("请输入要充值的金额！");
    } else if (!/^\d+$/.test(money)) {
        $.alert("输入的金额不正确！");
    } else {
        $("#hidPayType").val(type);

        document.getElementById("formRecharge").submit();
    }
}

function submitRecharge(type) {
    if (!$("#cboInlineCheckbox")[0].checked) {
        $.alert("请同意支付协议！");

        return;
    }

    var money = $.trim($("#txtRechargeMoney").val());

    if (!money) {
        $.alert("请输入要充值的金额！");
    } else if (!/^\d+$/.test(money)) {
        $.alert("输入的金额不正确！");
    } else {
        if (!type) {
            layer.open({
                title: '选择支付方式',
                content: '请选择支付方式，若支付方式为三方支付，则不允许手动输入充值金额！',
                btn: ['三方支付', '网银支付'],
                yes: function () {
                    var isSubmit = false;

                    $("#ulFastInput").children().each(function () {
                        if ($.trim(this.innerText.replace("元", "")) == money) {
                            isSubmit = true;

                            return false;
                        }
                    });

                    if (isSubmit) {
                        rechargeHandle('/Account/YybInlineRecharge');
                    } else {
                        layer.closeAll();

                        $.alert("使用第三方支付时，充值金额不能手动输入，只允许选择快速充值的金额！");
                    }
                },
                btn2: function () {
                    rechargeHandle($("#formRecharge").attr("data-action"));
                }
            });
        } else if (type == "app") {
            rechargeHandle('/Account/YybInlineRecharge');
        } else if (type == "bank") {
            rechargeHandle($("#formRecharge").attr("data-action"));
        }
    }
}

function rechargeHandle(action) {
    $("#formRecharge").attr("action", action)[0].submit();

    layer.closeAll();

    layer.open({
        title: '支付结果确认',
        content: '是否支付成功？',
        btn: ['成功', '失败'],
        yes: function () {
            location.href = "/Account/RechargeRecord";
        }
    });
}