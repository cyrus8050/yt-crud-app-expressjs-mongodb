const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Item = require('./models/items')
const app = express();

const dbURI = 'mongodb+srv://ckmobile:weareppl@nodetuts.qwlpv.mongodb.net/nodetuts?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(result => app.listen(3000))
    .catch(err => console.log(err))
// const dbURI = 'mongodb+srv://ckmobile:weareppl@nodetuts.qwlpv.mongodb.net/nodetuts?retryWrites=true&w=majority'
// mongoose.connect(dbURI, { useUnifiedTopology: true, useNewUrlParser: true }).then(result => console.log('connected to db'))
//   .catch(err => console.log(err))
app.set('view engine', 'ejs')

// app.use((req,res,next)=>{
//     console.log('new request made');
//     console.log('host',req.hostname);
//     next();
// })
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.get('/', (req, res) => {
    res.redirect('/items');
    // const blogs = [
    //     { name: 'blog 1:', price: 2 },
    //     { name: 'blog 2:', price: 5 }
    // ]
    // res.render('index', { name: 'Cyrus', blogs });
});
app.get('/add-item', (req, res) => {
    res.render('add-item')
})
app.get('/item-detail', (req, res) => {
    res.render('item-detail')
})
app.get('/items', (req, res) => {
    Item.find().sort({ createdAt: -1 }).then(result => {
        res.render('index', { items: result })
    })
})
app.post('/items', (req, res) => {
    const item = new Item(req.body)
    console.log('hh')
    console.log(req.body)

    item.save().then(() => {
        res.redirect('/items')
    }).catch(err => console.log(err))
})

app.get('/items/:id', (req, res) => {
    console.log(req)
    const id = req.params.id;
    console.log('id', id)
    Item.findById(id).then(result => {
        console.log('deleted')
        res.render('item-detail', { item: result })
    })
})

app.delete('/items/:id', (req, res) => {
    const id = req.params.id;
    Item.findByIdAndDelete(id).then(result => {
        res.json({ redirect: '/items' })
        // res.redirect('/items');
    })
})

app.put('/items/:id', (req, res) => {
    const id = req.params.id;
    console.log('update api', id, req.body, JSON.stringify(req.body))
    Item.findByIdAndUpdate(id, req.body).then(result => {
        // res.json({ redirect: '/items' })
        res.json({msg:'update successfully.'});
    })
})


// app.get('/add-item', (req, res) => {
//     const item = new Item({
//         name: 'upwork',
//         price: 10
//     })
//     item.save().then(result => {
//         res.send(result)
//     }).catch(err => console.log(err))
// })