const csv=require("csvtojson")
const fs=require('fs')

async function QUESTION_3(){
    const matches=await csv().fromFile("../data/matches.csv")
    const deliveries=await csv().fromFile("../data/deliveries.csv")

    let teams_2016=[]
    let teams=[]
    let obj={}

    for(let i=0;i<matches.length;i++){
        let year=matches[i].season
        let team1=matches[i].team1
        let team2=matches[i].team2

        if(year==2016){
            teams_2016.push(matches[i].id)
        }

        if(!teams.includes(team1)){
            teams.push(team1)
        }

        if(!teams.includes(team2)){
            teams.push(team2)
        }
    }

    for(let i=0;i<deliveries.length;i++){
        let match_id=deliveries[i].match_id

        if(teams_2016.includes(match_id)){
            let batting_team=deliveries[i].batting_team

            teams.forEach((team)=>{
                if(obj[team]===undefined){
                    obj[team]=0-'0'
                }

                if(batting_team===team){
                    obj[team]+=parseInt(deliveries[i].extra_runs)
                }
            })
        }
    }

    let data=JSON.stringify(obj,null,2)
    fs.writeFileSync('../public/output/QUESTION_3.json',data)
    // console.log(obj)
}

QUESTION_3()

