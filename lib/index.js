/*****实现添加的功能******/
//1 给添加绑定事件,收集表达数据
$$('#add-user').onclick = function () {
    //收集表单数据
    let title = $$('#title').value;
    let pos = $$('#pos').value;
    let idea = $$('#idea').value;
    console.log(title, pos, idea);
    //验证数据不能为空
    if (!title || !pos || !idea) return;
    //2将数据发送给php
    let data = 'idea=' + idea + '&pos=' + pos + '&title=' + title
    axios.post('http://localhost/day-25/lib/server.php?fn=add', data).then(res => {

        if (res == 1) {
            //插入成功后关闭弹框刷新页面
            $('#userAddModal').modal('toggle');
            location.reload();

        }
    })

}

/******实现数据列表*******/
function list() {
    axios.get('http://localhost/day-25/lib/server.php?fn=sel').then(res => {
        //将json转化为对象
        res = JSON.parse(res)

        // 遍历数据追加到页面中
        var str = '';
        res.forEach(ele => {

            let { id, title, pos, idea } = ele
            str += `<tr class="user-${id}">
            <th scope="row">${id}</th>
            <td>${title}</td>
            <td>${pos}</td>
            <td>${idea}</td>
            <td><button type="button" class="btn btn-danger btn-sm"  data-toggle="modal" data-target="#userDelModal" onclick="delUser(${id})">删除</button>
            <button type="button" class="btn btn-warning btn-sm">修改</button></td>
            </tr>`;

        });
        //追加到tbody中
        $$('tbody').innerHTML = str;
    });

}
list();
/**删除的实现**/
function delUser(id) {
    //将当前删除的信息，id，放到删除的模态框上
    $$('#del-user').setAttribute('user-id', id);
}
//给删除绑定事件
$$('#del-user').onclick = function () {
    // 1  获取当前删除的id

    let id = this.getAttribute('user-id');
    //2发送ajax删除
    axios.get('http://localhost/day-25/lib/server.php?fn=del&id=' + id).then(res => {
        if (res == 1) {
            //删除成功，关闭模态框，刷新页面
            $('#userDelModal').modal('toggle');

            $$('.user-' + id).remove();
        }
    })
}


//节点获取的封装
function $$(ele) {
    return document.querySelector(ele);
}