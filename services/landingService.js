import { executeQuery } from "../database/database.js";

const getMoodChange= async()=>{
    const today = new Date();
    var day = today.getDate();
    var month = today.getMonth()+1;
    var year = today.getFullYear();


    const sum_morning_mood = await executeQuery("SELECT SUM(morning_mood) FROM reports WHERE day =$1  AND month =$2  AND year=$3 ", day, month, year );
    const sum_evening_mood = await executeQuery("SELECT SUM(evening_mood) FROM reports WHERE day =$1  AND month =$2  AND year=$3 ", day, month, year );
    const count_morning_mood = await executeQuery("SELECT COUNT(morning_mood) FROM reports WHERE day =$1  AND month =$2  AND year=$3 ", day, month, year );
    const count_evening_mood = await executeQuery("SELECT COUNT(evening_mood) FROM reports WHERE day =$1  AND month =$2  AND year=$3 ", day, month, year );
    const average_generic_mood_today = Math.floor((sum_evening_mood.rowsOfObjects()[0].sum+sum_morning_mood.rowsOfObjects()[0].sum)/(count_morning_mood.rowsOfObjects()[0].count+count_evening_mood.rowsOfObjects()[0].count));
        


    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1);
    day = yesterday.getDate();
    month = yesterday.getMonth()+1;
    year = yesterday.getFullYear();

    const sum_morning_mood_y = await executeQuery("SELECT SUM(morning_mood) FROM reports WHERE day =$1  AND month =$2  AND year=$3 ", day, month, year );
    const sum_evening_mood_y = await executeQuery("SELECT SUM(evening_mood) FROM reports WHERE day =$1  AND month =$2  AND year=$3 ", day, month, year );
    const count_morning_mood_y = await executeQuery("SELECT COUNT(morning_mood) FROM reports WHERE day =$1  AND month =$2  AND year=$3 ", day, month, year );
    const count_evening_mood_y = await executeQuery("SELECT COUNT(evening_mood) FROM reports WHERE day =$1  AND month =$2  AND year=$3 ", day, month, year );
    const average_generic_mood_yesterday = Math.floor((sum_evening_mood_y.rowsOfObjects()[0].sum+sum_morning_mood_y.rowsOfObjects()[0].sum)/(count_morning_mood_y.rowsOfObjects()[0].count+count_evening_mood_y.rowsOfObjects()[0].count));
        

    //const average_generic_mood_yesterday = await executeQuery("SELECT AVG(generic_mood) FROM reports WHERE day=$1 AND  month =$2 AND year=$3 ", day2, month2, year2);

    const data ={average_generic_mood_today: average_generic_mood_today,average_generic_mood_yesterday:average_generic_mood_yesterday, text:""  };
   if(data.average_generic_mood_today==0 ||data.average_generic_mood_yesterday==0  ){
        data.text = "Missing trends..";
   } else
    if ( data.average_generic_mood_today < data.average_generic_mood_yesterday){
        data.text = "Things are looking gloomy today";
    }
    else{
        data.text = "Things are looking brighter today";

    }
    return data;
}

export {getMoodChange};