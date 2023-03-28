const express = require("express")
const fs = require("fs")
const path = require("path")
const app = express()

const apiKey = process.env.SENDGRID_API_KEY
const sgMail = require("@sendgrid/mail")

sgMail.setApiKey(apiKey)

let products

app.get("/api", (req, res) => {
	res.setHeader("Content-Type", "text/html")
	res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate")
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.end("welcome to Plants API an Sendgrid")
})

app.get("/api/send-email", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*")
	const { sender, name } = req.query

	const msg = {
		to: sender,
		from: "mello-renato@hotmail.com",
		subject: "Bem vindo a Casa Verde Newsletter",
		text: `
		Olá, ${name}.
		Boas-vindas à Casa Verde! Você se cadastrou em nossa newsletter e vai começar a receber e-mails com as novidades de nossa loja e dicas de como cuidar de suas plantas.
		Até logo!`,
	}

	sgMail
		.send(msg)
		.then(() => console.log("e-mail enviado com sucesso"))
		.catch((error) => console.log(error))
})

fs.readFile(path.join(__dirname, "./plants.json"), "utf-8", (err, data) => {
	if (err) {
		console.log(err)
	} else {
		products = JSON.parse(data)
	}
})

app.get("/api/plants", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*")
	return res.json(products)
})

module.exports = app
