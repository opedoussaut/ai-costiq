const scenarios = [
  {
    id:"auto-production", sector:"auto", sectorLabel:"AUTOMOTIVE", title:"Production & Quality",
    volume:1200000, hours:0.35, rate:85, realization:55, outcome:38.0, cost:8.5,
    outcomeLabel:"Scrap, rework, throughput & downtime avoided",
    useCase:"Production & Quality", transactionId:"AUTO-Q-001",
    telemetry:{totalTokens:182400,cachedPct:48,toolCalls:14,latency:21.8,retries:1},
    costMix:[["Model inference",17],["Tools & retrieval",12],["Compute & data",22],["Human oversight",27],["Platform & operations",22]]
  },
  {
    id:"auto-warranty", sector:"auto", sectorLabel:"AUTOMOTIVE", title:"Warranty & Field Quality",
    volume:180000, hours:1.2, rate:95, realization:50, outcome:22.0, cost:4.0,
    outcomeLabel:"Warranty leakage, repeat failures & case cycle time",
    useCase:"Warranty & Field Quality", transactionId:"AUTO-W-001",
    telemetry:{totalTokens:246800,cachedPct:42,toolCalls:19,latency:28.6,retries:2},
    costMix:[["Model inference",23],["Tools & retrieval",18],["Compute & data",12],["Human oversight",28],["Platform & operations",19]]
  },
  {
    id:"ad-mro", sector:"ad", sectorLabel:"A&D", title:"Aircraft MRO Copilot",
    volume:420000, hours:0.45, rate:95, realization:55, outcome:12.0, cost:4.2,
    outcomeLabel:"Availability, reduced downtime & maintenance spend",
    useCase:"Aircraft MRO", transactionId:"MRO-001",
    telemetry:{totalTokens:214600,cachedPct:51,toolCalls:17,latency:26.2,retries:1},
    costMix:[["Model inference",18],["Tools & retrieval",13],["Compute & data",16],["Human oversight",31],["Platform & operations",22]]
  },
  {
    id:"ad-quality", sector:"ad", sectorLabel:"A&D", title:"Quality & Engineering",
    volume:100000, hours:1.5, rate:100, realization:40, outcome:4.0, cost:1.5,
    outcomeLabel:"Rework, quality escapes & engineering cycle time",
    useCase:"Quality Operations", transactionId:"NCR-001",
    telemetry:{totalTokens:168200,cachedPct:46,toolCalls:12,latency:18.9,retries:0},
    costMix:[["Model inference",21],["Tools & retrieval",16],["Compute & data",11],["Human oversight",29],["Platform & operations",23]]
  },
  {
    id:"ht-humanoid", sector:"ht", sectorLabel:"HIGH-TECH", title:"Humanoid Robot Operations",
    volume:280000, hours:0.55, rate:90, realization:55, outcome:22.0, cost:6.8,
    outcomeLabel:"Robot uptime, task coverage, supervision & deployment efficiency",
    useCase:"Humanoid Robot Operations", transactionId:"HUM-OPS-001",
    telemetry:{totalTokens:312500,cachedPct:39,toolCalls:23,latency:34.4,retries:2},
    costMix:[["Model inference",14],["Simulation & compute",31],["Tools & retrieval",13],["Human oversight",24],["Platform & operations",18]]
  },
  {
    id:"ht-aifactory", sector:"ht", sectorLabel:"HIGH-TECH", title:"AI Factory Operations",
    volume:60000, hours:2.0, rate:120, realization:50, outcome:18.0, cost:5.8,
    outcomeLabel:"Compute utilization, incident avoidance & engineering throughput",
    useCase:"AI Factory Operations", transactionId:"AIF-OPS-001",
    telemetry:{totalTokens:384400,cachedPct:56,toolCalls:27,latency:31.1,retries:1},
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
  outcomeLabel:$("outcomeLabel"), costBreakdown:$("costBreakdown"), signalValue:$("signalValue"), signalText:$("signalText"),
  heroScenario:$("heroScenario"),heroNet:$("heroNet"),heroGross:$("heroGross"),heroCost:$("heroCost"),heroRatio:$("heroRatio"),
  gainSentence:$("gainSentence"),gainCost:$("gainCost"),gainValue:$("gainValue"),
  techNet:$("techNet"),traceUseCase:$("traceUseCase"),transactionId:$("transactionId"),totalTokens:$("totalTokens"),cachedTokens:$("cachedTokens"),toolCalls:$("toolCalls"),latency:$("latency"),retries:$("retries"),costPerRun:$("costPerRun"),traceCode:$("traceCode"),techCostBreakdown:$("techCostBreakdown")
};

const moneyM = n => new Intl.NumberFormat("en-US",{style:"currency",currency:"EUR",maximumFractionDigits:n>=10?1:2}).format(n)+"M";
const money0 = n => new Intl.NumberFormat("en-US",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(n);
const money2 = n => new Intl.NumberFormat("en-US",{style:"currency",currency:"EUR",minimumFractionDigits:2,maximumFractionDigits:2}).format(n);
const intFmt = n => new Intl.NumberFormat("en-US",{maximumFractionDigits:0}).format(n);
const scenario = () => scenarios[active];

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
  els.transactionId.textContent=s.transactionId;
  calculate();
}

function renderCostBreakdown(target,cost,mix){
  target.innerHTML=mix.map(([label,pct])=>{
    const amount=cost*pct/100;
    return `<div class="cost-item"><span>${label}</span><div class="cost-meter"><span style="width:${pct}%"></span></div><strong>${moneyM(amount)}</strong></div>`;
  }).join("");
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
  const fullCostPerRun=cost*1e6/volume;

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

  els.heroScenario.textContent=scenario().title;
  els.heroNet.textContent=moneyM(net);
  els.heroGross.textContent=moneyM(gross);
  els.heroCost.textContent=moneyM(cost);
  els.heroRatio.textContent=ratio.toFixed(1)+"×";
  els.gainSentence.textContent=`€1 of AI cost creates €${ratio.toFixed(1)} of business value.`;
  els.gainCost.textContent=moneyM(cost);
  els.gainValue.textContent=moneyM(gross);

  const max=Math.max(capacity,outcome,cost,1);
  els.capacityBar.style.width=(capacity/max*100)+"%";
  els.outcomeBar.style.width=(outcome/max*100)+"%";
  els.costBar.style.width=(cost/max*100)+"%";

  const s=scenario();
  els.signalText.textContent=`${s.title}: modeled net contribution across ${intFmt(volume)} annual transactions after full AI operating cost.`;
  renderCostBreakdown(els.costBreakdown,cost,s.costMix);
  renderCostBreakdown(els.techCostBreakdown,cost,s.costMix);

  els.techNet.textContent=moneyM(net);
  els.traceUseCase.textContent=s.useCase;
  els.transactionId.textContent=s.transactionId;
  els.totalTokens.textContent=intFmt(s.telemetry.totalTokens);
  els.cachedTokens.textContent=s.telemetry.cachedPct+"%";
  els.toolCalls.textContent=s.telemetry.toolCalls;
  els.latency.textContent=s.telemetry.latency.toFixed(1)+"s";
  els.retries.textContent=s.telemetry.retries;
  els.costPerRun.textContent=money2(fullCostPerRun);
  els.traceCode.textContent=
`resource.service.name        = "codex"
costiq.business.transaction.id = "${s.transactionId}"
costiq.business.process        = "${s.useCase}"
costiq.evidence.status         = "MODELED"

gen_ai.usage.total_tokens       = ${s.telemetry.totalTokens}
costiq.cache.hit_ratio          = ${(s.telemetry.cachedPct/100).toFixed(2)}
costiq.tool.calls               = ${s.telemetry.toolCalls}
costiq.run.latency_seconds      = ${s.telemetry.latency.toFixed(1)}
costiq.run.retries              = ${s.telemetry.retries}
costiq.cost.allocated_eur       = ${fullCostPerRun.toFixed(2)}

# Public demo telemetry is synthetic.
# Live Codex OTel ingestion is the next step.`;
}

function switchView(view){
  document.querySelectorAll(".view-panel").forEach(p=>p.classList.toggle("active",p.dataset.panel===view));
  document.querySelectorAll(".nav-view").forEach(b=>b.classList.toggle("active",b.dataset.view===view));
  if(view==="technical") document.querySelector('[data-panel="technical"]').scrollIntoView({behavior:"smooth",block:"start"});
  else document.querySelector('[data-panel="economics"]').scrollIntoView({behavior:"smooth",block:"start"});
}

["volume","hours","rate","realization","outcome","cost"].forEach(id=>$(id).addEventListener("input",calculate));
$("resetBtn").addEventListener("click",loadScenario);

document.querySelectorAll(".sector-chip").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".sector-chip").forEach(x=>x.classList.remove("active"));
  btn.classList.add("active");
  filter=btn.dataset.sector;
  const next=scenarios.findIndex(s=>filter==="all"||s.sector===filter);
  if(next>=0) active=next;
  loadScenario();renderTabs();
}));

document.querySelectorAll("[data-view]").forEach(btn=>btn.addEventListener("click",()=>switchView(btn.dataset.view)));

renderTabs();
loadScenario();