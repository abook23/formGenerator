/**
 * 代码生成器
 * @type {{screenInit}} 筛选
 */
var formGenerator = function () {

    /**
     * 新增界面表单生成
     * @param divId 放到哪个 id
     * @param columns columns [{name:"userName",text="用户名",type:"text,time"}]
     */
    let addFormInit = function (obj) {
        let elem = obj.elem;
        let inputs = obj.inputs;
        let data = obj.data;
        let formId = $(elem).attr('id') + "_form";
        let formView = $(
            '<form id="' + formId + '" class="form-horizontal col-md-10 col-md-offset-1 col-xs-10 col-xs-offset-1 form-generator" role="form">' +
            '   <div class="form-group" style="margin-top: 60px"></div>' +
            '</form>');
        var formGroupView = formView.find('.form-group');
        var isRequired = false;
        $.each(inputs, function (i, item) {
            if (Array.isArray(item)) {
                var div_inline = $('<div>').addClass('form-inline');
                $.each(item, function (i, item2) {
                    let labelView = item2.text;
                    initData(item, data);//赋值
                    let view = getView(i, item2, formId);
                    if (item.required) {
                        isRequired = true;
                        labelView += '<a class="required">*</a>';
                        view.attr('required', '');
                    }
                    let formGroup = $(
                        '<div class="form-group col-md-6">' +
                        '        <label class="col-md-4 control-label">' + labelView + '</label>' +
                        '        <div class="col-md-8">' +
                        '            <div class="input-view"></div>' +
                        '            <div class="error_msg" ></div>' +
                        '        </div>' +
                        '</div>');
                    if (!item2.text) {
                        formGroup.find('label').remove()
                    }
                    let inputDiv = formGroup.find('.input-view');
                    inputDiv.append(view);
                    div_inline.append(formGroup);
                });
                formGroupView.append(div_inline);
            } else {
                var labelView = item.text;
                initData(item, data);//赋值
                var view = getView(i, item, formId);
                if (item.required) {
                    isRequired = true;
                    labelView += '<a class="required">*</a>';
                    view.attr('required', '');
                }
                var formGroup = $(
                    '<div class="form-group">' +
                    '        <label class="col-md-2 col-sm-3 control-label">' + labelView + '</label>' +
                    '        <div class="col-md-10 col-sm-9">' +
                    '            <div class="input-view"></div>' +
                    '            <div class="error_msg" ></div>' +
                    '        </div>' +
                    '</div>');
                let inputDiv = formGroup.find('.input-view');
                inputDiv.append(view);
                formGroupView.append(formGroup);
            }

        });
        formGroupView.append(
            '<div class="col-xs-12 text-center layui-layer-index">' +
            '     <button type="button" class="btn btn-success button_ok" >保存</button>' +
            '     <button type="button" class="btn button_close">关闭</button>' +
            '</div>'
        );
        $(elem).append(formView);

        var layerIndex = getLayerIndex();
        $(elem + " .button_ok").click(function () {
            debugger;
            if (obj.validate) {//自定义验证
                var b = obj.validate($('#' + formId));
                if (b) {
                    toSave();
                }
            } else {//jquery.validate验证
                if (isRequired) {
                    $('#' + formId).submit();
                } else {
                    toSave();
                }
            }
        });
        $(elem + " .button_close").click(function () {
            var layerIndex = getLayerIndex();
            try {
                if (layerIndex) {
                    layer.close(layerIndex)
                } else {
                    $(this).parents('.layui-layer-page').find('.layui-layer-close').trigger("click");
                }
            } catch (e) {
            }
            if (obj.close)
                obj.close();
        });
        $(elem + " .button_ok").focus();

        if (isRequired && !obj.validate) {
            $('#' + formId).validate({
                submitHandler: function () {
                    toSave();
                }
            });
        }

        function toSave() {
            obj.layerIndex = layerIndex;
            $(elem + " .button_ok").attr('disabled', 'disabled');
            if ($.isFunction(obj.save)) {
                var formData = $('#' + formId).serializeJson()
                var r = obj.save(formData);
                if (r !== false && layerIndex !== undefined) {
                    try {
                        layer.close(layerIndex)
                    } catch (e) {
                    }
                }
            }
        }

        function getLayerIndex() {
            return $('#' + formId).find('.layui-layer-index').data('layer_index');
        }
    };

    function initData(input, data) {
        if (!input.value) {
            if (input.data && !input.url) {
                input.value = input.data[input.name];
            } else {
                input.value = data[input.name];
            }
        }
    }

    function getView(i, input, formId) {
        let view;
        view = formGeneratorTemplate.getDefaultInput(i, input, formId);
        view.attr('id', formId + '_' + input.name);
        if (input.value) {
            view.val(input.value);
        }
        if (input.change) {
            view.change(function () {
                input.change(view);
            });
        }
        if (input.readonly === true) {
            view.attr('readonly', true)
        }
        return view;
    }

    return {
        addFormInit: addFormInit,//bootstrap
    }
}();

//以下为修改jQuery Validation插件兼容Bootstrap的方法，没有直接写在插件中是为了便于插件升级
$.validator.setDefaults({
    highlight: function (element) {
        $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
    },
    success: function (element) {
        element.closest('.form-group').removeClass('has-error').addClass('has-success');
    },
    //errorElement: "span",
    // errorClass: "help-block m-b-none validator-error",
    errorClass: "m-b-none validator-error",
    // validClass: "help-block m-b-none"
    validClass: "m-b-none"
});

$.fn.serializeJson = function () {
    var data = {};
    var array = this.serializeArray();
    $.each(array, function (i, item) {
        data[item.name] = item.value
    });
    return data;
};

