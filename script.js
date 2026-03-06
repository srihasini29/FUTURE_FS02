let leads=JSON.parse(localStorage.getItem("leads"))||[];

function addLead(){

let name=document.getElementById("name").value;
let email=document.getElementById("email").value;
let source=document.getElementById("source").value;

if(name==""||email==""){
alert("Enter details");
return;
}

let lead={
name:name,
email:email,
source:source,
status:"New",
notes:""
};

leads.push(lead);

saveData();
displayLeads();
updateStats();

}

function displayLeads(){

let table=document.getElementById("leadTable");
table.innerHTML="";

leads.forEach((lead,index)=>{

table.innerHTML+=`
<tr>

<td>${lead.name}</td>
<td>${lead.email}</td>
<td>${lead.source}</td>

<td>
<select onchange="changeStatus(${index},this.value)">
<option ${lead.status=="New"?"selected":""}>New</option>
<option ${lead.status=="Contacted"?"selected":""}>Contacted</option>
<option ${lead.status=="Converted"?"selected":""}>Converted</option>
</select>
</td>

<td>
<button onclick="addNotes(${index})">Notes</button>
</td>

<td>
<button onclick="editLead(${index})">Edit</button>
<button onclick="deleteLead(${index})">Delete</button>
</td>

</tr>
`;

});

}

function changeStatus(index,value){
leads[index].status=value;
saveData();
updateStats();
}

function deleteLead(index){
leads.splice(index,1);
saveData();
displayLeads();
updateStats();
}

function editLead(index){

let name=prompt("Edit Name",leads[index].name);
let email=prompt("Edit Email",leads[index].email);
let source=prompt("Edit Source",leads[index].source);

if(name&&email){
leads[index].name=name;
leads[index].email=email;
leads[index].source=source;
saveData();
displayLeads();
}

}

function addNotes(index){

let note=prompt("Enter Notes",leads[index].notes);

if(note!=null){
leads[index].notes=note;
saveData();
}

}

function searchLead(){

let input=document.getElementById("search").value.toLowerCase();
let rows=document.querySelectorAll("#leadTable tr");

rows.forEach(row=>{
row.style.display=row.innerText.toLowerCase().includes(input)?"":"none";
});

}

function updateStats(){

document.getElementById("total").innerText=leads.length;

document.getElementById("contacted").innerText=
leads.filter(l=>l.status=="Contacted").length;

document.getElementById("converted").innerText=
leads.filter(l=>l.status=="Converted").length;

}

function exportCSV(){

let csv="Name,Email,Source,Status\n";

leads.forEach(l=>{
csv+=`${l.name},${l.email},${l.source},${l.status}\n`;
});

let blob=new Blob([csv],{type:"text/csv"});
let url=URL.createObjectURL(blob);

let a=document.createElement("a");
a.href=url;
a.download="leads.csv";
a.click();

}

function toggleDark(){
document.body.classList.toggle("dark");
}

function saveData(){
localStorage.setItem("leads",JSON.stringify(leads));
}

displayLeads();
updateStats();