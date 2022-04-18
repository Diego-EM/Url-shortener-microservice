const mongoose = require('mongoose');
const URI = "mongodb://localhost:27017/url_list";

mongoose.connect(URI, {useNewUrlParser: true})
    .then(() => console.log("Connected to database"))
    .catch(e => console.error(e))