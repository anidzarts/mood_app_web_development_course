import { executeQuery } from "../database/database.js";

const addMorningReport =async(user_id, day, month, year, sleep_duration, sleep_quality, morning_mood )=>{
    const res = await executeQuery("SELECT * FROM reports WHERE user_id =$1 AND day=$2 AND month=$3 AND year=$4", 
    user_id, day, month, year);
    if (res && res.rowCount>0) {
    const v = res.rowsOfObjects();
    for(var i=0; i< v.length; i++){
         await executeQuery("Update reports set sleep_duration =$2, sleep_quality =$3, morning_mood =$4 WHERE id = $1",
          v[i].id, sleep_duration, sleep_quality, morning_mood);
        }
    }
    else {
        await executeQuery("INSERT INTO reports (user_id, day, month, year, sleep_duration, sleep_quality, morning_mood) VALUES ($1, $2, $3, $4, $5, $6, $7)", 
        user_id, day, month, year, sleep_duration, sleep_quality, morning_mood);
    }

}




const addEveningReport =async(user_id, day, month, year, sport_duration, study_duration, eating_quality, evening_mood )=>{
    const res = await executeQuery("SELECT * FROM reports WHERE user_id =$1 AND day=$2 AND month=$3 AND year=$4",
     user_id, day, month, year);
    if (res && res.rowCount>0) {
    const v = res.rowsOfObjects();
    for(var i=0; i< v.length; i++){
         await executeQuery("Update reports set sport_duration =$2, study_duration=$3, eating_quality=$4, evening_mood =$5 WHERE id = $1", 
         v[i].id, sport_duration, study_duration, eating_quality, evening_mood);
    
        }
    }
    else {
        await executeQuery("INSERT INTO reports (user_id, day, month, year, sport_duration, study_duration, eating_quality, evening_mood) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", 
        user_id, day, month, year, sport_duration, study_duration, eating_quality, evening_mood);
    }
}


const StatisticForAllUsers = async()=>{
    //statistic for 7 days
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();

    var date_7 = new Date();
    date_7.setDate(date.getDate()-7);
    var day_2 = date.getDate();
    var month_2 = date.getMonth();
    var year_2 = date.getFullYear();

    const average_sleep_duration = await executeQuery("SELECT AVG(sleep_duration) FROM reports WHERE day <=$1 AND day>=$2  AND month <=$3 AND month>=$4 AND year<=$5 AND year>=$6 ", day, day_2, month, month_2, year, year_2);
    const average_sleep_quality = await executeQuery("SELECT AVG(sleep_quality) FROM reports WHERE day <=$1 AND day>=$2  AND month <=$3 AND month>=$4 AND year<=$5 AND year>=$6 ", day, day_2, month, month_2, year, year_2);
    const average_morning_mood = await executeQuery("SELECT AVG(morning_mood) FROM reports WHERE day <=$1 AND day>=$2  AND month <=$3 AND month>=$4 AND year<=$5 AND year>=$6 ", day, day_2, month, month_2, year, year_2);
    const average_evening_mood = await executeQuery("SELECT AVG(evening_mood) FROM reports WHERE day <=$1 AND day>=$2  AND month <=$3 AND month>=$4 AND year<=$5 AND year>=$6 ", day, day_2, month, month_2, year, year_2);
    const average_sport_duration = await executeQuery("SELECT AVG(sport_duration) FROM reports WHERE day <=$1 AND day>=$2  AND month <=$3 AND month>=$4 AND year<=$5 AND year>=$6 ", day, day_2, month, month_2, year, year_2);
    const average_study_duration= await executeQuery("SELECT AVG(study_duration) FROM reports WHERE day <=$1 AND day>=$2  AND month <=$3 AND month>=$4 AND year<=$5 AND year>=$6 ", day, day_2, month, month_2, year, year_2);
    const average_eating_quality = await executeQuery("SELECT AVG(eating_quality) FROM reports WHERE day <=$1 AND day>=$2  AND month <=$3 AND month>=$4 AND year<=$5 AND year>=$6 ", day, day_2, month, month_2, year, year_2);

    return {average_sleep_duration: average_sleep_duration.rowsOfObjects()[0].avg, 
        average_sleep_quality: average_sleep_quality.rowsOfObjects()[0].avg ,     
        average_morning_mood:average_morning_mood.rowsOfObjects()[0].avg,
        average_evening_mood:average_evening_mood.rowsOfObjects()[0].avg,
        average_sport_duration: average_sport_duration.rowsOfObjects()[0].avg,
        average_study_duration: average_study_duration.rowsOfObjects()[0].avg, 
        average_eating_quality: average_eating_quality.rowsOfObjects()[0].avg
    }
}

const StatisticForAllUsersWithDate = async(day, year, month)=>{

    const average_sleep_duration = await executeQuery("SELECT AVG(sleep_duration) FROM reports WHERE day=$1 AND  month =$2 AND year=$3 ", day, month, year);
    const average_sleep_quality = await executeQuery("SELECT AVG(sleep_quality) FROM reports WHERE day=$1 AND  month =$2 AND year=$3 ", day, month, year);
    const average_morning_mood = await executeQuery("SELECT AVG(morning_mood) FROM reports WHERE day=$1 AND  month =$2 AND year=$3 ", day, day_2, month, month_2, year, year_2);
    const average_evening_mood = await executeQuery("SELECT AVG(evening_mood) FROM reports WHERE day=$1 AND  month =$2 AND year=$3 ", day, day_2, month, month_2, year, year_2);
    const average_sport_duration = await executeQuery("SELECT AVG(sport_duration) FROM reports WHERE day=$1 AND  month =$2 AND year=$3 ", day, month, year);
    const average_study_duration= await executeQuery("SELECT AVG(study_duration) FROM reports WHERE day=$1 AND  month =$2 AND year=$3 ", day, month, year);
    const average_eating_quality = await executeQuery("SELECT AVG(eating_quality) FROM reports WHERE day=$1 AND  month =$2 AND year=$3 ", day, month, year);
  
    return {average_sleep_duration: average_sleep_duration.rowsOfObjects()[0].avg, 
        average_sleep_quality: average_sleep_quality.rowsOfObjects()[0].avg ,     
        average_morning_mood:average_morning_mood.rowsOfObjects()[0].avg,
        average_evening_mood:average_evening_mood.rowsOfObjects()[0].avg,
        average_sport_duration: average_sport_duration.rowsOfObjects()[0].avg,
        average_study_duration: average_study_duration.rowsOfObjects()[0].avg, 
        average_eating_quality: average_eating_quality.rowsOfObjects()[0].avg
    }

}

const StatisticsPerWeekPerUser = async(user_id, w, y)=>{
    var correct = new Date(y, 0,1);  
  
    while(correct.getDay()!=1){
        correct.setDate(correct.getDate()+1);
    }
    
         var d = ((w-2) * 7)+ correct.getDate(); // 1st monday 7 days for each week

        var date_7 = new Date(y, 0, d);
        var day_2 = date_7.getDate();
        var month_2 = date_7.getMonth()+1;
        var year_2 = date_7.getFullYear();
        
        var date = new Date(date_7.setDate(date_7.getDate()+6));
        date_7 =new Date(y, 0, d);
        var day = date.getDate();
        var month = date.getMonth()+1;
        var year = date.getFullYear();
        const average_sleep_duration = await executeQuery("SELECT CAST(AVG(sleep_duration) AS DECIMAL(10,0)) FROM reports WHERE day <=$1 AND day>=$2  AND month <=$3 AND month>=$4 AND year<=$5 AND year>=$6 AND user_id=$7", day, day_2, month, month_2, year, year_2, user_id);
        const average_sleep_quality = await executeQuery("SELECT CAST(AVG(sleep_quality) AS DECIMAL(10,0)) FROM reports WHERE day <=$1 AND day>=$2  AND month <=$3 AND month>=$4 AND year<=$5 AND year>=$6 AND user_id=$7", day, day_2, month, month_2, year, year_2, user_id);
        const sum_morning_mood = await executeQuery("SELECT SUM(morning_mood) FROM reports WHERE day <=$1 AND day>=$2  AND month <=$3 AND month>=$4 AND year<=$5 AND year>=$6 AND user_id=$7", day, day_2, month, month_2, year, year_2, user_id);
        const sum_evening_mood = await executeQuery("SELECT SUM(evening_mood) FROM reports WHERE day <=$1 AND day>=$2  AND month <=$3 AND month>=$4 AND year<=$5 AND year>=$6 AND user_id=$7", day, day_2, month, month_2, year, year_2, user_id);
        const count_morning_mood = await executeQuery("SELECT COUNT(morning_mood) FROM reports WHERE day <=$1 AND day>=$2  AND month <=$3 AND month>=$4 AND year<=$5 AND year>=$6 AND user_id=$7", day, day_2, month, month_2, year, year_2, user_id);
        const count_evening_mood = await executeQuery("SELECT COUNT(evening_mood) FROM reports WHERE day <=$1 AND day>=$2  AND month <=$3 AND month>=$4 AND year<=$5 AND year>=$6 AND user_id=$7", day, day_2, month, month_2, year, year_2, user_id);
        const generic_mood = Math.floor((sum_evening_mood.rowsOfObjects()[0].sum+sum_morning_mood.rowsOfObjects()[0].sum)/(count_morning_mood.rowsOfObjects()[0].count+count_evening_mood.rowsOfObjects()[0].count));
        const average_sport_duration = await executeQuery("SELECT CAST(AVG(sport_duration) AS DECIMAL(10,0)) FROM reports WHERE day <=$1 AND day>=$2  AND month <=$3 AND month>=$4 AND year<=$5 AND year>=$6 AND user_id=$7", day, day_2, month, month_2, year, year_2, user_id);
        const average_study_duration= await executeQuery("SELECT CAST(AVG(study_duration) AS DECIMAL(10,0)) FROM reports WHERE day <=$1 AND day>=$2  AND month <=$3 AND month>=$4 AND year<=$5 AND year>=$6 AND user_id=$7", day, day_2, month, month_2, year, year_2, user_id);
        const average_eating_quality = await executeQuery("SELECT CAST(AVG(eating_quality) AS DECIMAL(10,0)) FROM reports WHERE day <=$1 AND day>=$2  AND month <=$3 AND month>=$4 AND year<=$5 AND year>=$6 AND user_id=$7", day, day_2, month, month_2, year, year_2, user_id);


        return {average_sleep_duration: average_sleep_duration.rowsOfObjects()[0].avg, 
            average_sleep_quality: average_sleep_quality.rowsOfObjects()[0].avg ,     
            generic_mood:generic_mood,
            average_sport_duration: average_sport_duration.rowsOfObjects()[0].avg,
            average_study_duration: average_study_duration.rowsOfObjects()[0].avg, 
            average_eating_quality: average_eating_quality.rowsOfObjects()[0].avg
        }

}

const StatisticsPerWeekPerUserDefault = async(user_id)=>{
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();

    var date_7 = new Date();
    date_7.setDate(date.getDate()-7);
    var day_2 = date.getDate();
    var month_2 = date.getMonth();
    var year_2 = date.getFullYear();



    const average_sleep_duration = await executeQuery("SELECT CAST(AVG(sleep_duration) AS DECIMAL(10,0)) FROM reports WHERE day <=$1 AND day>=$2  AND month <=$3 AND month>=$4 AND year<=$5 AND year>=$6 AND user_id=$7", day, day_2, month, month_2, year, year_2, user_id);
    const average_sleep_quality = await executeQuery("SELECT CAST(AVG(sleep_quality) AS DECIMAL(10,0)) FROM reports WHERE day <=$1 AND day>=$2  AND month <=$3 AND month>=$4 AND year<=$5 AND year>=$6 AND user_id=$7", day, day_2, month, month_2, year, year_2, user_id);
    const sum_morning_mood = await executeQuery("SELECT SUM(morning_mood) FROM reports WHERE day <=$1 AND day>=$2  AND month <=$3 AND month>=$4 AND year<=$5 AND year>=$6 AND user_id=$7", day, day_2, month, month_2, year, year_2, user_id);
    const sum_evening_mood = await executeQuery("SELECT SUM(evening_mood) FROM reports WHERE day <=$1 AND day>=$2  AND month <=$3 AND month>=$4 AND year<=$5 AND year>=$6 AND user_id=$7", day, day_2, month, month_2, year, year_2, user_id);
    const count_morning_mood = await executeQuery("SELECT COUNT(morning_mood) FROM reports WHERE day <=$1 AND day>=$2  AND month <=$3 AND month>=$4 AND year<=$5 AND year>=$6 AND user_id=$7", day, day_2, month, month_2, year, year_2, user_id);
    const count_evening_mood = await executeQuery("SELECT COUNT(evening_mood) FROM reports WHERE day <=$1 AND day>=$2  AND month <=$3 AND month>=$4 AND year<=$5 AND year>=$6 AND user_id=$7", day, day_2, month, month_2, year, year_2, user_id);
    const generic_mood = Math.floor((sum_evening_mood.rowsOfObjects()[0].sum+sum_morning_mood.rowsOfObjects()[0].sum)/(count_morning_mood.rowsOfObjects()[0].count+count_evening_mood.rowsOfObjects()[0].count));
    const average_sport_duration = await executeQuery("SELECT CAST(AVG(sport_duration) AS DECIMAL(10,0)) FROM reports WHERE day <=$1 AND day>=$2  AND month <=$3 AND month>=$4 AND year<=$5 AND year>=$6 AND user_id=$7", day, day_2, month, month_2, year, year_2, user_id);
    const average_study_duration= await executeQuery("SELECT CAST(AVG(study_duration) AS DECIMAL(10,0)) FROM reports WHERE day <=$1 AND day>=$2  AND month <=$3 AND month>=$4 AND year<=$5 AND year>=$6 AND user_id=$7", day, day_2, month, month_2, year, year_2, user_id);
    const average_eating_quality = await executeQuery("SELECT CAST(AVG(eating_quality) AS DECIMAL(10,0)) FROM reports WHERE day <=$1 AND day>=$2  AND month <=$3 AND month>=$4 AND year<=$5 AND year>=$6 AND user_id=$7", day, day_2, month, month_2, year, year_2, user_id);
    




    return {average_sleep_duration: average_sleep_duration.rowsOfObjects()[0].avg, 
            average_sleep_quality: average_sleep_quality.rowsOfObjects()[0].avg ,     
            generic_mood:generic_mood,
            average_sport_duration: average_sport_duration.rowsOfObjects()[0].avg,
            average_study_duration: average_study_duration.rowsOfObjects()[0].avg, 
            average_eating_quality: average_eating_quality.rowsOfObjects()[0].avg
    }

}


const StatisticsPerMonthPerUserDefault = async(user_id)=>{
    var date = new Date();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    console.log(month, year)

    const average_sleep_duration = await executeQuery("SELECT CAST(AVG(sleep_duration) AS DECIMAL(10,0)) FROM reports WHERE month =$1 AND year=$2 AND user_id=$3", month, year, user_id);
    
    
    const average_sleep_quality = await executeQuery("SELECT CAST(AVG(sleep_quality) AS DECIMAL(10,0)) FROM reports WHERE month =$1 AND year=$2 AND user_id=$3", month, year, user_id);
    const sum_morning_mood = await executeQuery("SELECT SUM(morning_mood) FROM reports WHERE month =$1 AND year=$2 AND user_id=$3", month, year, user_id);
    const sum_evening_mood = await executeQuery("SELECT SUM(evening_mood) FROM reports WHERE month =$1 AND year=$2 AND user_id=$3", month, year, user_id);
    const count_morning_mood = await executeQuery("SELECT COUNT(morning_mood) FROM reports WHERE month =$1 AND year=$2 AND user_id=$3", month, year, user_id);
    const count_evening_mood = await executeQuery("SELECT COUNT(evening_mood) FROM reports WHERE month =$1 AND year=$2 AND user_id=$3", month, year, user_id);
    
    const generic_mood = Math.floor((sum_evening_mood.rowsOfObjects()[0].sum+sum_morning_mood.rowsOfObjects()[0].sum)/(count_morning_mood.rowsOfObjects()[0].count+count_evening_mood.rowsOfObjects()[0].count)) ;
    const average_sport_duration = await executeQuery("SELECT CAST(AVG(sport_duration) AS DECIMAL(10,0)) FROM reports WHERE month =$1 AND year=$2 AND user_id=$3", month, year, user_id);
    const average_study_duration= await executeQuery("SELECT CAST(AVG(study_duration) AS DECIMAL(10,0)) FROM reports WHERE month =$1 AND year=$2 AND user_id=$3", month, year, user_id);
    const average_eating_quality = await executeQuery("SELECT CAST(AVG(eating_quality) AS DECIMAL(10,0)) FROM reports WHERE month =$1 AND year=$2 AND user_id=$3", month, year, user_id);
    

    console.log(average_sleep_duration.rowsOfObjects()[0].avg, 
  average_sleep_quality.rowsOfObjects()[0].avg ,     
    generic_mood,
    average_sport_duration.rowsOfObjects()[0].avg,
     average_study_duration.rowsOfObjects()[0].avg, 
     average_eating_quality.rowsOfObjects()[0].avg)


    return {average_sleep_duration: average_sleep_duration.rowsOfObjects()[0].avg, 
            average_sleep_quality: average_sleep_quality.rowsOfObjects()[0].avg ,     
            generic_mood:generic_mood,
            average_sport_duration: average_sport_duration.rowsOfObjects()[0].avg,
            average_study_duration: average_study_duration.rowsOfObjects()[0].avg, 
            average_eating_quality: average_eating_quality.rowsOfObjects()[0].avg
    }
}

const StatisticsPerMonthPerUser = async(user_id, m, y)=>{
    var date_month = new Date(y, m, 1);

    var date = new Date(date_month.setMonth(date_month.getMonth()));
    var month = m;
    var year = y;

    const average_sleep_duration = await executeQuery("SELECT CAST(AVG(sleep_duration) AS DECIMAL(10,0)) FROM reports WHERE month =$1 AND year=$2 AND user_id=$3", month, year, user_id);
    
    
    const average_sleep_quality = await executeQuery("SELECT CAST(AVG(sleep_quality) AS DECIMAL(10,0)) FROM reports WHERE month =$1 AND year=$2 AND user_id=$3", month, year, user_id);
    const sum_morning_mood = await executeQuery("SELECT SUM(morning_mood) FROM reports WHERE month =$1 AND year=$2 AND user_id=$3", month, year, user_id);
    const sum_evening_mood = await executeQuery("SELECT SUM(evening_mood) FROM reports WHERE month =$1 AND year=$2 AND user_id=$3", month, year, user_id);
    const count_morning_mood = await executeQuery("SELECT COUNT(morning_mood) FROM reports WHERE month =$1 AND year=$2 AND user_id=$3", month, year, user_id);
    const count_evening_mood = await executeQuery("SELECT COUNT(evening_mood) FROM reports WHERE month =$1 AND year=$2 AND user_id=$3", month, year, user_id);
    
    const generic_mood = Math.floor((sum_evening_mood.rowsOfObjects()[0].sum+sum_morning_mood.rowsOfObjects()[0].sum)/(count_morning_mood.rowsOfObjects()[0].count+count_evening_mood.rowsOfObjects()[0].count)) ;
    const average_sport_duration = await executeQuery("SELECT CAST(AVG(sport_duration) AS DECIMAL(10,0)) FROM reports WHERE month =$1 AND year=$2 AND user_id=$3", month, year, user_id);
    const average_study_duration= await executeQuery("SELECT CAST(AVG(study_duration) AS DECIMAL(10,0)) FROM reports WHERE month =$1 AND year=$2 AND user_id=$3", month, year, user_id);
    const average_eating_quality = await executeQuery("SELECT CAST(AVG(eating_quality) AS DECIMAL(10,0)) FROM reports WHERE month =$1 AND year=$2 AND user_id=$3", month, year, user_id);
        
    return {average_sleep_duration: average_sleep_duration.rowsOfObjects()[0].avg, 
            average_sleep_quality: average_sleep_quality.rowsOfObjects()[0].avg ,     
            generic_mood:generic_mood,
            average_sport_duration: average_sport_duration.rowsOfObjects()[0].avg,
            average_study_duration: average_study_duration.rowsOfObjects()[0].avg, 
            average_eating_quality: average_eating_quality.rowsOfObjects()[0].avg
    }

}




export { addMorningReport, addEveningReport, StatisticForAllUsers, StatisticForAllUsersWithDate, StatisticsPerWeekPerUser, StatisticsPerWeekPerUserDefault, StatisticsPerMonthPerUser, StatisticsPerMonthPerUserDefault};