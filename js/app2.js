

const btn = document.querySelector('button');
const url = 'https://docs.google.com/spreadsheets/d/';
const ssid = '114Z_s-FR-YUCb5gX43UVwEtaYuCfGCQj4xo3HdwgkVZI';
const q1 = '/gviz/tq?';
const q2 = 'tqx=out:json';
const q3 = 'sheet=Page';

window.googleDocCallback = function () { return true; };
var data ="";
function main(){
  test2();
}



function test2(){
  $.ajax({
    url: "https://docs.google.com/spreadsheets/d/14Z_s-FR-YUCb5gX43UVwEtaYuCfGCQj4xo3HdwgkVZI/gviz/tq?callback=googleDocCallback",
    type: "POST",
    data: data,
    contentType: "application/javascript",
    dataType: 'jsonp'
  })
  .done(function(res) {
    console.log('success')
  })
  .fail(function(e) {
    console.log("error")
  });
}
function test(){
  fetch('https://docs.google.com/spreadsheets/d/14Z_s-FR-YUCb5gX43UVwEtaYuCfGCQj4xo3HdwgkVZI/gviz/tq?callback=googleDocCallback')
  .then(response => response.json())
  .then(data => console.log(data));

}
function getSheetsQueryResult_(fileId, sheetName, rangeA1, sqlText)
{

  var file = SpreadsheetApp.openById(fileId);
  var sheetId = file.getSheetByName(sheetName).getSheetId();

  var request = 'https://docs.google.com/spreadsheets/d/' + fileId + '/gviz/tq?gid=' + sheetId + '&range=' + rangeA1 + '&tq=' + encodeURIComponent(sqlText);
  var result = UrlFetchApp.fetch(request).getContentText();     
  // get json object
  var from = result.indexOf("{");
  var to   = result.lastIndexOf("}")+1;  
  var jsonText = result.slice(from, to);  
  var parsedText = JSON.parse(jsonText);      

  // get types
  var types = [];
  var addType_ = function(col) { types.push(col.type); }
  var cols = parsedText.table.cols;
  cols.forEach(addType_);    

  // loop rows
  var rows = parsedText.table.rows;  
  var result = [];  
  var rowQuery = [];
  var eltQuery = {};
  var row = [];
  var nRows = rows[0].c.length;
  var type = '';
  for (var i = 0, l = rows.length; i < l; i++)
  {
    rowQuery = rows[i].c;
    row = [];
    // loop values   
    for (var k = 0; k < nRows; k++)
    {
      eltQuery = rowQuery[k];
      type = types[k];
      if (type === 'number') { row.push(parseInt(eltQuery.v)); }
      if (type === 'boolean' || type === 'string') { row.push(eltQuery.v); }
      else { row.push(eltQuery.f); }      
    }    
    result.push(row);
  }

  return result;

}

function getData(){
    let url1 = "https://docs.google.com/spreadsheets/d/14Z_s-FR-YUCb5gX43UVwEtaYuCfGCQj4xo3HdwgkVZI/gviz/tq";
    var output = document.getElementById('output');
    output.innerHTML = '';
    fetch(url1)
    .then(res => res.text())
    .then(data => {
        const json = JSON.parse(data.substr(47).slice(0,-2));
        console.log(json.table);
        const headings = makeCell(output,'','heading');
        json.table.cols.forEach((col)=>{
            const el = makeCell(headings,col.label,'box');
        })
        json.table.rows.forEach((row)=>{
            //console.log(row);
            const div = makeCell(output,'','row');
            row.c.forEach((cell)=>{
                const ele1 = makeCell(div,`${cell.v}`,'box');
            })
        })

    })
}

function makeCell(parent,html,classAdd){
    const ele = document.createElement('div');
    parent.append(ele);
    ele.innerHTML = html;
    ele.classList.add(classAdd);
    return ele;
}