import { useState, useMemo, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";

const Key = ({ children, mod }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    minWidth: 28, height: 26, padding: "0 7px",
    background: mod ? "rgba(96,165,250,.12)" : "#1e293b",
    border: `1px solid ${mod ? "rgba(96,165,250,.35)" : "#334155"}`,
    borderRadius: 5, fontFamily: "monospace",
    fontSize: 12, fontWeight: 700, color: mod ? "#60a5fa" : "#e2e8f0",
    boxShadow: "0 2px 0 #0f172a", whiteSpace: "nowrap", userSelect: "none",
  }}>{children}</span>
);

const Plus = () => <span style={{ color: "#64748b", fontSize: 10, margin: "0 2px" }}>+</span>;

const Shortcut = ({ keys, desc, note }) => (
  <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, padding: "9px 12px", marginBottom: 5 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 3, flexShrink: 0 }}>
        {keys.map((k, i) => (
          <span key={i} style={{ display: "contents" }}>
            {i > 0 && <Plus />}
            <Key mod={["⌘","⌥","⌃","⇧"].includes(k)}>{k}</Key>
          </span>
        ))}
      </div>
      <div style={{ flex: 1, minWidth: 140, fontSize: 13, color: "#e2e8f0" }}>{desc}</div>
    </div>
    {note && <div style={{ fontSize: 11.5, color: "#94a3b8", marginTop: 5, paddingLeft: 8, borderLeft: "2px solid #334155", fontStyle: "italic" }}>{note}</div>}
  </div>
);

const Tip = ({ icon, children, variant = "info" }) => {
  const colors = { info: { bg: "rgba(96,165,250,.07)", bd: "rgba(96,165,250,.22)" }, warn: { bg: "rgba(250,204,21,.07)", bd: "rgba(250,204,21,.22)" }, danger: { bg: "rgba(248,113,113,.07)", bd: "rgba(248,113,113,.22)" }, green: { bg: "rgba(52,211,153,.07)", bd: "rgba(52,211,153,.22)" } };
  const c = colors[variant];
  return (
    <div style={{ background: c.bg, border: `1px solid ${c.bd}`, borderRadius: 8, padding: "9px 12px", marginBottom: 5, display: "flex", gap: 8, fontSize: 13, lineHeight: 1.55 }}>
      <span style={{ flexShrink: 0 }}>{icon}</span>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
};

const Cd = ({ children }) => <code style={{ background: "#0f172a", padding: "1px 5px", borderRadius: 3, fontSize: 11.5, fontFamily: "monospace", color: "#e2e8f0" }}>{children}</code>;

const CodeBlock = ({ children }) => (
  <pre style={{ background: "#020617", border: "1px solid #1e293b", borderRadius: 8, padding: "10px 12px", marginBottom: 5, fontFamily: "monospace", fontSize: 11.5, lineHeight: 1.75, overflowX: "auto", color: "#e2e8f0", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{children}</pre>
);
const Cm = ({ children }) => <span style={{ color: "#64748b" }}>{children}</span>;
const Gn = ({ children }) => <span style={{ color: "#34d399" }}>{children}</span>;
const Or = ({ children }) => <span style={{ color: "#fb923c" }}>{children}</span>;
const Yl = ({ children }) => <span style={{ color: "#fbbf24" }}>{children}</span>;
const Pr = () => <span style={{ color: "#60a5fa", userSelect: "none" }}>{"$ "}</span>;

const TransRow = ({ win, mac }) => (
  <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, padding: "9px 12px", marginBottom: 5, display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
    <span style={{ minWidth: 120, fontFamily: "monospace", fontSize: 11, color: "#94a3b8", background: "#0f172a", padding: "3px 8px", borderRadius: 4, border: "1px solid #334155", textAlign: "center" }}>{win}</span>
    <span style={{ color: "#60a5fa", fontWeight: 700 }}>→</span>
    <span style={{ fontWeight: 600, color: "#e2e8f0" }}>{mac}</span>
  </div>
);

const SECTIONS = [
  { id: "mental", icon: "🧠", title: "The Big Mental Shifts", count: "5 tips", tags: ["basics"], defaultOpen: true, color: "rgba(96,165,250,.12)", search: "mental model cmd ctrl close quit finder install right click", content: () => (<><Tip icon="1️⃣"><b>⌘ Cmd = Ctrl.</b> Copy = ⌘C, Paste = ⌘V, Save = ⌘S. Key next to spacebar.</Tip><Tip icon="2️⃣"><b>Closing ≠ quitting.</b> Red ✕ closes window, app stays running. ⌘Q to quit.</Tip><Tip icon="3️⃣"><b>Finder = File Explorer.</b> Always running. Blue smiley in Dock.</Tip><Tip icon="4️⃣"><b>Installing:</b> Drag .dmg to Applications, or <Cd>brew install</Cd>. No .exe. No registry.</Tip><Tip icon="5️⃣"><b>Right-click:</b> Two-finger tap on trackpad, or Ctrl+Click.</Tip></>) },

  { id: "shortcuts", icon: "⌨️", title: "Essential Keyboard Shortcuts", count: "14", tags: ["shortcuts","basics"], defaultOpen: true, color: "rgba(167,139,250,.12)", search: "copy paste cut undo spotlight search tab switch close quit screenshot force lock settings", content: () => (<><Shortcut keys={["⌘","C/V/X"]} desc="Copy / Paste / Cut" /><Shortcut keys={["⌘","Z"]} desc="Undo (add ⇧ for Redo)" /><Shortcut keys={["⌘","Space"]} desc="Spotlight — launch apps, find files, do math" note="Your new Start Menu. Use it for EVERYTHING." /><Shortcut keys={["⌘","Tab"]} desc="Switch between apps (like Alt+Tab)" /><Shortcut keys={["⌘","`"]} desc="Switch windows within same app" /><Shortcut keys={["⌘","W"]} desc="Close current window / tab" /><Shortcut keys={["⌘","Q"]} desc="Quit the entire application" /><Shortcut keys={["⌘","T"]} desc="New tab (browser, Finder, Terminal)" /><Shortcut keys={["⌘","⇧","3"]} desc="Screenshot — entire screen" /><Shortcut keys={["⌘","⇧","4"]} desc="Screenshot — select area" note="Press Space to capture a specific window." /><Shortcut keys={["⌘","⇧","5"]} desc="Screenshot toolbar (inc. recording)" /><Shortcut keys={["⌘","⌥","Esc"]} desc="Force Quit (your Ctrl+Alt+Delete)" /><Shortcut keys={["⌃","⌘","Q"]} desc="Lock screen" /><Shortcut keys={["⌘",","]} desc="Preferences for current app" note="Works in every Mac app." /></>) },

  { id: "trackpad", icon: "🤌", title: "Trackpad Gestures", count: "7", tags: ["basics"], defaultOpen: false, color: "rgba(52,211,153,.12)", search: "trackpad gesture scroll tap pinch zoom swipe desktop mission control", content: () => (<><Tip icon="💡" variant="green"><b>The Mac trackpad is elite.</b> Give it a week.</Tip><Shortcut keys={["2-finger scroll"]} desc="Scroll (natural = phone-style)" note='Hate it? Settings → Trackpad → uncheck "Natural scrolling"' /><Shortcut keys={["2-finger tap"]} desc="Right-click" /><Shortcut keys={["Pinch"]} desc="Zoom in / out" /><Shortcut keys={["3-finger ←→"]} desc="Switch Desktops / Spaces" note='Create desktops: 3-finger up, click "+"' /><Shortcut keys={["3-finger ↑"]} desc="Mission Control — see all windows" /><Shortcut keys={["4-finger pinch"]} desc="Launchpad (app grid)" /><Shortcut keys={["Force click"]} desc="Look up words, preview links" /></>) },

  { id: "finder", icon: "📁", title: "Finder & Files", count: "9", tags: ["basics","shortcuts"], defaultOpen: false, color: "rgba(244,114,182,.12)", search: "delete trash folder hidden dotfiles quick look preview path copy cut move finder", content: () => (<><Shortcut keys={["⌘","⌫"]} desc="Move to Trash (⌫ = Backspace)" /><Shortcut keys={["⌘","⇧","G"]} desc="Go to Folder — type any path" /><Shortcut keys={["⌘","⇧","."]} desc="Show/hide hidden files" note="Critical for dev — .env, .git" /><Shortcut keys={["Space"]} desc="Quick Look — preview any file" note="Best Mac feature. Images, PDFs, code." /><Shortcut keys={["⌘","⇧","N"]} desc="New folder" /><Shortcut keys={["⌘","I"]} desc="Get Info (properties)" /><Shortcut keys={["⌘","⌥","P"]} desc="Show Path Bar in Finder" note="Do this once!" /><Shortcut keys={["⌘","⌥","C"]} desc="Copy file path" /><Tip icon="⚠️" variant="warn"><b>"Cut" files:</b> Copy ⌘C, then <b>⌘⌥V</b> to move. No ⌘X for files.</Tip></>) },

  { id: "text", icon: "✏️", title: "Text Editing Power Moves", count: "7", tags: ["shortcuts"], defaultOpen: false, color: "rgba(250,204,21,.12)", search: "home end line word jump select page delete cursor text", content: () => (<><Tip icon="💡"><b>No Home/End keys?</b> Mac uses Cmd/Option combos.</Tip><Shortcut keys={["⌘","←"]} desc="Beginning of line (Home)" /><Shortcut keys={["⌘","→"]} desc="End of line (End)" /><Shortcut keys={["⌥","←/→"]} desc="Jump word by word" /><Shortcut keys={["⌥","⇧","←/→"]} desc="Select word by word" /><Shortcut keys={["⌘","↑/↓"]} desc="Top / bottom of document" /><Shortcut keys={["⌥","⌫"]} desc="Delete entire word backward" note="Fn+⌫ = forward delete." /></>) },

  { id: "terminal", icon: "💻", title: "Terminal — Getting Started", count: "essentials", tags: ["terminal","dev"], defaultOpen: true, color: "rgba(52,211,153,.12)", search: "terminal zsh bash pwd ls cd mkdir touch open cp mv rm cat less clear cancel history tab command shell", content: () => (<><Tip icon="💡"><b>Mac uses Zsh.</b> Config: <Cd>~/.zshrc</Cd>. iTerm2 is better than Terminal.app.</Tip><CodeBlock><Cm># Navigation</Cm>{"\n"}<Pr /><Gn>pwd</Gn>                   <Cm># where am I?</Cm>{"\n"}<Pr /><Gn>ls</Gn> <Or>-la</Or>               <Cm># list all inc. hidden</Cm>{"\n"}<Pr /><Gn>cd</Gn> <Yl>~/Documents</Yl>       <Cm># change dir</Cm>{"\n"}<Pr /><Gn>cd</Gn> <Yl>..</Yl>                 <Cm># up one level</Cm>{"\n"}<Pr /><Gn>mkdir</Gn> <Yl>my-project</Yl>      <Cm># create dir</Cm>{"\n"}<Pr /><Gn>touch</Gn> <Yl>file.txt</Yl>        <Cm># create file</Cm>{"\n"}<Pr /><Gn>open</Gn> <Yl>.</Yl>                <Cm># open in Finder ✨</Cm></CodeBlock><CodeBlock><Cm># File operations</Cm>{"\n"}<Pr /><Gn>cp</Gn> <Yl>a.txt b.txt</Yl>        <Cm># copy</Cm>{"\n"}<Pr /><Gn>mv</Gn> <Yl>old.txt new.txt</Yl>    <Cm># rename/move</Cm>{"\n"}<Pr /><Gn>rm</Gn> <Yl>file.txt</Yl>           <Cm># delete (NO TRASH!)</Cm>{"\n"}<Pr /><Gn>rm</Gn> <Or>-rf</Or> <Yl>folder/</Yl>       <Cm># delete folder ⚠️</Cm>{"\n"}<Pr /><Gn>cat</Gn> <Yl>file.txt</Yl>          <Cm># print contents</Cm>{"\n"}<Pr /><Gn>less</Gn> <Yl>file.txt</Yl>         <Cm># read (q=quit)</Cm></CodeBlock><Tip icon="🚨" variant="danger"><b>rm -rf has no undo.</b> Terminal deletion is permanent.</Tip><Shortcut keys={["⌘","K"]} desc="Clear terminal" /><Shortcut keys={["⌃","C"]} desc="Cancel / kill command" /><Shortcut keys={["↑/↓"]} desc="Command history" /><Shortcut keys={["Tab"]} desc="Autocomplete" note="Tab twice for all matches." /></>) },

  { id: "brew", icon: "🍺", title: "Homebrew — Package Manager", count: "must-know", tags: ["terminal","dev"], defaultOpen: true, color: "rgba(251,146,60,.12)", search: "homebrew brew install cask package update upgrade list search uninstall", content: () => (<><Tip icon="💡"><b>Homebrew = apt-get / choco.</b> CLI tools + desktop apps from terminal.</Tip><CodeBlock><Cm># Install Homebrew (one-time)</Cm>{"\n"}<Pr /><Gn>/bin/bash</Gn> <Or>-c</Or> <Yl>"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"</Yl></CodeBlock><CodeBlock><Cm># Core commands</Cm>{"\n"}<Pr /><Gn>brew</Gn> <Or>install</Or> <Yl>git</Yl>          <Cm># CLI tool</Cm>{"\n"}<Pr /><Gn>brew</Gn> <Or>install --cask</Or> <Yl>iterm2</Yl> <Cm># desktop app</Cm>{"\n"}<Pr /><Gn>brew</Gn> <Or>update</Or>               <Cm># update Homebrew</Cm>{"\n"}<Pr /><Gn>brew</Gn> <Or>upgrade</Or>              <Cm># upgrade all</Cm>{"\n"}<Pr /><Gn>brew</Gn> <Or>list</Or>                 <Cm># what's installed</Cm>{"\n"}<Pr /><Gn>brew</Gn> <Or>search</Or> <Yl>python</Yl>       <Cm># search</Cm>{"\n"}<Pr /><Gn>brew</Gn> <Or>doctor</Or>               <Cm># troubleshoot</Cm></CodeBlock><CodeBlock><Cm># 🚀 First installs</Cm>{"\n"}<Pr /><Gn>brew</Gn> <Or>install</Or> <Yl>git node python</Yl>{"\n"}<Pr /><Gn>brew</Gn> <Or>install --cask</Or> <Yl>visual-studio-code iterm2 docker</Yl>{"\n"}<Pr /><Gn>brew</Gn> <Or>install --cask</Or> <Yl>cursor</Yl>  <Cm># AI code editor</Cm></CodeBlock><Tip icon="🎯" variant="green"><b>Cask = GUI apps.</b> <Cd>brew install</Cd> = CLI. <Cd>brew install --cask</Cd> = desktop.</Tip></>) },

  { id: "devenv", icon: "🛠", title: "Dev Environment Setup", count: "your stack", tags: ["dev","terminal"], defaultOpen: false, color: "rgba(96,165,250,.12)", search: "xcode node npm git config ssh key github python supabase vercel setup", content: () => (<><CodeBlock><Cm># Xcode CLI Tools (REQUIRED)</Cm>{"\n"}<Pr /><Gn>xcode-select</Gn> <Or>--install</Or>{"\n\n"}<Cm># Node.js</Cm>{"\n"}<Pr /><Gn>brew</Gn> <Or>install</Or> <Yl>node</Yl>{"\n"}<Pr /><Gn>node</Gn> <Or>--version</Or>{"\n\n"}<Cm># Git setup</Cm>{"\n"}<Pr /><Gn>git</Gn> <Or>config --global</Or> <Yl>user.name "Your Name"</Yl>{"\n"}<Pr /><Gn>git</Gn> <Or>config --global</Or> <Yl>user.email "you@email.com"</Yl>{"\n\n"}<Cm># SSH key for GitHub</Cm>{"\n"}<Pr /><Gn>ssh-keygen</Gn> <Or>-t ed25519 -C</Or> <Yl>"you@email.com"</Yl>{"\n"}<Pr /><Gn>cat</Gn> <Yl>~/.ssh/id_ed25519.pub</Yl>  <Cm># copy → GitHub</Cm>{"\n\n"}<Cm># Python + Supabase CLI</Cm>{"\n"}<Pr /><Gn>brew</Gn> <Or>install</Or> <Yl>python</Yl>{"\n"}<Pr /><Gn>brew</Gn> <Or>install</Or> <Yl>supabase/tap/supabase</Yl></CodeBlock><Tip icon="⚡" variant="green"><b>Quick start:</b> <Cd>brew install node git && brew install --cask cursor docker</Cd></Tip></>) },

  { id: "ai", icon: "🤖", title: "AI Agents & Local Tools", count: "agent setup", tags: ["dev","terminal"], defaultOpen: false, color: "rgba(167,139,250,.12)", search: "claude code anthropic ollama llama llm ai agent n8n open webui docker model local", content: () => (<><CodeBlock><Cm># Claude Code</Cm>{"\n"}<Pr /><Gn>npm</Gn> <Or>install -g</Or> <Yl>@anthropic-ai/claude-code</Yl>{"\n"}<Pr /><Gn>claude</Gn>                    <Cm># launch</Cm>{"\n\n"}<Cm># Ollama (local LLMs)</Cm>{"\n"}<Pr /><Gn>brew</Gn> <Or>install --cask</Or> <Yl>ollama</Yl>{"\n"}<Pr /><Gn>ollama</Gn> <Or>run</Or> <Yl>llama3</Yl>         <Cm># download + chat</Cm>{"\n"}<Pr /><Gn>ollama</Gn> <Or>list</Or>               <Cm># see models</Cm>{"\n\n"}<Cm># Open WebUI</Cm>{"\n"}<Pr /><Gn>docker</Gn> <Or>run -d -p</Or> <Yl>3000:8080</Yl>{" \\\n  "}<Or>--add-host=host.docker.internal:host-gateway</Or>{" \\\n  "}<Or>-v</Or> <Yl>open-webui:/app/backend/data</Yl>{" \\\n  "}<Or>--name</Or> <Yl>open-webui ghcr.io/open-webui/open-webui:main</Yl>{"\n\n"}<Cm># n8n (workflow automation)</Cm>{"\n"}<Pr /><Gn>brew</Gn> <Or>install</Or> <Yl>n8n</Yl>{"\n"}<Pr /><Gn>n8n</Gn> <Or>start</Or>                 <Cm># localhost:5678</Cm></CodeBlock><Tip icon="⚡" variant="green"><b>Apple Silicon:</b> M-series runs local LLMs really well via Ollama.</Tip></>) },

  { id: "settings", icon: "⚙️", title: "Day-1 Settings to Change", count: "8 tweaks", tags: ["basics"], defaultOpen: false, color: "rgba(248,113,113,.12)", search: "settings tap click dock hot corners key repeat drag trackpad extensions scroll", content: () => { const items = [["✅ Trackpad → Tap to Click","Not on by default!"],["✅ Dock → Shrink + auto-hide","More screen space"],["✅ Hot Corners → Lock Screen"],["✅ Keyboard → Key repeat Fast, Delay Short","Default is painfully slow for coding"],["✅ Accessibility → Three-finger drag","Move windows with 3 fingers"],["✅ Finder → Show all extensions"],["✅ Finder → New windows = Home folder"],["🤷 Natural scrolling off (Windows-style)"]]; return (<>{items.map((x,i)=>(<div key={i} style={{background:"#1e293b",border:"1px solid #334155",borderRadius:8,padding:"9px 12px",marginBottom:5,fontSize:13}}><div style={{color:"#e2e8f0"}}>{x[0]}</div>{x[1]&&<div style={{fontSize:11.5,color:"#94a3b8",marginTop:4,paddingLeft:8,borderLeft:"2px solid #334155",fontStyle:"italic"}}>{x[1]}</div>}</div>))}</>); } },

  { id: "protips", icon: "🏆", title: "Pro Tips", count: "gems", tags: ["basics","shortcuts","dev"], defaultOpen: false, color: "rgba(250,204,21,.12)", search: "spotlight clipboard rectangle maccy zshrc airdrop keychain activity monitor", content: () => (<><Tip icon="1."><b>⌘Space is king.</b> Launch apps, math, unit conversion. Don't browse — search.</Tip><Tip icon="2."><b>Clipboard history:</b> <Cd>brew install --cask maccy</Cd> — free.</Tip><Tip icon="3."><b>Window snapping:</b> <Cd>brew install --cask rectangle</Cd> — free.</Tip><Tip icon="4."><b>Shell config:</b> <Cd>~/.zshrc</Cd> for PATH/aliases. <Cd>source ~/.zshrc</Cd> to reload.</Tip><Tip icon="5."><b>AirDrop:</b> Files to iPhone/iPad instantly.</Tip><Tip icon="6."><b>Passwords:</b> Keychain Access or Passwords app.</Tip><Tip icon="7."><b>Activity Monitor = Task Manager.</b></Tip></>) },

  { id: "rosetta", icon: "🗺", title: "Windows → Mac Translation", count: "quick ref", tags: ["basics"], defaultOpen: false, color: "rgba(244,114,182,.12)", search: "windows mac translation file explorer finder control panel task manager cmd start menu recycle bin exe registry", content: () => (<><TransRow win="File Explorer" mac="Finder" /><TransRow win="Control Panel" mac="System Settings" /><TransRow win="Task Manager" mac="Activity Monitor" /><TransRow win="Ctrl+Alt+Del" mac="⌘⌥Esc (Force Quit)" /><TransRow win="cmd.exe" mac="Terminal.app" /><TransRow win="Start Menu" mac="⌘Space (Spotlight)" /><TransRow win="Recycle Bin" mac="Trash" /><TransRow win=".exe installer" mac=".dmg or brew install" /><TransRow win="Registry" mac="Doesn't exist 🎉" /></>) },
];

const FILTERS = [
  { id: "all", label: "All" },
  { id: "basics", label: "Basics" },
  { id: "shortcuts", label: "Keys" },
  { id: "terminal", label: "Terminal" },
  { id: "dev", label: "Dev" },
];

export default function MacBookCheatSheet() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [openSections, setOpenSections] = useState(() =>
    new Set(SECTIONS.filter(s => s.defaultOpen).map(s => s.id))
  );

  const toggleSection = (id) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    return SECTIONS.filter(s => {
      if (filter !== "all" && !s.tags.includes(filter)) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (s.title + " " + s.search).toLowerCase().includes(q);
      }
      return true;
    });
  }, [search, filter]);

  useEffect(() => {
    if (search.trim()) setOpenSections(new Set(filtered.map(s => s.id)));
  }, [search]);

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "#e2e8f0", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Hero */}
      <div style={{ padding: "36px 20px 20px", textAlign: "center", borderBottom: "1px solid #1e293b", background: "linear-gradient(180deg, rgba(96,165,250,.08) 0%, transparent 100%)" }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: -1, background: "linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 4 }}>⌘ MacBook Cheat Sheet</h1>
        <p style={{ color: "#94a3b8", fontSize: 15 }}>For a <span style={{ color: "#34d399", fontWeight: 700 }}>40-year-old guy</span> switching from Windows. You got this.</p>
      </div>

      {/* Toolbar */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(15,23,42,.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #1e293b", padding: "8px 16px", display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 180, position: "relative" }}>
          <Search size={14} style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." style={{ width: "100%", padding: "7px 10px 7px 30px", background: "#1e293b", border: "1px solid #334155", borderRadius: 7, color: "#e2e8f0", fontFamily: "monospace", fontSize: 12.5, outline: "none" }} />
        </div>
        {FILTERS.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{ padding: "5px 12px", borderRadius: 6, border: `1px solid ${filter === f.id ? "#60a5fa" : "#334155"}`, background: filter === f.id ? "rgba(96,165,250,.12)" : "#1e293b", color: filter === f.id ? "#60a5fa" : "#94a3b8", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>{f.label}</button>
        ))}
        <button onClick={() => setOpenSections(new Set(SECTIONS.map(s => s.id)))} style={{ padding: "5px 8px", borderRadius: 6, border: "1px solid #334155", background: "#1e293b", color: "#94a3b8", fontSize: 11, cursor: "pointer" }}>Expand</button>
        <button onClick={() => setOpenSections(new Set())} style={{ padding: "5px 8px", borderRadius: 6, border: "1px solid #334155", background: "#1e293b", color: "#94a3b8", fontSize: 11, cursor: "pointer" }}>Collapse</button>
      </div>

      {/* Legend */}
      <div style={{ maxWidth: 880, margin: "14px auto 0", padding: "0 16px", display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        {[["⌘","Command"],["⌥","Option/Alt"],["⌃","Control"],["⇧","Shift"]].map(([k,v]) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#94a3b8" }}><Key mod>{k}</Key> {v}</div>
        ))}
      </div>

      {/* Sections */}
      <div style={{ maxWidth: 920, margin: "0 auto", padding: 16 }}>
        {filtered.length === 0 && <div style={{ textAlign: "center", padding: 50, color: "#64748b" }}><div style={{ fontSize: 40, marginBottom: 8 }}>🔍</div>No results for "{search}"</div>}
        {filtered.map(section => {
          const isOpen = openSections.has(section.id);
          return (
            <div key={section.id} style={{ marginBottom: 12, border: "1px solid #1e293b", borderRadius: 10, background: "#0f172a", overflow: "hidden" }}>
              <div onClick={() => toggleSection(section.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", cursor: "pointer", userSelect: "none", background: isOpen ? "rgba(30,41,59,.5)" : "transparent", transition: "background .15s" }}>
                <div style={{ fontSize: 18, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 7, background: section.color, flexShrink: 0 }}>{section.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15, flex: 1 }}>{section.title}</div>
                <span style={{ fontSize: 11, color: "#64748b", background: "#1e293b", padding: "2px 8px", borderRadius: 8 }}>{section.count}</span>
                <ChevronDown size={15} style={{ color: "#64748b", transition: "transform .2s", transform: isOpen ? "rotate(180deg)" : "rotate(0)" }} />
              </div>
              {isOpen && <div style={{ padding: "0 16px 16px" }}>{section.content()}</div>}
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: "center", padding: "20px 0 30px", color: "#334155", fontSize: 12 }}>Built with ⌘ for Wesley — welcome to Mac</div>
    </div>
  );
}
