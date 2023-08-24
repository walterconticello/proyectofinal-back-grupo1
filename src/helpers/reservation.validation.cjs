import mongoose from "mongoose";
// import {format , parce} from 'date-fns'
// import {esA}
import { zonedTimeToUtc, format } from 'date-fns-tz';

const timeZone = 'America/Argentina/Buenos_Aires';
  const currentDate = new Date();
  const zonedDate = zonedTimeToUtc(currentDate, timeZone);

  const pattern = 'd.M.yyyy HH:mm:ss.SSS XXX (z)';

  const formattedDate = format(zonedDate, pattern, { timeZone });
  console.log(formattedDate);

function isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id);
  };

function ValidationDate(date){
  const dateString = date;
  const dateObject = new Date(dateString);
  console.log(dateObject);
}

  export default {isValidObjectId , ValidationDate};

  

 

    