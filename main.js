const {Client}=require('pg')
const express=require('express')
const app=express()
app.use(express.json())
const con=new Client({
   host:"localhost",
   user:"postgres",
   port:5432,
   password:"12345678",
   database:"demodata"
 })
con.connect().then(()=>console.log("connected"))
app.post('/postData',(req,res)=>{
    const id=req.params.id;
    const name=req.body.name;
    const insert_query='INSERT INTO demotable (name,id) VALUES ($1,$2)'
    con.query(insert_query,[name,id],(err,result)=>{
    if(err){
        res.send(err)
    }else{
        console.log(result);
        res.send("POSTED DATA")
    }

    })
})
    app.get('/fetchData',(req,res)=>{
        const fetch_query="select*from demotable"
        con.query(fetch_query,(err,result)=>{
            if(err){
                res.send(err)
            }else{
                res.send(result.rows)
            }
        })
    })
    app.get('/fetchDatabyId/:id',(req,res)=>{
        const id=req.params.id
        const fetch_query="select*from demotable WHERE id=$1 "
        con.query(fetch_query,[id],(err,result)=>{
            if(err){
                res.send(err)
            }else{
                res.send(result.rows)
            }
    })

    })
    app.put('/update/:id',(req,res)=>{
         const id=req.params.id;
         const name=req.body.name;
          //const address=req.body.address;
        const update_query="UPDATE demotable SET name=$1::TEXT WHERE id=$2::INTEGER"
        con.query(update_query,[name,id],(err,result)=>{
            if(err){
                res.send(err)
            }else{
                console.log(result);
                res.send('UPDATED')
            }
        })
        })
         app.delete('/delete/:id',(req,res)=>{
         const id=req.params.id
        const delete_query='Delete from demotable WHERE id=$1' 
        con.query(delete_query,[id],(err,result)=>{
            if(err){
                res.send(err)
            }else{
                //console.log('DELETE');
                res.send(result)
            }
        })
        })
    app.listen(3000,()=>{
        console.log("server is running");
    })
   

// con.query('select*from demotable',(err,res)=>{
//     if(!err){
//         console.log(res.rows)
//     }
//     else{
//         console.log(err.message)
//     }
//     con.end;
// })