const express = require('express');
const router = express.Router();
const util = naive.serverUtil
const {CheckAuth} = util
router.use("/system",require("./system/index.js"))
router.use("/account",require("./account/index.js"))
router.use("/notebook",require("./notebook/index.js"))
router.use("/filetree",require("./filetree/index.js"))
router.use("/format",require("./format/index.js"))
router.use("/history",require('./history/index.js'))
router.use("/outline",require('./outline/index.js'))
router.use("/bookmark",require('./bookmark/index.js'))
router.use("/tag", require('./bookmark/index.js'))
router.use("/lute",require("./lute/index.js"))
router.use("/query",require("./query/index.js"))
router.use("/search",require("./search/index.js"))
router.use("/block",require("./block/index.js"))
router.use("/file",require("./file/index.js"))
router.use("/ref",require("./ref/index.js"))
router.use("/attr",require("./attr/index.js"))
router.use("/cloud",require("./cloud/index.js"))
router.use("/sync",require("./sync/index.js"))
router.use("/inbox",require("./inbox/index.js"))
router.use("/extension",require("./extension/index.js"))
router.use("/asset",require("./asset/index.js"))
router.use("/exporter",require("./exporter/index.js"))
router.use("/importer",require("./importer/index.js"))
router.use("/template",require("./template/index.js"))
router.use("/transactions",require("./transactions/index.js"))
router.use("/setting",require("./setting/index.js"))
router.use("/graph",require("./graph/index.js"))
router.use("/bazaar",require("./bazaar/index.js"))
router.use("/repo",require("./repo/index.js"))
router.use("/notification",require("./notification/index.js"))
module.exports=router