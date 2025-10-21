import express from "express"
import client from "prom-client"

const app = express()
app.use(express.json())

const collectDefaultMetrics = client.collectDefaultMetrics
collectDefaultMetrics({timeout:5000})

app.get("/",(req, res)=>{
    res.send("Node JS monitoring in Kubernetes using Promethous and Grafana")
})
app.get("/metrics",async (req, res)=>{
    res.set("Content-Type", client.register.contentType)
    res.end(await client.register.metrics())
})

app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})