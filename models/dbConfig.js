const mongoose = require("mongoose");

mongoose.connect(
    "mongodb://localhost:27017/api-beer",
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (!err) {
            console.log("MongoDB connecté");  
        } else {
            console.log("Erreur connection :" + err);
        } 
    }
)