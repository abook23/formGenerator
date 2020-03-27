var formGeneratorTemplate = function () {

    return {
        getDefaultInput: getDefaultInput,
    };

    function getDefaultInput(i, input, formId) {
        var view;
        if (input.type === "dateTime") {
            view = dateTime(i, input);
        } else if (input.type === "select" || input.url || input.options) {
            view = getSelectInput(i, input);
        } else if (input.type === "textarea") {
            view = getTextareaInput(i, input);
        } else if (input.type === "button") {
            view = getButton(i, input)
        } else {
            view = getTextInput(i, input);
        }
        return view;
    }

    function getTextInput(i, input) {
        return $('<input>')
            .addClass('form-control')
            .attr('type', input.type === undefined ? 'text' : input.type)
            .attr('name', input.name)
            .attr('autocomplete', 'off')
            .attr('placeholder', "请输入" + input.text);
    }

    function getButton(i, view) {
        return $('<button>')
            .addClass('btn').addClass(view.name)
            .text(view.value)
            .click(function () {
                if (view.click) {
                    view.click()
                }
            });
    }

    function getTextareaInput(i, input) {
        return $('<textarea>')
            .addClass('form-control')
            .attr('type', input.type === undefined ? 'text' : input.type)
            .attr('name', input.name)
            .attr('autocomplete', 'off')
            .attr('placeholder', "请输入" + input.text)
            .attr('rows', input.rows === undefined ? 3 : input.rows);
    }

    function getSelectInput(i, item) {
        var select = $('<select>').addClass('form-control').attr('name', item.name);
        if (item.options) {
            $.each(item.options, function (i, option) {
                var optionV = $('<option>').val(option.value).text(option.text);
                if (item.value == option.value) {
                    optionV.attr('selected', '')
                }
                select.append(optionV);
            });
        }
        if (item.url) {
            $.get(item.url, function (obj) {
                $.each(obj, function (index, option) {
                    let value = item.data ? option[item.data.value] : option.value;
                    let text = item.data ? option[item.data.text] : option.text;
                    var optionV = $('<option>').val(value).text(text);
                    if (item.value == value) {
                        optionV.attr('selected', '')
                    }
                    select.append(optionV);
                })
            })
        }
        return select;
    }


    function date(name, value) {
        var laydateClass = 'laydate' + new Date().getTime();
        var input = $('<input type="text">').addClass('form-control').addClass(laydateClass).val(value);
        setTimeout(function () {
            // laydate必须在元素加载完成,才能有效 只能用 setTimeout
            laydate.render({
                elem: '.' + laydateClass //指定元素
                , format: 'yyyy-MM-dd'
            });
        }, 180);
        return input;
    }

    function dateTime(name, value) {
        var laydateClass = 'laydate' + new Date().getTime();
        var input = $('<input type="text">').addClass('form-control').addClass(laydateClass).val(value);
        setTimeout(function () {
            // laydate必须在元素加载完成,才能有效 只能用 setTimeout
            laydate.render({
                elem: '.' + laydateClass //指定元素
                , format: 'yyyy-MM-dd HH:mm:ss'
                , type: 'datetime'
            });
        }, 180);
        return input;
    }
}();