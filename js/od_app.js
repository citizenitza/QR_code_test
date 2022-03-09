var fileRelativeUrl = "https://onedrive.live.com/redir?resid=7B3CD0791DDF2DD1!7114&authkey=!AJM7ysmoze_cS3c&ithint=file%2cxlsx&e=V3eC1i";
var sheetName = "Price & stock list";
var range = "A1|J45";

// var url = _spPageContextInfo.webServerRelativeUrl.replace(/\/$/, '') + "/";
var url = fileRelativeUrl;
loadXMLDoc(url + "_vti_bin/ExcelRest.aspx/" + fileRelativeUrl + "/model/Ranges('" + sheetName + "!" + range + "')?$format=atom", function (text) {
    var parser = new DOMParser();
    var excelRestNS = 'http://schemas.microsoft.com/office/2008/07/excelservices/rest';
    var xmlDoc = parser.parseFromString(text, "text/xml");
    var rows = xmlDoc.getElementsByTagNameNS(excelRestNS, 'row');

    // Get a text from cell A1
    var row = 0;
    var column = 0;
    var cell = rows[row].getElementsByTagNameNS(excelRestNS, 'c')[column];
    var formattedValueElement = cell.getElementsByTagNameNS(excelRestNS, 'fv')[0];
    var cellText = formattedValueElement.childNodes[0].wholeText;
    console.log(cellText);

});

// super simple implementation of XHR, you can alternatively use anything else e.g. $.ajax
function loadXMLDoc(url, callback) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                callback(xmlhttp.responseText);
            }
            else {
                console.log('Error ' + xmlhttp.status, xmlhttp);
            }
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}




function OneDriveTest(){



}

//URL: Single_request.html?index=1
function GetData(){
    new RGraph.Sheets('AIzaSyAbK3O6hns-yEQ12zyGbJhR9AtWt713Wis', '14Z_s-FR-YUCb5gX43UVwEtaYuCfGCQj4xo3HdwgkVZI', 'Page', function (sheet){
        var index = window.location.search.substring(1).split("=")[1];
        var sheetindex = 0;
        while(sheet.get('A' + sheetindex) != index){
            sheetindex++;
            if(sheetindex > 20000){
                return false;
            }
        }
        
        var labels = sheet.get('A2:A13');

        ;
        var Number = sheet.get('A'+ sheetindex);
        var Code = sheet.get('D'+ sheetindex);
        var Stock= sheet.get('J'+ sheetindex);;
        var Price= sheet.get('T'+ sheetindex);;
        document.getElementById("Number").innerHTML = Number;
        document.getElementById("Code").innerHTML = Code;
        document.getElementById("Stock").innerHTML = Stock;
        document.getElementById("Price").innerHTML = Price;

    });
}

//Load QR codes
function LoadQRCodes(){
    new RGraph.Sheets('AIzaSyAbK3O6hns-yEQ12zyGbJhR9AtWt713Wis', '14Z_s-FR-YUCb5gX43UVwEtaYuCfGCQj4xo3HdwgkVZI', 'Page', function (sheet){
        var sheetnr = 0;
        document.getElementById("QR_Code_wrap").innerHTML = "";
        for(var i = 2;i < 2000;i++){
            var index = sheet.get('A'+ i);
            if(Number.isFinite(index)){
                var ID = "qrcode_" + index;
                var newQRCode = '<div class="QR_Row">  <div class="Description">QR code for item number:' + index + '</div>  <div id="'+ ID + '" style="width:200px; height:200px; margin-top:15px;"></div></div>'
                document.getElementById("QR_Code_wrap").innerHTML += newQRCode;
                sheetnr++;
            } 
        }

        for(var i = 0;i < sheetnr;i++){
            var URL = "https://citizenitza.github.io/QR_code_test/Single_request.html?index=" + i;
            var ID = "qrcode_" + i;
            var qrcode = new QRCode(document.getElementById(ID), {
                width : 200,
                height : 200
            });
            qrcode.makeCode(URL);
        }


    });
}