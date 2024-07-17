import express from 'express';
const app=express();
const port=3000;

//routes 
// app.get('/',(req,res)=>{
//     res.send('Hello from hitesh and his tea')
// })

// app.get('/ice-tea',(req,res)=>{
//     res.send('what ice tea you want or prefer?')
// })

// app.get('/twitter',(req,res)=>{
//     res.send('Hi hello i am twitter')
// })


//expect data from frontend
app.use(express.json())

let teaData=[];
let nextId=1
//store data in db
app.post('/tea',(req, res)=>{
    const {name, price}=req.body;
    const newTea={id:nextId++, name, price};
    teaData.push(newTea);
    res.status(201).send(newTea);
})
//get data from db
app.get('/tea',(req,res)=>{
    res.status(200).send(teaData);
})

//enter id and get data
app.get('/tea/:id',(req,res)=>{
    const tea=teaData.find(t => t.id===parseInt(req.params.id));
    if(tea){
        res.status(200).send(tea);
    }
    else{
        res.status(404).send('Tea not found');
    }
})

//update data
app.put('/tea/:id',(req,res)=>{
    const tea=teaData.find(t => t.id === parseInt(req.params.id))

    if(!tea){
        return res.status(404).send('tea not found in update data')
    }
    else{
        const {name, price}=req.body;
        tea.name=name;
        tea.price=price;
        return res.status(200).send(tea);
    } 

})
//delete data
app.delete('/tea/:id',(req,res)=>{
    const index=teaData.findIndex( t => t.id ===parseInt(req.params.id))

    if(index===-1){
        res.status(404).send('tea not  deleted because its not found')
    }
    else{
        teaData.splice(index,1);
        res.status(204).send('tea deleted successfully')
    }
})



//listen port 3000
app.listen(port,()=>{
     console.log(`Server running at http://localhost:${port}`)
})


