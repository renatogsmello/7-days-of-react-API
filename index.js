const express = require("express")
const app = express()

app.get("/api", (req, res) => {
	res.setHeader("Content-Type", "text/html")
	res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate")
	res.end("welcome to Plants API an Sendgrid")
})
