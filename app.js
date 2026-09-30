const initialLearners = Array.from({length:9},(_,i)=>({
  id:i+1,name:`Learner ${i+1}`,code:`G10-BIO-${String(i+1).padStart(2,"0")}`,
  topic:"",proposal:"",materials:"",method:"",observations:"",findings:"",
  discussion:"",conclusion:"",reflection:"",teacherComment:"",score:"",photo:""
}));

let data = JSON.parse(localStorage.getItem("bioPortfolio") || "null") || {
  projectTitle:"Grade 10 Biology Project Assessment",
  projectDescription:"Documenting project work, evidence, progress and assessment.",
  learners:initialLearners
};

const $=s=>document.querySelector(s);
const save=()=>localStorage.setItem("bioPortfolio",JSON.stringify(data));

function renderHome(){
  $("#homeView").classList.remove("hidden"); $("#portfolioView").classList.add("hidden"); $("#adminView").classList.add("hidden");
  $("#learnerCount").textContent=`${data.learners.length} learners`;
  $("#projectDescription").textContent=data.projectDescription;
  document.title=data.projectTitle;
  $("#learnerGrid").innerHTML=data.learners.map(l=>`
    <article class="card learner-card" onclick="openPortfolio(${l.id})">
      <div class="avatar">${l.photo?`<img src="${l.photo}" class="avatar">`:l.name.split(" ").map(x=>x[0]).join("").slice(0,2)}</div>
      <h3>${esc(l.name)}</h3><p class="muted">${esc(l.code)}</p>
      <span class="pill">${l.score?`Score: ${esc(l.score)}`:"Portfolio in progress"}</span>
    </article>`).join("");
}
function openPortfolio(id){
  const l=data.learners.find(x=>x.id===id); if(!l)return;
  $("#homeView").classList.add("hidden");$("#portfolioView").classList.remove("hidden");$("#adminView").classList.add("hidden");
  $("#portfolio").innerHTML=`
    <div class="card"><h1>${esc(l.name)}</h1><p class="muted">${esc(l.code)}</p></div>
    <div class="card"><h2>Project information</h2><p><b>Topic:</b> ${esc(l.topic)||"Not yet added"}</p><p><b>Proposal:</b> ${esc(l.proposal)||"Not yet added"}</p></div>
    ${["materials","method","observations","findings","discussion","conclusion","reflection","teacherComment"].map(k=>`<div class="card"><h2>${label(k)}</h2><p>${nl(esc(l[k]||"Not yet added"))}</p></div>`).join("")}
    <div class="card"><h2>Assessment</h2><p><b>Score/grade:</b> ${esc(l.score)||"Not yet entered"}</p></div>`;
}
function renderAdmin(){
  $("#homeView").classList.add("hidden");$("#portfolioView").classList.add("hidden");$("#adminView").classList.remove("hidden");
  $("#projectTitleInput").value=data.projectTitle;$("#projectDescInput").value=data.projectDescription;
  $("#adminLearners").innerHTML=data.learners.map(l=>`
    <div class="admin-row">
      <div><h3>${esc(l.name)}</h3><span class="muted">${esc(l.code)}</span></div>
      <button class="primary" onclick="editLearner(${l.id})">Edit portfolio</button>
    </div>`).join("");
}
function editLearner(id){
  const l=data.learners.find(x=>x.id===id);
  const fields=["name","code","topic","proposal","materials","method","observations","findings","discussion","conclusion","reflection","teacherComment","score"];
  const values=fields.map(k=>`<label>${label(k)}<textarea id="f_${k}" rows="${["name","code","topic","score"].includes(k)?1:3}">${esc(l[k]||"")}</textarea></label>`).join("");
  $("#portfolio").innerHTML=`<div class="card"><h2>Edit ${esc(l.name)}</h2>${values}<button class="primary" id="saveLearner">Save learner</button></div>`;
  $("#adminView").classList.add("hidden");$("#portfolioView").classList.remove("hidden");
  $("#saveLearner").onclick=()=>{fields.forEach(k=>l[k]=$("#f_"+k).value);save();renderAdmin();};
}
function label(k){return ({teacherComment:"Teacher's assessment/comment",reflection:"Learner reflection",observations:"Observations / data",findings:"Findings / results",proposal:"Project proposal",materials:"Materials / resources",method:"Method / procedure",discussion:"Discussion",conclusion:"Conclusion",topic:"Project topic",score:"Assessment score / grade",name:"Learner name",code:"Learner code"}[k]||k)}
function esc(v){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function nl(v){return String(v).replace(/\n/g,"<br>")}

$("#adminBtn").onclick=()=>{$("#loginModal").classList.remove("hidden")};
$("#closeLogin").onclick=()=>{$("#loginModal").classList.add("hidden");renderAdmin()};
$("#backBtn").onclick=renderHome;$("#adminBackBtn").onclick=renderHome;
$("#signOutBtn").onclick=renderHome;
$("#saveProjectBtn").onclick=()=>{data.projectTitle=$("#projectTitleInput").value;data.projectDescription=$("#projectDescInput").value;save();alert("Project details saved.");};
$("#addLearnerBtn").onclick=()=>{const id=Math.max(0,...data.learners.map(x=>x.id))+1;data.learners.push({id,name:`Learner ${id}`,code:`G10-BIO-${String(id).padStart(2,"0")}`,topic:"",proposal:"",materials:"",method:"",observations:"",findings:"",discussion:"",conclusion:"",reflection:"",teacherComment:"",score:"",photo:""});save();renderAdmin();};
renderHome();
