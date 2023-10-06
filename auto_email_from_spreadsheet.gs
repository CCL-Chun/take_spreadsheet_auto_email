function getNewReply() {
  let sheet_IN = SpreadsheetApp.getActiveSpreadsheet(); //connect to the spreadsheet now opening
  let table = sheet_IN.getSheetByName("spreadsheet name"); //your speadsheet name
  //get the latest reply
  let latest = table.getLastRow(); 
  let col_num = table.getLastColumn();
  let latest_info = table.getRange(latest,2,1,col_num).getValues();
  //extract info from reply
  let date_prepare = getDateTime(latest_info[0][1].toString());
  let date_deliver = getDateTime(latest_info[0][2].toString());
  let content = '\n\n樣品名稱: '+ latest_info[0][0] +'\n\n製備日期: '+ date_prepare +'\n\n送樣時間: '+
  date_deliver + '\n\n定序公司: '+ latest_info[0][3] + '\n\n送件人: '+ latest_info[0][4] + '\n\n送樣數量: '+ latest_info[0][16]+
  '\n\n樣本種類: '+ latest_info[0][6] +'\n細胞株: '+ latest_info[0][15] +'\n\n標註代號:\n'+ latest_info[0][5] +
  '\n\n樣本處理:\n'+ latest_info[0][7] +'\n\n實驗設計:\n'+ latest_info[0][8] +'\n\n定序總量: '+ latest_info[0][9] +
  '\n\n定序平台: '+ latest_info[0][14] +'\n\n備註: '+ latest_info[0][10] ;
  //prepare email text
  let title = "收到一份新的定序送樣資料，請確認";
  let end = "\n\n如有問題請聯絡系統管理員或寄信至 tvghsc2@gmail.com" + "\n\n確認單資訊:" + latest_info[0][12];
  let all_text = title + content + end;	
  let user_mail = latest_info[0][11];
  let dateTime = getDateTime('current');
  let sample = latest_info[0][0];
  let name = latest_info[0][4];
  let subject = "收到" + name + "的定序送樣資料" + '--' + sample + ' ['+dateTime+']';
  //send one mail to the user for double check
  GmailApp.sendEmail(user_mail,subject,all_text);
  //send mails to the manager and others need the record
  GmailApp.sendEmail('mail adress here',subject,all_text);
  GmailApp.sendEmail('mail adress here',subject,all_text);
  //console.log(latest_info);
}

//get the recieved time
function getDateTime(value) {
  let now;
  let date;
  let time;
  let dateTime;
  let date_arr;
  let date_form;
  if(value == 'current'){
    now = new Date();
    date = now.toLocaleDateString().split("/");
    time = now.toLocaleTimeString();
    dateTime = date[2] + '/' + date[0] + '/' + date[1] + ' ' + time;
    return dateTime;
  }else{
    date_arr = value.split(' ');
    date_form = new Date(date_arr[1]+' '+date_arr[2]+', '+date_arr[3]);
    date = date_form.toLocaleDateString().split("/");
    dateTime = date[2] + '/' + date[0] + '/' + date[1];
    return dateTime;
  }
  //console.log(now);
}
