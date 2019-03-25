const express = require('express');
const app = express();
app.use(express.json())
const fs = require('fs');
//Task 1
app.get('/', (req, res) => {
    fs.readFile(__dirname + "/Express.json",(err,data) => {
        if(err){
            console.log("something went wrong")
        }
        else{
            var Data = JSON.parse(data.toString())
            return res.json(Data)
        }
    })
});
//Task 2
app.post('/post', (req,res) => {
    var Newcourse ={
        name:req.body.name,
        description:req.body.description,
        exercise:req.body.exercise 
    }
    let data = fs.readFileSync("Express.json")
    data = data.toString()
    var Data = JSON.parse(data)
    Newcourse.id = Data.length+1;
    Data.push(Newcourse);
    fs.writeFileSync(__dirname + "/Express.json",JSON.stringify(Data,null,2))
    return res.json(Data)
    });
//Task 3
app.get('/courseid/:id',(req,res)=>{
    var id = req.params.id-1
    fs.readFile(__dirname + "/Express.json",(err,data) => {
        if(err){
            console.log("something went wrong")
        }
        else{
            var Data = JSON.parse(data.toString())
            return res.json(Data[id])
        }
})
})
//Task 4
app.put('/change/:id',(req,res) => { 
    var id = req.params.id-1;
    var jsonData = fs.readFileSync("Express.json");
    var data = JSON.parse(jsonData);
    data[id]['name'] = req.body.name;
    data[id]['description'] = req.body.description;
    data[id]['exercise'] = req.body.exercise;
    fs.writeFileSync(__dirname + '/Express.json',JSON.stringify(data,null,2));
    res.json(data);
})
//Task 5
app.get('/course_id/:id',(req,res) => {
    fs.readFile("/Express.json",(err,data) =>{
        var id =req.params.id;
        var jsonData = fs.readFileSync('Express.json')
        var data = JSON.parse(jsonData)

        for(i=0 ; i<data.length ;i++){
            if(err){
                console.log("something went wrong")
            }
            else if (data[i].id == id){
                return res.json(data[i])
            }
            }   
    })
});
//Task 6
app.get("/exercise/:id",(req,res) => {
    fs.readFile("Express.json",(err,data) => {
        var id = req.params.id;
        var jsonData = fs.readFileSync("Express.json")
        var data = JSON.parse(jsonData)
        for(i = 0;i<data.length;i++){
            if(err){
                console.log("something went wrong")
            }
            else if (data[i].id == id){
                return res.json(data[i].exercise)
            }
        }
    })
})
//Task 7
app.post("/new_course/:id/course/:id",(req,res) => {
    var id = req.params.id;
    var NewCourse ={
        courseID:req.body.courseID,
        name:req.body.name,
        content:req.body.content,
        hint:req.body.hint 
    }
    let data = fs.readFileSync("Express.json")
    data = data.toString()
    var Data = JSON.parse(data)
    var new_ex = Data[id].exercise
    NewCourse.id= Data[id].exercise.length+1;
    new_ex.push(NewCourse);
    fs.writeFileSync(__dirname + "/Express.json",(JSON.stringify(Data,null,2)));
    return res.json(Data)
    });

//Task 8
app.put('/edit/:id/exercise/:id',(req,res) => { 
    var id = req.params.id;
    var jsonData = fs.readFileSync("Express.json");
    var data = JSON.parse(jsonData);
    data[id].exercise[id]["id"] = req.body.id,
    data[id].exercise[id]["courseID"] = req.body.courseID,
    data[id].exercise[id][ "name"] = req.body.name,
    data[id].exercise[id][ "content"] = req.body.content,
    data[id].exercise[id][ "hint"] =  req.body.hint

    fs.writeFileSync('Express.json',(JSON.stringify(data,null,2)));
    res.json(data)
});
//Task 9

    app.get('/courses/:id/submission/:id/',(req,res)=>{
    fs.readFile(__dirname+'/Express.json',(err, data)=>{
    var id=req.params.id;
    var data=fs.readFileSync('Express.json')
    let Data=JSON.parse(data.toString());
    for(i=0;i<Data.length;i++){
       if(err){
       console.log("wrong")
    }
    else if(Data[i].id==id){
        return res.json(Data[i].exercise[i].submission)
    }  
 }
 })
 });
// Task 10
app.post("/courses/:id/submission/:id",(req,res) => {
        var id = req.params.id;
        var NewCourse ={
            username:req.body.username,
            content:req.body.content
        }
        let data = fs.readFileSync("Express.json")
        var Data = JSON.parse(data.toString())
        var exercise = Data[id-1].exercise[id]
       
        console.log(sub)
        if ("submission " in exercise ){
            return res.json(Data[id].exercise[id].submission)
        }else {
            exercise["submission"] = []
        }
        var sub = exercise["submission"] 
        NewCourse.id=sub.length+1
        sub.push(NewCourse)
        // console.log(push)
        fs.writeFileSync(__dirname + "/Express.json",(JSON.stringify(Data,null,2)));
        return res.json(NewCourse)
        
        
    
})
app.listen(3070, () => {
    console.log('server is listening')
})
