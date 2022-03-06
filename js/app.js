new RGraph.Sheets('AIzaSyAbK3O6hns-yEQ12zyGbJhR9AtWt713Wis', '14Z_s-FR-YUCb5gX43UVwEtaYuCfGCQj4xo3HdwgkVZI', 'Bar chart', function (sheet)
{
    var data   = sheet.get('B2:B13');
    var labels = sheet.get('A2:A13');
    
    for (var i=0; i<labels.length; i+=2) {
        labels[i] = "\n" + labels[i];
    }

});