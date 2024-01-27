import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "7941846jo",
    database: "marketplace"
})
app.use(express.json())

app.use(cors())

app.get("/",(req,res)=>{
    res.json("Hello World")
})

app.get("/consoles", (req, res)=>{
    const q= "SELECT * FROM consoles"
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/register", (req, res)=>{
    const q= "INSERT INTO accounts (`username`, `password`) VALUES(?)";
    const values = [
        req.body.username,
        req.body.password
    ];
    db.query(q,[values], (err, data)=>{
        if(err) return res.json(err)
        return res.json("Successfully executed")
    })
}) 

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const q = "SELECT * FROM accounts WHERE username = ?";

    db.query(q, [username], (err, data) => {
        if (err) return res.json(err);

        if (data.length === 0) {
            return res.json("Account not found");
        } else {
            const storedPassword = data[0].password;
            if (password === storedPassword) {
                return res.json("Login successful");
            } else {
                return res.json("Username and password don't match");
            }
        }
    });
});

app.post("/consoles", (req, res)=>{
    const q= "INSERT INTO consoles (`item`, `description`, `image`, `price` ) VALUES(?)";
    const values = [
        req.body.item,
        req.body.description,
        req.body.image,
        req.body.price,
    ];
    db.query(q,[values], (err, data)=>{
        if(err) return res.json(err)
        return res.json("Successfully executed")
    })
}) 

app.delete("/consoles/:id", (req, res)=>{
    const consoleId = req.params.id;
    const q = "DELETE FROM consoles WHERE id = ?"

    db.query(q, [consoleId], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Console has been deleted successfully");
    })
})

app.put("/consoles/:id", (req, res)=>{
    const consoleId = req.params.id;
    const q = "UPDATE consoles SET `item`= ?, `description`= ?, `image`= ?, `price`= ? WHERE id = ?";

    const values = [
        req.body.item,
        req.body.description,
        req.body.image,
        req.body.price
    ];

    db.query(q, [...values,consoleId], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Item has been updated successfully");
    })
})

app.listen(8800, ()=>{ 
    console.log("Connected to backend server") 
})

