const express = require("express")
const bodyParser = require("body-parser")
const validator = require("validator")
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/expertsDB", {useNewUrlParser:true})

const app = express()
var id = 69

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

const expertSchema = new mongoose.Schema({
  _id: Number,
  address: String,
  mobile: String,
  password: String
})

const Expert = new mongoose.model("Expert", expertSchema)

app.route('/experts')
.get((req, res)=>{
	Expert.find((err, expertList)=>{
		if (err) {res.send(err)}
		else {res.send(expertList)}
	})
})
.post((req, res)=>{
	const expert = new Expert({
		_id: id,
		address: req.body["address"],
		mobile: req.body["mobile"],
		password: req.body["password"]
	})
	expert.save((err)=>{
		if (err) {res.send(err)}
		else {
			id += 1;
			res.send("Successfully added expert.")
		}
	})
})
.delete((req, res)=>{
	Expert.deleteMany((err)=>{
		if (err) {res.send(errr)}
		else {res.send('All experts deleted.')}
	})
})

app.route('/experts/:id')
.get((req, res)=>{
	Expert.findOne({_id: req.params.id}, (err, foundExpert)=>{
		if (foundExpert) (res.send(foundExpert))
		else res.send("No Experts Found.")
	})
})
.delete((req, res)=>{
	Expert.deleteOne({_id: req.params.id}, (err, foundExpert)=>{
		if (foundExpert) (res.send("Expert seleted successfully."))
		else res.send("No Experts Found.")
	})
})
.put((req, res)=>{
	Expert.update(
		{_id: req.params.id},
		{$set: req.body},
		{overwrite:true},
		(err)=>{
			if (err) {res.send(err)}
			else {res.send('Expert updated.')}
		}
	)
})

app.listen(5000, (req, res)=>{
	console.log("Server is running on port 5000")
})
