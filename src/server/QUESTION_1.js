const csv=require("csvtojson")
const fs=require('fs')

async function QUESTION_1(){
    const matches=await csv().fromFile("../data/matches.csv")
    let obj={}

    for(let i=0;i<matches.length;i++){
        let year=matches[i].season

        if(obj[year]!==undefined){
            obj[year]+=1
        }else{
            obj[year]=1
        }
    }

    let data=JSON.stringify(obj,null,2)
    fs.writeFileSync('../public/output/QUESTION_1.json',data)
    // console.log(obj)
}

QUESTION_1()

