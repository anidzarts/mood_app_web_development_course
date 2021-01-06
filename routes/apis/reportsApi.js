
import { StatisticsPerWeekPerUserDefault, StatisticsPerMonthPerUserDefault } from "../../services/reportsServices.js";
const morning_mood = async({ render }) =>{

    render('morningReport.ejs', {today: new Date().toISOString().split("T")[0]});}

const evening_mood = async({ render }) =>{
    render("eveningReport.ejs",{today: new Date().toISOString().split("T")[0]});
}

const statistic = async({ render, session }) =>{
    const user_id = await session.get("user");
    const data ={};
    console.log("week IS HERE")
        data.week = await StatisticsPerWeekPerUserDefault(user_id.id);

        data.month = await StatisticsPerMonthPerUserDefault(user_id.id);
        console.log(data.month)
    render("statistics.ejs"), {data: data};
}


export { morning_mood, evening_mood, statistic }