var app = angular.module("spms", ['ngStorage']);

var openDb=function(){
var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('smps.db');
var db = new sqlite3.Database('scms.db');


    db.run("CREATE TABLE users (name TEXT,password TEXT)");    
    db.run("CREATE TABLE data (userId TEXT,title TEXT,username TEXT,password TEXT)");
    
return db;
}


var showLoader=function(show){

    if(show==true){
        document.getElementById("loader").style.visibility="visible";
        document.getElementById("loader").style.zIndex = "100000";

    }
    else{
        document.getElementById("loader").style.visibility="hidden";
    }

}
