var XLSX=require('xlsx')
var Excel=require('exceljs')
var wb=XLSX.readFile('./Book1.xlsx')
//var wb2=new Excel.Workbook('./practicexlsx.xlsx');
var ws=wb.Sheets.Sheet1
//var ws2=wb2.getWorksheet('Sheet1')
let array=XLSX.utils.sheet_to_json(wb.Sheets.Sheet1)
//console.log(array)

let output={}
for(let x in array){
	if(output[array[x].season]){
		output[array[x].season]++;
	}
	else{
		output[array[x].season]=1;	
	}
}
console.log(output)

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
console.log(output2)