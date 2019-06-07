
const express = require ('express')
const morgan = require ('morgan')
const app = express()
const path = require ('path')


const ciudades = require(path.join(__dirname , '/public/data.json'))

app.set('port',process.env.PORT || 3000)

app.get('/info', (req,res) =>
{
    res.json(ciudades)
})

app.use(express.static(path.join(__dirname , '/public')))

app.listen(app.get('port'), () =>
{
    console.log('server in port 3000 ')
})