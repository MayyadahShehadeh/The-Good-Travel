'use strict';

let submit=document.getElementById('submit');
let form=document.getElementById('form');
let table=document.getElementById('table');

function travel(placeName,tripPlace,transport){

this.placeName=placeName;
this.tripPlace=tripPlace;
this.tripplaceImg=`./img/${tripPlace}.png`;
this.transport=transport;

travel.all.push(this);

}
travel.all=[];

console.log(travel.all);

submit.addEventListener('click',add);

function add(event){
event.preventDefault();

let placeName=form.placename.value;
let tripPlace=form.tripPlace.value;
let transport=form.transport.value;

new travel(placeName,tripPlace,transport);

localStorage.setItem('travel',JSON.stringify(travel.all));

addTbody();

form.placename.value='';
form.tripPlace.value='';
form.transport.value='';

}

let tbody=document.createElement('tbody');

function addTbody(){
    let data=JSON.parse(localStorage.getItem('travel'));
    
    tbody.innerHTML='';
    for (let i = 0; i < data.length; i++) {
        
        let row=document.createElement('tr');
        tbody.appendChild(row);

        let td=document.createElement('td');
        row.appendChild(td);
        let button=document.createElement('button');
        td.appendChild(button);
button.setAttribute('id',data[i].tripPlace);
button.addEventListener('click',remove);
        button.textContent='X';
//-----------------------------------------------
        let td1=document.createElement('td');
        row.appendChild(td1);
        let img=document.createElement('img');
        td1.appendChild(img);
       img.src=data[i].tripplaceImg;
      //--------------------------------------------
        let td2=document.createElement('td');
        row.appendChild(td2);
        let li=document.createElement('li');
        td2.appendChild(li);
    
            li.textContent='Place Name: '+ data[i].placeName;

            let li1=document.createElement('li');
        td2.appendChild(li1);
            li1.textContent='Trip Place: '+ data[i].tripPlace;
            let li2=document.createElement('li');
        td2.appendChild(li2);
            li2.textContent='Type of Transport: '+ data[i].transport;


    }
    table.appendChild(tbody);

}


function remove(event){
    let data=JSON.parse(localStorage.getItem('travel'));
    if (data){
        let itemname=event.target.id;
        for (let i = 0; i < data.length; i++) {
            if(data[i].tripPlace===itemname){
                
                tbody.deleteRow(i);
                data.splice(i,1);
                travel.all=data;
                localStorage.setItem('travel',JSON.stringify(travel.all));

}    
}
}
}

let clear=document.getElementById('clearAll');
clear.addEventListener('click',clealAll);

function clealAll(event){
var Parent = document.getElementById(tbody);
while(Parent.hasChildNodes())
{
   Parent.removeChild(Parent.firstChild);
}
}

