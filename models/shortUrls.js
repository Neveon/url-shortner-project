const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  "original_url": String,
  "short_url": String
},{timestamp:true});
//SchemaOptions - when item is created, timestamp to know when it was created

//mongoose.model(collection, Schema)
const shortUrl = mongoose.model('shortUrl', urlSchema);

module.exports = shortUrl; //Allows us to access it
