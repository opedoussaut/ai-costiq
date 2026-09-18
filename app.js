const scenarios = [
  {
    id:"ad-mro", sector:"ad", sectorLabel:"A&D", title:"Aircraft MRO Copilot",
    volume:420000, hours:0.45, rate:95, realization:55, outcome:12.0, cost:4.2,
    outcomeLabel:"Availability, reduced downtime & maintenance spend",
    useCase:"Aircraft MRO",
    costMix:[["Model inference",18],["Tools & retrieval",13],["Compute & data",16],["Human oversight",31],["Platform & operations",22]]
  },
  {
    id:"ad-quality", sector:"ad", sectorLabel:"A&D", title:"Quality & Engineering",
    volume:100000, hours:1.5, rate:100, realization:40, outcome:4.0, cost:1.5,
    outcomeLabel:"Rework, quality escapes & engineering cycle time",
    useCase:"Quality Ops",
    costMix:[["Model inference",21],["Tools & retrieval",16],["Compute & data",11],["Human oversight",29],["Platform & operations",23]]
  },
  {
    id:"ht-fab", sector:"ht", sectorLabel:"HIGH-TECH", title:"Semiconductor Fab Ops",
    volume:250000, hours:0.8, rate:110, realization:50, outcome:24.0, cost:6.5,
    outcomeLabel:"Throughput, material, downtime & yield-related value",
    useCase:"Fab Operations",
    costMix:[["Model inference",15],["Tools & retrieval",11],["Compute & data",28],["Human oversight",24],["Platform & operations",22]]
  },
  {
    id:"ht-aifactory", sector:"ht", sectorLabel:"HIGH-TECH", title:"AI Factory Operations",
    volume:60000, hours:2.0, rate:120, realization:50, outcome:18.0, cost:5.8,
    outcomeLabel:"Compute utilization, incident avoidance & engineering throughput",
    useCase:"AI Factory",
    costMix:[["Model inference",19],["Tools & retrieval",10],["Compute & data",33],["Human oversight",17],["Platform & operations",21]]
  }
];

let active = 0;
let filter = "all";
const $ = id => document.getElementById(id);
const els = {
  tabs:$("scenarioTabs"), title:$("scenarioTitle"), volume:$("volume"), hours:$("hours"), rate:$("rate"), realization:$("realization"), outcome:$("outcome"), cost:$("cost"),
  volumeOut:$("volumeOut"), hoursOut:$("hoursOut"), rateOut:$("rateOut"), realizationOut:$("realizationOut"), outcomeOut:$("outcomeOut"), costOut:$("costOut"),
  netContribution:$("netContribution"), grossValue:$("grossValue"), aiCost:$("aiCost"), valueRatio:$("valueRatio"), capacityHours:$("capacityHours"), capacityValue:$("capacityValue"),
  outcomeValue:$("outcomeValue"), costValue:$("costValue"), netValue:$("netValue"), capacityBar:$("capacityBar"), outcomeBar:$("outcomeBar"), costBar:$("costBar"),
  outcomeLabel:$("outcomeLabel"), costBreakdown:$("costBreakdown"), signalValue:$("signalValue"), signalText:$("signalText"), traceEnterprise:$("traceEnterprise"), traceUseCase:$("traceUseCase")
};

const moneyM = n => new Intl.NumberFormat("en-US",{style:"currency",currency:"EUR",maximumFractionDigits:n>=10?1:2}).format(n)+"M";
const money0 = n => new Intl.NumberFormat("en-US",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(n);
const intFmt = n => new Intl.NumberFormat("en-US",{maximumFractionDigits:0}).format(n);

function scenario(){ return scenarios[active]; }

function renderTabs(){
  els.tabs.innerHTML="";
  scenarios.forEach((s,i)=>{
    if(filter!=="all" && s.sector!==filter) return;
    const b=document.createElement("button");
    b.className="scenario-tab"+(i===active?" active":"");
    b.innerHTML=`<small>${s.sectorLabel}</small><strong>${s.title}</strong>`;
    b.onclick=()=>{active=i;loadScenario();renderTabs();};
    els.tabs.appendChild(b);
  });
}

function setRange(el,value){
  el.value=value;
  const min=+el.min,max=+el.max;
  const pct=((value-min)/(max-min))*100;
  el.style.setProperty("--fill",pct+"%");
}

function loadScenario(){
  const s=scenario();
  els.title.textContent=s.title;
  setRange(els.volume,s.volume);setRange(els.hours,s.hours);setRange(els.rate,s.rate);setRange(els.realization,s.realization);setRange(els.outcome,s.outcome);setRange(els.cost,s.cost);
  els.outcomeLabel.textContent=s.outcomeLabel;
  els.traceUseCase.textContent=s.useCase;
  calculate();
}

function calculate(){
  const volume=+els.volume.value, hours=+els.hours.value, rate=+els.rate.value, realization=+els.realization.value/100, outcome=+els.outcome.value, cost=+els.cost.value;
  [els.volume,els.hours,els.rate,els.realization,els.outcome,els.cost].forEach(el=>setRange(el,+el.value));
  const released=volume*hours;
  const theoretical=released*rate/1e6;
  const capacity=theoretical*realization;
  const gross=capacity+outcome;
  const net=gross-cost;
  const ratio=cost>0?gross/cost:0;
  const netPerTx=net*1e6/volume;

  els.volumeOut.textContent=intFmt(volume);
  els.hoursOut.textContent=hours.toFixed(1)+" h";
  els.rateOut.textContent=money0(rate)+"/h";
  els.realizationOut.textContent=Math.round(realization*100)+"%";
  els.outcomeOut.textContent=moneyM(outcome);
  els.costOut.textContent=moneyM(cost);

  els.netContribution.textContent=moneyM(net);
  els.grossValue.textContent=moneyM(gross);
  els.aiCost.textContent=moneyM(cost);
  els.valueRatio.textContent=ratio.toFixed(1)+"×";
  els.capacityHours.textContent=intFmt(released)+" hours released";
  els.capacityValue.textContent=moneyM(capacity);
  els.outcomeValue.textContent=moneyM(outcome);
  els.costValue.textContent="−"+moneyM(cost);
  els.netValue.textContent=moneyM(net);
  els.signalValue.textContent=money0(netPerTx);
  els.traceEnterprise.textContent=moneyM(net);

  const max=Math.max(capacity,outcome,cost,1);
  els.capacityBar.style.width=(capacity/max*100)+"%";
  els.outcomeBar.style.width=(outcome/max*100)+"%";
  els.costBar.style.width=(cost/max*100)+"%";

  const s=scenario();
  els.signalText.textContent=`${s.title}: modeled net contribution across ${intFmt(volume)} annual transactions after full AI operating cost.`;
  els.costBreakdown.innerHTML=s.costMix.map(([label,pct])=>{
    const amount=cost*pct/100;
    return `<div class="cost-item"><span>${label}</span><div class="cost-meter"><span style="width:${pct}%"></span></div><strong>${moneyM(amount)}</strong></div>`;
  }).join("");
}

["volume","hours","rate","realization","outcome","cost"].forEach(id=>$(id).addEventListener("input",calculate));
$("resetBtn").addEventListener("click",loadScenario);
document.querySelectorAll(".sector-chip").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".sector-chip").forEach(x=>x.classList.remove("active"));
  btn.classList.add("active");filter=btn.dataset.sector;
  const next=scenarios.findIndex(s=>filter==="all"||s.sector===filter);
  if(next>=0) active=next;
  loadScenario();renderTabs();
}));

renderTabs();
loadScenario();