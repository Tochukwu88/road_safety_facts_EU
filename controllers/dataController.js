
const fetch = require('isomorphic-fetch');
const fs = require('fs');


const {  errorResponse } = require('../utils/responseHandler');





class Data {
    static async getCsv(req, res) {
        const wikiApi = `https://www.wikitable2json.com/api/Road_safety_in_Europe`
        const api = `http://localhost:${ process.env.PORT }`
       
        const csvFileName = `dataset-v${Math.floor(Math.random() * 10) + 1}.csv`
        const csvPath = `data/${csvFileName}`
        const file = fs.createWriteStream(csvPath)

    file.on('error', function(err) { /* error handling */ console.log(err)});
        try {
            
        

           const response = await fetch(wikiApi)
           const result = await response.json()
          const tableData = result[0]

        
function merge(arr1, arr2){
    let results = [];
    let i = 0;
    let j = 0;
    while(i < arr1.length && j < arr2.length){
        if(Number(arr2[j][8]) > Number(arr1[i][8])){
            results.push(arr1[i]);
            i++;
        } else {
            results.push(arr2[j])
            j++;
        }
    }
    while(i < arr1.length) {
        results.push(arr1[i])
        i++;
    }
    while(j < arr2.length) {
        results.push(arr2[j])
        j++;
    }
    return results;
}


function mergeSort(arr){
    if(arr.length <= 1) return arr;
    let mid = Math.floor(arr.length/2);
    let left = mergeSort(arr.slice(0,mid));
    let right = mergeSort(arr.slice(mid));
    return merge(left, right);
}
const unsorted = tableData.shift()
  const sortResult =   mergeSort(tableData)
  const sorted =[unsorted,...sortResult]
    for(const d of sorted){
        d.splice(6,1)
        d.pop()
        d.pop()
        if(d[0]=== "Country"){
            d.splice(1,0,"Year")
            d[2]='Area'
            d[3] =' Population '
            d[4] ='GDP per capita'
            d[5] ='Population Density'
            d[6] ='Vehicle ownership'
            d[7] ='Total Road Deaths '
            d[8] ='Road deaths per Million Inhabitants'
        }else{
            d.splice(1,0,"2018")
            for(let i =0;i<d.length; i++){
                const ar = d[i].split(',')
             if(ar.length>1){
             const   j =parseFloat(d[i].replace(/,/g, ''))
             d[i] = j.toString()
             } 
               
            }
            
        }
        file.write(d.join(', ') + '\n');
    }
    
    file.end();

   
  
     
     
    
   
    res.status(200).send(`csv file created at ${api}/${csvFileName}`);
  
        } catch (error) {
          console.log(error)

            return errorResponse(res, "error occourred, contact support", 500)




        }




    }
   
}
module.exports = Data