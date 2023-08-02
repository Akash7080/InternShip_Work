const express = require("express")
const router = express.Router()

const creates = require("../controller/api")
//const { notification, notification_delete } = require('./controller');

// making the all the routes here

router.post("/Show",creates.Show)
router.post("/create",creates.create)
router.post("/update",creates.update)
router.post("/delete",creates.delete)
router.post("/updates",creates.updates)
// router.post("/ShowsStatus",creates.ShowsStatus)
router.post("/showbetween",creates.showbetween)
router.post("/innerjoin",creates.innerjoin)
// router.post("/sendMail",creates.sendMail)
router.post("/create_settlement",creates.create_settlement)
router.post("/showdate",creates.showdate)
router.post("/settlement",creates.settlement)
router.post("/settlementtodate",creates.settlementtodate)

router.post("/merchant",creates.merchant)
router.post("/merchant_today",creates.merchant_today)
//payout
router.post("/payout",creates.payout)
router.post("/currency_commision",creates.currency_commision)
router.post("/notification",creates.notification)
router.post("/notification_delete",creates.notification_delete)
router.post("/kyc_document",creates.kyc_document)

// CurrencyWise_payout
router.post("/CurrencyWise_payout",creates.CurrencyWise_payout)
router.post("/CurrencyWiseDownload",creates.CurrencyWiseDownload)
router.post("/MerchantWise_Payout",creates.MerchantWise_Payout)
router.post("/register",creates.register)
router.post("/creteupdate",creates.creteupdate)
router.post("/createBankCodeAkonto",creates.createBankCodeAkonto)
router.post("/defaultSandboxPayout",creates.defaultSandboxPayout)







module.exports = router

