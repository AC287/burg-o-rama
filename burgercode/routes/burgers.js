'use strict'
var express = require('express');
var burgers = express.Router();

var burgerData = [];

var dumpMethod = (req, res) => res.send(req.method+" burgers! // METHOD NOT IMPLEMENTED");

burgers.route('/')

  //all burger page. //get data from database here.!
  .get((req, res)=>{
    res.render('pages/burger_all',{data: burgerData})
  })

  //create new burger //need to add to local database!
  .post((req, res)=>{
    burgerData.push(req.body) //This should enter into database. PSQL
    var id = burgerData.length-1;  //this should return last item entered in database.
    res.redirect('./'+ id)
  })

burgers.get('/new', (req, res)=>
  res.render('pages/burger_edit',{
    burgerForm: {
      title: 'Create your Dream Burger',
      burgerURL: '/burgers/',
      submitMethod: 'post'
    }
  })
)

burgers.get('/:id/edit',(req,res)=>
  res.render('pages/burger_edit',{
    burgerForm:{
      title:'Edit your Dream Burger',
      burgerURL: '/burgers/'+req.params.id+'?_method=PUT',
      submitMethod: 'post'
    }
  })
)

burgers.route('/:id')
  .get((req,res)=>{
    var bid = req.params.id;
    if(!(bid in burgerData)){ //burgerData will be from database.
      res.sendStatus(404);
      return;
    }
    res.render('pages/burger_one',{
      burgerID: bid,
      burgerURL: '/burgers/'+bid,
      burgerData: burgerData[bid]   //burgerData will be from database.
    })
  })
  .put((req, res)=>{
    var bid = req.params.bid;
    console.log('put',req.body);
    if(!(bid in burgerData)){ //burgerData will be from database.
      res.sendStatus(404);
      return;
    }
    burgerData[bid] = req.body; // burgerData will be from database.
    res.redirect('./'+bid)
  })
  .delete((req, res)=>{
    var bid = req.params.bid;
    // if(!(bid in burgerData)){
    //   res.redirect('/');
    //   return;
    // }
    burgerData.splice(bid,1);
    res.redirect('/');
  });  //need to implement delete;

module.exports = burgers;
