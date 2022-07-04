import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/myQuestinrioDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () =>{
    console.log("DB Connected");
} )

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
})
const User = new mongoose.model("User", userSchema)

const QuestionnaireSchema = new mongoose.Schema({
    questionnaireName: {type: String, required: true},
    clientName: {type: String, required: true},
    projectNumber: {type: String, required: true},
    projectLead: {type: String, required: true},
    lastAccessed: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
})
const Questionnaire = new mongoose.model("Questionnaire", QuestionnaireSchema)

// Routes

app.post("/login", (req, res) =>{
    const {email, password} = req.body
    User.findOne({email: email}, (err, user) =>{
        if(user){
            if(password === user.password){
                //req.session.user = user;
                //req.session.user_ids = user._id;
                //sessionStorage.setItem("userData", user);
                //sessionStorage.setItem("userId", user._id);
                // sessionStorage.setItem("firstName", user.firstName);
                // sessionStorage.setItem("lastName", user.lastName);
                res.send({message: "Login successful", user: user});
            }else{
                res.send({message: "Password didn't match"})
            }
        }else{
            res.send({message: "User not Registered"})
        }
    } )
})

app.post("/register", (req, res) =>{
    const {firstName, lastName, email, password} = req.body
    User.findOne({email: email}, (err, user) =>{
        if(user){
            res.send({message: "User already registered"})
        }else{
            const user = new User({
                firstName : firstName,
                lastName : lastName,
                email : email,
                password : password,
            })
            user.save( err => {
                if(err){
                    res.send(err)
                }else{
                    res.send({message: "Successfully Registered, please login now"})
                }
            })
        }
    } )
    
})

app.post("/table", (req, res) =>{
    const {questionnaireName, clientName, projectNumber, projectLead} = req.body
    Questionnaire.findOne({questionnaireName: questionnaireName}, (err, questionnaire) =>{
        if(questionnaire){
            res.send({message: "Questionnaire already exists"})
        }else{
            const questionnaire = new Questionnaire({
                questionnaireName : questionnaireName,
                clientName : clientName,
                projectNumber : projectNumber,
                projectLead : projectLead,
            })
            questionnaire.save( err => {
                if(err){
                    res.send(err)
                }else{
                    res.send({message: "Successfully inserted"})
                }
            })
        }
    } )    
})

app.get("/table", (req, res) => {
    Questionnaire.find({}, (err, questionnaire) =>{
        if(err){
            res.send({message: "Questionnaire not available"})
        }else{
            res.send({questionnaire})
        }
    } )    
})

app.listen(9002,()=> {
    console.log("Be started on port 9002, this is working")
})