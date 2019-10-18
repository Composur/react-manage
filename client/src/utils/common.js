import moment from 'moment'
moment.locale('zh-cn'); 
export const getCurrentDate=(date)=>{
 return moment(date).format('HH:mm:ss a')
}