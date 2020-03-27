![在这里插入图片描述](https://img-blog.csdnimg.cn/20200327140050350.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Fib29rMjQ=,size_16,color_FFFFFF,t_70)
```
<!--自定义表单-->  
<link href="/plugins/formGenerator/formGenerator.css" rel="stylesheet">  
<script src="/plugins/formGenerator/formGenerator.js"></script>  
<script src="/plugins/formGenerator/formGenerator-plugin.js"></script>
```
github https://github.com/abook23/formGenerator
### [Github](https://github.com/abook23/formGenerator)
```
<div id="add_div"></div>

<script>
    formGenerator.addFormInit({
        elem: '#add_div',
        data: rowData,//全局赋值来源
        inputs: [
            {name: "userName", text: '登录名', required: 'required'},
            {name: "password", text: '密码', required: 'required'},
            {name: "name", text: '用户名', required: 'required', data: rowData.userInfo},
            {name: "phone", text: '手机号', required: 'required', data: rowData.userInfo},//局部赋值来源
            {name: "email", text: '邮箱', required: 'required', data: rowData.userInfo},
            {name: "qq", text: 'QQ', data: rowData.userInfo},
            {
                name: "status",
                text: '状态',
                type: 'select',
                options: [{text: '启用', value: '1'}, {text: '禁用', value: '0'}]
            },
            {
                name: 'type',
                text: '用户类型',
                type: 'select',
                options: [{text: '前台用户', value: 1}, {text: '后台用户', value: 2}],
            },
        ],
        save: function (layerIndex) {
            let param = $('#add_div_form').serializeJson();
            param.userId = rowData.userId;
            console.log(param);
            $.post("/user/save", param, function (data) {
                layer.msg(data.msg, {
                    time: 1000 //s后自动关闭
                }, function () {
                    layer.close(layerIndex);
                    table.refresh();
                });
            });
            return false;
        }
    });
</script>
```
表格参数
========

| 名称     | 类型     | 默认 | 示例                          | 描述                                    |
|----------|----------|------|-------------------------------|-----------------------------------------|
| elem     | string   | 必填 | '#add_div'                   | id,class,$(属性)                       |
| data     | object   | {}   | {name: "张山", age: 12}       | 初始化赋值,适用用于编辑自动赋值         |
| inputs   | array    | 必填 |                               | 参考inputs 属性                         |
| validate | function | --  | validate:function(from)       | 自定义验证,默认用jquery.validate.min.js |
| save     | Function | --  | save: function (layerIndex) { | 表单 验证通过,回调                      |
| close    | Function |      |                               | 关闭按钮                                |

inputs参数
==========

| 名称     | 类型           | 默认     | 示例                                                     | 描述                                                                                                                         |
|----------|----------------|----------|----------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| name     | string         | 必填     | {name: "userName",…                                      | name 属性值                                                                                                                  |
| text     | string         | 必填     | text: '登录名'                                           | text 属性值                                                                                                                  |
| required | Boolean/String | --      | required:true or required: 'required'                    | 是否启用验证                                                                                                                 |
| data     | obj            | --      |                                                          | 优先级 value > data >全局 data                                                                                             |
| type     | **String**     | **text** |                                                          | **text/number/time/dateTime/select/textarea/button更多请到formGenerator-plugin.js自定义**                                    |
| value    | obj            | --      | value:1                                                  | 赋值:优先级 value > data >全局 data                                                                                        |
| options  | array          | --      | [{text: '启用', value: '1'}, {text: '禁用', value: '0'}] | 设置 option 时,自动切换成 select                                                                                             |
| url      | String         |          | /menu/list                                               | 远程option 参数地址,会自动叠加到 options,如果数据格式不是[{text: '启用', value: '1'}, {text: '禁用', value: '0'}],请设置data |
| data     |                |          | url: '/menu/list', data: {text: 'name', value: 'menuId'} | 当设置 url 是,data不在是赋值,而是数据转换声明     ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200327140133115.png)                                                                           |
