
// new RGraph.Sheets('AIzaSyAbK3O6hns-yEQ12zyGbJhR9AtWt713Wis', '14Z_s-FR-YUCb5gX43UVwEtaYuCfGCQj4xo3HdwgkVZI', 'Page', function (sheet)
// {
//     var data   = sheet.get('B2:B13');
//     var labels = sheet.get('A2:A13');
    
//     for (var i=0; i<labels.length; i+=2) {
//         labels[i] = "\n" + labels[i];
//     }

// });


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