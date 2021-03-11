import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import {BehaviorSubject, ReplaySubject} from "rxjs";
import {filter, map} from "rxjs/operators";

//const  bs = new BehaviorSubject(null);

function updateItems(items){
  //bs.next(items)
  items.forEach(item=> updateByKey(item.key,item))
}
// function getAllItems(){
//
//   return bs.pipe(filter(val=>null !=val))
// }
const subscriptions ={}

function getByKey(key){

  if(subscriptions.hasOwnProperty(key)){
    return subscriptions[key]
  }
  subscriptions[key] = new ReplaySubject(1);

  return  subscriptions[key];

}
function updateByKey(key,value){


  subscriptions[key].next(value);


}
function getCurrentValueByKey(key,){


  return subscriptions[key].getValue();


}

function updateItem(item){
  //
  // const currentItems = bs.getValue()
  // const index = currentItems.findIndex(val=> val['key'] == item['key']);
  // currentItems[index] =item;
  //
  // bs.next(currentItems)
  updateByKey(item['key'],item)
}

test('renders learn react link', (done) => {

  const allItems =[
    {"key":"a","value":"A Value thing"},
    {"key":"b","value":"B Value thing"},
    {"key":"c","value":"C Value thing"}
  ]
  getByKey('a').subscribe(value => console.log(value))
  getByKey('b').subscribe(value => console.log(value))
  getByKey('c').subscribe(value => console.log(value))

  updateItems(allItems)

  updateItem( {"key":"a","value":"New A Value thing"})

  setTimeout(()=>{
    done()
  },3000)



});
