const mongoose = require("mongoose");
mongoose.connect(`${process.env.MONGODB_CONECTION}`).then(()=>{
    
}).catch((err) => {
  const msg = "Error! Unable to connect to MongoDB.";

  console.log("\x1b[41m%s\x1b[37m", err, "\x1b[0m");
});
