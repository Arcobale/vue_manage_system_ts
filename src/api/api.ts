import service from "@/service.js";
//格式转换
import qs from 'qs';
//限制数据类型
import { IUserData } from "@/types";

//登录
export function login(data: IUserData) {
    return service({
        method: 'post',
        url: '/login',
        data,
    });
}

//获取学生列表
//这种一般不做ts限制，用any，因为变化较大
export function getStudentList(params: any) {
    return service({
        method: 'get',
        url: '/students',
        params,
        //params是用来携带请求参数的，它以key-value的形式放在URL后面，是一个对象。
        //data是用来携带请求数据的，它以key-value的形式放在请求体中，是一个对象。
        //一般来说，GET请求使用params，POST请求使用data，注意区分！
    })
}

//学生数据删除
//id有时候是number，有时候是字符串
export function deleteStudent(id: string | number) {
    return service({
        method: 'delete',
        url: `/students/${id}`,
    })
}

//获取信息列表
export function getInfoList(params: any) {
    return service({
        method: 'get',
        url: '/info',
        params,
    })
}

//信息数据删除
export function deleteInfo(id: any) {
    return service({
        method: 'delete',
        url: `/info/${id}`,
    })
}

//信息数据新增
export function addInfo(data: any) {
    data = qs.stringify(data);
    return service({
        method: 'post',
        url: '/info',
        data,
    })
}

//信息数据修改
export function updateInfo(data: any) {
    data = qs.stringify(data);
    return service({
        method: 'put',
        url: '/info',
        data,
    })
}

//数据概览接口
export function getDataView() {
    return service({
        method: 'get',
        url: '/dataview',
    })
}

//旅游地图接口
export function getTravelMap() {
    return service({
        method: 'get',
        url: '/travel',
    })
}