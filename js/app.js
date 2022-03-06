  // Create a new RGraph Sheets object using the spreadsheet's key and
    // the callback function that creates the chart. The RGraph.Sheets object is
    // passed to the callback function as an argument so it doesn't need to be
    // assigned to a variable when it's created
    RGraph.Sheets('14Z_s-FR-YUCb5gX43UVwEtaYuCfGCQj4xo3HdwgkVZI', function (sheet)
    {
        // Get the labels from the spreadsheet by retrieving part of the first row
        var labels = sheet.get('A2:A7');

        // Use the column headers (ie the names) as the key
        var key = sheet.get('B1:E1');

        // Get the data from the sheet as the data for the chart
        var data   = [
            sheet.get('B2:E2'), // January
            sheet.get('B3:E3'), // February
            sheet.get('B4:E4'), // March
            sheet.get('B5:E5'), // April
            sheet.get('B6:E6'), // May
            sheet.get('B7:E7')  // June
        ];

        // Create and configure the chart; using the information retrieved above
        // from the spreadsheet
        var bar = new RGraph.Bar({
            id: 'cvs',
            data: data,
            options: {
                backgroundGridVlines: false,
                backgroundGridBorder: false,
                xaxisLabels: labels,
                xaxisLabelsOffsety: 5,
                colors: ['#A8E6CF','#DCEDC1','#FFD3B6','#FFAAA5'],
                shadow: false,
                colorsStroke: 'rgba(0,0,0,0)',
                yaxis: false,
                marginLeft: 40,
                marginBottom: 35,
                marginRight: 40,
                key: key,
                keyBoxed: false,
                keyPosition: 'margin',
                keyTextSize: 12,
                textSize: 12,
                textAccessible: false,
                axesColor: '#aaa'
            }
        }).wave();
    });