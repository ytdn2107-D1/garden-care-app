import { useState, useRef, useEffect } from "react";

// ─── INITIAL PLANTS ────────────────────────────────────────────────────────
const INITIAL_PLANTS = [
  {
    id:"calamansi",name:"Calamansi",emoji:"🍋",stage:"Seedling",stageNum:1,totalStages:5,
    health:72,color:"#e8a020",light:"#fff8e6",days:12,
    tip:"Only seed leaves visible — no true leaves yet. Totally normal!",
    fertReady:false,fertNote:"Wait for 2–3 true leaves first",
    pruneReady:false,pruneNote:"Way too early — just let it grow",
    stages:["Germination","Seedling","Juvenile","Young Tree","Mature"],
    facts:["🌡️ Prefers 20–30°C","💧 Water every 2–3 days","☀️ Bright indirect light now","🪴 Repot when roots show at bottom"],
    fertLog:null,
    tasks:[{id:1,icon:"💧",label:"Water today",done:false},{id:2,icon:"🌱",label:"Check soil moisture",done:true},{id:3,icon:"☀️",label:"Keep out of harsh sun",done:true}],
    reminders:[
      {id:"c1",icon:"🌿",title:"First Fertilizer Coming",desc:"Once you see 3 true leaves, start ¼ dose citrus fertilizer. Don't rush — feeding too early burns fragile roots.",priority:"high",due:18},
      {id:"c2",icon:"☀️",title:"Gradually Increase Sun",desc:"In about 1 week, start moving to brighter light. Calamansi loves full sun once established — ease into it.",priority:"medium",due:7},
      {id:"c3",icon:"✂️",title:"First Pruning Coming",desc:"When 2–3 true leaves appear, pinch weak side stems to keep one strong main shoot.",priority:"medium",due:14},
      {id:"c4",icon:"🪴",title:"Repot Check at 6 Weeks",desc:"Around 6–8 weeks, check if roots poke out the bottom. Move up ONE pot size only.",priority:"low",due:45},
      {id:"c5",icon:"🐛",title:"Watch for Leaf Miners",desc:"Citrus seedlings attract leaf miners — squiggly tunnels on leaves. Act fast with neem oil.",priority:"low",due:30},
    ],
  },
  {
    id:"basil",name:"Basil",emoji:"🌿",stage:"Leggy Seedling",stageNum:1,totalStages:4,
    health:58,color:"#2e9e5b",light:"#e6f5ed",days:9,
    tip:"Stretching toward light — needs MORE direct sun ASAP!",
    fertReady:false,fertNote:"Fix the light situation before feeding",
    pruneReady:false,pruneNote:"Wait for 3–4 pairs of leaves first",
    stages:["Seedling","Vegetative","Bushy","Harvest-ready"],
    facts:["☀️ Needs 6–8 hrs direct sun","💧 Water when top inch is dry","✂️ Pinch just above a leaf node","❄️ Hates cold drafts below 10°C"],
    fertLog:null,
    tasks:[{id:1,icon:"☀️",label:"Move to sunniest window",done:false},{id:2,icon:"💧",label:"Water at base only",done:false},{id:3,icon:"🔍",label:"Check for leggy stems",done:true}],
    reminders:[
      {id:"b1",icon:"☀️",title:"Urgent: Move to More Sun",desc:"Your basil is already leggy. Move it to your absolute sunniest spot today — south or west-facing window.",priority:"high",due:0},
      {id:"b2",icon:"✂️",title:"Pruning Time Coming Soon",desc:"Once you have 3–4 pairs of leaves, pinch the very TOP set just above a node to force bushy branching.",priority:"high",due:10},
      {id:"b3",icon:"🌸",title:"Remove Flower Buds Immediately!",desc:"The moment any flower buds appear, pinch them off. Flowering stops leaf production.",priority:"high",due:25},
      {id:"b4",icon:"💨",title:"Avoid Cold Drafts",desc:"Keep away from air-con vents and cold windows at night — below 10°C kills basil.",priority:"medium",due:0},
    ],
  },
  {
    id:"chili",name:"Chili",emoji:"🌶️",stage:"Strong Seedling",stageNum:2,totalStages:6,
    health:91,color:"#c0392b",light:"#fdecea",days:18,
    tip:"Looking great! Multiple true leaves forming. Almost ready for topping.",
    fertReady:false,fertNote:"Almost! Just 1–2 more weeks",
    pruneReady:false,pruneNote:"Wait until 4–5 leaf pairs and 15cm tall",
    stages:["Germination","Seedling","Vegetative","Flowering","Fruiting","Harvest"],
    facts:["☀️ Full sun 6–8 hrs/day","🌡️ Best growth at 20–28°C","✂️ Top at 15–20cm for bushiness","💧 Let soil dry slightly between watering"],
    fertLog:null,
    tasks:[{id:1,icon:"💧",label:"Water today",done:true},{id:2,icon:"☀️",label:"Ensure 6hr sunlight",done:false},{id:3,icon:"👀",label:"Monitor new growth",done:true}],
    reminders:[
      {id:"ch1",icon:"✂️",title:"Top Your Chili Soon!",desc:"When it hits 15–20cm with 4–5 leaf pairs, pinch the very top tip. Creates 2 branches = more chilis.",priority:"high",due:12},
      {id:"ch2",icon:"🌿",title:"Start Fertilizing Soon",desc:"In 1–2 weeks, start ¼ dose balanced fertilizer. Switch to high-potassium when flowers appear.",priority:"high",due:10},
      {id:"ch3",icon:"🪴",title:"Repot Before Flowering",desc:"Move to a bigger pot before flowering — cramped roots means fewer chilis.",priority:"medium",due:20},
      {id:"ch4",icon:"🐝",title:"Hand-Pollinate Indoors",desc:"No bees? Use a soft paintbrush to transfer pollen between open flowers every day.",priority:"medium",due:35},
    ],
  },
  {
    id:"strawberry",name:"Strawberry",emoji:"🍓",stage:"Established",stageNum:3,totalStages:5,
    health:85,color:"#d63a5a",light:"#fde8ed",days:3,
    tip:"4 crowns in one pot — healthy! Watch the center for first flowers.",
    fertReady:true,fertNote:"✅ Ready now! Half dose potassium every 2 weeks",
    pruneReady:true,pruneNote:"Remove yellow/dead leaves at base for airflow",
    stages:["Planted","Established","Flowering","Fruiting","Harvest"],
    facts:["☀️ Needs 6+ hrs direct sun daily","💧 Moist but never soggy","🌸 Flowers appear from crown center","🌱 Pot runners = free plants!"],
    fertLog:null,
    tasks:[{id:1,icon:"🌿",label:"Fertilize (½ dose potassium)",done:false},{id:2,icon:"🔍",label:"Check for runners",done:false},{id:3,icon:"☀️",label:"Ensure 6hr+ sunlight",done:false},{id:4,icon:"💧",label:"Check soil isn't soggy",done:true}],
    reminders:[
      {id:"s1",icon:"🌿",title:"Fertilize Now!",desc:"Established and ready to feed. Use potassium-rich fertilizer (tomato feed) at half dose every 2 weeks.",priority:"high",due:0},
      {id:"s2",icon:"🌸",title:"First Flowers Coming!",desc:"Watch the center of each crown — when flowers appear, maximise sunlight immediately.",priority:"high",due:21},
      {id:"s3",icon:"🌱",title:"Watch for Runners",desc:"Long thin stems creeping sideways are runners. Pin the tip into soil for a free new plant.",priority:"medium",due:14},
      {id:"s5",icon:"🐌",title:"Check for Slugs at Night",desc:"Strawberries attract slugs after dark. Check under leaves and around pot edges in the evening.",priority:"medium",due:7},
    ],
  },
  {
    id:"thaibasil",name:"Thai Basil",emoji:"🍃",stage:"Rooted Cutting",stageNum:2,totalStages:4,
    health:78,color:"#5a8a35",light:"#eef5e6",days:7,
    tip:"Market cuttings rooted in water — now establishing in soil. Looking good!",
    fertReady:true,fertNote:"✅ Done today! 1/10 dose 4-5-8. Next feed in ~2 weeks",
    pruneReady:false,pruneNote:"Wait until new center growth appears first",
    stages:["Cutting","Rooted Cutting","Vegetative","Harvest-ready"],
    facts:["🌿 Rooted in water 1+ week before potting — great technique!","☀️ Needs 6+ hrs sun once roots settle","✂️ Always harvest by cutting TOP stems","🌸 Remove purple flower spikes immediately"],
    fertLog:{date:"Today",dose:"1/10 dose",product:"4-5-8 All-Purpose Plant Food",next:"~2 weeks"},
    tasks:[{id:1,icon:"👀",label:"Check for transplant droop",done:false},{id:2,icon:"💧",label:"Mist leaves lightly",done:false},{id:3,icon:"☀️",label:"Keep in bright indirect light",done:true},{id:4,icon:"🔍",label:"Watch for leaf tip burn",done:false}],
    reminders:[
      {id:"tb1",icon:"💧",title:"Watch for Transplant Stress",desc:"Cuttings need 3–5 days to adjust from water to soil. Mist lightly and keep out of harsh sun.",priority:"high",due:0},
      {id:"tb2",icon:"🔥",title:"Check for Fertilizer Burn",desc:"You fertilized at 1/10 dose today. Watch for crispy brown leaf tips over next 3 days — flush with plain water if seen.",priority:"high",due:3},
      {id:"tb3",icon:"✂️",title:"Pinch Tips for Bushiness",desc:"Once new center growth appears (roots established!), pinch top tips of each stem to prevent legginess.",priority:"high",due:10},
      {id:"tb4",icon:"🌸",title:"Remove Purple Flower Spikes!",desc:"Thai basil bolts fast. Remove all purple flower spikes immediately — flowering means flavor loss.",priority:"high",due:21},
    ],
  },
];

const PRIO = {
  high:   { color:"#e84c3d", bg:"#fdecea", label:"Important" },
  medium: { color:"#e8a020", bg:"#fff8e6", label:"Good to know" },
  low:    { color:"#2e9e5b", bg:"#e6f5ed", label:"Tip" },
};
const pOrder = { high:0, medium:1, low:2 };

// ─── SMALL COMPONENTS ──────────────────────────────────────────────────────
const HealthBar = ({value,color}) => (
  <div style={{background:"#e8e8e8",borderRadius:99,height:8,overflow:"hidden"}}>
    <div style={{width:`${value}%`,background:color,height:"100%",borderRadius:99,transition:"width 1s ease"}}/>
  </div>
);
const StageBar = ({current,total}) => (
  <div style={{display:"flex",gap:4}}>
    {Array.from({length:total}).map((_,i)=>(
      <div key={i} style={{flex:1,height:6,borderRadius:99,background:i<current?"rgba(255,255,255,0.9)":"rgba(255,255,255,0.25)"}}/>
    ))}
  </div>
);
const ReadyCard = ({ready,label,note,color}) => (
  <div style={{flex:1,background:ready?color+"18":"#f5f5f5",border:`1.5px solid ${ready?color:"#ddd"}`,borderRadius:12,padding:"10px 12px"}}>
    <div style={{fontWeight:700,fontSize:13,color:ready?color:"#999",marginBottom:3}}>{ready?"✅":"⏳"} {label}</div>
    <div style={{fontSize:11,color:"#666",lineHeight:1.4}}>{note}</div>
  </div>
);

// ─── ADD PLANT SCREEN ──────────────────────────────────────────────────────
function AddPlantScreen({ onBack, onAdd }) {
  const [phase, setPhase] = useState("input"); // input | photo | generating | done
  const [plantName, setPlantName] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [imgSrc, setImgSrc] = useState(null);
  const [imgB64, setImgB64] = useState(null);
  const [mime, setMime] = useState("image/jpeg");
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef();

  const loadPhoto = f => {
    if (!f) return;
    setMime(f.type || "image/jpeg");
    const r = new FileReader();
    r.onload = e => { setImgSrc(e.target.result); setImgB64(e.target.result.split(",")[1]); };
    r.readAsDataURL(f);
  };

  const generate = async () => {
    if (!plantName.trim() && !imgB64) { setError("Please enter a plant name or upload a photo."); return; }
    setPhase("generating"); setError(null);

    const colors = ["#2e9e5b","#e8a020","#c0392b","#d63a5a","#5a8a35","#8e44ad","#2980b9","#16a085","#d35400","#27ae60"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const userContent = [];
    if (imgB64) userContent.push({ type:"image", source:{ type:"base64", media_type:mime, data:imgB64 } });
    userContent.push({ type:"text", text:`Plant name: ${plantName || "unknown — identify from photo"}. Extra info: ${extraInfo || "none"}. Generate full care profile. JSON only.` });

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:2000,
          system:`You are an expert botanist and gardener. Given a plant name and/or photo, generate a complete care profile as a JSON object. Respond ONLY with valid JSON, no markdown, no backticks.

Use this exact structure:
{
  "name": "Common plant name",
  "emoji": "single most relevant emoji for this plant",
  "color": "${randomColor}",
  "light": "very light hex version of color for backgrounds",
  "stage": "Current growth stage name (e.g. Seedling, Established, Juvenile)",
  "stageNum": 1,
  "totalStages": 5,
  "health": 75,
  "days": 1,
  "tip": "One sentence personalised tip about this plant right now",
  "fertReady": false,
  "fertNote": "Fertilizer guidance for current stage",
  "pruneReady": false,
  "pruneNote": "Pruning guidance for current stage",
  "stages": ["Stage1","Stage2","Stage3","Stage4","Stage5"],
  "facts": ["emoji Fact 1","emoji Fact 2","emoji Fact 3","emoji Fact 4"],
  "tasks": [
    {"id":1,"icon":"💧","label":"Task description","done":false},
    {"id":2,"icon":"☀️","label":"Task description","done":false},
    {"id":3,"icon":"👀","label":"Task description","done":false}
  ],
  "reminders": [
    {"id":"r1","icon":"✂️","title":"Reminder title","desc":"Detailed helpful description of what to do and why, 2-3 sentences.","priority":"high","due":0},
    {"id":"r2","icon":"🌿","title":"Reminder title","desc":"Detailed helpful description.","priority":"medium","due":14},
    {"id":"r3","icon":"☀️","title":"Reminder title","desc":"Detailed helpful description.","priority":"low","due:30},
    {"id":"r4","icon":"💧","title":"Reminder title","desc":"Detailed helpful description.","priority":"medium","due":7},
    {"id":"r5","icon":"🪴","title":"Reminder title","desc":"Detailed helpful description.","priority":"low","due":45}
  ]
}

Make all advice specific and practical for a home/container gardener. Generate 4-6 reminders covering the most important care milestones. Use relevant emojis. The "light" field should be a very pale/pastel version of the color field for use as a background.`,
          messages:[{ role:"user", content: userContent }]
        })
      });
      const d = await res.json();
      const txt = (d.content||[]).map(b=>b.text||"").join("");
      const parsed = JSON.parse(txt.replace(/```json|```/g,"").trim());

      // Build final plant object
      const newPlant = {
        ...parsed,
        id: Date.now().toString(),
        fertLog: null,
        photoSrc: imgSrc || null,
        reminders: parsed.reminders.map((r,i) => ({ ...r, id:`new_${Date.now()}_${i}` })),
        tasks: parsed.tasks.map((t,i) => ({ ...t, id: i+1 })),
      };
      setPreview(newPlant);
      setPhase("done");
    } catch(e) {
      setError("Failed to generate plant profile. Please try again.");
      setPhase("input");
    }
  };

  const confirm = () => { onAdd(preview); };

  return (
    <div style={{minHeight:"100vh",background:"#f7f5f0",fontFamily:"'Georgia',serif",maxWidth:420,margin:"0 auto",paddingBottom:40}}>
      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#1a3a1a,#2d6a2d)",padding:"20px 16px 20px",color:"white"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:4}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.15)",border:"none",color:"white",borderRadius:99,width:36,height:36,cursor:"pointer",fontSize:16}}>←</button>
          <div>
            <div style={{fontWeight:700,fontSize:18}}>🌱 Add New Plant</div>
            <div style={{fontSize:12,color:"#7aad7a"}}>Claude AI will fill in all the care details</div>
          </div>
        </div>
      </div>

      {phase === "input" && (
        <div style={{padding:20}}>
          {/* Photo upload */}
          <div style={{background:"white",borderRadius:16,padding:16,marginBottom:12}}>
            <div style={{fontWeight:700,fontSize:14,marginBottom:10}}>📷 Photo (optional but helps!)</div>
            {imgSrc ? (
              <div style={{position:"relative"}}>
                <img src={imgSrc} alt="plant" style={{width:"100%",borderRadius:12,maxHeight:200,objectFit:"cover"}}/>
                <button onClick={()=>{setImgSrc(null);setImgB64(null);}} style={{position:"absolute",top:8,right:8,background:"rgba(0,0,0,0.6)",color:"white",border:"none",borderRadius:99,width:28,height:28,cursor:"pointer",fontSize:14}}>✕</button>
              </div>
            ) : (
              <div onClick={()=>fileRef.current.click()} style={{border:"2px dashed #ddd",borderRadius:12,padding:"24px 16px",textAlign:"center",cursor:"pointer",background:"#fafafa"}}>
                <div style={{fontSize:32,marginBottom:6}}>🌿</div>
                <div style={{fontSize:13,color:"#888"}}>Tap to upload a photo of your plant</div>
                <div style={{fontSize:11,color:"#bbb",marginTop:3}}>Claude will identify it automatically</div>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>loadPhoto(e.target.files[0])}/>
          </div>

          {/* Plant name */}
          <div style={{background:"white",borderRadius:16,padding:16,marginBottom:12}}>
            <div style={{fontWeight:700,fontSize:14,marginBottom:10}}>🌱 Plant Name</div>
            <input
              value={plantName}
              onChange={e=>setPlantName(e.target.value)}
              placeholder="e.g. Monstera, Rose, Tomato, Fiddle Leaf Fig..."
              style={{width:"100%",padding:"12px",borderRadius:12,border:"1.5px solid #e0e0e0",fontSize:14,fontFamily:"'Georgia',serif",boxSizing:"border-box",outline:"none"}}
            />
          </div>

          {/* Extra info */}
          <div style={{background:"white",borderRadius:16,padding:16,marginBottom:16}}>
            <div style={{fontWeight:700,fontSize:14,marginBottom:6}}>📝 Extra Info (optional)</div>
            <div style={{fontSize:12,color:"#888",marginBottom:10}}>Tell Claude anything useful — pot size, where it's kept, how old it is, any problems you've noticed...</div>
            <textarea
              value={extraInfo}
              onChange={e=>setExtraInfo(e.target.value)}
              placeholder="e.g. It's in a small pot indoors, about 3 weeks old, leaves look a bit yellow..."
              rows={3}
              style={{width:"100%",padding:"12px",borderRadius:12,border:"1.5px solid #e0e0e0",fontSize:13,fontFamily:"'Georgia',serif",boxSizing:"border-box",outline:"none",resize:"none"}}
            />
          </div>

          {error && <div style={{background:"#fdecea",borderRadius:12,padding:12,fontSize:13,color:"#e84c3d",marginBottom:12}}>⚠️ {error}</div>}

          <button onClick={generate} style={{background:"linear-gradient(135deg,#1a3a1a,#2d6a2d)",color:"white",border:"none",borderRadius:16,padding:"16px",fontSize:16,fontWeight:700,cursor:"pointer",width:"100%"}}>
            ✨ Generate Care Profile with AI
          </button>

          <div style={{marginTop:16,background:"#f0f9f0",borderRadius:14,padding:"12px 14px",border:"1px solid #c8e6c9"}}>
            <div style={{fontSize:12,color:"#2e7d32",lineHeight:1.6}}>
              💡 <strong>How it works:</strong> Claude will identify your plant and instantly create a personalised care profile — growth stages, daily tasks, smart reminders, fertilizer schedule, pruning tips, and more.
            </div>
          </div>
        </div>
      )}

      {phase === "generating" && (
        <div style={{padding:32,textAlign:"center"}}>
          <div style={{fontSize:64,margin:"20px 0 16px"}}>🌱</div>
          <div style={{fontWeight:700,fontSize:20,marginBottom:8}}>Building your plant profile...</div>
          <div style={{fontSize:14,color:"#888",lineHeight:1.65,marginBottom:24}}>Claude is researching your plant and creating personalised care tips, reminders, and a growth timeline.</div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {["🔍 Identifying plant species...","📋 Generating care schedule...","🔔 Creating smart reminders...","✅ Finalising your profile..."].map((s,i)=>(
              <div key={i} style={{background:"white",borderRadius:12,padding:"10px 14px",fontSize:13,color:"#555",textAlign:"left",boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>{s}</div>
            ))}
          </div>
        </div>
      )}

      {phase === "done" && preview && (
        <div style={{padding:20}}>
          {/* Preview card */}
          <div style={{background:preview.color,borderRadius:20,padding:"20px 18px",color:"white",marginBottom:16,position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:-10,right:-10,fontSize:80,opacity:0.15,lineHeight:1}}>{preview.emoji}</div>
            <div style={{fontSize:11,opacity:0.8,fontFamily:"monospace",letterSpacing:2,textTransform:"uppercase"}}>NEW PLANT ADDED</div>
            <div style={{fontSize:26,fontWeight:700,marginTop:4}}>{preview.emoji} {preview.name}</div>
            <div style={{fontSize:13,opacity:0.9,marginTop:2}}>{preview.stage} · Just added</div>
            <div style={{marginTop:12,background:"rgba(255,255,255,0.2)",borderRadius:12,padding:"10px 12px",fontSize:13}}>
              💡 {preview.tip}
            </div>
          </div>

          {preview.photoSrc && (
            <img src={preview.photoSrc} alt="plant" style={{width:"100%",borderRadius:16,maxHeight:180,objectFit:"cover",marginBottom:12}}/>
          )}

          {/* Facts preview */}
          <div style={{background:"white",borderRadius:16,padding:16,marginBottom:12}}>
            <div style={{fontWeight:700,fontSize:14,marginBottom:10}}>📋 Care Profile Generated</div>
            {preview.facts.map((f,i)=>(
              <div key={i} style={{padding:"9px 11px",marginBottom:6,background:i%2===0?preview.light:"#f9f9f9",borderRadius:10,fontSize:13,color:"#333",borderLeft:`3px solid ${preview.color}`}}>{f}</div>
            ))}
          </div>

          {/* Reminders preview */}
          <div style={{background:"white",borderRadius:16,padding:16,marginBottom:16}}>
            <div style={{fontWeight:700,fontSize:14,marginBottom:10}}>🔔 {preview.reminders.length} Reminders Created</div>
            {preview.reminders.slice(0,3).map((r,i)=>{
              const pc = PRIO[r.priority] || PRIO.medium;
              return(
                <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:10,padding:"10px 0",borderBottom:"1px solid #f2f2f2"}}>
                  <span style={{fontSize:18}}>{r.icon}</span>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:13,color:"#111"}}>{r.title}</div>
                    <div style={{fontSize:11,color:pc.color,fontWeight:700,fontFamily:"monospace",marginTop:2}}>{pc.label} · {r.due===0?"Now":`~${r.due} days`}</div>
                  </div>
                </div>
              );
            })}
            {preview.reminders.length > 3 && (
              <div style={{fontSize:12,color:"#aaa",textAlign:"center"}}>+{preview.reminders.length-3} more reminders</div>
            )}
          </div>

          <button onClick={confirm} style={{background:"linear-gradient(135deg,#1a3a1a,#2d6a2d)",color:"white",border:"none",borderRadius:16,padding:"16px",fontSize:16,fontWeight:700,cursor:"pointer",width:"100%",marginBottom:10}}>
            ✅ Add {preview.name} to My Garden
          </button>
          <button onClick={()=>setPhase("input")} style={{background:"none",color:"#888",border:"1.5px solid #ddd",borderRadius:16,padding:"13px",fontSize:14,cursor:"pointer",width:"100%"}}>
            ↩ Start Over
          </button>
        </div>
      )}
    </div>
  );
}

// ─── REMINDERS SCREEN ──────────────────────────────────────────────────────
function RemindersScreen({ onBack, plants }) {
  const [dismissed, setDismissed] = useState([]);
  const [filter, setFilter] = useState("all");
  const all = plants.flatMap(p => (p.reminders||[]).map(r => ({...r, plantId:p.id, plantName:p.name, plantEmoji:p.emoji, plantColor:p.color})));
  const visible = all
    .filter(r => !dismissed.includes(r.id) && (filter==="all" || r.plantId===filter))
    .sort((a,b) => pOrder[a.priority]-pOrder[b.priority] || a.due-b.due);
  const urgentTotal = all.filter(r => !dismissed.includes(r.id) && r.priority==="high").length;

  return (
    <div style={{minHeight:"100vh",background:"#fafaf8",fontFamily:"'Georgia',serif",maxWidth:420,margin:"0 auto",paddingBottom:40}}>
      <div style={{background:"linear-gradient(135deg,#1a2e1a,#2d5a2d)",padding:"20px 14px 18px",color:"white"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.15)",border:"none",color:"white",borderRadius:99,width:36,height:36,cursor:"pointer",fontSize:16}}>←</button>
          <div>
            <div style={{fontWeight:700,fontSize:18}}>🔔 Garden Reminders</div>
            <div style={{fontSize:11,color:"#7aad7a",fontFamily:"monospace",letterSpacing:1}}>{urgentTotal} IMPORTANT · {visible.length} SHOWING</div>
          </div>
        </div>
        <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:2}}>
          {[{id:"all",label:"All",emoji:"🌱"},...plants.map(p=>({id:p.id,label:p.name,emoji:p.emoji}))].map(f=>(
            <button key={f.id} onClick={()=>setFilter(f.id)} style={{flexShrink:0,padding:"5px 11px",borderRadius:99,border:"none",background:filter===f.id?"white":"rgba(255,255,255,0.15)",color:filter===f.id?"#1a2e1a":"white",fontSize:12,fontWeight:700,cursor:"pointer"}}>
              {f.emoji} {f.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{padding:"14px 14px 0"}}>
        {visible.length===0 && (
          <div style={{textAlign:"center",padding:48,color:"#aaa"}}>
            <div style={{fontSize:48}}>🎉</div>
            <div style={{fontWeight:700,marginTop:12,fontSize:16}}>All caught up!</div>
          </div>
        )}
        {visible.map(r=>{
          const pc = PRIO[r.priority] || PRIO.medium;
          return (
            <div key={r.id} style={{background:"white",borderRadius:15,padding:15,marginBottom:11,boxShadow:"0 2px 8px rgba(0,0,0,0.06)",borderLeft:`4px solid ${pc.color}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                <div style={{display:"flex",alignItems:"center",gap:9}}>
                  <span style={{fontSize:22}}>{r.icon}</span>
                  <div>
                    <div style={{fontWeight:700,fontSize:14,color:"#111"}}>{r.title}</div>
                    <div style={{display:"flex",alignItems:"center",gap:5,marginTop:2}}>
                      <span style={{fontSize:12}}>{r.plantEmoji}</span>
                      <span style={{fontSize:10,color:r.plantColor,fontWeight:700,fontFamily:"monospace"}}>{r.plantName.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4,flexShrink:0,marginLeft:8}}>
                  <span style={{fontSize:10,background:pc.bg,color:pc.color,padding:"2px 8px",borderRadius:99,fontWeight:700,fontFamily:"monospace"}}>{pc.label}</span>
                  <span style={{fontSize:10,color:"#bbb",fontFamily:"monospace"}}>{r.due===0?"NOW":`~${r.due}d`}</span>
                </div>
              </div>
              <div style={{fontSize:13,color:"#555",lineHeight:1.65,marginBottom:10}}>{r.desc}</div>
              <button onClick={()=>setDismissed(p=>[...p,r.id])} style={{fontSize:11,color:"#bbb",background:"none",border:"1px solid #eee",borderRadius:99,padding:"4px 12px",cursor:"pointer"}}>✓ Got it</button>
            </div>
          );
        })}
        {dismissed.length>0 && (
          <button onClick={()=>setDismissed([])} style={{width:"100%",padding:12,background:"none",border:"1.5px dashed #ddd",borderRadius:12,color:"#aaa",fontSize:13,cursor:"pointer",marginTop:4}}>
            ↩ Restore {dismissed.length} dismissed
          </button>
        )}
      </div>
    </div>
  );
}

// ─── AI DIAGNOSIS SCREEN ───────────────────────────────────────────────────
function DiagnoseScreen({ onBack }) {
  const [phase,setPhase]=useState("idle");
  const [imgSrc,setImgSrc]=useState(null);
  const [imgB64,setImgB64]=useState(null);
  const [mime,setMime]=useState("image/jpeg");
  const [result,setResult]=useState(null);
  const [error,setError]=useState(null);
  const fileRef=useRef();

  const loadFile=f=>{
    if(!f)return;
    setMime(f.type||"image/jpeg");
    const r=new FileReader();
    r.onload=e=>{setImgSrc(e.target.result);setImgB64(e.target.result.split(",")[1]);setPhase("preview");};
    r.readAsDataURL(f);
  };
  const diagnose=async()=>{
    setPhase("scanning");setError(null);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",max_tokens:1000,
          system:`Expert plant doctor. Reply ONLY with valid JSON no markdown:
{"plantName":"string","overallHealth":75,"healthLabel":"Good","emoji":"🌿","color":"#2e9e5b","issues":[],"positives":[],"diagnosis":"string","urgency":"Low","actions":["","",""]}`,
          messages:[{role:"user",content:[
            {type:"image",source:{type:"base64",media_type:mime,data:imgB64}},
            {type:"text",text:"Diagnose this plant. JSON only."}
          ]}]
        })
      });
      const d=await res.json();
      const txt=(d.content||[]).map(b=>b.text||"").join("");
      setResult(JSON.parse(txt.replace(/```json|```/g,"").trim()));
      setPhase("result");
    }catch{setError("Diagnosis failed — try a clearer photo.");setPhase("preview");}
  };
  const reset=()=>{setPhase("idle");setImgSrc(null);setImgB64(null);setResult(null);setError(null);};
  const UC={Low:"#2e9e5b",Medium:"#e8a020",High:"#e84c3d",Critical:"#7b0000"};

  return(
    <div style={{minHeight:"100vh",background:"#0d1f0f",color:"white",fontFamily:"'Georgia',serif",maxWidth:420,margin:"0 auto"}}>
      <div style={{padding:"20px 14px 0",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,0.1)",border:"none",color:"white",borderRadius:99,width:36,height:36,cursor:"pointer",fontSize:16}}>←</button>
        <div>
          <div style={{fontWeight:700,fontSize:18}}>🔬 AI Plant Doctor</div>
          <div style={{fontSize:11,color:"#7aad7a",fontFamily:"monospace",letterSpacing:1}}>POWERED BY CLAUDE AI</div>
        </div>
      </div>
      {phase==="idle"&&(
        <div style={{padding:22,textAlign:"center"}}>
          <div style={{fontSize:64,margin:"22px 0 10px"}}>🌿</div>
          <div style={{fontSize:20,fontWeight:700,marginBottom:8}}>Snap Your Plant</div>
          <div style={{fontSize:14,color:"#7aad7a",lineHeight:1.65,marginBottom:26}}>Upload any plant photo for an instant AI health diagnosis and treatment plan.</div>
          <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>loadFile(e.target.files[0])}/>
          <button onClick={()=>fileRef.current.click()} style={{background:"#2e9e5b",color:"white",border:"none",borderRadius:14,padding:"15px",fontSize:16,fontWeight:700,cursor:"pointer",width:"100%"}}>📷 Upload Plant Photo</button>
          <div style={{marginTop:20,display:"flex",flexDirection:"column",gap:8}}>
            {["🟢 Identify unknown plants","🔴 Detect diseases & pests","💛 Spot nutrient deficiencies","💡 Get a personalised treatment plan"].map(t=>(
              <div key={t} style={{background:"rgba(255,255,255,0.05)",borderRadius:12,padding:"11px 14px",fontSize:13,textAlign:"left",color:"#b8d4b8"}}>{t}</div>
            ))}
          </div>
        </div>
      )}
      {phase==="preview"&&(
        <div style={{padding:18}}>
          <img src={imgSrc} alt="plant" style={{width:"100%",borderRadius:18,maxHeight:300,objectFit:"cover"}}/>
          {error&&<div style={{marginTop:12,background:"#4a0000",borderRadius:12,padding:12,fontSize:13,color:"#ff9090"}}>⚠️ {error}</div>}
          <button onClick={diagnose} style={{marginTop:14,background:"#2e9e5b",color:"white",border:"none",borderRadius:14,padding:"14px",fontSize:16,fontWeight:700,cursor:"pointer",width:"100%"}}>🔬 Diagnose This Plant</button>
          <button onClick={reset} style={{marginTop:9,background:"transparent",color:"#7aad7a",border:"1.5px solid #7aad7a",borderRadius:14,padding:"12px",fontSize:14,cursor:"pointer",width:"100%"}}>↩ Try Different Photo</button>
        </div>
      )}
      {phase==="scanning"&&(
        <div style={{padding:22,textAlign:"center"}}>
          <img src={imgSrc} alt="plant" style={{width:"100%",borderRadius:18,maxHeight:240,objectFit:"cover",opacity:0.35,filter:"grayscale(0.5)"}}/>
          <div style={{marginTop:26,fontSize:44}}>🔬</div>
          <div style={{fontWeight:700,fontSize:19,marginTop:12}}>Analyzing your plant...</div>
          <div style={{color:"#7aad7a",fontSize:13,marginTop:6,fontFamily:"monospace"}}>Checking color · Detecting stress · Scanning issues</div>
        </div>
      )}
      {phase==="result"&&result&&(
        <div style={{padding:18,paddingBottom:40}}>
          <img src={imgSrc} alt="plant" style={{width:"100%",borderRadius:18,maxHeight:190,objectFit:"cover"}}/>
          <div style={{marginTop:13,background:"rgba(255,255,255,0.05)",borderRadius:17,padding:17,border:`1.5px solid ${result.color}40`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontSize:11,color:"#7aad7a",fontFamily:"monospace",letterSpacing:1}}>IDENTIFIED AS</div>
                <div style={{fontSize:19,fontWeight:700,marginTop:2}}>{result.emoji} {result.plantName}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:33,fontWeight:800,color:result.color}}>{result.overallHealth}</div>
                <div style={{fontSize:10,color:"#7aad7a",fontFamily:"monospace"}}>HEALTH</div>
              </div>
            </div>
            <div style={{marginTop:10,background:"rgba(255,255,255,0.08)",borderRadius:99,height:8,overflow:"hidden"}}>
              <div style={{width:`${result.overallHealth}%`,background:result.color,height:"100%",borderRadius:99}}/>
            </div>
            <div style={{marginTop:7,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:13,color:result.color,fontWeight:700}}>{result.healthLabel}</span>
              <span style={{fontSize:11,background:(UC[result.urgency]||"#555")+"33",color:UC[result.urgency]||"#aaa",border:`1px solid ${UC[result.urgency]||"#aaa"}`,borderRadius:99,padding:"2px 10px",fontFamily:"monospace",fontWeight:700}}>{result.urgency} URGENCY</span>
            </div>
          </div>
          <div style={{marginTop:10,background:"rgba(255,255,255,0.04)",borderRadius:13,padding:13,borderLeft:`3px solid ${result.color}`}}>
            <div style={{fontSize:11,color:"#7aad7a",fontFamily:"monospace",letterSpacing:1,marginBottom:6}}>DIAGNOSIS</div>
            <div style={{fontSize:14,color:"#ddd",lineHeight:1.7}}>{result.diagnosis}</div>
          </div>
          {result.positives?.length>0&&(
            <div style={{marginTop:10,background:"rgba(46,158,91,0.1)",borderRadius:13,padding:13,border:"1px solid #2e9e5b40"}}>
              <div style={{fontSize:11,color:"#7aad7a",fontFamily:"monospace",letterSpacing:1,marginBottom:8}}>✅ GOOD SIGNS</div>
              {result.positives.map((p,i)=><div key={i} style={{fontSize:13,color:"#aaddaa",marginBottom:5,display:"flex",gap:8}}><span style={{color:"#2e9e5b"}}>●</span>{p}</div>)}
            </div>
          )}
          {result.issues?.length>0&&(
            <div style={{marginTop:10,background:"rgba(232,76,61,0.08)",borderRadius:13,padding:13,border:"1px solid #e84c3d40"}}>
              <div style={{fontSize:11,color:"#e84c3d",fontFamily:"monospace",letterSpacing:1,marginBottom:8}}>⚠️ ISSUES DETECTED</div>
              {result.issues.map((x,i)=><div key={i} style={{fontSize:13,color:"#ffaaaa",marginBottom:5,display:"flex",gap:8}}><span style={{color:"#e84c3d"}}>●</span>{x}</div>)}
            </div>
          )}
          <div style={{marginTop:10,background:"rgba(255,255,255,0.04)",borderRadius:13,padding:13}}>
            <div style={{fontSize:11,color:"#7aad7a",fontFamily:"monospace",letterSpacing:1,marginBottom:10}}>💊 TREATMENT PLAN</div>
            {result.actions?.map((a,i)=>(
              <div key={i} style={{display:"flex",gap:10,marginBottom:10,alignItems:"flex-start"}}>
                <div style={{width:22,height:22,borderRadius:99,background:result.color,color:"white",fontSize:11,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{i+1}</div>
                <div style={{fontSize:13,color:"#ccc",lineHeight:1.55,paddingTop:2}}>{a}</div>
              </div>
            ))}
          </div>
          <button onClick={reset} style={{marginTop:13,background:"#2e9e5b",color:"white",border:"none",borderRadius:13,padding:"13px",fontSize:15,fontWeight:700,cursor:"pointer",width:"100%"}}>🔬 Diagnose Another Plant</button>
        </div>
      )}
    </div>
  );
}

// ─── MAIN APP ──────────────────────────────────────────────────────────────
export default function App() {
  const [plants, setPlants] = useState(INITIAL_PLANTS);
  const [selId, setSelId] = useState("thaibasil");
  const [tasks, setTasks] = useState(() => Object.fromEntries(INITIAL_PLANTS.map(p=>[p.id,p.tasks.map(t=>({...t}))])));
  const [tab, setTab] = useState("care");
  const [screen, setScreen] = useState("home");

  const addPlant = newPlant => {
    setPlants(prev => [...prev, newPlant]);
    setTasks(prev => ({...prev, [newPlant.id]: newPlant.tasks.map(t=>({...t}))}));
    setSelId(newPlant.id);
    setScreen("home");
  };

  const removePlant = id => {
    const remaining = plants.filter(p=>p.id!==id);
    setPlants(remaining);
    setTasks(prev=>{ const n={...prev}; delete n[id]; return n; });
    setSelId(remaining[0]?.id || null);
  };

  if(screen==="diagnose") return <DiagnoseScreen onBack={()=>setScreen("home")}/>;
  if(screen==="reminders") return <RemindersScreen onBack={()=>setScreen("home")} plants={plants}/>;
  if(screen==="add") return <AddPlantScreen onBack={()=>setScreen("home")} onAdd={addPlant}/>;

  const plant = plants.find(p=>p.id===selId);
  if(!plant) return (
    <div style={{textAlign:"center",padding:60,fontFamily:"'Georgia',serif"}}>
      <div style={{fontSize:48}}>🌱</div>
      <div style={{fontWeight:700,fontSize:18,marginTop:12}}>No plants yet!</div>
      <button onClick={()=>setScreen("add")} style={{marginTop:16,background:"#2e9e5b",color:"white",border:"none",borderRadius:14,padding:"14px 24px",fontSize:15,fontWeight:700,cursor:"pointer"}}>+ Add Your First Plant</button>
    </div>
  );

  const myTasks = tasks[selId] || [];
  const doneCount = myTasks.filter(t=>t.done).length;
  const urgentHere = (plant.reminders||[]).filter(r=>r.priority==="high");
  const totalUrgent = plants.flatMap(p=>p.reminders||[]).filter(r=>r.priority==="high").length;
  const toggle = id => setTasks(prev=>({...prev,[selId]:prev[selId].map(t=>t.id===id?{...t,done:!t.done}:t)}));

  return(
    <div style={{fontFamily:"'Georgia',serif",minHeight:"100vh",background:"#f7f5f0",maxWidth:420,margin:"0 auto",paddingBottom:60}}>

      {/* Header */}
      <div style={{background:plant.color,padding:"22px 16px 18px",color:"white",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-15,right:-15,fontSize:90,opacity:0.11,lineHeight:1,pointerEvents:"none"}}>{plant.emoji}</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div style={{flex:1}}>
            <div style={{fontSize:10,fontFamily:"monospace",opacity:0.8,letterSpacing:2,textTransform:"uppercase"}}>🌱 My Garden · {plants.length} plants</div>
            <div style={{fontSize:24,fontWeight:700,marginTop:3,letterSpacing:-0.5}}>{plant.emoji} {plant.name}</div>
            <div style={{fontSize:13,opacity:0.88,marginTop:2}}>{plant.stage} · Day {plant.days}</div>
          </div>
          <button onClick={()=>setScreen("add")} style={{background:"rgba(255,255,255,0.2)",border:"none",color:"white",borderRadius:12,padding:"8px 12px",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0,marginTop:4}}>
            + Add
          </button>
        </div>
        <div style={{marginTop:12}}>
          <div style={{fontSize:10,opacity:0.75,marginBottom:5,fontFamily:"monospace"}}>GROWTH STAGE {plant.stageNum}/{plant.totalStages}</div>
          <StageBar current={plant.stageNum} total={plant.totalStages}/>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:3,fontSize:9,opacity:0.65,fontFamily:"monospace"}}>
            <span>{plant.stages?.[0]}</span><span>{plant.stages?.[plant.stages.length-1]}</span>
          </div>
        </div>
      </div>

      {/* Plant Selector */}
      <div style={{display:"flex",gap:6,padding:"12px 12px 0",overflowX:"auto"}}>
        {plants.map(p=>{
          const pu=(p.reminders||[]).filter(r=>r.priority==="high").length;
          return(
            <button key={p.id} onClick={()=>setSelId(p.id)} style={{flexShrink:0,width:64,padding:"8px 3px",borderRadius:13,border:selId===p.id?`2px solid ${p.color}`:"2px solid #e0e0e0",background:selId===p.id?p.light:"white",cursor:"pointer",textAlign:"center",position:"relative"}}>
              <div style={{fontSize:18}}>{p.emoji}</div>
              <div style={{fontSize:8,fontWeight:700,color:selId===p.id?p.color:"#aaa",marginTop:2,fontFamily:"monospace",lineHeight:1.2}}>{p.name.toUpperCase()}</div>
              {pu>0&&<div style={{position:"absolute",top:3,right:3,width:14,height:14,background:"#e84c3d",borderRadius:99,fontSize:8,color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>{pu}</div>}
            </button>
          );
        })}
        {/* Add plant button in selector */}
        <button onClick={()=>setScreen("add")} style={{flexShrink:0,width:64,padding:"8px 3px",borderRadius:13,border:"2px dashed #ccc",background:"#fafafa",cursor:"pointer",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3}}>
          <div style={{fontSize:20,color:"#bbb"}}>+</div>
          <div style={{fontSize:8,fontWeight:700,color:"#bbb",fontFamily:"monospace"}}>ADD</div>
        </button>
      </div>

      {/* Health Card */}
      <div style={{margin:"12px 12px 0",background:"white",borderRadius:14,padding:14}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <span style={{fontWeight:700,fontSize:14}}>Plant Health</span>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontWeight:800,color:plant.color,fontSize:17}}>{plant.health}%</span>
            <button onClick={()=>{ if(window.confirm(`Remove ${plant.name} from your garden?`)) removePlant(plant.id); }} style={{fontSize:11,color:"#ccc",background:"none",border:"1px solid #eee",borderRadius:99,padding:"3px 10px",cursor:"pointer"}}>Remove</button>
          </div>
        </div>
        <HealthBar value={plant.health} color={plant.color}/>
        <div style={{marginTop:10,background:plant.light||"#f5f5f5",borderRadius:10,padding:"9px 11px",fontSize:13,color:"#444",lineHeight:1.55,borderLeft:`3px solid ${plant.color}`}}>
          💡 {plant.tip}
        </div>
      </div>

      {/* Fertilizer Log */}
      {plant.fertLog&&(
        <div style={{margin:"9px 12px 0",background:"#f0f5e8",borderRadius:13,padding:"12px 14px",border:"1.5px solid #5a8a35"}}>
          <div style={{fontWeight:700,fontSize:13,color:"#5a8a35",marginBottom:8}}>🌿 Fertilizer Log</div>
          <div style={{display:"flex",gap:14}}>
            {[["DATE",plant.fertLog.date],["DOSE",plant.fertLog.dose],["NEXT",plant.fertLog.next]].map(([k,v])=>(
              <div key={k}><div style={{fontSize:9,color:"#999",fontFamily:"monospace"}}>{k}</div><div style={{fontSize:13,fontWeight:600,marginTop:2}}>{v}</div></div>
            ))}
          </div>
          <div style={{fontSize:11,color:"#777",marginTop:6}}>Product: {plant.fertLog.product}</div>
        </div>
      )}

      {/* Reminders Banner */}
      <div onClick={()=>setScreen("reminders")} style={{margin:"9px 12px 0",background:"linear-gradient(135deg,#1a2e1a,#2d5a2d)",borderRadius:14,padding:"13px 15px",cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
        <div style={{position:"relative"}}>
          <span style={{fontSize:24}}>🔔</span>
          {totalUrgent>0&&<div style={{position:"absolute",top:-3,right:-5,width:16,height:16,background:"#e84c3d",borderRadius:99,fontSize:9,color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>{totalUrgent}</div>}
        </div>
        <div style={{flex:1}}>
          <div style={{color:"white",fontWeight:700,fontSize:14}}>Garden Reminders</div>
          <div style={{color:"#7aad7a",fontSize:12,marginTop:1}}>{urgentHere.length>0?`⚠️ ${urgentHere.length} important for your ${plant.name}`:`${(plant.reminders||[]).length} tips for your ${plant.name}`}</div>
        </div>
        <div style={{color:"#7aad7a",fontSize:18}}>→</div>
      </div>

      {/* AI Doctor Banner */}
      <div onClick={()=>setScreen("diagnose")} style={{margin:"8px 12px 0",background:"linear-gradient(135deg,#0d1f2e,#1a3a5c)",borderRadius:14,padding:"13px 15px",cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
        <span style={{fontSize:23}}>🔬</span>
        <div style={{flex:1}}>
          <div style={{color:"white",fontWeight:700,fontSize:14}}>AI Plant Doctor</div>
          <div style={{color:"#7aadd4",fontSize:12,marginTop:1}}>Upload a photo → instant diagnosis</div>
        </div>
        <div style={{color:"#7aadd4",fontSize:18}}>→</div>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",margin:"12px 12px 0",background:"#ede9e2",borderRadius:11,padding:4}}>
        {[["care","🗓 Today"],["facts","📖 Facts"]].map(([t,label])=>(
          <button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"8px",borderRadius:8,border:"none",background:tab===t?"white":"transparent",fontWeight:700,fontSize:12,color:tab===t?plant.color:"#999",cursor:"pointer",boxShadow:tab===t?"0 1px 4px rgba(0,0,0,0.08)":"none",transition:"all 0.2s",fontFamily:"monospace",textTransform:"uppercase",letterSpacing:1}}>
            {label}
          </button>
        ))}
      </div>

      {tab==="care"&&(
        <>
          <div style={{margin:"11px 12px 0",background:"white",borderRadius:14,padding:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:11}}>
              <span style={{fontWeight:700,fontSize:14}}>Today's Tasks</span>
              <span style={{fontSize:12,color:plant.color,fontWeight:700,fontFamily:"monospace"}}>{doneCount}/{myTasks.length} done</span>
            </div>
            {myTasks.map(t=>(
              <div key={t.id} onClick={()=>toggle(t.id)} style={{display:"flex",alignItems:"center",gap:11,padding:"10px 0",borderBottom:"1px solid #f2f2f2",cursor:"pointer",opacity:t.done?0.42:1,transition:"opacity 0.2s"}}>
                <div style={{width:22,height:22,borderRadius:99,border:`2px solid ${t.done?plant.color:"#ddd"}`,background:t.done?plant.color:"white",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  {t.done&&<span style={{color:"white",fontSize:11}}>✓</span>}
                </div>
                <span style={{fontSize:18}}>{t.icon}</span>
                <span style={{fontSize:14,textDecoration:t.done?"line-through":"none",color:t.done?"#bbb":"#333"}}>{t.label}</span>
              </div>
            ))}
          </div>

          <div style={{margin:"10px 12px 0"}}>
            <div style={{fontWeight:700,fontSize:13,marginBottom:8,color:"#555"}}>Readiness Check</div>
            <div style={{display:"flex",gap:8}}>
              <ReadyCard ready={plant.fertReady} label="Fertilize" note={plant.fertNote} color={plant.color}/>
              <ReadyCard ready={plant.pruneReady} label="Prune" note={plant.pruneNote} color={plant.color}/>
            </div>
          </div>

          {urgentHere.length>0&&(
            <div style={{margin:"10px 12px 0"}}>
              <div style={{fontWeight:700,fontSize:13,marginBottom:8,color:"#555"}}>⚠️ Important Right Now</div>
              {urgentHere.slice(0,2).map(r=>(
                <div key={r.id} onClick={()=>setScreen("reminders")} style={{background:"white",borderRadius:13,padding:"12px 13px",marginBottom:8,borderLeft:"4px solid #e84c3d",cursor:"pointer"}}>
                  <div style={{fontWeight:700,fontSize:13,color:"#111"}}>{r.icon} {r.title}</div>
                  <div style={{fontSize:12,color:"#666",marginTop:4,lineHeight:1.5}}>{r.desc.slice(0,90)}…</div>
                </div>
              ))}
              {urgentHere.length>2&&(
                <button onClick={()=>setScreen("reminders")} style={{width:"100%",padding:"9px",background:"none",border:"1.5px dashed #ddd",borderRadius:11,color:"#999",fontSize:13,cursor:"pointer"}}>
                  +{urgentHere.length-2} more reminders →
                </button>
              )}
            </div>
          )}
        </>
      )}

      {tab==="facts"&&(
        <div style={{margin:"11px 12px 0",background:"white",borderRadius:14,padding:14}}>
          <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>Quick Facts</div>
          {(plant.facts||[]).map((f,i)=>(
            <div key={i} style={{padding:"11px",marginBottom:8,background:i%2===0?(plant.light||"#f5f5f5"):"#f9f9f9",borderRadius:11,fontSize:14,color:"#333",borderLeft:`3px solid ${plant.color}`}}>{f}</div>
          ))}
          <div style={{marginTop:16,fontWeight:700,fontSize:14,marginBottom:10}}>Growth Journey</div>
          {(plant.stages||[]).map((s,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
              <div style={{width:26,height:26,borderRadius:99,background:i<plant.stageNum?plant.color:"#e0e0e0",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:10,fontWeight:700,flexShrink:0}}>
                {i<plant.stageNum?"✓":i+1}
              </div>
              <span style={{fontSize:13,fontWeight:i===plant.stageNum-1?700:400,color:i===plant.stageNum-1?plant.color:i<plant.stageNum?"#bbb":"#555"}}>
                {s}{i===plant.stageNum-1?" ← You are here":""}
              </span>
            </div>
          ))}
        </div>
      )}

      <div style={{textAlign:"center",marginTop:22,fontSize:10,color:"#ccc",fontFamily:"monospace"}}>PlantPal 🌱</div>
    </div>
  );
}
