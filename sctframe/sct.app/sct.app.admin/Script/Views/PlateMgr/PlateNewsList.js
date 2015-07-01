﻿$(function () {
    /******数据加载函数***************************/
    //翻页事件
    PageClick = function (pageclickednumber) {
        /* ListPlateNews(string title, string plateid, string articlecatalogid, string isvalid, int pagenumber, int pagesize)*/
        var title = $("#txtQTitle").val();
        var plateid = $("#drplPlate").val();
        var articlecatalogid = $("#drplArticleCatalog").val();
        var isvalid = $("#drplIsvalid").val();
        param = { title: title, plateid: plateid, articlecatalogid: articlecatalogid, isvalid: isvalid, pagenumber: pageclickednumber, pagesize: pagesize };

        InvokeAction.InvokeJsonAction('PlateMgr', 'ListPlateNews', param, function (jsonData) {

            //$("#pager").pager({ pagenumber: pageclickednumber, pagecount: recordPageCount, buttonClickCallback: PageClick, total: jsonData.total });
            $("#pager").pager({ pagenumber: pageclickednumber, pagesize: pagesize, buttonClickCallback: PageClick, total: jsonData.total });
            //绑定数据 
            $("#datalist").empty();
            var htmllist = '';

            if (jsonData != null && jsonData.rows != null && jsonData.rows.length > 0) {
                for (i = 0 ; i < jsonData.rows.length; i++) {
                    if (i % 2 == 0) {
                        htmllist += '<tr class ="trrow">';
                    } else {
                        htmllist += '<tr  class ="trseprow">';
                    }
                    htmllist += '<td><input type = "checkbox" name ="chkSelect"  value="' + jsonData.rows[i].Id + '" /></td>' +
                                    '<td>' + jsonData.rows[i].Title + '</td>' +
                                    '<td>' + jsonData.rows[i].PlateName + '</td>' +
                                    '<td>' + jsonData.rows[i].ArticleCatalogName + '</td>' +
                                    '<td>' + jsonData.rows[i].NewsLabel + '</td>' +
                                    '<td>' + (jsonData.rows[i].SYS_IsValid == 1 ? '启用' : '失效') + '</td>' +
                                    '<td>' + jsonData.rows[i].SYS_OrderSeq + '</td>' +
                                    '<td>' + FormatDateString(jsonData.rows[i].SYS_ModifyTime) + '</td></tr>';
                }
            }
            else {
                htmllist += '<tr><td colspan="8">data is empty</td></tr>';

            }

            $("#datalist").html(htmllist);
        });
    }
    /******数据加载函数***************************/

    /*******初始化数据*****************/
    /**加载列表数据**/
    PageClick(1);

    /*******初始化数据*****************/


    /*******按钮事件操作********************************/
    $("#btnSearch").click(function () {
        PageClick(1);
    });

    $("#btnAdd").click(function () {
        var retval = winModalFullScreen("PlateNewsForm", false, 800, 600);
        PageClick(1);
    });

    $("#btnModify").click(function () {
        if (CheckBoxOnly("chkSelect")) {
            var checkenodevalue = $('input[type=checkbox][name=chkSelect]:checked').attr("value");
            var retval = winModalFullScreen("PlateNewsForm?key=" + checkenodevalue, false, 800, 600);
            PageClick(1);
        }
    });

    $("#btnValid").click(function () {
        if (CheckBoxOnly("chkSelect")) {
            var checkenodevalue = $('input[type=checkbox][name=chkSelect]:checked').attr("value");
            param = { key: checkenodevalue, validstatus: 1 };
            InvokeAction.InvokeJsonAction('PlateMgr', 'UpdatePlateNewsValid', param, function (jsonData) {
                PageClick(1);
                alert(jsonData);

            });
        }
    });

    $("#btnInvalid").click(function () {
        if (CheckBoxOnly("chkSelect")) {
            var checkenodevalue = $('input[type=checkbox][name=chkSelect]:checked').attr("value");
            param = { key: checkenodevalue, validstatus: 0 };
            InvokeAction.InvokeJsonAction('PlateMgr', 'UpdatePlateNewsValid', param, function (jsonData) {
                PageClick(1);
                alert(jsonData);

            });
        }
    });

    $("#btnRemove").click(function () {

        if (CheckBoxOnly("chkSelect")) {
            if (confirm("确定要删除该信息吗?")) {
                var checkenodevalue = $('input[type=checkbox][name=chkSelect]:checked').attr("value");
                param = { key: checkenodevalue };
                InvokeAction.InvokeJsonAction('PlateMgr', 'DeletePlateNews', param, function (jsonData) {
                    PageClick(1);
                    alert(jsonData);
                });
            }
        }
    });

    /*列表checkbox全选或全否*/
    $("#chkSelectAllNone").click(function () {
        if ($("#chkSelectAllNone").prop('checked')) {
            CheckBoxAllorNull("chkSelect", true);
        }
        else {
            CheckBoxAllorNull("chkSelect", false);
        }

    });
    /*******按钮事件操作********************************/
});