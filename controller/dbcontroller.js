const dbSchema = require('../models/url_response');
const dbController = {};

dbController.addURL = async (req, res) => {
    const response = {};
    const url = req.body.url;
    const validation = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig;
    if (validation.test(url)){
        let short, result;
        result = await dbSchema.find({original_url: url});
        if (result.length > 0){
            response.original_url = url;
            response.short_url = result[0].short_url;
            res.json(response);
        } else {
            do{
                short = Math.floor(Math.random() * 10000);
                result = await dbSchema.find({short_url: short});
            }
            while(result.length > 0)
            await dbSchema.insertMany(
                {
                    original_url: url,
                    short_url: short
                })
                .then(id => {
                    response.original_url = url;
                    response.short_url = short;
                    res.json(response);
                })
                .catch(e => {
                    response.error = "invalid url";
                    res.json(response);
                })
        }
    } else {
        response.error = "invalid url";
        res.json(response);
    }
}

dbController.getURL = async (req, res) => {
    const id = req.params.id;
    const url = await dbSchema.find({short_url: id});
    res.redirect(301, url[0].original_url);
}

module.exports = dbController;