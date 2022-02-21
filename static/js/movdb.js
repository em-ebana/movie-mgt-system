

document.getElementsByClassName("tablink")[0].click();
        
function openCity(evt, cityName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].classList.remove("w3-light-grey");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.classList.add("w3-light-grey");
}
// this function controls the remaining part of the user contact information from the general contact information

document.getElementsByClassName("tablink-user")[0].click();//buttons general class name

function innerdata(evt, idName) {
  var ii, xx, tablinkss;
  xx = document.getElementsByClassName("user-data");// section to be displayed general class name user-data
  for (ii = 0; ii < xx.length; ii++) {
    xx[ii].style.display = "none";
  }
  tablinkss = document.getElementsByClassName("tablink-user");//tablink-user
  for (ii = 0; ii < xx.length; ii++) {
    tablinkss[ii].classList.remove("w3-light-grey");
  }
  document.getElementById(idName).style.display = "block";
  evt.currentTarget.classList.add("w3-light-grey");
}

document.getElementsByClassName("tablink-update")[0].click();//buttons general class name

function updatedata(evt, idName) {
  var ii, xx, tablinkss;
  xx = document.getElementsByClassName("update-data");// section to be displayed general class name user-data
  for (ii = 0; ii < xx.length; ii++) {
    xx[ii].style.display = "none";
  }
  tablinkss = document.getElementsByClassName("tablink-update");//tablink-user
  for (ii = 0; ii < xx.length; ii++) {
    tablinkss[ii].classList.remove("w3-light-grey");
  }
  document.getElementById(idName).style.display = "block";
  evt.currentTarget.classList.add("w3-light-grey");
}

// *********** user defined functions>*********************
// document.getElementById('btn').addEventListener('click', (e) => {
//          e.preventDefault();
// });
//  let rec = <%=response.locals.rec%>;
// // document.getElementById('rec-msg').innerText = rec;
// let trial = rec;
// console.log(trial);
// var namen = '<%= rec %>'
// console.log(namen);

// let url="http://localhost:3000/";
//         fetch(url).then(response => response.json())
//         .then( (result) => {
//             console.log('success:', result)
//             let div=document.getElementById('rec-msg');
//             div.innerHTML=`notice: ${result.recs}<br/>message: ${result.result_rec}`;
//         })
//         .catch(error => console.log('error:', error));