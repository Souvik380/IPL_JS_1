const csv=require("csvtojson")
const fs=require('fs')

async function QUESTION_4(){
    const matches=await csv().fromFile("../data/matches.csv")
    const deliveries=await csv().fromFile("../data/deliveries.csv")

    let teams_2015=[]
    let obj={}
    let ans=[]

    for(let i=0;i<matches.length;i++){
        let year=matches[i].season
        if(year==2015){
            teams_2015.push(matches[i].id)
        }
    }     
    
    for(let i=0;i<deliveries.length;i++){
        let match_id=deliveries[i].match_id

        if(teams_2015.includes(match_id)){
            let bowler=deliveries[i].bowler
            
            if(obj[bowler]===undefined){
                obj[bowler]={}
                obj[bowler]['balls']=0-'0'
                obj[bowler]['runs']=0-'0'
                obj[bowler]['run_rate']=0-'0'
            }

            obj[bowler]['balls']+=parseInt(deliveries[i].ball)
            obj[bowler]['runs']+=parseInt(deliveries[i].total_runs)
            obj[bowler]['run_rate']=parseFloat(obj[bowler]['runs']/obj[bowler]['balls'])

        }
    }

    for(let e in obj){
        ans.push([e,obj[e]['run_rate']])
    }

    ans.sort(function(a, b) {
        return a[1] - b[1];
    });

    let temp={}
    for(let i=0;i<10;i++){
        temp[i+1]=ans[i][0]
    }

    let data=JSON.stringify(temp,null,2)
    fs.writeFileSync('../public/output/QUESTION_4.json',data)
}

QUESTION_4()

