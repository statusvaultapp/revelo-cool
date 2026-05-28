import { useState, useEffect } from "react";

const questions = [
  {
    id: 1, emoji: "🔔",
    question: "Qual è la tua suoneria?",
    comment: "Questa domanda ha già diviso le persone in due categorie. Tu sai già in quale sei.",
    options: [
      { text: "Quella di default. Non l'ho mai cambiata. Non la cambierò.", score: 70, reaction: "Classico. Il telefono ti ha scelto tu." },
      { text: "Una canzone. Degli anni in cui ero giovane e ottimista.", score: 55, reaction: "Nostalgia come personalità." },
      { text: "Silenzioso sempre. Il telefono non deve fare rumore.", score: 20, reaction: "Un misantropo con buone maniere." },
      { text: "Una notifica personalizzata che ho impostato questa settimana.", score: 15, reaction: "Benvenuto tra i viventi." },
    ],
  },
  {
    id: 2, emoji: "⏰",
    question: "Quante sveglie hai impostate in questo momento?",
    comment: "Non quelle che pensi di avere. Quelle che hai davvero. Apri l'app.",
    options: [
      { text: "Una. Funziona. Non ne ho bisogno di altre.", score: 18, reaction: "Una persona con un rapporto sano con la realtà." },
      { text: "Tre. Per sicurezza. La vita è incerta.", score: 40, reaction: "Ansioso ma organizzato. Un classico." },
      { text: "Cinque o più. Alcune disattivate da mesi che non cancello.", score: 72, reaction: "Stai covando decisioni non prese dal 2021." },
      { text: "Nessuna, uso Alexa o Google Home.", score: 22, reaction: "Hai delegato il tuo risveglio a un'azienda multinazionale." },
    ],
  },
  {
    id: 3, emoji: "📘",
    question: "Facebook è installato sul tuo telefono?",
    comment: "Prenditi un momento. Pensa bene.",
    options: [
      { text: "Sì. Lo uso. Ogni giorno.", score: 80, reaction: "Rispetto la coerenza. Nessun giudizio. Qualcuno mente." },
      { text: "Sì ma non lo apro. È lì per abitudine.", score: 65, reaction: "Un fossile digitale che non hai il coraggio di rimuovere." },
      { text: "L'ho disinstallato. Anni fa. Con sollievo.", score: 22, reaction: "Hai fatto una scelta. Probabilmente anche altre buone scelte." },
      { text: "Non l'ho mai installato.", score: 10, reaction: "Under 22 o filosofo. Non ci sono altre opzioni." },
    ],
  },
  {
    id: 4, emoji: "🔋",
    question: "Descrivi il tuo rapporto con la batteria.",
    comment: "Il modo in cui gestisci la batteria rivela come gestisci l'ansia.",
    options: [
      { text: "Sempre sotto il 20%. Vivo nel rischio.", score: 45, reaction: "Un temerario. O qualcuno in denial." },
      { text: "Ho un caricabatterie in ogni stanza, uno in borsa, uno in auto.", score: 68, reaction: "La paura del vuoto trasformata in logistica." },
      { text: "Carico la notte. Arrivo a sera. Sistema funziona.", score: 25, reaction: "Una persona equilibrata. Rara specie." },
      { text: "Ho sempre una powerbank. Sono pronto per tutto.", score: 30, reaction: "Prepperismo applicato allo smartphone." },
    ],
  },
  {
    id: 5, emoji: "🎮",
    question: "Giochi installati?",
    comment: "Non giudichiamo. Però contiamo.",
    options: [
      { text: "Candy Crush. O Solitario. O entrambi.", score: 78, reaction: "Hai trovato la tua meditazione. Non è la peggiore." },
      { text: "Solo Wordle o roba da 5 minuti.", score: 35, reaction: "L'illusione del controllo. Ma almeno è breve." },
      { text: "Nessun gioco. Il telefono è uno strumento.", score: 55, reaction: "Lo dici anche a te stesso?" },
      { text: "Giochi veri. Sono un gamer.", score: 20, reaction: "Rispetto. Almeno sei onesto con te stesso." },
    ],
  },
  {
    id: 6, emoji: "🙏",
    question: "Usi 🙏 per dire grazie?",
    comment: "Domanda apparentemente innocua. Non lo è.",
    options: [
      { text: "Sì, sempre. È il modo più naturale.", score: 75, reaction: "Stai pregando o ringraziando? Il telefono non lo sa." },
      { text: "No, le emoji le uso con intenzione.", score: 18, reaction: "Un comunicatore consapevole. Raro." },
      { text: "Non uso emoji nelle conversazioni serie.", score: 42, reaction: "Hai una lista di conversazioni serie. Questo dice tutto." },
      { text: "Uso solo 💀 e 😭 in senso ironico.", score: 12, reaction: "Gen Z confermato. Benvenuto." },
    ],
  },
  {
    id: 7, emoji: "📸",
    question: "La foto più vecchia nel tuo rullino risale a...",
    comment: "Non mentire. Il telefono sa tutto.",
    options: [
      { text: "Prima del 2016. È un archivio storico.", score: 80, reaction: "Il tuo telefono è un museo. Non aprire quella cartella." },
      { text: "2017-2019. Ogni tanto faccio pulizia.", score: 48, reaction: "Una persona che procrastina in modo regolare." },
      { text: "Ultimo anno. Sono organizzato.", score: 20, reaction: "O sei ordinato o hai cambiato telefono di recente." },
      { text: "Tutto su cloud, non mi interessa il rullino.", score: 15, reaction: "Hai spostato il problema su Amazon." },
    ],
  },
  {
    id: 8, emoji: "🎤",
    question: "I tuoi messaggi vocali durano mediamente...",
    comment: "Chi li manda lunghi sa già chi è.",
    options: [
      { text: "Più di 2 minuti. Mi piace spiegarmi bene.", score: 78, reaction: "Stai registrando un podcast non richiesto." },
      { text: "30 secondi max. Rispetto il tempo altrui.", score: 22, reaction: "Una persona con teoria della mente sviluppata." },
      { text: "Non mando vocali. È una scelta etica.", score: 38, reaction: "Hai preso una posizione. Tienila." },
      { text: "Non mando vocali e non li ascolto. Testo o niente.", score: 15, reaction: "Il futuro è tuo." },
    ],
  },
  {
    id: 9, emoji: "🔐",
    question: "Come sblocchi il telefono?",
    comment: "Questa risposta è più privata di quanto pensi.",
    options: [
      { text: "PIN o password. Non mi fido della biometria.", score: 65, reaction: "Diffidenza come sistema di sicurezza. Funziona." },
      { text: "Impronta digitale.", score: 28, reaction: "Hai dato il tuo corpo a una multinazionale. Comodamente." },
      { text: "Face ID. Vivo nel presente.", score: 18, reaction: "Il tuo viso è la chiave di casa. Pensaci." },
      { text: "Nessun blocco. Chi vuoi che lo prenda.", score: 82, reaction: "Ottimismo cosmico applicato alla sicurezza digitale." },
    ],
  },
  {
    id: 10, emoji: "💔",
    question: "Lo schermo del tuo telefono è...",
    comment: "Ultima domanda. La più rivelatrice.",
    options: [
      { text: "Rotto. Ci convivo. Non è poi così grave.", score: 75, reaction: "Hai normalizzato il declino. Metafora disponibile." },
      { text: "Protetto da vetro temperato dal primo giorno.", score: 52, reaction: "Ansioso preventivo. Probabilmente funziona." },
      { text: "Perfetto. Ho cura delle mie cose.", score: 22, reaction: "O sei attento o hai comprato il telefono ieri." },
      { text: "Ho la cover ma non il vetro. Sono ottimista.", score: 38, reaction: "Mezzo ottimismo. Il più comune." },
    ],
  },
];

const results = [
  {
    min: 0, max: 25, age: 17,
    title: "Clinicamente Giovane",
    subtitle: "Il tuo telefono è in perfetta salute mentale.",
    diagnosis: "Nessuna patologia rilevata. Uso consapevole della tecnologia, nessuna app zombie, nessuna sveglia fantasma. O hai meno di vent'anni o hai fatto un percorso di crescita personale sul tuo telefono. In entrambi i casi: fastidioso.",
    prognosis: "Prognosi eccellente. Continua così. Gli altri ti odieranno.",
    accent: "#00aa55",
    light: "#e6f9ef",
  },
  {
    min: 26, max: 38, age: 26,
    title: "Lievemente Compromesso",
    subtitle: "Qualche segnale preoccupante, ma nulla di irreversibile.",
    diagnosis: "Il paziente mostra una discreta consapevolezza digitale ma conserva alcune abitudini vestigiali probabilmente ereditate da un sé precedente. La situazione è gestibile con moderata volontà.",
    prognosis: "Prognosi buona. Con qualche sforzo potresti diventare una persona che altri guardano con rispetto misto a invidia.",
    accent: "#0077cc",
    light: "#e6f0fa",
  },
  {
    min: 39, max: 52, age: 38,
    title: "Caso Classico",
    subtitle: "Niente di cui stupirsi. Niente di cui vantarsi.",
    diagnosis: "Il paziente presenta i sintomi tipici della generazione di transizione: abbastanza giovane da capire la tecnologia, abbastanza vecchio da ignorarla selettivamente. Facebook ancora installato 'per sicurezza'. Tre sveglie. Vocali di 90 secondi. Testo della sentenza: medio.",
    prognosis: "Prognosi nella media. Come il paziente.",
    accent: "#cc8800",
    light: "#fff8e6",
  },
  {
    min: 53, max: 65, age: 51,
    title: "Avanzato ma Stabile",
    subtitle: "Il declino è iniziato ma procede ordinatamente.",
    diagnosis: "Il paziente ha sviluppato un ecosistema digitale che funziona nonostante tutto. Suoneria di default dal 2018, rullino come archivio nazionale, caricabatterie in ogni ambiente domestico. Non c'è urgenza ma sarebbe auspicabile una revisione.",
    prognosis: "Prognosi discreta. Il telefono sopravviverà al paziente, ma solo per ragioni di inerzia.",
    accent: "#cc5500",
    light: "#fff0e6",
  },
  {
    min: 66, max: 100, age: 64,
    title: "Reperto Storico",
    subtitle: "Il telefono andrebbe esposto in un museo.",
    diagnosis: "Il paziente ha raggiunto uno stadio di stabilità digitale che va oltre la negligenza: è diventato uno stile di vita. Foto dal 2013, Candy Crush a livello tre cifre, PIN uguale da sette anni, schermo rotto 'funziona lo stesso'. Non è un problema. È un'identità.",
    prognosis: "Prognosi: irrilevante. Il paziente non cambierà. E in fondo, perché dovrebbe.",
    accent: "#cc1133",
    light: "#fce6ea",
  },
];

const getResult = (scores) => {
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  return results.find((r) => avg >= r.min && avg <= r.max) || results[2];
};

function useTypewriter(text, speed = 16, active = false) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!active) return;
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) { setDisplayed(text.slice(0, i + 1)); i++; }
      else clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, active]);
  return displayed;
}

export default function App() {
  const [screen, setScreen] = useState("intro");
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState([]);
  const [reactions, setReactions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [reaction, setReaction] = useState("");
  const [animOut, setAnimOut] = useState(false);
  const [result, setResult] = useState(null);
  const [resultVisible, setResultVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const progress = (current / questions.length) * 100;
  const diagnosisTyped = useTypewriter(result?.diagnosis || "", 14, resultVisible);
  const prognosisTyped = useTypewriter(result?.prognosis || "", 14, resultVisible && diagnosisTyped === result?.diagnosis);

  const handleAnswer = (opt) => {
    if (selected !== null) return;
    setSelected(opt.score);
    setReaction(opt.reaction);
    setTimeout(() => {
      setAnimOut(true);
      setTimeout(() => {
        const newScores = [...scores, opt.score];
        const newReactions = [...reactions, opt.reaction];
        setScores(newScores);
        setReactions(newReactions);
        if (current + 1 >= questions.length) {
          const r = getResult(newScores);
          setResult(r);
          setScreen("result");
          setTimeout(() => setResultVisible(true), 300);
        } else {
          setCurrent(current + 1);
          setSelected(null);
          setReaction("");
          setAnimOut(false);
        }
      }, 350);
    }, 900);
  };

  const restart = () => {
    setCurrent(0); setScores([]); setReactions([]);
    setSelected(null); setReaction(""); setAnimOut(false);
    setResult(null); setResultVisible(false); setCopied(false);
    setScreen("intro");
  };

  const copyShare = () => {
    navigator.clipboard?.writeText(`🩺 DIAGNOSI TELEFONICA\n\nEtà mentale: ${result.age} anni\n"${result.title}"\n\n${result.subtitle}\n\nFai il test → revelo.cool`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── INTRO ──
  if (screen === "intro") return (
    <div style={s.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        .f1{animation:fadeUp 0.5s 0s both}
        .f2{animation:fadeUp 0.5s 0.12s both}
        .f3{animation:fadeUp 0.5s 0.24s both}
        .f4{animation:fadeUp 0.5s 0.36s both}
        .f5{animation:fadeUp 0.5s 0.48s both}
        button:hover{opacity:0.8;transition:opacity 0.15s}
      `}</style>
      <div style={s.introWrap}>
        <div className="f1" style={s.pill}>CLINICA DIGITALE · REPARTO DIAGNOSI</div>
        <h1 className="f2" style={s.h1}>
          Quanti anni ha<br />
          <em style={s.em}>il tuo telefono?</em>
        </h1>
        <p className="f3" style={s.lead}>
          Non l'anno di produzione.<br />
          L'<strong>età mentale</strong>. La diagnosi che nessuno ti ha mai fatto.
        </p>
        <div className="f4" style={s.meta}>
          <span>10 domande</span>
          <span style={s.sep}>·</span>
          <span>referto immediato</span>
          <span style={s.sep}>·</span>
          <span>nessun appello possibile</span>
        </div>
        <button className="f5" style={s.startBtn} onClick={() => setScreen("quiz")}>
          Inizia la visita →
        </button>
        <p className="f5" style={s.fine}>Nessun dato raccolto. Il referto è solo per la tua coscienza.</p>
      </div>
    </div>
  );

  // ── QUIZ ──
  if (screen === "quiz") {
    const q = questions[current];
    return (
      <div style={s.root}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Mono:wght@400;500&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
          @keyframes reactionIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
          .card-in{animation:fadeUp 0.3s both}
          .react-in{animation:reactionIn 0.3s both}
          .opt{transition:all 0.15s}
          .opt:hover{transform:translateX(3px)}
          button:hover{opacity:0.85}
        `}</style>
        <div style={s.quizHeader}>
          <span style={s.headerLabel}>CLINICA DIGITALE</span>
          <span style={s.counter}>{current + 1}<span style={{color:"#bbb"}}>/{questions.length}</span></span>
        </div>
        <div style={s.progressTrack}>
          <div style={{...s.progressFill, width:`${progress}%`}} />
        </div>
        <div
          key={current}
          className="card-in"
          style={{
            ...s.card,
            opacity: animOut ? 0 : 1,
            transform: animOut ? "translateY(-8px)" : "translateY(0)",
            transition: "opacity 0.3s, transform 0.3s",
          }}
        >
          <div style={s.emoji}>{q.emoji}</div>
          <h2 style={s.question}>{q.question}</h2>
          <p style={s.comment}>{q.comment}</p>
          <div style={s.optsList}>
            {q.options.map((opt, i) => (
              <button
                key={i}
                className="opt"
                style={{
                  ...s.optBtn,
                  ...(selected === opt.score ? s.optActive : {}),
                  pointerEvents: selected !== null ? "none" : "auto",
                }}
                onClick={() => handleAnswer(opt)}
              >
                <span style={{...s.optLetter, ...(selected === opt.score ? {color:"#000", fontWeight:700} : {})}}>
                  {["A","B","C","D"][i]}
                </span>
                <span style={s.optText}>{opt.text}</span>
              </button>
            ))}
          </div>
          {reaction && (
            <div className="react-in" style={s.reactionBox}>
              <span style={s.reactionLabel}>DIAGNOSI PARZIALE</span>
              <p style={s.reactionText}>"{reaction}"</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── RESULT ──
  if (screen === "result" && result) return (
    <div style={{...s.root, background: result.light}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .r1{animation:fadeUp 0.4s 0.05s both}
        .r2{animation:fadeUp 0.4s 0.15s both}
        .r3{animation:fadeUp 0.4s 0.25s both}
        .r4{animation:fadeUp 0.4s 0.35s both}
        .r5{animation:fadeUp 0.4s 0.45s both}
        .cursor{display:inline-block;width:2px;height:0.9em;background:currentColor;margin-left:2px;animation:blink 0.7s infinite;vertical-align:text-bottom}
        button:hover{opacity:0.8}
      `}</style>
      <div style={s.resultWrap}>
        <div className="r1" style={s.resultTop}>
          <span style={s.resultClinic}>CLINICA DIGITALE</span>
          <span style={{...s.stamp, color: result.accent, borderColor: result.accent}}>REFERTO UFFICIALE</span>
        </div>

        <div className="r2" style={s.ageRow}>
          <div style={{...s.bigNum, color: result.accent}}>{result.age}</div>
          <div style={s.ageInfo}>
            <div style={{...s.ageTag, color: result.accent}}>ANNI MENTALI</div>
            <div style={{...s.ageTitle, color: result.accent}}>{result.title}</div>
            <div style={s.ageSub}>{result.subtitle}</div>
          </div>
        </div>

        <div className="r3" style={{...s.divider, borderColor: result.accent + "44"}} />

        <div className="r3" style={{...s.diagBox, borderColor: result.accent + "33", background: "#fff"}}>
          <span style={{...s.diagLabel, color: result.accent}}>DIAGNOSI</span>
          <p style={s.diagText}>
            {diagnosisTyped}
            {diagnosisTyped !== result.diagnosis && <span className="cursor" style={{color: result.accent}} />}
          </p>
          <span style={{...s.diagLabel, color: result.accent, marginTop: 16, display:"block"}}>PROGNOSI</span>
          <p style={s.diagText}>
            {prognosisTyped}
            {prognosisTyped.length > 0 && prognosisTyped !== result.prognosis && <span className="cursor" style={{color: result.accent}} />}
          </p>
        </div>

        <div className="r4" style={s.annotWrap}>
          <div style={s.annotLabel}>ANNOTAZIONI PER DOMANDA</div>
          {reactions.map((r, i) => (
            <div key={i} style={s.annotRow}>
              <span style={{...s.annotNum, color: result.accent}}>{String(i+1).padStart(2,"0")}</span>
              <span style={s.annotText}>"{r}"</span>
            </div>
          ))}
        </div>

        <div className="r5" style={s.actions}>
          <button style={{...s.shareBtn, background: result.accent}} onClick={copyShare}>
            {copied ? "✓ Copiato!" : "📋 Copia referto"}
          </button>
          <button style={{...s.secondBtn, color: result.accent, borderColor: result.accent + "66"}} onClick={restart}>
            Richiedi seconda opinione
          </button>
        </div>

        <p className="r5" style={s.footer}>
          Clinica Digitale · Diagnosi non vincolante · Il medico non risponde dei danni emotivi
        </p>
      </div>
    </div>
  );

  return null;
}

const s = {
  root: {
    minHeight: "100vh",
    background: "#f9f7f4",
    color: "#111",
    fontFamily: "'DM Mono', monospace",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "32px 20px 60px",
  },
  // Intro
  introWrap: { maxWidth: 460, width: "100%", textAlign: "center", paddingTop: "8vh" },
  pill: {
    display: "inline-block",
    background: "#efefef",
    border: "1px solid #ddd",
    borderRadius: 100,
    padding: "5px 14px",
    fontSize: 10,
    letterSpacing: 2,
    color: "#888",
    marginBottom: 28,
    textTransform: "uppercase",
  },
  h1: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(38px, 9vw, 64px)",
    fontWeight: 900,
    lineHeight: 1.08,
    color: "#111",
    marginBottom: 18,
    letterSpacing: -1,
  },
  em: { fontStyle: "italic", color: "#cc8800" },
  lead: { fontSize: 16, color: "#555", lineHeight: 1.8, marginBottom: 20 },
  meta: { fontSize: 11, color: "#aaa", letterSpacing: 1, marginBottom: 36, display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" },
  sep: { color: "#ccc" },
  startBtn: {
    background: "#111", color: "#fff", border: "none",
    borderRadius: 6, padding: "16px 0", fontSize: 13,
    fontWeight: 700, cursor: "pointer", letterSpacing: 1.5,
    fontFamily: "'DM Mono', monospace", width: "100%",
    textTransform: "uppercase", marginBottom: 14, display: "block",
  },
  fine: { fontSize: 11, color: "#bbb" },

  // Quiz
  quizHeader: {
    width: "100%", maxWidth: 520,
    display: "flex", justifyContent: "space-between", alignItems: "center",
    marginBottom: 10,
  },
  headerLabel: { fontSize: 9, letterSpacing: 3, color: "#bbb", textTransform: "uppercase" },
  counter: { fontSize: 13, color: "#999" },
  progressTrack: {
    width: "100%", maxWidth: 520, height: 2,
    background: "#e8e8e8", marginBottom: 24, borderRadius: 10, overflow: "hidden",
  },
  progressFill: { height: "100%", background: "#111", borderRadius: 10, transition: "width 0.4s ease" },
  card: {
    width: "100%", maxWidth: 520,
    background: "#fff",
    border: "1px solid #e8e8e8",
    borderRadius: 12,
    padding: "28px 24px",
    boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
  },
  emoji: { fontSize: 30, textAlign: "center", display: "block", marginBottom: 14 },
  question: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(18px, 4vw, 22px)",
    fontWeight: 700, textAlign: "center",
    color: "#111", marginBottom: 8, lineHeight: 1.3,
  },
  comment: { fontSize: 12, color: "#aaa", textAlign: "center", marginBottom: 22, lineHeight: 1.6, fontStyle: "italic" },
  optsList: { display: "flex", flexDirection: "column", gap: 8 },
  optBtn: {
    background: "#f9f7f4",
    border: "1.5px solid #e8e8e8",
    borderRadius: 8, padding: "12px 14px",
    color: "#333", fontSize: 13, textAlign: "left",
    cursor: "pointer", fontFamily: "'DM Mono', monospace",
    display: "flex", gap: 12, alignItems: "flex-start", lineHeight: 1.5,
  },
  optActive: {
    background: "#111",
    border: "1.5px solid #111",
    color: "#fff",
  },
  optLetter: { color: "#bbb", minWidth: 16, fontSize: 11, paddingTop: 1 },
  optText: { flex: 1 },
  reactionBox: {
    marginTop: 18, padding: "12px 16px",
    background: "#fffbf0",
    border: "1px solid #f0d080",
    borderRadius: 6,
  },
  reactionLabel: { fontSize: 9, letterSpacing: 3, color: "#cc8800", marginBottom: 5, display: "block", textTransform: "uppercase" },
  reactionText: { fontSize: 13, color: "#555", fontStyle: "italic", lineHeight: 1.5 },

  // Result
  resultWrap: { maxWidth: 520, width: "100%", paddingTop: 16 },
  resultTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
  resultClinic: { fontSize: 9, letterSpacing: 4, color: "#aaa", textTransform: "uppercase" },
  stamp: {
    fontSize: 9, letterSpacing: 2, border: "1px solid",
    padding: "3px 8px", borderRadius: 2, textTransform: "uppercase",
  },
  ageRow: { display: "flex", alignItems: "center", gap: 20, marginBottom: 4 },
  bigNum: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(72px, 18vw, 100px)",
    fontWeight: 900, lineHeight: 1, letterSpacing: -4, minWidth: "fit-content",
  },
  ageInfo: { flex: 1 },
  ageTag: { fontSize: 9, letterSpacing: 3, textTransform: "uppercase", marginBottom: 5 },
  ageTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(16px, 4vw, 22px)", fontWeight: 700, lineHeight: 1.2, marginBottom: 5,
  },
  ageSub: { fontSize: 12, color: "#888", lineHeight: 1.4 },
  divider: { border: "none", borderTop: "1px solid", margin: "20px 0" },
  diagBox: {
    border: "1px solid", borderRadius: 8,
    padding: "18px 16px", marginBottom: 20,
    boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
  },
  diagLabel: { fontSize: 9, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8, display: "block" },
  diagText: { fontSize: 13, color: "#444", lineHeight: 1.85 },
  annotWrap: { marginBottom: 24 },
  annotLabel: { fontSize: 9, letterSpacing: 3, color: "#bbb", textTransform: "uppercase", marginBottom: 12 },
  annotRow: { display: "flex", gap: 12, marginBottom: 8, alignItems: "flex-start" },
  annotNum: { fontSize: 10, minWidth: 20, paddingTop: 2 },
  annotText: { fontSize: 12, color: "#777", fontStyle: "italic", lineHeight: 1.5 },
  actions: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 },
  shareBtn: {
    border: "none", borderRadius: 6, padding: "14px",
    fontSize: 13, fontWeight: 700, cursor: "pointer",
    color: "#fff", fontFamily: "'DM Mono', monospace",
    letterSpacing: 1, textTransform: "uppercase",
  },
  secondBtn: {
    background: "transparent", border: "1.5px solid",
    borderRadius: 6, padding: "13px", fontSize: 12,
    cursor: "pointer", fontFamily: "'DM Mono', monospace", letterSpacing: 0.5,
  },
  footer: { fontSize: 10, color: "#ccc", textAlign: "center", letterSpacing: 0.3 },
};
