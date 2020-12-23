app.get('/', async (req, res) =>
{
	let doc = await BTC_Address.findOne({ "data.address": "3PgUHBGdez5qK3d9fZiYSokJtVhHKbfAHh" }).lean();

	let from_indent = "data";		   // the indent to reach the wanted key of the doc
	let from_field = "txs";			  // field to populate to
	let to_field = "data.txid";		 // field to populate from
	let ref = BTC_Transaction;		// Schema to populate from
	
	

	try {
		await tools.MyPopulate(doc, from_indent, from_field, to_field, ref, res);
	}

	catch(err) {
		console.log(colors.bgRed("\nSomething went wrong.\n"));
		console.log("\n" + colors.bgBlack.brightRed(err) + "\n");
		return res.status(500).send("Something went wrong!");
	}
});