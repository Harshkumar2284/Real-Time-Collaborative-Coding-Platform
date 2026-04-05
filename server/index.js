import app from './src/app.js'

const PORT = process.env.PORT ||8080

app.listen(PORT,(req,res)=>{
    console.log(`Server running on port ${PORT}`)
})