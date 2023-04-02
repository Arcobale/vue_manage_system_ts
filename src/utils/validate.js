// 用户名匹配
export function nameRule(rule, value, callback) {
    let reg = /(^[a-zA-Z0-9]{4,10}$)/;
    if (value === '') {
        callback(new Error("请输入用户名"));
    } else if (!reg.test(value)) {
        callback(new Error("长度在4-10位字符之间"));
    } else {
        callback();
    }
}

//密码匹配
export function passRule(rule, value, callback) {
    // 6-12位包含大小写字母、数字、特殊符号
    let reg = /^\S*(?=\S{6,12})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;
    if (value === '') {
        callback(new Error("请输入密码"));
    } else if (!reg.test(value)) {
        callback(new Error("6-12位密码需要包含大小写字母、数字、特殊符号"));
    } else {
        callback();
    }
}