import { useState, useEffect, useRef } from "react";

const questions = [
  {
    id: 1,
    emoji: "🔔",
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
    id: 2,
    emoji: "⏰",
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
    id: 3,
    emoji: "📘",
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
    id: 4,
    emoji: "🔋",
    question: "Descivi il tuo rapporto con la batteria.",
    comment: "Il modo in cui gestisci la batteria rivela come gestisci l'ansia.",
    options: [
      { text: "Sempre sotto il 20%. Vivo nel rischio.", score: 45, reaction: "Un temerario. O qualcuno in denial." },
      { text: "Ho un caricabatterie in ogni stanza, uno in borsa, uno in auto.", score: 68, reaction: "La paura del vuoto trasformata in logistica." },
      { text: "Carico la notte. Arrivo a sera. Sistema funziona.", score: 25, reaction: "Una persona equilibrata. Rara specie." },
      { text: "Ho sempre una powerbank. Sono pronto per tutto.", score: 30, reaction: "Prepperismo applicato allo smartphone." },
    ],
  },
  {
    id: 5,
    emoji: "🎮",
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
    id: 6,
    emoji: "🙏",
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
    id: 7,
    emoji: "📸",
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
    id: 8,
    emoji: "🎤",
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
    id: 9,
    emoji: "🔐",
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
    id: 10,
    emoji: "💔",
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
    min: 0, max: 25,
    age: 17,
    title: "Clinicamente Giovane",
    subtitle: "Il tuo telefono è in perfetta salute mentale.",
    diagnosis: "Nessuna patologia rilevata. Uso consapevole della tecnologia, nessuna app zombie, nessuna sveglia fantasma. O hai meno di vent'anni o hai fatto un percorso di crescita personale sul tuo telefono. In entrambi i casi: fastidioso.",
    prognosis: "Prognosi eccellente. Continua così. Gli altri ti odieranno.",
    color: "#00ff88",
    accent: "#00cc66",
    bg: "#020f06",
    textBg: "rgba(0,255,136,0.06)",
  },
  {
    min: 26, max: 38,
    age: 26,
    title: "Lievemente Compromesso",
    subtitle: "Qualche segnale preoccupante, ma nulla di irreversibile.",
    diagnosis: "Il paziente mostra una discreta consapevolezza digitale ma conserva alcune abitudini vestigiali probabilmente ereditate da un sé precedente. La situazione è gestibile con moderata volontà.",
    prognosis: "Prognosi buona. Con qualche sforzo potresti diventare una persona che altri guardano con rispetto misto a invidia.",
    color: "#00cfff",
    accent: "#0099cc",
    bg: "#020a0f",
    textBg: "rgba(0,207,255,0.06)",
  },
  {
    min: 39, max: 52,
    age: 38,
    title: "Caso Classico",
    subtitle: "Niente di cui stupirsi. Niente di cui vantarsi.",
    diagnosis: "Il paziente presenta i sintomi tipici della generazione di transizione: abbastanza giovane da capire la tecnologia, abbastanza vecchio da ignorarla selettivamente. Facebook ancora installato 'per sicurezza'. Tre sveglie. Vocali di 90 secondi. Testo della sentenza: medio.",
    prognosis: "Prognosi nella media. Come il paziente.",
    color: "#ffcc00",
    accent: "#cc9900",
    bg: "#0f0c00",
    textBg: "rgba(255,204,0,0.06)",
  },
  {
    min: 53, max: 65,
    age: 51,
    title: "Avanzato ma Stabile",
    subtitle: "Il declino è iniziato ma procede ordinatamente.",
    diagnosis: "Il paziente ha sviluppato un ecosistema digitale che funziona nonostante tutto. Suoneria di default dal 2018, rullino come archivio nazionale, caricabatterie in ogni ambiente domestico. Non c'è urgenza ma sarebbe auspicabile una revisione.",
    prognosis: "Prognosi discreta. Il telefono sopravviverà al paziente, ma solo per ragioni di inerzia.",
    color: "#ff8800",
    accent: "#cc5500",
    bg: "#0f0600",
    textBg: "rgba(255,136,0,0.06)",
  },
  {
    min: 66, max: 100,
    age: 64,
    title: "Reperto Storico",
    subtitle: "Il telefono andrebbe esposto in un museo.",
    diagnosis: "Il paziente ha raggiunto uno stadio di stabilità digitale che va oltre la negligenza: è diventato uno stile di vita. Foto dal 2013, Candy Crush a livello tre cifre, PIN uguale da sette anni, schermo rotto 'funziona lo stesso'. Non è un problema. È un'identità.",
    prognosis: "Prognosi: irrilevante. Il paziente non cambierà. E in fondo, perché dovrebbe.",
    color: "#ff4466",
    accent: "#cc1133",
    bg: "#0f0005",
    textBg: "rgba(255,68,102,0.06)",
  },
];

const getResult = (scores) => {
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  return results.find((r) => avg >= r.min && avg <= r.max) || results[2];
};

// Typewriter hook
function useTypewriter(text, speed = 18, active = false) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!active) return;
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
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
  const [copied, setCopied] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);

  const progress = (current / questions.length) * 100;
  const diagnosisTyped = useTypewriter(result?.diagnosis || "", 16, resultVisible);
  const prognosisTyped = useTypewriter(result?.prognosis || "", 16, resultVisible && diagnosisTyped === result?.diagnosis);

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
    setResult(null); setCopied(false); setResultVisible(false);
    setScreen("intro");
  };

  const copyShare = () => {
    const text = `🩺 DIAGNOSI TELEFONICA\n\nEtà mentale del mio telefono: ${result.age} anni\n"${result.title}"\n\n${result.subtitle}\n\nFai il test →`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── INTRO ──
  if (screen === "intro") return (
    <div style={s.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Mono:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button:hover { opacity: 0.85; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scanline { 0%{top:-10%} 100%{top:110%} }
        .fadeup { animation: fadeUp 0.6s ease forwards; }
        .fadeup-2 { animation: fadeUp 0.6s 0.15s ease both; }
        .fadeup-3 { animation: fadeUp 0.6s 0.3s ease both; }
        .fadeup-4 { animation: fadeUp 0.6s 0.45s ease both; }
        .fadeup-5 { animation: fadeUp 0.6s 0.6s ease both; }
      `}</style>
      <div style={s.scanlineWrap}>
        <div style={s.scanline} />
      </div>
      <div style={s.intro}>
        <div className="fadeup" style={s.clinicLabel}>CLINICA DIGITALE · REPARTO DIAGNOSI</div>
        <h1 className="fadeup-2" style={s.introH1}>
          Quanti anni ha<br />
          <em style={s.introEm}>il tuo telefono?</em>
        </h1>
        <p className="fadeup-3" style={s.introBody}>
          Non l'anno di produzione.<br />
          L'<strong>età mentale</strong>. La diagnosi che nessuno ti ha mai fatto.
        </p>
        <div className="fadeup-4" style={s.introCaveats}>
          <span>10 domande</span>
          <span style={s.dot}>·</span>
          <span>referto immediato</span>
          <span style={s.dot}>·</span>
          <span>nessun appello possibile</span>
        </div>
        <button className="fadeup-5" style={s.startBtn} onClick={() => setScreen("quiz")}>
          Inizia la visita →
        </button>
        <p className="fadeup-5" style={s.disclaimer}>
          Nessun dato raccolto. Il referto è solo per la tua coscienza.
        </p>
      </div>
    </div>
  );

  // ── QUIZ ──
  if (screen === "quiz") {
    const q = questions[current];
    return (
      <div style={s.root}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Mono:wght@300;400;500&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          .opt { transition: all 0.2s ease; }
          .opt:hover { transform: translateX(4px); }
          @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
          @keyframes reactionIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
          .card-in { animation: fadeUp 0.35s ease both; }
          .reaction-in { animation: reactionIn 0.3s ease both; }
        `}</style>
        {/* Header */}
        <div style={s.quizHeader}>
          <div style={s.clinicLabelSmall}>CLINICA DIGITALE</div>
          <div style={s.qCounter}>{current + 1}<span style={{ color: "#444" }}>/{questions.length}</span></div>
        </div>
        {/* Progress */}
        <div style={s.progressWrap}>
          <div style={{ ...s.progressBar, width: `${progress}%` }} />
        </div>

        {/* Card */}
        <div key={current} className="card-in" style={{ ...s.quizCard, opacity: animOut ? 0 : 1, transform: animOut ? "translateY(-10px)" : "translateY(0)", transition: "opacity 0.3s, transform 0.3s" }}>
          <div style={s.qEmoji}>{q.emoji}</div>
          <h2 style={s.qQuestion}>{q.question}</h2>
          <p style={s.qComment}>{q.comment}</p>

          <div style={s.optsList}>
            {q.options.map((opt, i) => (
              <button
                key={i}
                className="opt"
                style={{
                  ...s.optBtn,
                  ...(selected === opt.score ? s.optSelected : {}),
                  pointerEvents: selected !== null ? "none" : "auto",
                }}
                onClick={() => handleAnswer(opt)}
              >
                <span style={s.optLetter}>{["A", "B", "C", "D"][i]}</span>
                <span style={s.optText}>{opt.text}</span>
              </button>
            ))}
          </div>

          {reaction && (
            <div className="reaction-in" style={s.reactionBox}>
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
    <div style={{ ...s.root, background: result.bg }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Mono:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .r1 { animation: fadeUp 0.5s 0.1s both; }
        .r2 { animation: fadeUp 0.5s 0.25s both; }
        .r3 { animation: fadeUp 0.5s 0.4s both; }
        .r4 { animation: fadeUp 0.5s 0.55s both; }
        .r5 { animation: fadeUp 0.5s 0.7s both; }
        .cursor { display:inline-block; width:2px; height:1em; background:currentColor; margin-left:2px; animation: pulse 0.8s infinite; vertical-align:text-bottom; }
      `}</style>
      <div style={s.result}>
        {/* Header */}
        <div className="r1" style={s.resultHeader}>
          <span style={s.resultClinic}>CLINICA DIGITALE</span>
          <span style={{ ...s.resultStamp, color: result.color, borderColor: result.color }}>REFERTO UFFICIALE</span>
        </div>

        {/* Age */}
        <div className="r2" style={s.ageRow}>
          <div style={{ ...s.bigNum, color: result.color }}>{result.age}</div>
          <div style={s.ageLabel}>
            <div style={s.ageSub}>ANNI MENTALI</div>
            <div style={{ ...s.ageTitle, color: result.color }}>{result.title}</div>
            <div style={s.ageSub2}>{result.subtitle}</div>
          </div>
        </div>

        <div className="r3" style={{ ...s.separator, borderColor: result.color + "33" }} />

        {/* Diagnosis */}
        <div className="r4" style={{ ...s.diagnosisBox, background: result.textBg, borderColor: result.color + "22" }}>
          <div style={{ ...s.diagLabel, color: result.color }}>DIAGNOSI</div>
          <p style={s.diagText}>
            {diagnosisTyped}
            {diagnosisTyped !== result.diagnosis && <span className="cursor" style={{ color: result.color }} />}
          </p>
          <div style={{ ...s.diagLabel, color: result.color, marginTop: 16 }}>PROGNOSI</div>
          <p style={s.diagText}>
            {prognosisTyped}
            {prognosisTyped.length > 0 && prognosisTyped !== result.prognosis && <span className="cursor" style={{ color: result.color }} />}
          </p>
        </div>

        {/* Reactions recap */}
        <div className="r4" style={s.reactionsWrap}>
          <div style={s.reactLabel}>ANNOTAZIONI PER DOMANDA</div>
          {reactions.map((r, i) => (
            <div key={i} style={s.reactRow}>
              <span style={{ ...s.reactNum, color: result.color }}>{String(i + 1).padStart(2, "0")}</span>
              <span style={s.reactItem}>"{r}"</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="r5" style={s.actions}>
          <button style={{ ...s.shareBtn, background: result.color }} onClick={copyShare}>
            {copied ? "✓ Copiato" : "📋 Copia referto"}
          </button>
          <button style={s.restartBtn} onClick={restart}>
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
    background: "#060606",
    color: "#e8e0d0",
    fontFamily: "'DM Mono', monospace",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "24px 20px 48px",
    position: "relative",
    overflow: "hidden",
  },
  scanlineWrap: {
    position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden",
  },
  scanline: {
    position: "absolute", left: 0, right: 0, height: "2px",
    background: "rgba(255,255,255,0.03)",
    animation: "scanline 6s linear infinite",
  },
  intro: {
    maxWidth: 460, width: "100%", textAlign: "center",
    paddingTop: "10vh", position: "relative", zIndex: 1,
  },
  clinicLabel: {
    fontSize: 10, letterSpacing: 4, color: "#444", marginBottom: 32,
    textTransform: "uppercase",
  },
  introH1: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(36px, 9vw, 62px)",
    fontWeight: 900, lineHeight: 1.1,
    marginBottom: 20, color: "#f0e8d8",
  },
  introEm: {
    fontStyle: "italic", color: "#ffcc00",
  },
  introBody: {
    fontSize: 15, color: "#888", lineHeight: 1.8, marginBottom: 24,
  },
  introCaveats: {
    fontSize: 11, color: "#444", letterSpacing: 1, marginBottom: 40,
    display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap",
  },
  dot: { color: "#333" },
  startBtn: {
    background: "#ffcc00", color: "#000", border: "none",
    borderRadius: 4, padding: "16px 48px", fontSize: 14,
    fontWeight: 700, cursor: "pointer", letterSpacing: 1,
    fontFamily: "'DM Mono', monospace", display: "block", width: "100%",
    marginBottom: 16, textTransform: "uppercase",
  },
  disclaimer: { fontSize: 11, color: "#333" },

  // Quiz
  quizHeader: {
    width: "100%", maxWidth: 520, display: "flex",
    justifyContent: "space-between", alignItems: "center",
    marginBottom: 12,
  },
  clinicLabelSmall: { fontSize: 9, letterSpacing: 3, color: "#333", textTransform: "uppercase" },
  qCounter: { fontSize: 13, color: "#555", fontFamily: "'DM Mono', monospace" },
  progressWrap: {
    width: "100%", maxWidth: 520, height: 2,
    background: "rgba(255,255,255,0.06)", marginBottom: 28, borderRadius: 10, overflow: "hidden",
  },
  progressBar: {
    height: "100%", background: "#ffcc00", borderRadius: 10, transition: "width 0.4s ease",
  },
  quizCard: {
    width: "100%", maxWidth: 520,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 8, padding: "28px 24px",
  },
  qEmoji: { fontSize: 28, marginBottom: 12, display: "block", textAlign: "center" },
  qQuestion: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(18px, 4vw, 22px)", fontWeight: 700,
    textAlign: "center", marginBottom: 8, color: "#f0e8d8", lineHeight: 1.3,
  },
  qComment: {
    fontSize: 12, color: "#555", textAlign: "center",
    marginBottom: 24, lineHeight: 1.6, fontStyle: "italic",
  },
  optsList: { display: "flex", flexDirection: "column", gap: 8 },
  optBtn: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 4, padding: "12px 14px", color: "#ccc",
    fontSize: 13, textAlign: "left", cursor: "pointer",
    fontFamily: "'DM Mono', monospace", display: "flex", gap: 12, alignItems: "flex-start",
    lineHeight: 1.5,
  },
  optSelected: {
    background: "rgba(255,204,0,0.1)",
    border: "1px solid rgba(255,204,0,0.4)",
    color: "#ffcc00",
  },
  optLetter: { color: "#444", minWidth: 16, fontSize: 11, paddingTop: 1 },
  optText: { flex: 1 },
  reactionBox: {
    marginTop: 20, padding: "14px 16px",
    background: "rgba(255,204,0,0.06)",
    border: "1px solid rgba(255,204,0,0.2)",
    borderRadius: 4,
  },
  reactionLabel: { fontSize: 9, letterSpacing: 3, color: "#ffcc0088", marginBottom: 6, display: "block" },
  reactionText: { fontSize: 13, color: "#ffcc00cc", fontStyle: "italic", lineHeight: 1.5 },

  // Result
  result: { maxWidth: 520, width: "100%", paddingTop: 16 },
  resultHeader: {
    display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28,
  },
  resultClinic: { fontSize: 9, letterSpacing: 4, color: "#444", textTransform: "uppercase" },
  resultStamp: {
    fontSize: 9, letterSpacing: 2, border: "1px solid", padding: "3px 8px", borderRadius: 2,
    textTransform: "uppercase",
  },
  ageRow: {
    display: "flex", alignItems: "center", gap: 20, marginBottom: 4,
  },
  bigNum: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(72px, 18vw, 100px)", fontWeight: 900,
    lineHeight: 1, letterSpacing: -4, minWidth: "fit-content",
  },
  ageLabel: { flex: 1 },
  ageSub: { fontSize: 9, letterSpacing: 3, color: "#444", textTransform: "uppercase", marginBottom: 4 },
  ageTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(16px, 4vw, 22px)", fontWeight: 700, lineHeight: 1.2, marginBottom: 6,
  },
  ageSub2: { fontSize: 12, color: "#666", lineHeight: 1.4 },
  separator: { border: "none", borderTop: "1px solid", margin: "20px 0" },
  diagnosisBox: {
    border: "1px solid", borderRadius: 4, padding: "18px 16px", marginBottom: 20,
  },
  diagLabel: { fontSize: 9, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8, display: "block" },
  diagText: { fontSize: 13, color: "#aaa", lineHeight: 1.8 },
  reactionsWrap: { marginBottom: 24 },
  reactLabel: { fontSize: 9, letterSpacing: 3, color: "#333", textTransform: "uppercase", marginBottom: 12 },
  reactRow: { display: "flex", gap: 12, marginBottom: 8, alignItems: "flex-start" },
  reactNum: { fontSize: 10, minWidth: 20, paddingTop: 2, fontFamily: "'DM Mono', monospace" },
  reactItem: { fontSize: 12, color: "#555", fontStyle: "italic", lineHeight: 1.5 },
  actions: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 },
  shareBtn: {
    border: "none", borderRadius: 4, padding: "14px",
    fontSize: 13, fontWeight: 700, cursor: "pointer",
    color: "#000", fontFamily: "'DM Mono', monospace",
    letterSpacing: 1, textTransform: "uppercase",
  },
  restartBtn: {
    background: "transparent", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 4, padding: "14px", fontSize: 12, color: "#444",
    cursor: "pointer", fontFamily: "'DM Mono', monospace", letterSpacing: 0.5,
  },
  footer: { fontSize: 10, color: "#2a2a2a", textAlign: "center", letterSpacing: 0.5 },
};
