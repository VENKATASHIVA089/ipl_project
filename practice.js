var XLSX=require('xlsx')
//var Excel=require('exceljs')
var wb=XLSX.readFile('./matches.xlsx')
var wb2=XLSX.readFile('./deliveries.xlsx')
var ws=wb.Sheets.Sheet1
let array=XLSX.utils.sheet_to_json(wb.Sheets.Sheet1)
let array2=XLSX.utils.sheet_to_json(wb2.Sheets.deliveries)
//import readXlsxFile from 'read-excel-file/node'
 //var readXlsxFile=require('read-excel-file/node')
// File path.
console.log(array.length)
let output={}
for(let x in array){
	if(output[array[x].season]){
		output[array[x].season]++;
	}
	else{
		output[array[x].season]=1;	
	}
}
//console.log(output)

let output2={2008:{},
			2009:{},
			2010:{},
			2011:{},
			2012:{},
			2013:{},
			2014:{},
			2015:{},
			2016:{},
			2017:{}
}
for(let x in array){
	if(output2[array[x].season][array[x].winner]){
		output2[array[x].season][array[x].winner]++;	
	}
	else{
		if(array[x].winner)
		output2[array[x].season][array[x].winner]=1;
	}
}
//console.log(output2)
//console.log(array2[0].match_id)
let teams={
  	'Sunrisers Hyderabad':0,
  	'Royal Challengers Bangalore':0,
  	'Gujarat Lions':0,
  	'Kolkata Knight Riders':0,
  	'Delhi Daredevils':0,
  	'Mumbai Indians':0,
  	'Rising Pune Supergiants':0,
  	'Kings XI Punjab':0
  }
  console.log(array2.length)
for(let x in array2){
//	console.log(array2[x].bowling_team)
	if(array2[x].match_id>=577){
	if(array2[x].extra_runs)
	teams[array2[x].bowling_team]+=array2[x].extra_runs
}
}
console.log(teams)
/*
readXlsxFile('./deliveries.xlsx').then((rows) => {
  // `rows` is an array of rows
  // each row being an array of cells.150461
  console.log(rows[0][0])
})

//console.log(teams);*/
