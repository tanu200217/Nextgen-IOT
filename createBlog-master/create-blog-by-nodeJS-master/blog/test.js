const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost')

mongoose.connect('mongodb://localhost/test_my_database', {useNewUrlParser: true});

BlogPost.create({
    title: 'Day la sach day hoc lap trinh nodejs tu co ban',
    body: 'Neu dam me Javascript va muon kham pha cach xay dung ung dung voi nodejs, thi hay tham khao o day'
}, (error, blogpost) => {
    console.log(error, blogpost)
})


BlogPost.find({
    title: 'Day la sach day hoc lap trinh nodejs tu co ban'
}, (error, blogpost) => {
    console.log(error, blogpost)
})

var id  = "600ee5eb9a999f242da384f1"
BlogPost.findByIdAndUpdate(id, {
    title: 'Updated title'
}, (error, blogspot) => {
    console.log(error, blogspot)
})