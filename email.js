var nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "prerna.2124mca1028@kiet.edu",
      pass: "Prerna@9027",
    }
  });

var mailOptions = {
  from: "prerna.2124mca1028@kiet.edu",
  to: 'rashi.2124mca1032@kiet.edu',
  subject: 'code info',
   text: "congratulation u are  selected for the akonto",
  attachments:[
    {
      filename:"aaa.jpg",
     // path:`${__dirname}`+'/aaa.jpg'
        path : './aaa.jpg'
    }
  ]
};

transporter.sendMail(mailOptions, (error)=>{
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent");
   // console.log(__dirname);
  }
});