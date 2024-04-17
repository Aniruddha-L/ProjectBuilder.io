import express, { json } from "express";
import connection from "../Db.js";

const UserRouter = express.Router();

UserRouter.get("/:uid", (req, res) => {
  const uid = req.params.uid;
  const query = `select * from userdetails where Id = ${uid}`;
  res.status(200);
  connection.query(query, (err, result) => {
    if (err) {
      return res.status(404).json({
        msg: "Error in fetching data",
      });
    }
    if (result.length === 0) {
      return res.status(401).json({
        msg: "No data is present",
      });
    }
    res.status(200).send(result);
  });
});

let query;
UserRouter.post("/", async(req, res) => {
  if (!req.body.Name || !req.body.Email || !req.body.Pno || !req.body.Passwd) {
    return res.status(400).json({
      msg: "Missing req fields: Name, Email, Phone number, Password",
    });
  }
  const result = connection.query("select * from userDetails;", (err, resu) => {
    if (err) {
      return -1;
    }
    const id = resu.length +1
    query = `insert into userDetails value(${id}, \
        '${req.body.Name}', '${req.body.Email}', ${req.body.Pno}, '${req.body.Passwd}')`;
    console.log(query)
    connection.execute(query, (err)=>{
        if(err){
            console.log(err)
        }
        res.status(201).send('data added to db')
    })
  });
});

UserRouter.get('/', (req, res)=>{
    let resu;
    connection.query('select * from user', (err, result)=>{
        if (err){
            return -1
        }
        return res.status(200).json(result)
    })
})

export default UserRouter;
