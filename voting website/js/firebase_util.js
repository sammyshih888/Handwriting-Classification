import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import {
    getDatabase,
    ref,
    child,
    get,
    set,
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCmVDza9Tt3haQdA1aTgwgcSbe_Eiee7kU",
    authDomain: "studentlog-76b1d.firebaseapp.com",
    databaseURL:
        "https://studentlog-76b1d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "studentlog-76b1d",
    storageBucket: "studentlog-76b1d.appspot.com",
    messagingSenderId: "309791375862",
    appId: "1:309791375862:web:c670c29108b35a0634c7d7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();

const dbRef = ref(getDatabase());

function addClick() {
    // test
    //writeData('012310231', {1:[1,2,4],2:[3,1,5]});

    let preData = localStorage.getItem('udata') ;
    let dataObj = JSON.parse(preData) ;
    let result = null;
    if(dataObj!=null && dataObj.note!=undefined){
        result = dataObj.note;
    }
    if(result==undefined || result==null ){
        result = {};
    }

    let result_list = save();
    console.log( "result_list ==> "+result_list) ;
    
    for( let it of result_list){
        if( result[it[0]]==undefined){
            result[it[0]] = [];
        }
        if(result[it[0]].indexOf( it[1])==-1){
            result[it[0]].push( it[1]) ;
        }
    }

    var tag = 'ahdl';
    if (localStorage.getItem(tag) != null) {     
      data = JSON.parse(localStorage.getItem(tag));
      writeData(data.id,result);
    }    
    // refresh
    location.reload();
}

function getData(usr) {
    console.log('getData ==> '+usr);
    get(child(dbRef, `test_log/${usr}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                //$('#mydata').text(JSON.stringify(snapshot.val()));
                localStorage.setItem('udata', JSON.stringify(snapshot.val()));

            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });
}
function writeData(usr, note) {
    set(ref(database, `test_log/${usr}`), {
        id: usr,
        note: note
    });
}
// writeData();
// writeData('jeff2','cpp','variable','test_fun' , 17);


export default { addClick, getData };