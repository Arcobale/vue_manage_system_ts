//封装信息列表表格操作
import qs from 'qs';
// 获取
export function getData(root, url, params) {
    root.service.get(url, { params: params || {} })
        .then(res => {
            if (res.data.status == 200) {
                root.infoList = res.data.data;
                root.infoList.forEach(item => {
                    item.sex_text = item.sex == 1 ? "男" : "女";
                })
                root.total = res.data.total;
            }
        })
        .catch(error => {
            throw error;
        });
}

//新增或修改
export function changeData(root, method, url, form, callback) {
    let data = qs.stringify(form);
    root.service[method](url, data)
        .then(res => {
            if (res.data.status == 200) {
                callback(root, url);
                root.dialogFormVisible = false;
                root.$refs['form'].resetFields();
                root.$message({ message: res.data.message, type: 'success' });
            }
        })
        .catch(error => {
            throw error;
        });
}

//删除
export function deleteData(root, url, id, callFun) {
    root.$alert('你确定要删除吗', '提示', {
        confirmButtonClass: '确定',
        callback: () => {
            root.service.delete(`${url}/${id}`)
            .then(res => {
                if (res.data.status == 200) {
                    callFun(root, url);
                    root.$message({ message: res.data.message, type: 'success' });
                }
            })
            .catch(error => {
                throw error;
            });
        }
    })
}

//封装作业列表表格操作
//获取
export function getWorkList(root, url, params) {
    root.service.get(url, { params: params || {} })
        .then(res => {
            if (res.data.status == 200) {
                root.workList = res.data.data;
                root.workList.forEach(item => {
                    item.completed_text = item.completed ? "是" : "否";
                })
                root.total = res.data.total;
                root.loading = false;
            }
        })
        .catch(error => {
            throw error;
        });
}