
const fateArry = require('./fate.js');
const express = require("express");
const nodemailer = require("nodemailer");
   
const app = express();
app.use(express.static('content'))
// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = express.urlencoded({extended: false});
  
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/content/index.html')
});
app.post("/", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);

   let fater = request.body.userEmail




    
    const val = request.body.userData;
    const myArry = (val.split(''));
    if(Number(myArry[0] + myArry[1]) == 20 || Number(myArry[0] + myArry[1]) == 19){
    const y1 = Number(myArry[0]);
    const y2 = Number(myArry[1]);
    const y3 = Number(myArry[2]);
    const y4 = Number(myArry[3]);
    const m1 = Number(myArry[5]);
    const m2 = Number(myArry[6]);
    const d1 = Number(myArry[8]);
    const d2 = Number(myArry[9]);
    let fate = [1];
  
    // 1 число
    fate[0] = d1+d2+m1+m2+y1+y2+y3+y4;
  
  // 2 num
   fate[0] = String(fate[0]);
   fateg = (fate[0].split(''));
  let fate1 = Number(fateg[0]);
  let fate2 = Number(fateg[1]);
  if(fate[0] > 9){
  fate.push(fate1+fate2);
  if(fate[0] == 10){
    fate[1] = 1;
  }
  }
  else{
  fate.push(fate[0]);
  }
  
  //3 num fate[2]
  
  
  if(d1 != 0){
    if(fate[0] > (2*d1) || fate[0] == (2*d1) ){
      fate.push(fate[0] - (2*d1));
    }
    else{
    fate.push((2*d1) - fate[0]);
    }
  }
  else
  {
  if(fate[0] > (2*d2) || fate[0] == (2*d2) ){
    fate.push(fate[0] - (2*d2));
  }
  else{
  fate.push((2*d2) - fate[0])
  }
  }
  // 4 num fate[3]
  if(fate[2] > 9){
  
      fate[2] = String(fate[2]);
      fateg = (fate[2].split(''));
      fate1 = Number(fateg[0]);
      fate2 = Number(fateg[1]);
      fate.push(fate1+fate2);
      if( Number(fateg[0]) == 10){
       fate[3] = 1;
      }
      }
  
  else{
    fate.push(fate[2]);
  }
  
  // sudba fate[4]
  if(fate[0] < 11){
    fate.push(fate[0]);
    if(fate[0] == 10){
      fate[4] = 1;
    }
  }
  else{
    if(fate[1] < 12){
    fate.push(fate[1]);
    if(fate[1] == 10){
      fate[4] = 1;
    }
  }
  else{
     if(fate[1] == 12){
      fate.push(3);
    }
  }
  }
  //  Character
  far = String(fate[0]) + String(fate[1]) + String(fate[2]) + String(fate[3]) + String(y1) + String(y2) + String(y3) + String(y4) + String(m1) + String(m2) + String(d1) + String(d2);
  
  let fat = (far.split(''));
  
  
  
//  Character
function  numbInfo(numbrSum){ let sum = fat.filter(function(number) {
  return number == numbrSum;
});

let character = sum.map(i=>x+=i, x=0).reverse()[0]
if(typeof character === 'undefined'){
  character = 0
}
return character;
}
let character = numbInfo(1);
//  health
let health = numbInfo(4);
// luck
let luck = numbInfo(7);
// energy
let energy = numbInfo(2);
// logics
let logics = numbInfo(5);
// duty
let duty = numbInfo(8);
// interest
let interest = numbInfo(3);
// work
let work = numbInfo(6);
// memory
let memory = numbInfo(9);

  // content
  // life 
  let life = String(parseInt(work)) + String(parseInt(logics)) + String(parseInt(health));
  faterr = life.split('');
  faterr = faterr.filter(function(elem) {
    return (Number(elem) !== 0); // если true, то возвращаем элемент, иначе - он будет удален из массива
  });
  life = faterr.length;
  
  // temperament
  
  let temperament = String(parseInt(interest)) + String(parseInt(logics)) + String(parseInt(luck));
  faterr = temperament.split('');
  faterr = faterr.filter(function(elem) {
    return (Number(elem) !== 0); 
  });
  temperament = faterr.length;
  
  
  // purposefulness
  
  let purposefulness = String(parseInt(luck)) + String(parseInt(health)) + String(parseInt(character));
  faterr = purposefulness.split('');
  faterr = faterr.filter(function(elem) {
    return (Number(elem) !== 0); 
  });
  purposefulness = faterr.length;
  
  // family
  let family = String(parseInt(duty)) + String(parseInt(logics)) + String(parseInt(energy));
  faterr = family.split('');
  faterr = faterr.filter(function(elem) {
    return (Number(elem) !== 0); 
  });
  family = faterr.length;
  
  
  // stability
  let stability = String(parseInt(memory)) + String(parseInt(work)) + String(parseInt(interest));
  faterr = stability.split('');
  faterr = faterr.filter(function(elem) {
    return (Number(elem) !== 0); 
  });
  stability = faterr.length;

     async function main(textMail){
     
     
       let transporter = nodemailer.createTransport({
         host: "smtp.mail.ru",
         port: 465,
         secure: true, 
         auth: {
           user: "erddni@mail.ru", 
           pass: "DtJhPTqCpwRxRRTw8S16" 
         }
       });
       
     
       // send mail with defined transport object
       let info = await transporter.sendMail({
         from: '"erddni@mail.ru', // sender address
         to: fater, // list of receivers
         subject: "Здравствуйте   " + request.body.userName  , // Subject line
         text: textMail, // plain text body
         html: "<b>Здравствуйте </b> <big>" + request.body.userName + fateArry[fate[4] - 1]   + "<big>",// html body
       });
     
       console.log("Message sent: %s", info.messageId);
     
     }
     
     main(fateArry[fate[4] - 1]).catch(console.error);
  
     response.sendFile(__dirname + '/content/index.html')
}
});
   

app.listen(3009, ()=>console.log("Сервер запущен...")); 