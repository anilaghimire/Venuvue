const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    //User order products
    orderId : {
        type : String,
        required : true,
        default : 'ORDER-NO' +Date.now()
    },
    userId : {
        type  : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required : true,
    },
    productId : {
        type  : mongoose.Schema.Types.ObjectId,
        ref : 'products',
        required : true,
    },
    status : {
        type : String,
        required : true,
        default : 'Pending'
    },
    quantity : {
        type : Number ,
        required : true,
    }

});

const Orders = mongoose.model('orders' , orderSchema);
module.exports = Orders;