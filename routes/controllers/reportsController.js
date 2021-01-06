import * as usersService from "../../services/usersService.js";

import { addMorningReport, addEveningReport, StatisticForAllUsers, StatisticForAllUsersWithDate, StatisticsPerWeekPerUser, StatisticsPerWeekPerUserDefault, StatisticsPerMonthPerUser, StatisticsPerMonthPerUserDefault} from "../../services/reportsServices.js";

const showReporting = async({render, session, response}) => {
    const authenticated = await session.get("authenticated");
    const user = await session.get("user");
    if (!authenticated){
        session.set("feedback",["Kindly log in first"] )
        response.redirect("/auth/login");
    }
    else{
        render('reporting.ejs', {email: ""});

    }
 
};


const morningReport = async({render, request, session}) => {
    const body = request.body();
    const params = await body.value;
    const date = params.get("date");
    const sleep_duration = params.get("sleep_duration");
    const morning_mood = params.get("morning_mood");
    const sleep_quality = params.get("sleep_quality");
    const user_id = await session.get("user");
    console.log(date)
addMorningReport(user_id.id, date.split("-")[2], date.split("-")[1], date.split("-")[0], sleep_duration, sleep_quality, morning_mood );

    render('morningReport.ejs', {today: new Date().toISOString().split("T")[0]});
};

const eveningReport = async({render, request, session}) => {
    const body = request.body();
    const params = await body.value;
    const date = params.get("date");
    const sport = params.get("sport")
    const study = params.get("study");
    const eating = params.get("eating");
    const evening_mood = params.get("evening_mood");
    const user_id = await session.get("user");
    console.log(date);
    console.log(date.split("-"));

addEveningReport(user_id.id, date.split("-")[2], date.split("-")[1], date.split("-")[0], sport, study, eating, evening_mood );

    render('eveningReport.ejs',{today: new Date().toISOString().split("T")[0]});
};



const Statistics = async({render, request, session}) => {
    const body = request.body();
    const params = await body.value;
    const week = params.get("week");
    const month = params.get("month");
    const user_id = await session.get("user");
    const data ={};
    if( week == undefined){
        // call default
        
        data.week =await StatisticsPerWeekPerUserDefault(user_id.id);
        
    }else{
        const year = week.substring(0,4);
        const week_number = week.substring(6, week.length);
        data.week =await StatisticsPerWeekPerUser(user_id.id, week_number, year);
    }
    if (month ==undefined){
        data.month = await StatisticsPerMonthPerUserDefault(user_id.id);

    }else{
        const year_month = month.substring(0,4); 
        const month_number = month.substring(5, month.length);
        data.month = await StatisticsPerMonthPerUser(user_id.id, month_number, year_month);

    }
  


    render('statistics.ejs',  {data: data});
};

export { showReporting, morningReport, eveningReport, Statistics};
