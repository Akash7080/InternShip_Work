
const db = require("../db")


//showing the database

module.exports.Show = async (req, res) => {

  const { id } = req.body

  sql = "SELECT * FROM tbl_code WHERE id = ?"
  result = await db(sql, [id])

  if (!result) {
    return res.json(200, {
      message: 'data not found'
    })
  } else {
    return res.json(201, {
      message: 'data found',
      data: result
    })
  }
}

//inserting the data in to the  database


module.exports.create = async (req, res) => {
  const { acode, pgate, title, } = req.body

  let details = {
    akontocode: acode,
    payment_gate: pgate,
    title: title,
  }
  sql = "INSERT INTO tbl_code SET ?"
  result = await db(sql, [details])
  if (!result) {
    return res.json(200, {
      message: 'data not found'
    })
  } else {
    return res.json(201, {
      message: 'data found',
      data: result
    })
  }



}

//updating the database into the table


module.exports.update = async (req, res) => {

  const { id, akontocode } = req.body

  const details = {
    akontocode: akontocode
  }
  sql = "UPDATE tbl_code SET ?  WHERE id =?"
  result = await db(sql, [details, id])
  return res.json(201, {
    message: 'data inserted',
    data: result
  })


}

//deleting the database from the table

module.exports.delete = async (req, res) => {
  const { id } = req.body

  sql = "delete from tbl_code where id = ?"
  result = await db(sql, [id])
  if (!result) {
    return res.json(200, {
      message: 'data not Deleted'
    })
  } else {
    return res.json(201, {
      message: 'data Deleted',
      data: result
    })
  }
  // result = await db(sql, [id])
  // return res.send()
}


//update the data of the table through the id

module.exports.updates = async (req, res) => {
  const { id, created_on, updated_on } = req.body
  const details = {
    id,
    created_on,
    updated_on
  };

  sql = "UPDATE tbl_code SET ?  WHERE id =?"

  result = await db(sql, [details, id])

  return res.send(details)
}

//showing the data from between the dates


module.exports.showbetween = async (req, res) => {
  let { from } = req.body
  let sql = "SELECT created_on FROM tbl_set_limit where created_on = ?"

  let result = await db(sql, [from])
  return res.status(200).json({
    status: true,
    message: "Your Data",
    data: result
  })

}

//applying the innerjoin


module.exports.innerjoin = async (req, res) => {
  let { title } = req.body
  //let sql = "SELECT user_id  from tbl_module_action INNER JOIN tbl_notification on tbl_module_action.user_id=tbl_notification.user_id"
  let sql = " SELECT tbl_module_action.module , tbl_notification.title FROM tbl_module_action INNER JOIN tbl_notification ON tbl_module_action.id = tbl_notification.user_id";
  result = await db(sql, [title])
  return res.send(result)
}


module.exports.showdate = async (req, res) => {
  let { from, to, status } = req.body
  let sql = "select * from tbl_merchant_transaction where created_on between ? AND ? AND status = ?"
  // let sql = "SELECT * from tbl_settlement where DATE(created_on) >= ? AND DATE(created_on)<= ? AND status = ?"

  let result = await db(sql, [from, to, status])
  return res.status(200).json({
    status: true,
    message: "Your Data",
    data: result
  })

}








//setttling the data


module.exports.create_settlement = async (req, res) => {
  try {
    const { settlementId, merchant_name, settlementType, fromCurrency, toCurrency, walletAddress, wallet_type, city,
      zip_code, country, accountNumber, bankName, branchName, swiftCode,
      requestedAmount, charges, ExchangeRate,
      account_name,
      net_amount_for_settlement,
      authorizer,
    } = req.body;
    date_time = function () {
      var date = new Date();
      return date;
    }
    const details = {
      settlementId,
      merchant_name,
      settlementType,
      fromCurrency,
      toCurrency,
      walletAddress,
      wallet_type,
      city,
      zip_code,
      country,
      accountNumber,
      bankName,
      branchName,
      swiftCode,
      requested_time: date_time(),


      requestedAmount,
      charges,
      net_amount_for_settlement,//: requestedAmount - charges,
      ExchangeRate,
      // settlementAmount,//: (requestedAmount - charges) / ExchangeRate,
      // available_balance,
      account_name,
      authorizer,
      net_amount_for_settlement,//: requestedAmount - charges,
      settlement_time: date_time(),
      //   updated_on,//: date_time(),

      settlement_mode: 1,
      ExchangeRate

    };



    var sql = "INSERT INTO  tbl_settlement SET ? ";
    var result = await db(sql, [details]);

    return res.send({
      message: result
    })

  }
  catch (err) {
    console.log(err);
  }

  // return res.send("Invalid ID");

}
//  module.ports.change_status=async(req,res)=>{

//     // var status=2;
//     // var gp_id=1;
//     // var source;
//     // var approved;
//     // var failed;
//     //  if (gp_id==1){
//     //     if(approved){
//     //         sql= "update tbl_settlement set staus=1c"
//     //     }
//     //     source="by super admine"
//     //  }
//     //  else{
//     //     source="by admine"
//     //  }
//     //  var status=2;

//   // execute the update query
//   const gpId = 1;
//   if (gp_id == 1) {
//     source="by  superadmine"
// } 
//  else {
//         source= "by admine"
//     }
// }

// //   const gpId = 1;
//   const status = 'approved'; // or 'failed'

//   const query = `UPDATE table_name SET status = ${status === 'approved' ? 3 : 0} WHERE gp_id = ${gpId}`;
//   connection.query(query, (err, result) => {
//     if (err) {
//       console.error('Error updating status: ' + err.stack);
//       return;
//     }
//     console.log('Status updated successfully. Result:', result);
//   });

//   // close the database connection
//   connection.end((err) => {
//     if (err) {
//       console.error('Error closing database connection: ' + err.stack);
//       return;
//     }
//     console.log('Database connection closed.');
//   });


module.exports.settlement = async (req, res) => {

  const { fromCurrency,
    requestedAmount, charges, name, user_id
  } = req.body;

  const data = {
    fromCurrency,
    name, requestedAmount, charges, user_id

  }
  var query1 = "SELECT tbl_user.name, fromCurrency as Currency, requestedAmount as Amount, charges, user_id FROM tbl_settlement INNER JOIN tbl_user ON tbl_settlement.user_id = tbl_user.id ORDER BY charges DESC";


  //var query= "select fromCurrency,requestedAmount, charges from tbl_settlement INNER JOIN tbl_user ON tbl_settlement.user_id =tbl_user.id";
  let result = await db(query, [data])
  return res.send(result)


}


// here we have  fetch the data from the date to this date to this date 

module.exports.settlementtodate = async (req, res) => {

  const { created_on } = "2023-03-12";


  var query1 = "SELECT name,  fromCurrency as currency, requestedAmount AS Amount, charges, user_id FROM tbl_settlement INNER JOIN tbl_user ON tbl_settlement.user_id = tbl_user.id WHERE tbl_settlement.created_on <= '2023-02-10' ";


  let result = await db(query1, [created_on])
  return res.send(result)

}





// here we have  fetch the data MERCHANT form the date in between ? and ?

module.exports.settlementtodate = async (req, res) => {

  const { created_on } = "2023-03-12";


  var query1 = "SELECT name,  fromCurrency as currency, requestedAmount AS Amount, charges, user_id FROM tbl_settlement INNER JOIN tbl_user ON tbl_settlement.user_id = tbl_user.id WHERE tbl_settlement.created_on <= '2023-02-10' ";


  let result = await db(query1, [created_on])
  return res.send(result)

}


// 2nd task is given but i dont have time to define it because it will take more tym yha par data hmara as a amount and charges ki tarah print hua hai

module.exports.merchant = async (req, res) => {

  const { status } = 1


  var query2 = "SELECT tbl_user.name AS Merchant, SUM(tbl_settlement.charges) as Charges   FROM tbl_settlement     INNER JOIN tbl_user ON tbl_settlement.user_id = tbl_user.id    WHERE tbl_settlement.status = 1  GROUP BY tbl_user.name";



  var query3 = "SELECT tbl_user.name AS merchant,SUM(tbl_merchant_transaction.payin_charges)AS Charges FROM tbl_merchant_transaction INNER JOIN  tbl_user ON tbl_merchant_transaction.user_id = tbl_user.id WHERE tbl_merchant_transaction.status=1 GROUP BY tbl_user.name ";

  var query4 = "select tbl_user.name AS merchant ,SUM(tbl_icici_payout_transaction_response_details.akonto_charge) AS AKONTO_CHARGES FROM tbl_icici_payout_transaction_response_details INNER JOIN tbl_user ON tbl_icici_payout_transaction_response_details.users_id = tbl_user.id  GROUP BY tbl_user.name";


  let result = await db(query2)
  let result1 = await db(query3)
  let result2 = await db(query4)

  return res.send({
    result,
    result2,
    result1
  }
  )
}



//Here we will fetch the data as a given the value in to the body like today,yesterday,weekley,monthley in to the body then it will appear on the thunder-client

module.exports.merchant_today = async (req, res) => {
  const { timePeriod } = req.body;

  let Akash;
  if (timePeriod === 'yearly') {
    Akash = `
        SELECT
          tbl_user.name AS merchant,
          YEAR(tbl_settlement.created_on) AS year,
          SUM(tbl_settlement.charges) AS charges
        FROM
          tbl_settlement
          INNER JOIN tbl_user ON tbl_settlement.user_id = tbl_user.id
        WHERE
          tbl_settlement.status = 1
        GROUP BY
          tbl_user.name, YEAR(tbl_settlement.created_on)`;
  } else if (timePeriod === 'monthly') {
    Akash = `
        SELECT
          tbl_user.name AS merchant,
          YEAR(tbl_settlement.created_on) AS year,
          MONTH(tbl_settlement.created_on) AS month,
          SUM(tbl_settlement.charges) AS charges
        FROM
          tbl_settlement
          INNER JOIN tbl_user ON tbl_settlement.user_id = tbl_user.id
        WHERE
          tbl_settlement.status = 1
        GROUP BY
          tbl_user.name, YEAR(tbl_settlement.created_on), MONTH(tbl_settlement.created_on)
      `;
  } else if (timePeriod === 'weekly') {
    Akash = `
        SELECT
          tbl_user.settle_currency AS Currency,
         
          SUM(tbl_settlement.charges) AS AMOUNT
        FROM
          tbl_settlement
          INNER JOIN tbl_user ON tbl_settlement.user_id = tbl_user.id
        WHERE
          tbl_settlement.status = 1
        GROUP BY
          tbl_user.settle_currency `;
  }

  else if (timePeriod = 'yearly') {
    Akash = "SELECT tbl_user.name AS merchant,YEAR(tbl_merchant_transaction.created_on) AS year, MONTH(tbl_settlement.created_on) AS month,SUM(tbl_settlement.charges) AS charges FROM tbl_settlement        INNER JOIN tbl_user ON tbl_settlement.user_id = tbl_user.id WHERE tbl_settlement.status = 1 GROUP BYtbl_user.name, YEAR(tbl_settlement.created_on), MONTH(tbl_merchant_transaction.created_on)";

  }
  else {
    return res.status(400).send({ message: 'Invalid time period' });
  }

  const [result, fields] = await db(Akash);

  return res.send({ result });
};


// YEAR(tbl_settlement.created_on) AS year,
// WEEK(tbl_settlement.created_on) AS week,

//here we will fetch the data 

// module.exports.payout= async (req, res) => 
// {

//     var payout = `SELECT  SUM(amount) as PAYOUT
//     FROM tbl_icici_payout_transaction_response_details where currency='INR'
//     GROUP BY currency
//     `;
//     var deposite=`SELECT SUM(ammount) AS DEPOSIT 
//     FROM tbl_merchant_transaction 
//     WHERE ammount_type='INR' AND status=1 
//     GROUP BY ammount_type
//     `;
//   var settle=`select SUM(requestedAmount)AS settlement FROM tbl_settlement where fromCurrency='INR' GROUP BY fromCurrency; `


//   let result = await db(payout)
//     let result1= await db(deposite)
//     let result2= await db(settle)
//     return res.send({
//         result,
//         result1,
//         result2})
// }

//now here we will take the data as a payout deposite charge ammount refund settleq and print the avaliable balance of the currency


module.exports.payout = async (req, res) => {
  var payout = `SELECT SUM(amount) AS payout
                  FROM tbl_icici_payout_transaction_response_details
                  WHERE currency='INR'
                  GROUP BY currency`;

  var deposit = `SELECT SUM(ammount) AS deposit 
                   FROM tbl_merchant_transaction 
                   WHERE ammount_type='INR' AND status=1 
                   GROUP BY ammount_type`;

  var settle = `SELECT SUM(requestedAmount) AS settlement 
                  FROM tbl_settlement 
                  WHERE fromCurrency='INR' 
                  GROUP BY fromCurrency`;

  let result = await db(payout);
  let result1 = await db(deposit);
  let result2 = await db(settle);


  let payoutAmount = result[0].payout || 0;
  let depositAmount = result1[0].deposit || 0;
  let settlementAmount = result2[0].settlement || 0;


  let availableBalance = payoutAmount + settlementAmount - depositAmount;

  return res.send({
    payout: payoutAmount,
    deposit: depositAmount,
    settlement: settlementAmount,
    availableBalance: availableBalance
  });
}

// here is the next task given by hemant sir 


// module.exports.currency = async (req, res) => {

//     var query = "SELECT ammount_type,SUM(payin_charges) AS Total_charges FROM tbl_merchant_transaction GROUP BY ammount_type";
//     var query1 = "SELECT currency,SUM(akonto_charge) AS Total_charges FROM tbl_icici_payout_transaction_response_details GROUP BY currency";
//     var query2="SELECT fromCurrency,SUM(charges) AS total_charges FROM tbl_settlement GROUP BY fromCurrency";




//     let result = await db(query)
//     let result1 = await db(query1)
//     let result2 = await db(query2)

//     return res.send({
//                 result,
//                  result1,
//                  result2})
//        
// }



// }

//commision

// whatever we change it will replicate on the same databse of the another table in to the tbl_notification


module.exports.currency_commision = async (req, res) => {
  const timePeriod = req.body.timePeriod;


  let query1;

  switch (timePeriod) {
    case 'yearly':

      query1 = `SELECT currency, SUM(total_charges) AS total_charges FROM (SELECT ammount_type AS currency, 
              SUM(payin_charges) AS total_charges 
            FROM 
              tbl_merchant_transaction 
            WHERE 
              YEAR(created_on) < YEAR(CURRENT_DATE()) 
            GROUP BY 
              ammount_type
          
            UNION ALL
          
            SELECT 
              currency, 
              SUM(akonto_charge) AS total_charges 
            FROM 
              tbl_icici_payout_transaction_response_details 
            WHERE 
              YEAR(created_on) < YEAR(CURRENT_DATE()) 
            GROUP BY 
              currency
          
            UNION ALL
          
            SELECT 
              fromCurrency AS currency, 
              SUM(charges) AS total_charges 
            FROM 
              tbl_settlement 
            WHERE 
              YEAR(created_on) < YEAR(CURRENT_DATE()) 
            GROUP BY 
              fromCurrency
          ) AS subquery
          GROUP BY 
            currency`;

      break;


    case 'monthly':

      query1 =

        `SELECT currency, 
            SUM(total_charges) AS total_charges 
          FROM (
            SELECT 
              ammount_type AS currency, 
              SUM(payin_charges) AS total_charges 
            FROM 
              tbl_merchant_transaction 
            WHERE 
              YEAR(created_on) = YEAR(CURRENT_DATE()) 
              AND MONTH(created_on) = MONTH(CURRENT_DATE()) 
            GROUP BY 
              ammount_type
          
            UNION ALL
          
            SELECT 
              currency, 
              SUM(akonto_charge) AS total_charges 
            FROM 
              tbl_icici_payout_transaction_response_details 
            WHERE 
              YEAR(created_on) = YEAR(CURRENT_DATE()) 
              AND MONTH(created_on) = MONTH(CURRENT_DATE()) 
            GROUP BY 
              currency
          
            UNION ALL
          
            SELECT 
              fromCurrency AS currency, 
              SUM(charges) AS total_charges 
            FROM 
              tbl_settlement 
            WHERE 
              YEAR(created_on) = YEAR(CURRENT_DATE()) 
              AND MONTH(created_on) = MONTH(CURRENT_DATE()) 
            GROUP BY 
              fromCurrency
          ) AS subquery
          GROUP BY 
            currency`;


      break;

    case 'weekly':

      query1 =
        `SELECT 
            currency, 
            SUM(total_charges) AS total_charges 
          FROM (
            SELECT 
              ammount_type AS currency, 
              SUM(payin_charges) AS total_charges 
            FROM 
              tbl_merchant_transaction 
            WHERE 
              created_on BETWEEN DATE_SUB(NOW(), INTERVAL 7 DAY) AND NOW()
            GROUP BY 
              ammount_type
          
            UNION ALL
          
            SELECT 
              currency, 
              SUM(akonto_charge) AS total_charges 
            FROM 
              tbl_icici_payout_transaction_response_details 
            WHERE 
              created_on BETWEEN DATE_SUB(NOW(), INTERVAL 7 DAY) AND NOW() 
            GROUP BY 
              currency
          
            UNION ALL
          
            SELECT 
              fromCurrency AS currency, 
              SUM(charges) AS total_charges 
            FROM 
              tbl_settlement 
            WHERE 
              created_on BETWEEN DATE_SUB(NOW(), INTERVAL 7 DAY) AND NOW() 
            GROUP BY 
              fromCurrency
          ) AS subquery
          GROUP BY 
            currency`;

      break;

    case 'yesterday':
      query1 = `SELECT 
                currency, 
                SUM(total_charges) AS total_charges 
              FROM (
                SELECT 
                  ammount_type AS currency, 
                  SUM(payin_charges) AS total_charges 
                FROM 
                  tbl_merchant_transaction 
                WHERE 
                  created_on BETWEEN DATE_SUB(NOW(), INTERVAL -1 DAY) AND NOW()
                GROUP BY 
                  ammount_type
              
                UNION ALL
              
                SELECT 
                  currency, 
                  SUM(akonto_charge) AS total_charges 
                FROM 
                  tbl_icici_payout_transaction_response_details 
                WHERE 
                  created_on BETWEEN DATE_SUB(NOW(), INTERVAL -1 DAY) AND NOW() 
                GROUP BY 
                  currency
              
                UNION ALL
              
                SELECT 
                  fromCurrency AS currency, 
                  SUM(charges) AS total_charges 
                FROM 
                  tbl_settlement 
                WHERE 
                  created_on BETWEEN DATE_SUB(NOW(), INTERVAL -1 DAY) AND NOW() 
                GROUP BY 
                  fromCurrency
              ) AS subquery
              GROUP BY 
                currency`

    default:

      return res.status(400).send('invalid time period ');
  }
  let result = await db(query1)
  return res.send(
    { result }
  )
}


// time consuming code ignore it


//     const results = await Promise.all([db(query1)]);

//     const combinedResults = results.reduce((acc, curr) => [...acc, ...curr], []);

//     const totalChargesByCurrency = combinedResults.reduce((acc, curr) => {
//         const currency = curr.currency;
//         const totalCharges = curr.total_charges;on
//         return acc;
//     }, {});

//     return res.send(totalChargesByCurrency);
// }






module.exports.notification = async (req, res) => {
  const { acode, pgate, title } = req.body;

  let details = {
    akontocode: acode,
    payment_gate: pgate,
    title: title
  };
  let sql = "INSERT INTO tbl_code SET ?";
  let result = await db(sql, [details]);
  if (!result) {
    return res.json(200, {
      message: "data not found"
    });
  }

  let notificationDetails = {
    user_id: acode,
    title: "tbl_code",
    message: "insert",
    created_on: new Date()
  };
  sql = "INSERT INTO tbl_notification SET ?";
  result = await db(sql, [notificationDetails]);
  if (!result) {
    return res.json(200, {
      message: "data not inserted"
    });
  }

  return res.json(201, { 
    message: "data inserted ",
    // data: notificationDetails
  });
};

 
module.exports.notification_delete = async (req, res) => {
  const { id } = req.body;

  // let details = {
  //   id
  // };
  let sql = "DELETE FROM tbl_code WHERE id = ?";
  let result = await db(sql, [id]);
  if (!result.affectedRows) {
    return res.json(200, {
      message: "No rows deleted"
    });
  }

  let notificationDetails = {
    user_id: id,
    title: "tbl_code",
    message: "DELETE",
    created_on: new Date(),
    updated_on: new Date()
  };
  sql = "INSERT INTO tbl_notification SET ?";
  result = await db(sql, [notificationDetails]);
  if (!result.affectedRows) {
    return res.json(200, {
      message: "not inserted"
    });
  }

  return res.json(201, {
    message: "data deleted sucessfully",

    // data: notificationDetails
  });
};


// module.exports.notification = async (req, res) => {
//   const { akontocode, payment_gate, title } = req.body;

//   let details = {
//     akontocode:akontocode,
//     payment_gate: payment_gate,
//     title: title
//   };

//   let notificationDetails = {
//     user_id: akontocode, 
//     title: "tbl_code" ,
//     message:"insert",
//     created_on: new Date()
//   };

//   let sql = `
//     INSERT INTO tbl_code (akontocode, payment_gate, title) 
//     VALUES (?, ?, ?) 
//     ON DUPLICATE KEY UPDATE 
//       akontocode = VALUES(akontocode), 
//       payment_gate = VALUES(payment_gate), 
//       title = VALUES(title)
//   `;
//   let result = await db(sql, [akontocode,payment_gate, title]);
//   if (!result) {
//     return res.json(200, {
//       message: "data not found"
//     });
//   }

//   sql = `
//     INSERT INTO tbl_notification (user_id, title, message, created_on) 
//     VALUES (?, ?, ?, ?) 
//     ON DUPLICATE KEY UPDATE 
//       user_id = VALUES(user_id), 
//       title = VALUES(title), 
//       message = VALUES(message), 
//       created_on = VALUES(created_on)
//   `;
//   result = await db(sql, [akontocode, notificationDetails.title, notificationDetails.message, notificationDetails.created_on]);
//   if (!result) {
//     return res.json(200, {
//       message: "data not inserted"
//     });
//   }

//   return res.json(201, {
//     message: "data inserted ",
//     // data: notificationDetails
//   });
// };




// now here we will change the status through the merchant_id by which the status will be change
// task-19


module.exports.kyc_document = async (req, res) => {
  try {
    const { merchant_id, status } = req.body;


    //for two status no be change for that i have to use this
//    const sql=` UPDATE kyc_document SET status = CASE
//    WHEN status = 1 THEN 1 
//    WHEN status = 2 THEN 2 
//    ELSE ? 
//  END
//  WHERE merchant_id = ? AND status NOT IN(1,2)`
//  ;
     const sql = "UPDATE kyc_document SET status = CASE WHEN status = 1 THEN 1 ELSE ?  END WHERE merchant_id = ?  ";
    const result = await db(sql,[status,merchant_id]);

    let message = '';
    const statusInt = parseInt(status);
    
    
    if (statusInt === 1) {
      message = 'Approved';
    
    } else if (statusInt === 2) {
      message = 'Rejected';
      if(statusInt===2)
      {
        message='Already approved no change'
      }
      
    } else
    {
      message = 'I think your status is in pending';
    }

    return res.status(201).json({
      message: message,
      // data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'AAP KE CODE ME KOI DIKKAT BA',
    });
  }
};


//now here i have creted the CUREENCYWISE PAYOUT//


module.exports.CurrencyWise_payout = async (req, res) => {
  const { from, to, date } = req.body;

 

    if(from && to){
    const query = `
    SELECT currency, amount, (akonto_charge + bank_charges) AS total_charges, gst_amount FROM
     tbl_icici_payout_transaction_response_details WHERE DATE(created_on)>=? AND DATE(created_on)<=?;
 
    `;
    var result = await db(query,[from, to]);
    }
    else if(date){

    const query1 = `
      SELECT currency, amount, (akonto_charge + bank_charges) AS total_charges, gst_amount
      FROM tbl_icici_payout_transaction_response_details
      WHERE DATE(created_on) = ?; 
    `;
    var result= await db(query1,[date]);
    }
    //const result = await db(query, [from, to]);
    //const result1 = await db(query1, [date]);
else{
  return res.send("error in code");
}
    return res.json(200,{ 
      data: 
        //  result1,
         result
      
    });
   
  } 
// currrencyWIse Download

  module.exports.CurrencyWiseDownload = async (req, res) => {
    try {
         const {from,to}=req.body;

         if(from&&to)
         {
          let currencies = ['BRL', 'BDT', 'IDR', 'CLP', 'CNY', 'CRC', 'GTQ', 'INR', 'LAK', 'MYR', 'MXN', 'PXR', 'PEN', 'PHP', 'KRW', 'THB', 'USD','VND','UGX']
          
          let sqlPayout="SELECT SUM(akonto_charge)AS payoutCharge,currency AS PayoutCurrency, 'Payout' AS TransactionType FROM tbl_icici_payout_transaction_response_details WHERE status='SUCESS' AND DATE(created_on)>=? AND DATE(created_on)<=? GROUP BY Currency ";
          
          let sqlSettle="SELECT SUM(charges) AS SettleCharge, fromCurrency AS SettleCurrency, 'Settlement' AS TransactionType FROM tbl_settlement WHERE status = 1 AND DATE(created_on)>=? AND DATE(created_on)<=? GROUP BY fromCurrency";

          let sqlDeposit="SELECT SUM(payin_charges) AS DepositCharge, ammount_type AS DepositCurrency, 'Deposit' AS TransactionType FROM tbl_merchant_transaction WHERE status = 1 AND DATE(created_on)>=? AND DATE(created_on)<=? GROUP BY ammount_type";
          
          let sqlDispute="SELECT SUM(payin_charges) AS DisputeCharge, ammount_type AS DisputeCurrency, 'Dispute' AS TransactionType FROM tbl_merchant_transaction WHERE status = 5 AND DATE(created_on)>=? AND DATE(created_on)<=? GROUP BY ammount_type";

          let sqlRefund="SELECT SUM(payin_charges) AS RefundCharge, ammount_type AS RefundCurrency, 'Refund' AS TransactionType FROM tbl_merchant_transaction WHERE status = 4  AND DATE(created_on) >= ? AND DATE(created_on) <= ? GROUP BY ammount_type";

        
          let resultPayout = await db(sqlPayout, [from, to]);
          let resultSettlement = await db(sqlSettle, [from, to]);
          let resultDeposit = await db(sqlDeposit, [from, to]);
          let resultDispute = await db(sqlDispute,[from, to]);
          let resultRefund = await db(sqlRefund,[from, to]);

          let Total = currencies.map(x=>({
            currency : x,
            payout: resultPayout.filter(item=> item.PayoutCurrency === x).reduce((a, b) => { return (b.PayoutCharge).toFixed(2)}, 0),
            settle: resultSettlement.filter(item=> item.SettleCurrency === x).reduce((a, b) => { return (b.SettleCharge).toFixed(2)}, 0),
            Deposite : resultDeposit.filter(item=> item.DepositCurrency === x).reduce((a, b) => { return (b.DepositCharge).toFixed(2)}, 0),
            Dispute : resultDispute.filter(item=> item.DisputeCurrency === x).reduce((a, b) => { return (b.DisputeCharge).toFixed(2)}, 0),
            Refund : resultRefund.filter(item=> item.RefundCurrency === x).reduce((a, b) => { return (b.RefundCharge).toFixed(2)}, 0),
        }))
        if(Total){
          res.send(Total)
        }else{
            return res.json(201,{
                message :"error"
            })
        }
       
         }
         
else{

        let currencies = ['BRL', 'BDT', 'IDR', 'CLP', 'CNY', 'CRC', 'GTQ', 'INR', 'LAK', 'MYR', 'MXN', 'PXR', 'PEN', 'PHP', 'KRW', 'THB', 'USD','VND','UGX']
        
        let sqlPayout = "SELECT SUM(akonto_charge) AS PayoutCharge, currency AS PayoutCurrency, 'Payout' AS TransactionType FROM tbl_icici_payout_transaction_response_details WHERE status = 'SUCCESS' GROUP BY currency"
        let sqlSettle = "SELECT SUM(charges) AS SettleCharge, fromCurrency AS SettleCurrency, 'Settlement' AS TransactionType FROM tbl_settlement WHERE status = 1 GROUP BY fromCurrency"
        let sqlDeposit = "SELECT SUM(payin_charges) AS DepositCharge, ammount_type AS DepositCurrency, 'Deposit' AS TransactionType FROM tbl_merchant_transaction WHERE status = 1 GROUP BY ammount_type"
        let sqlDispute = "SELECT SUM(payin_charges) AS DisputeCharge, ammount_type AS DisputeCurrency, 'Dispute' AS TransactionType FROM tbl_merchant_transaction WHERE status = 5 GROUP BY ammount_type"
        let sqlRefund = "SELECT SUM(payin_charges) AS RefundCharge, ammount_type AS RefundCurrency, 'Refund' AS TransactionType FROM tbl_merchant_transaction WHERE status = 4 GROUP BY ammount_type"
        

        let resultPayout = await db(sqlPayout)
        let resultSettlement = await db(sqlSettle)
        let resultDeposit = await db(sqlDeposit)
        let resultDispute = await db(sqlDispute)
        let resultRefund = await db(sqlRefund)

        
        let Total = currencies.map(x=>({
            currency : x,
            payout: resultPayout.filter(item=> item.PayoutCurrency === x).reduce((a, b) => { return (b.PayoutCharge).toFixed(2)}, 0),
            settle: resultSettlement.filter(item=> item.SettleCurrency === x).reduce((a, b) => { return (b.SettleCharge).toFixed(2)}, 0),
            Deposite : resultDeposit.filter(item=> item.DepositCurrency === x).reduce((a, b) => { return (b.DepositCharge).toFixed(2)}, 0),
            Dispute : resultDispute.filter(item=> item.DisputeCurrency === x).reduce((a, b) => { return (b.DisputeCharge).toFixed(2)}, 0),
            Refund : resultRefund.filter(item=> item.RefundCurrency === x).reduce((a, b) => { return (b.RefundCharge).toFixed(2)}, 0),
        }))
        
        if(Total){
          res.send(Total)
        }else{
            return res.json(201,{
                message :"error"
            })
        }
      }
    } catch (error) {
        console.log(error)
        return res.json({
            message : 'error'
        })
    }
}

//MerchantWise payout

// module.exports.MerchantWisePayout=async(req,res)=>{



//     const {From,To,date}=req.body


//      const sql_payout = `
//     SELECT
//       tbl_user.id AS ID,
//       tbl_user.name AS MerchantName,
//       tbl_icici_payout_transaction_response_details.amount,
//       tbl_icici_payout_transaction_response_details.akonto_charge + tbl_icici_payout_transaction_response_details.bank_charges AS Charges,
//       tbl_icici_payout_transaction_response_details.gst_amount AS GST
//     FROM
//       tbl_icici_payout_transaction_response_details
//     INNER JOIN
//       tbl_user ON tbl_icici_payout_transaction_response_details.users_id = tbl_user.id
//   `;

//   const result = await db(sql_payout, []);

    
//     if(date){
    
//     var sql_payout1 = `SELECT tbl_user.id AS ID, tbl_user.name AS MerchantName, tbl_icici_payout_transaction_response_details.amount,tbl_icici_payout_transaction_response_details.akonto_charge AS Charges,tbl_icici_payout_transaction_response_details.gst_amount AS GST FROM tbl_icici_payout_transaction_response_details INNER JOIN tbl_user ON tbl_icici_payout_transaction_response_details.users_id = tbl_user.id WHERE tbl_icici_payout_transaction_response_details.created_on>=?`;
    
//     var result1 = await db(sql_payout1,[date]);
//     }
//     else if(From&&To){
//       var sql_payout2 = `SELECT tbl_user.id AS ID, tbl_user.name AS MerchantName, tbl_icici_payout_transaction_response_details.amount,tbl_icici_payout_transaction_response_details.akonto_charge+tbl_icici_payout_transaction_response_details.bank_charges AS Charges,tbl_icici_payout_transaction_response_details.gst_amount AS GST FROM tbl_icici_payout_transaction_response_details INNER JOIN tbl_user ON tbl_icici_payout_transaction_response_details.users_id = tbl_user.id WHERE tbl_icici_payout_transaction_response_details.created_on >=? AND tbl_icici_payout_transaction_response_details.created_on <=?`;
    
//       var result2= await db(sql_payout2,[From,To]);
    
//     }else{
//       return res.send("dhang me daal le")
//     }
//     // var a_charges = result.akonto_charge;
//     // var b_charges = result.bank_charges;
    
//     return res.json(200,{
//       data : result,
//       result2,
//       result1
//     });
    
    

// }



module.exports.MerchantWise_Payout=async(req,res)=>{

  const {From,To}=req.body

   if(From&&To){
    var sql_payout2 = `
    SELECT tbl_user.id AS ID, tbl_user.name AS MerchantName, SUM(tbl_icici_payout_transaction_response_details.amount)AS total_amount,SUM(tbl_icici_payout_transaction_response_details.akonto_charge) AS Charges,SUM(tbl_icici_payout_transaction_response_details.gst_amount) AS GST FROM tbl_icici_payout_transaction_response_details INNER JOIN tbl_user ON tbl_icici_payout_transaction_response_details.users_id = tbl_user.id WHERE tbl_icici_payout_transaction_response_details.created_on >=? AND tbl_icici_payout_transaction_response_details.created_on <=?`;
  
    var result1= await db(sql_payout2,[From,To]);
  
  }
  else
  {
    const sql_payout1 = `
    SELECT
    tbl_user.id AS ID,
    tbl_user.name AS MerchantName,
    SUM(tbl_icici_payout_transaction_response_details.amount) AS TotalAmount,
    SUM(tbl_icici_payout_transaction_response_details.akonto_charge) AS TotalCharges,
    SUM(tbl_icici_payout_transaction_response_details.gst_amount) AS TotalGST
  FROM
    tbl_icici_payout_transaction_response_details
  INNER JOIN
    tbl_user ON tbl_icici_payout_transaction_response_details.users_id = tbl_user.id
  GROUP BY
    tbl_user.id,
    tbl_user.name`
  
var result = await db(sql_payout1);
  }

  return res.json(200,{
    data : result,result1
    
  });
  
  

}


module.exports.MerchantWisePayout_Download=async(req,res)=>{
  const{From,To}=req.body;

  if(From&&To)
  {
    var sql_Merchant=`SELECT tbl_user.name AS Merchant_Name,SUM(akonto_charge)`
  }
}

module.exports.register=async(req,res)=>
{
   
    var {name,email,password}=req.body;
    var details={
        name,
        email,
        password
    }
    var sql = "INSERT INTO data SET ?"
    var result=await db(sql,[details])
return res.send({result:result})
}

module.exports.creteupdate=async(req,res)=>{



  try {
    const {id} = req.body
    if (Object.keys(req.body).length <= 0) {
      const { email } = req.user;
      let sqlForMerchant = "select id,name from tbl_user";
      let sqlForBank ="SELECT id,gateway_name FROM payment_gateway where type = 0 And status=1";
      let merchant = db(sqlForMerchant);
      let bankName = db(sqlForBank);
      const data = await Promise.all([merchant, bankName]);
      return res
        .status(200)
        .json({ merchant: data[0], bankName: data[1], authorizer: email });
    } else if(Object.keys(req.body).length >=6 && id===undefined) {
      let formData = {
        user_id: req.body.merchantId,
        mer_name: req.body.merchantName,
        recieved_date: req.body.receivedDate,
        currency: req.body.Currency,
        bank_name:req.body.bankName,
        trx_type:req.body.TransactionType,
        trx_id:req.body.transactionid,
        deposit_recieved:req.body.depositsReceived,
        bank_charge:req.body.BankCharges,
        tax:req.body.Tax,
        total_charges:req.body.TotalCharges,
        amount:(req.body.depositsReceived && req.body.TotalCharges) ? (req.body.depositsReceived - req.body.TotalCharges) : req.body.depositsReceived,
        auth:req.body.authorizer,
        created_on: req.body.receivedDate,
        updated_on: req.body.receivedDate
      };
        let sql = "INSERT INTO tbl_bank_deposites_receive SET ?"
        let result = await db(sql, [formData]);
        if(result.affectedRows){
          return res.status(200).json({ message: "Successfully" });
        }else{
          return res.status(403).json({ message: "Error While Insterting" });
        } 
    }else if(Object.keys(req.body).length >=6 && id){
      let formData = {
        user_id: req.body.merchantId,
        mer_name: req.body.merchantName,
        recieved_date: req.body.receivedDate,
        currency: req.body.Currency,
        bank_name:req.body.bankName,
        trx_type:req.body.TransactionType,
        trx_id:req.body.transactionid,
        deposit_recieved:req.body.depositsReceived,
        bank_charge:req.body.BankCharges,
        tax:req.body.Tax,
        total_charges:req.body.TotalCharges,
        amount:(req.body.depositsReceived && req.body.TotalCharges) ? (req.body.depositsReceived - req.body.TotalCharges) : req.body.depositsReceived,
        auth:req.body.authorizer,
        created_on: req.body.receivedDate,
        updated_on: req.body.receivedDate
      };
        let sql = "Update tbl_bank_deposites_receive SET ? WHERE id = ?"
        let result = await db(sql, [formData,id]);
        if(result.affectedRows){
          return res.status(200).json({ message: "Successfully Data Update" });
        }else{
          return res.status(403).json({ message: "Error While Insterting" });
        } 
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Sonthing Went Wrong in Bank Deposite", error });
  }
}


module.exports.createBankCodeAkonto = async function (req, res) {
  try {
    let { type, title, code, currencies } = req.body;


    let details = {
      type,
      title,
      code,
      currencies
    };

    let sql = "INSERT INTO tbl_akonto_banks_code SET ?";

    let result = await db(sql, [details]);

    if (result) {
      return res.json(200, {
        message: "Data Inserted Successfully✅",
      });
    } else {
      return res.json(201, {
        message: "Error While Creating",
      });
    }
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};


module.exports.defaultSandboxPayout = async (req, res) => {
  // :point_down:Pagination :point_down:
  let pagination = (total, page, limit) => {
    let numOfPages = Math.ceil(total / limit);
    let start = page * limit - limit;
    return { limit, start, numOfPages };
  };
  try {
    let {searchItem,to, from, date, status} = req.body;
    let sql = "select count (*) as Total from tbl_icici_payout_transaction_sandbox_response_details";
    let sqlCount =
    "select count (*) as Total FROM tbl_icici_payout_transaction_sandbox_response_details WHERE users_id LIKE '%" +
    searchItem +
    "%' OR  uniqueid LIKE '%" +
    searchItem +
    "%' OR  payout_json_id LIKE '%" +
    searchItem +
    "%'";
    let sqlToFromStaus="select count(*) as Total from tbl_icici_payout_transaction_sandbox_response_details where  DATE(created_on)  >= ? AND DATE(created_on) <= ? AND status = ? ";
    let sqlToFromCount = "select count (*) as Total from tbl_icici_payout_transaction_sandbox_response_details where DATE(created_on)  >= ? AND DATE(created_on) <= ?";
    let sqCountDate ="select count (*) as Total from tbl_icici_payout_transaction_sandbox_response_details where DATE(created_on) = ?";
    let sqlStatuscount="select count(*) as Total from tbl_icici_payout_transaction_sandbox_response_details where status=?";


    let result = await db(
      searchItem
      ? sqlCount
      :from && to && status
      ?sqlToFromStaus
      : from && to
      ? sqlToFromCount
      :status
      ?sqlStatuscount
      : date
      ? sqCountDate
      : sql,
      from && to && status ? [from , to ,status] : from && to ? [from, to]
      :status ? [status] : date ? [date] :""
      );
    let total = result[0].Total;
    let page = req.body.page ? Number(req.body.page) : 1;
    let limit = req.body.limit ? Number(req.body.limit) : 10;
    let { start, numOfPages } = pagination(total, page, limit);

    let sql1 = "SELECT tbl_user.name, tbl_icici_payout_transaction_sandbox_response_details.* FROM tbl_icici_payout_transaction_sandbox_response_details INNER JOIN tbl_user ON tbl_icici_payout_transaction_sandbox_response_details.users_id = tbl_user.id LIMIT ?,?";
    let sql2 =
      "SELECT tbl_user.name, tbl_icici_payout_transaction_sandbox_response_details.* FROM tbl_icici_payout_transaction_sandbox_response_details INNER JOIN tbl_user ON tbl_icici_payout_transaction_sandbox_response_details.users_id = tbl_user.id WHERE users_id  LIKE '%" +
      searchItem +
      "%' OR  uniqueid LIKE '%" +
      searchItem +
      "%' OR  payout_json_id LIKE '%" +
      searchItem +
      "%' LIMIT ?,?";
     
      let sqlToFromStatuscount="SELECT tbl_user.name, tbl_icici_payout_transaction_sandbox_response_details.* FROM tbl_icici_payout_transaction_sandbox_response_details INNER JOIN tbl_user ON tbl_icici_payout_transaction_sandbox_response_details.users_id = tbl_user.id  where  DATE(tbl_icici_payout_transaction_sandbox_response_details.created_on)  >= ? AND DATE(tbl_icici_payout_transaction_sandbox_response_details.created_on) <= ? AND  tbl_icici_payout_transaction_sandbox_response_details.status = ? ORDER BY created_on DESC limit ?,?";
     
      let sqlToFrom =
      "SELECT tbl_user.name, tbl_icici_payout_transaction_sandbox_response_details.* FROM tbl_icici_payout_transaction_sandbox_response_details INNER JOIN tbl_user ON tbl_icici_payout_transaction_sandbox_response_details.users_id = tbl_user.id where DATE(tbl_icici_payout_transaction_sandbox_response_details.created_on)  >= ? AND DATE(tbl_icici_payout_transaction_sandbox_response_details.created_on) <= ? ORDER BY created_on DESC limit ?,?";

      let sqlStatus="SELECT tbl_user.name, tbl_icici_payout_transaction_sandbox_response_details.* FROM tbl_icici_payout_transaction_sandbox_response_details INNER JOIN tbl_user ON tbl_icici_payout_transaction_sandbox_response_details.users_id = tbl_user.id  where tbl_icici_payout_transaction_sandbox_response_details.status=? limit ?,?";
      
      let sqlDate =
      "SELECT tbl_user.name, tbl_icici_payout_transaction_sandbox_response_details.* FROM tbl_icici_payout_transaction_sandbox_response_details INNER JOIN tbl_user ON tbl_icici_payout_transaction_sandbox_response_details.users_id = tbl_user.id where DATE(tbl_icici_payout_transaction_sandbox_response_details.created_on) = ? ORDER BY created_on DESC limit ?,?";


    let result1 = await db(
      searchItem
      ? sql2
      :from && to && status
      ?sqlToFromStatuscount
      :from && to
      ? sqlToFrom
      :status
      ?sqlStatus
      :date
      ?sqlDate
      : sql1,
       from && to && status
      ? [from, to,status, start, limit]
      : from && to
      ? [from, to, start, limit]
      : status
      ? [status,start,limit]
      :date
      ? [date, start, limit]
      : [start, limit]
      );
    if (result1.length === 0) {
      return res.json(201, {
        message: `Showing ${total} from ${total} data `,
        currentPage: page,
        totalPages: numOfPages,
        pageLimit: limit,
        data: result1,
      });
    } else {
      return res.json(200, {
        message: `Showing ${total} from ${total} data `,
        currentPage: page,
        totalPages: numOfPages,
        pageLimit: limit,
        data: result1,
      });
    }
  } catch (error) {
    console.log(error)
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};


module.exports.defaultDownload = async (req, res) => {
  const { from, to } = req.body;
  let fromDate, toDate;

  if (from && to) {
    fromDate = new Date(from);
    toDate = new Date(to);
  }

  const today = new Date();

  if (from && to) {
    let sql = "SELECT * FROM tbl_settlement WHERE settlement_mode = 2 AND created_on BETWEEN ? AND ? ORDER BY created_on DESC";
    let data = await db(sql, [fromDate, toDate]);
    res.send(data);
  } else {
    let sql = "SELECT * FROM tbl_settlement WHERE settlement_mode = 2 AND created_on = ? ORDER BY created_on DESC";
    let data = await db(sql, [today]);
    res.send(data);
  }
};















