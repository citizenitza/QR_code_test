
new RGraph.Sheets('AIzaSyAbK3O6hns-yEQ12zyGbJhR9AtWt713Wis', '14Z_s-FR-YUCb5gX43UVwEtaYuCfGCQj4xo3HdwgkVZI', 'Page', function (sheet)
{
    var data   = sheet.get('B2:B13');
    var labels = sheet.get('A2:A13');
    
    for (var i=0; i<labels.length; i+=2) {
        labels[i] = "\n" + labels[i];
    }

});


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
        var Code = sheet.get('D'+ sheetindex);
        var Stock= sheet.get('J'+ sheetindex);;
        var Price= sheet.get('T'+ sheetindex);;
        document.getElementById("Code").innerHTML = Code;
        document.getElementById("Stock").innerHTML = Stock;
        document.getElementById("Price").innerHTML = Price;

    });
}