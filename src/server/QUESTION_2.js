const csv=require("csvtojson")
const fs=require('fs')

async function QUESTION_2(){
    const matches=await csv().fromFile("../data/matches.csv")
    let teams=[]
    let years=[]
    let obj={}

    for(let i=0;i<matches.length;i++){
        let team1=matches[i].team1
        let team2=matches[i].team2
        
        if(!teams.includes(team1)){
            teams.push(team1)
        }

        if(!teams.includes(team2)){
            teams.push(team2)
        }
    }

    for(let i=0;i<matches.length;i++){
        let year=matches[i].season
        let winner=matches[i].winner

        if(obj[year]===undefined){
            obj[year]={}
        }

        for(let i=0;i<teams.length;i++){

            if(obj[year][teams[i]]===undefined){
                obj[year][teams[i]]={}
                obj[year][teams[i]]=0
            }

            if(winner===teams[i]){
                obj[year][teams[i]]+=1
            }
        }
    }

    let data=JSON.stringify(obj,null,2)
    fs.writeFileSync('../public/output/QUESTION_2.json',data)
    // console.log(obj)
}

QUESTION_2()

