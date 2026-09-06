// FlowOps Freight — Exact Stitch Implementation Logic

let activeTab = "analyze";
let optimizerMode = "backhaul";

document.addEventListener("DOMContentLoaded", () => {
  renderOptimizerContent();
});

function switchTab(tabId) {
  activeTab = tabId;
  const tabs = ["analyze", "results", "refine", "landing"];

  tabs.forEach(t => {
    const view = document.getElementById(`view-${t}`);
    const topNav = document.getElementById(`top-nav-${t}`);
    const botNav = document.getElementById(`bot-nav-${t}`);

    if (t === tabId) {
      if (view) view.classList.remove("hidden");
      if (topNav) topNav.className = "font-label text-xs font-bold uppercase tracking-widest text-primary border-b-2 border-primary transition-all";
      if (botNav) {
        botNav.className = "flex flex-col items-center justify-center text-primary px-3 py-1 cursor-pointer";
        const icon = botNav.querySelector(".material-symbols-outlined");
        if (icon) icon.style.fontVariationSettings = "'FILL' 1";
      }
    } else {
      if (view) view.classList.add("hidden");
      if (topNav) topNav.className = "font-label text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-all";
      if (botNav) {
        botNav.className = "flex flex-col items-center justify-center text-slate-400 px-3 py-1 hover:text-slate-600 transition-colors cursor-pointer";
        const icon = botNav.querySelector(".material-symbols-outlined");
        if (icon) icon.style.fontVariationSettings = "'FILL' 0";
      }
    }
  });
}

function setOptimizerMode(mode) {
  optimizerMode = mode;
  const backBtn = document.getElementById("opt-btn-backhaul");
  const shipBtn = document.getElementById("opt-btn-shipper");

  if (mode === "backhaul") {
    backBtn.className = "px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest bg-primary text-white";
    shipBtn.className = "px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors";
  } else {
    shipBtn.className = "px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest bg-primary text-white";
    backBtn.className = "px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors";
  }

  renderOptimizerContent();
}

function renderOptimizerContent() {
  const area = document.getElementById("optimizer-content-area");
  if (!area) return;

  if (optimizerMode === "backhaul") {
    area.innerHTML = `
      <div class="space-y-3">
        <div class="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-200">
          <div>
            <div class="text-[10px] font-bold text-slate-400 uppercase">Primary Fleet Target</div>
            <div class="font-headline font-bold text-sm text-slate-900">Truck #204 — Marcus Vance</div>
            <div class="text-[11px] text-slate-500">Atlanta, GA • 53' Dry Van • Empty at 5:30 PM</div>
          </div>
          <span class="px-2 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">AVAILABLE</span>
        </div>

        <div class="space-y-2">
          <div class="text-[10px] font-bold uppercase text-slate-400">Top Recommended Backhaul Load</div>
          <div class="p-3 bg-orange-50/50 border border-orange-200 rounded-lg space-y-1">
            <div class="flex justify-between items-center font-headline font-bold text-xs text-slate-900">
              <span>Atlanta, GA → Chicago, IL</span>
              <span class="text-emerald-600 font-black">+$1,837 Net Profit</span>
            </div>
            <div class="text-[11px] text-slate-600 flex justify-between">
              <span>Shipper: Target Distribution (41,200 lbs)</span>
              <span>Deadhead: <strong>7 miles</strong></span>
            </div>
          </div>
        </div>
      </div>
    `;
  } else {
    area.innerHTML = `
      <div class="space-y-3">
        <div class="text-[10px] font-bold text-slate-400 uppercase">Shipper Tender Broadcast</div>
        <input type="text" value="Atlanta, GA (Home Depot DC)" class="w-full text-xs font-medium bg-slate-50 border-slate-200 rounded-lg p-2 focus:ring-primary focus:border-primary"/>
        <input type="text" value="Chicago, IL (Target fulfillment)" class="w-full text-xs font-medium bg-slate-50 border-slate-200 rounded-lg p-2 focus:ring-primary focus:border-primary"/>
        <div class="grid grid-cols-2 gap-2">
          <input type="text" value="53' Dry Van" class="text-xs bg-slate-50 border-slate-200 rounded-lg p-2"/>
          <input type="text" value="Rate: $2,150" class="text-xs bg-slate-50 border-slate-200 rounded-lg p-2 font-bold text-emerald-700"/>
        </div>
      </div>
    `;
  }
}

function executeAnalysis() {
  showToast("Optimization complete! Matches calculated.", "success");
  switchTab("results");
}

function resetAnalyzerData() {
  renderOptimizerContent();
  showToast("Workspace data cleared.", "info");
}

function openExplainModal() {
  document.getElementById("modal-backdrop").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal-backdrop").classList.add("hidden");
}

function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  const bg = type === "success" ? "bg-slate-900 text-emerald-400 border-emerald-500/40" : "bg-slate-900 text-white border-slate-700";

  toast.className = `${bg} p-3 rounded-xl border shadow-xl text-xs font-medium flex items-center gap-2 pointer-events-auto`;
  toast.innerHTML = `
    <span class="material-symbols-outlined text-sm text-primary">${type === 'success' ? 'check_circle' : 'info'}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3500);
}
