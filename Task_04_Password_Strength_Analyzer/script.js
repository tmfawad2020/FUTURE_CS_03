const passwordInput=document.getElementById("password");
const toggle=document.getElementById("toggle");
const meterBar=document.getElementById("meterBar");
const strength=document.getElementById("strength");
const scoreEl=document.getElementById("score");
const commonPasswords=new Set([
  "password","password1","123456","12345678","123456789","qwerty","qwerty123",
  "admin","admin123","letmein","welcome","welcome1","iloveyou","abc123",
  "monkey","dragon","football","login","passw0rd","password123","1234567890"
]);
const fields={
  length:["lengthIcon","lengthText"],upper:["upperIcon","upperText"],lower:["lowerIcon","lowerText"],
  number:["numberIcon","numberText"],symbol:["symbolIcon","symbolText"],pattern:["patternIcon","patternText"],common:["commonIcon","commonText"]
};

function setCheck(key,ok){
  const [icon,text]=fields[key];
  document.getElementById(icon).textContent=ok?"✓":"✗";
  document.getElementById(text).textContent=ok?"OK":"Needs work";
}
function hasWeakPattern(p){
  const lower=p.toLowerCase();
  if(/(.)\1\1/.test(p)) return true;
  if(/0123|1234|2345|3456|4567|5678|6789|abcd|qwer|asdf/i.test(lower)) return true;
  if(/^(.+)\1$/.test(p)) return true;
  return false;
}
function generatePassword(){
  const upper="ABCDEFGHJKLMNPQRSTUVWXYZ", lower="abcdefghijkmnopqrstuvwxyz", nums="23456789", symbols="!@#$%^&*";
  const all=upper+lower+nums+symbols;
  const arr=[
    upper[Math.floor(Math.random()*upper.length)],
    lower[Math.floor(Math.random()*lower.length)],
    nums[Math.floor(Math.random()*nums.length)],
    symbols[Math.floor(Math.random()*symbols.length)]
  ];
  while(arr.length<18) arr.push(all[Math.floor(Math.random()*all.length)]);
  for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]]}
  return arr.join("");
}
function analyze(){
  const p=passwordInput.value;
  if(!p){
    meterBar.style.width="0";strength.textContent="No password";scoreEl.textContent="0/100";
    Object.keys(fields).forEach(k=>setCheck(k,false));
    document.getElementById("suggestions").innerHTML="<li>Enter a password to see recommendations.</li>";
    return;
  }
  const checks={
    length:p.length>=12,upper:/[A-Z]/.test(p),lower:/[a-z]/.test(p),
    number:/\d/.test(p),symbol:/[^A-Za-z0-9]/.test(p),
    pattern:!hasWeakPattern(p),common:!commonPasswords.has(p.toLowerCase())
  };
  Object.entries(checks).forEach(([k,v])=>setCheck(k,v));
  let score=0;
  score+=Math.min(p.length*4,40);
  score+=checks.upper?12:0; score+=checks.lower?8:0; score+=checks.number?12:0; score+=checks.symbol?15:0;
  score+=checks.pattern?8:-10; score+=checks.common?5:-30;
  const unique=new Set(p).size;
  if(unique>=Math.min(10,p.length)) score+=5;
  score=Math.max(0,Math.min(100,score));
  let label=score<30?"Very weak":score<50?"Weak":score<70?"Moderate":score<85?"Strong":"Very strong";
  strength.textContent=label; scoreEl.textContent=score+"/100"; meterBar.style.width=score+"%";
  const tips=[];
  if(!checks.length) tips.push("Use at least 12 characters; 16+ is better for important accounts.");
  if(!checks.upper) tips.push("Add uppercase letters.");
  if(!checks.lower) tips.push("Add lowercase letters.");
  if(!checks.number) tips.push("Add numbers.");
  if(!checks.symbol) tips.push("Add special characters such as !, @ or #.");
  if(!checks.pattern) tips.push("Avoid repeated characters and predictable sequences such as 1234 or qwer.");
  if(!checks.common) tips.push("This is a commonly used password. Choose something unique.");
  if(checks.length&&checks.upper&&checks.lower&&checks.number&&checks.symbol&&checks.pattern&&checks.common) tips.push("Good job. Keep it unique to this account and use a password manager.");
  document.getElementById("suggestions").innerHTML=tips.map(t=>"<li>"+t+"</li>").join("");
}
toggle.onclick=()=>{const hidden=passwordInput.type==="password";passwordInput.type=hidden?"text":"password";toggle.textContent=hidden?"Hide":"Show"};
passwordInput.addEventListener("input",analyze);
document.getElementById("generate").onclick=()=>{document.getElementById("alternative").textContent=generatePassword()};
analyze();