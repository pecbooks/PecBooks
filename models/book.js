const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/books/image');

const bookSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    author: {
        type: String,
    },
    avatar: {
        type: String
    },
    title: {
        type: String,
        require: true
    },
    type: {
        type: String,
        enum: ['Book','Notes','Question Paper'],
        require: true
    },
    location:{
        type : String,
        require : true
    },
    price:{
        type : Number,
        require: true
    }
},{
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });

// Statics
bookSchema.statics.uploadedAvatar = multer({
    storage: storage,
    limits: { fileSize: 10000*1000 }
}).single('avatar');
bookSchema.statics.avatarPath = AVATAR_PATH;


const Book = mongoose.model('Book',bookSchema);
module.exports = Book;