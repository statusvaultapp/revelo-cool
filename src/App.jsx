import { useState, useEffect } from "react";

const ALL_QUESTIONS = [
  {
    id: 1, emoji: "🔔",
    question: "La tua suoneria è...",
    options: [
      { text: "Quella di default. Non l'ho mai cambiata.", score: 72, reaction: "Il telefono ti ha adottato. Non il contrario." },
      { text: "Una canzone degli anni in cui ero ottimista.", score: 58, reaction: "La nostalgia come sistema operativo." },
      { text: "Silenzioso sempre. Il telefono non fa rumore.", score: 18, reaction: "Un misantropo con stile." },
      { text: "Qualcosa che ho impostato questa settimana.", score: 12, reaction: "Benvenuto tra chi ha ancora un futuro." },
    ],
  },
  {
    id: 2, emoji: "⏰",
    question: "Quante sveglie hai impostate ADESSO?",
    options: [
      { text: "Una. Basta. Funziona.", score: 15, reaction: "Un rapporto adulto con la realtà." },
      { text: "Tre. Non mi fido di me stesso.", score: 42, reaction: "Ansioso ma organizzato. Il peggio dei due mondi." },
      { text: "Cinque o più. Alcune disattivate da mesi.", score: 78, reaction: "Stai collezionando decisioni non prese dal 2020." },
      { text: "Uso Alexa. Ho delegato il risveglio.", score: 28, reaction: "Jeff Bezos ti sveglia ogni mattina." },
    ],
  },
  {
    id: 3, emoji: "📘",
    question: "Facebook sul telefono?",
    options: [
      { text: "Sì e lo uso ogni giorno.", score: 82, reaction: "Coerenza rara. Qualcuno mente." },
      { text: "Sì ma non lo apro. È lì per sicurezza.", score: 68, reaction: "Un fossile digitale tenuto in vita dall'inerzia." },
      { text: "L'ho disinstallato. Con sollievo.", score: 20, reaction: "Almeno una buona scelta nella vita." },
      { text: "Non l'ho mai installato.", score: 8, reaction: "Under 22 o filosofo. Nessuna via di mezzo." },
    ],
  },
  {
    id: 4, emoji: "🔋",
    question: "Il tuo rapporto con la batteria?",
    options: [
      { text: "Sempre sotto il 20%. Vivo nel rischio.", score: 48, reaction: "Il rischio come stile di vita." },
      { text: "Caricabatterie in ogni stanza, borsa e auto.", score: 72, reaction: "La paura del vuoto trasformata in logistica." },
      { text: "Carico la notte, arrivo a sera. Sistema rodato.", score: 22, reaction: "Equilibrio raro. Categoria a rischio estinzione." },
      { text: "Ho sempre la powerbank. Sono pronto.", score: 35, reaction: "Prepperismo applicato allo smartphone." },
    ],
  },
  {
    id: 5, emoji: "🎮",
    question: "Giochi installati?",
    options: [
      { text: "Candy Crush o Solitario. O entrambi.", score: 80, reaction: "Hai trovato la tua meditazione laica." },
      { text: "Solo roba da 5 minuti tipo Wordle.", score: 38, reaction: "L'illusione del controllo sul tempo libero." },
      { text: "Nessun gioco. Il telefono è uno strumento.", score: 58, reaction: "Lo ripeti anche allo specchio?" },
      { text: "Giochi veri. Sono un gamer.", score: 18, reaction: "Almeno sei onesto con te stesso." },
    ],
  },
  {
    id: 6, emoji: "🙏",
    question: "Usi 🙏 per dire grazie?",
    options: [
      { text: "Sì, sempre. È naturalissimo.", score: 78, reaction: "Stai pregando o ringraziando? Il dubbio resta." },
      { text: "No. Le emoji le uso con intenzione.", score: 15, reaction: "Comunicatore consapevole. Raro come i tartufi." },
      { text: "Non uso emoji nelle conversazioni serie.", score: 45, reaction: "Hai una lista di conversazioni serie. Dice tutto." },
      { text: "Uso solo 💀 e 😭 ironicamente.", score: 10, reaction: "Gen Z certificato." },
    ],
  },
  {
    id: 7, emoji: "📸",
    question: "La foto più vecchia nel rullino?",
    options: [
      { text: "Prima del 2016. È un archivio storico.", score: 82, reaction: "Il tuo telefono è un museo. Non aprire quella cartella." },
      { text: "2017-2019. Ogni tanto faccio pulizia.", score: 50, reaction: "Procrastinazione regolare e sistematica." },
      { text: "Solo l'ultimo anno. Sono organizzato.", score: 18, reaction: "O sei ordinato o hai cambiato telefono di recente." },
      { text: "Tutto su cloud. Il rullino non esiste.", score: 12, reaction: "Hai spostato il problema su Amazon. Elegante." },
    ],
  },
  {
    id: 8, emoji: "🎤",
    question: "I tuoi messaggi vocali durano?",
    options: [
      { text: "Più di 2 minuti. Mi piace spiegarmi bene.", score: 80, reaction: "Stai registrando un podcast non richiesto." },
      { text: "30 secondi max. Rispetto il tempo altrui.", score: 20, reaction: "Teoria della mente sviluppata. Raro." },
      { text: "Non mando vocali. Scelta etica.", score: 40, reaction: "Hai preso una posizione. Tienila." },
      { text: "Non mando vocali e non li ascolto.", score: 12, reaction: "Il futuro ti appartiene." },
    ],
  },
  {
    id: 9, emoji: "🔐",
    question: "Come sblocchi il telefono?",
    options: [
      { text: "PIN o password. Non mi fido della biometria.", score: 68, reaction: "Diffidenza come sistema di sicurezza. Funziona." },
      { text: "Impronta digitale.", score: 25, reaction: "Hai dato il corpo a una multinazionale. Comodamente." },
      { text: "Face ID. Vivo nel presente.", score: 15, reaction: "Il tuo viso è la chiave di casa. Pensaci." },
      { text: "Nessun blocco. Chi vuoi che lo prenda.", score: 85, reaction: "Ottimismo cosmico applicato alla sicurezza digitale." },
    ],
  },
  {
    id: 10, emoji: "💔",
    question: "Lo schermo del tuo telefono?",
    options: [
      { text: "Rotto. Ci convivo. Non è così grave.", score: 78, reaction: "Hai normalizzato il declino. Metafora disponibile." },
      { text: "Protetto da vetro temperato dal giorno uno.", score: 55, reaction: "Ansia preventiva applicata alla tecnologia." },
      { text: "Perfetto. Ho cura delle mie cose.", score: 20, reaction: "O sei attento o hai comprato il telefono ieri." },
      { text: "Ho la cover ma non il vetro. Sono ottimista.", score: 40, reaction: "Mezzo ottimismo. Il più diffuso in natura." },
    ],
  },
  {
    id: 11, emoji: "📱",
    question: "Quante app hai nella schermata principale?",
    options: [
      { text: "Solo quelle che uso davvero. Tre o quattro.", score: 12, reaction: "Minimalismo digitale. Probabilmente hai anche una pianta." },
      { text: "Piena ma so dove sono.", score: 45, reaction: "Caos organizzato. La condizione umana." },
      { text: "Ho più schermate. Non ricordo quante.", score: 72, reaction: "Hai costruito un labirinto e perso la mappa." },
      { text: "Tutto in cartelle con nomi creativi.", score: 35, reaction: "Ti sei dato un sistema. Non funziona ma ci tieni." },
    ],
  },
  {
    id: 12, emoji: "🗑️",
    question: "Quando hai svuotato la memoria l'ultima volta?",
    options: [
      { text: "Ogni settimana. Sono organizzato.", score: 10, reaction: "La persona più rara che conosco." },
      { text: "Quando mi dice che la memoria è piena.", score: 65, reaction: "Gestione reattiva della vita digitale." },
      { text: "C'è un cestino?", score: 82, reaction: "Risposta onesta. Terrificante, ma onesta." },
      { text: "Ho il backup automatico, non mi interessa.", score: 30, reaction: "Hai delegato anche il disordine. Strategico." },
    ],
  },
  {
    id: 13, emoji: "💬",
    question: "Quanti messaggi non letti hai adesso?",
    options: [
      { text: "Zero. Non riesco a dormire altrimenti.", score: 20, reaction: "Il telefono ti controlla. In modo ordinato." },
      { text: "Qualche decina. Li leggo ma non rispondo.", score: 40, reaction: "Passivo-aggressivo in modo involontario." },
      { text: "Centinaia. Ho smesso di contare.", score: 75, reaction: "Hai fatto pace con il caos. Rispetto." },
      { text: "Non lo so. Non guardo quel numero.", score: 55, reaction: "Negazione consapevole. Una strategia." },
    ],
  },
  {
    id: 14, emoji: "🌙",
    question: "Il telefono di notte?",
    options: [
      { text: "Sul comodino, schermo verso il basso.", score: 45, reaction: "Compromesso tra dipendenza e senso di colpa." },
      { text: "In un'altra stanza. Ho dei limiti.", score: 15, reaction: "Forza di volontà rara. O notti agitate." },
      { text: "Sul comodino, carico, notifiche attive.", score: 78, reaction: "Il telefono è il tuo coinquilino preferito." },
      { text: "In modalità aereo. Sono serio.", score: 10, reaction: "O dormi benissimo o menti benissimo." },
    ],
  },
  {
    id: 15, emoji: "📞",
    question: "Quando squilla il telefono tu...",
    options: [
      { text: "Rispondo sempre. È un telefono.", score: 35, reaction: "Un ottimista. O chi non ha abbastanza nemici." },
      { text: "Guardo chi è e decido.", score: 25, reaction: "Selezione naturale delle relazioni umane." },
      { text: "Non rispondo mai. Manda un messaggio.", score: 60, reaction: "Hai stabilito dei confini chiari." },
      { text: "Va in vivavoce perché non trovo il telefono.", score: 72, reaction: "Il caos come ecosistema naturale." },
    ],
  },
  {
    id: 16, emoji: "🎵",
    question: "Come ascolti musica?",
    options: [
      { text: "Spotify o simili. Come tutti.", score: 30, reaction: "Nella media. Niente di cui vergognarsi." },
      { text: "YouTube con la pubblicità. Non pago.", score: 58, reaction: "Economia domestica applicata alla cultura." },
      { text: "Ho ancora i file mp3 sul telefono.", score: 82, reaction: "iPod nella mente, smartphone nella mano." },
      { text: "Non ascolto musica dal telefono.", score: 20, reaction: "O hai degli standard o hai perso le cuffie." },
    ],
  },
  {
    id: 17, emoji: "🗺️",
    question: "Usi Maps o sai orientarti?",
    options: [
      { text: "Maps sempre. Anche per posti che conosco.", score: 70, reaction: "Hai esternalizzato l'orientamento a Google." },
      { text: "Solo per posti nuovi.", score: 22, reaction: "Equilibrio raro tra digitale e analogico." },
      { text: "Maps ma poi mi perdo lo stesso.", score: 55, reaction: "Tecnologia come placebo." },
      { text: "Mi oriento da solo. Le mappe sono per i deboli.", score: 35, reaction: "Romantico. O vivi in un posto con due strade." },
    ],
  },
  {
    id: 18, emoji: "🔄",
    question: "Quando aggiorni le app?",
    options: [
      { text: "Aggiornamento automatico. Non ci penso.", score: 18, reaction: "Hai delegato anche le decisioni tecnologiche." },
      { text: "Quando la notifica mi rompe abbastanza.", score: 60, reaction: "Resistenza passiva alla tecnologia. Nobile." },
      { text: "Non aggiorno mai. Funziona così.", score: 80, reaction: "Tuo nonno digitale sarebbe fiero." },
      { text: "Manualmente ogni settimana.", score: 15, reaction: "Hai troppo tempo libero o troppo poco." },
    ],
  },
  {
    id: 19, emoji: "🤳",
    question: "Quante foto hai fatto questa settimana?",
    options: [
      { text: "Zero. Non era necessario immortalare niente.", score: 15, reaction: "O hai vissuto pienamente o non è successo niente." },
      { text: "Qualche foto. Solo le cose che valevano.", score: 28, reaction: "Selettività fotografica. Una virtù rara." },
      { text: "Decine. Compreso il pranzo di ieri.", score: 65, reaction: "Stai documentando la vita per qualcuno che non la vedrà." },
      { text: "Non lo so, non conto.", score: 80, reaction: "Il rullino cresce da solo. Come un fungo." },
    ],
  },
  {
    id: 20, emoji: "🔕",
    question: "Il Do Not Disturb lo usi?",
    options: [
      { text: "Sempre attivo. Il mondo può aspettare.", score: 18, reaction: "Confini sani. Probabilmente hai un buon terapeuta." },
      { text: "Solo di notte.", score: 32, reaction: "Un minimo di rispetto per il sonno." },
      { text: "Non l'ho mai attivato.", score: 75, reaction: "Disponibile 24 ore. Condizione moderna." },
      { text: "Non so neanche dove si trova.", score: 60, reaction: "Ignoranza per pigrizia o per scelta. Stesso risultato." },
    ],
  },
];

const RESULTS = [
  {
    min: 0, max: 22, age: 19,
    title: "Disturbante",
    subtitle: "Il tuo telefono è più sano di te.",
    desc: "Nessuna patologia rilevata. Zero sveglie inutili, zero app zombie. O hai meno di vent'anni o hai fatto un percorso spirituale sul tuo smartphone. In entrambi i casi sei fastidioso da frequentare.",
    twist: "Probabilmente hai anche una routine mattutina.",
    accent: "#00e676", bg: "#0a1a0e", card: "#0f2415",
  },
  {
    min: 23, max: 38, age: 28,
    title: "Quasi Salvo",
    subtitle: "Con un po' di impegno potresti farcela.",
    desc: "Segni di consapevolezza digitale ma con alcune abitudini vestigiali di un sé precedente. La situazione è gestibile. Con sforzo moderato e una buona connessione wi-fi.",
    twist: "Hai ancora speranza. Non sprecarla.",
    accent: "#40c4ff", bg: "#08131a", card: "#0d1e2b",
  },
  {
    min: 39, max: 54, age: 41,
    title: "Medio in Tutto",
    subtitle: "Né troppo giovane né troppo vecchio. Semplicemente medio.",
    desc: "Il telefono rispecchia la vita: funziona, sopravvive, non brilla. Facebook installato per sicurezza. Tre sveglie. Vocali di novanta secondi. Sentenza: adeguato.",
    twist: "La media è anche una scelta di vita.",
    accent: "#ffd740", bg: "#1a1400", card: "#242000",
  },
  {
    min: 55, max: 68, age: 52,
    title: "Avanzato ma Funzionante",
    subtitle: "Il declino è iniziato. Procede con dignità.",
    desc: "L'ecosistema digitale funziona nonostante tutto. Non si sa come. Suoneria di default dal 2019, rullino come archivio nazionale, caricabatterie in ogni stanza. Non c'è urgenza. Ma sarebbe auspicabile una revisione.",
    twist: "Il telefono sopravviverà al paziente. Per inerzia.",
    accent: "#ff9100", bg: "#1a0d00", card: "#241400",
  },
  {
    min: 69, max: 100, age: 67,
    title: "Reperto Storico",
    subtitle: "Andrebbe esposto in un museo.",
    desc: "Ha raggiunto uno stadio di stabilità digitale che va oltre la negligenza: è diventato un'identità. Foto dal 2012, Candy Crush a livello quattro cifre, PIN uguale da sempre, schermo rotto da mesi.",
    twist: "Non cambierà. E in fondo, perché dovrebbe.",
    accent: "#ff5252", bg: "#1a0808", card: "#240f0f",
  },
];

const getResult = (scores) => {
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  return RESULTS.find((r) => avg >= r.min && avg <= r.max) || RESULTS[2];
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function useTypewriter(text, speed = 12, active = false) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!active) { setDisplayed(""); return; }
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
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState([]);
  const [reactions, setReactions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [reaction, setReaction] = useState("");
  const [animOut, setAnimOut] = useState(false);
  const [result, setResult] = useState(null);
  const [resultVisible, setResultVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const progress = questions.length > 0 ? (current / questions.length) * 100 : 0;
  const diagTyped = useTypewriter(result?.desc || "", 12, resultVisible);
  const twistTyped = useTypewriter(result?.twist || "", 12, resultVisible && diagTyped === result?.desc);

  const startQuiz = () => {
    setQuestions(shuffle(ALL_QUESTIONS).slice(0, 10).map(q => ({...q, options: shuffle(q.options)})));
    setCurrent(0); setScores([]); setReactions([]);
    setSelected(null); setReaction(""); setAnimOut(false);
    setResult(null); setResultVisible(false); setCopied(false);
    setScreen("quiz");
  };

  const handleAnswer = (opt) => {
    if (selected !== null) return;
    setSelected(opt.score);
    setReaction(opt.reaction);
    setTimeout(() => {
      setAnimOut(true);
      setTimeout(() => {
        const ns = [...scores, opt.score];
        const nr = [...reactions, opt.reaction];
        setScores(ns); setReactions(nr);
        if (current + 1 >= questions.length) {
          const r = getResult(ns);
          setResult(r); setScreen("result");
          setTimeout(() => setResultVisible(true), 300);
        } else {
          setCurrent(current + 1);
          setSelected(null); setReaction(""); setAnimOut(false);
        }
      }, 350);
    }, 900);
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=IBM+Plex+Mono:ital,wght@0,400;0,500;1,400&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    body{-webkit-text-size-adjust:100%}
    @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
    @keyframes slideIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
    .f1{animation:fadeUp .5s .0s both}
    .f2{animation:fadeUp .5s .1s both}
    .f3{animation:fadeUp .5s .2s both}
    .f4{animation:fadeUp .5s .3s both}
    .f5{animation:fadeUp .5s .4s both}
    .card-in{animation:fadeUp .3s both}
    .react-in{animation:slideIn .3s both}
    .r1{animation:fadeUp .4s .05s both}
    .r2{animation:fadeUp .4s .15s both}
    .r3{animation:fadeUp .4s .25s both}
    .r4{animation:fadeUp .4s .35s both}
    .r5{animation:fadeUp .4s .45s both}
    .cursor{display:inline-block;width:2px;height:.85em;background:currentColor;margin-left:2px;animation:blink .7s infinite;vertical-align:text-bottom}
    .opt-btn{transition:border-color .15s,background .15s;cursor:pointer}
    .opt-btn:active{opacity:.8}
    button{cursor:pointer}
    button:active{opacity:.8}
  `;

  const root = {
    minHeight: "100vh",
    fontFamily: "'IBM Plex Mono', monospace",
    display: "flex", flexDirection: "column",
    alignItems: "center", padding: "24px 16px 60px",
  };

  // ── INTRO ──
  if (screen === "intro") return (
    <div style={{...root, background: "#0e0e0e", color: "#e0e0e0"}}>
      <style>{css}</style>
      <div style={{maxWidth: 440, width: "100%", textAlign: "center", paddingTop: "8vh"}}>
        <div className="f1" style={{
          display: "inline-block", background: "rgba(255,255,255,.07)",
          border: "1px solid rgba(255,255,255,.12)", borderRadius: 100,
          padding: "6px 16px", fontSize: 11, letterSpacing: 2,
          color: "#777", marginBottom: 32, textTransform: "uppercase",
        }}>📱 Clinica Digitale</div>

        <h1 className="f2" style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(40px, 11vw, 64px)", fontWeight: 900,
          lineHeight: 1.05, color: "#fff", marginBottom: 20, letterSpacing: -1,
        }}>
          Quanti anni ha<br/>
          <span style={{color: "#ffd740"}}>il tuo telefono?</span>
        </h1>

        <p className="f3" style={{fontSize: 16, color: "#aaa", lineHeight: 1.8, marginBottom: 16}}>
          Non l'anno di produzione.<br/>
          L'<strong style={{color: "#fff"}}>età mentale</strong>.<br/>
          Quella che non vuoi sapere.
        </p>

        <div className="f4" style={{fontSize: 12, color: "#444", letterSpacing: 1, marginBottom: 40}}>
          10 domande casuali · risultato immediato
        </div>

        <button className="f5" onClick={startQuiz} style={{
          background: "#fff", color: "#000", border: "none",
          borderRadius: 8, padding: "18px 0", fontSize: 15,
          fontWeight: 700, letterSpacing: 1.5,
          fontFamily: "'IBM Plex Mono', monospace",
          width: "100%", textTransform: "uppercase",
          marginBottom: 16, display: "block",
        }}>
          Inizia la visita →
        </button>

        <p className="f5" style={{fontSize: 12, color: "#333"}}>
          Nessun dato raccolto. Solo verità scomode.
        </p>
      </div>
    </div>
  );

  // ── QUIZ ──
  if (screen === "quiz" && questions.length > 0) {
    const q = questions[current];
    return (
      <div style={{...root, background: "#0e0e0e", color: "#e0e0e0"}}>
        <style>{css}</style>

        <div style={{
          width: "100%", maxWidth: 500,
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: 12,
        }}>
          <span style={{fontSize: 11, letterSpacing: 3, color: "#444", textTransform: "uppercase"}}>Clinica Digitale</span>
          <span style={{fontSize: 15, color: "#666"}}>
            {current + 1}<span style={{color: "#333"}}>/{questions.length}</span>
          </span>
        </div>

        <div style={{
          width: "100%", maxWidth: 500, height: 3,
          background: "rgba(255,255,255,.07)", marginBottom: 24,
          borderRadius: 10, overflow: "hidden",
        }}>
          <div style={{
            height: "100%", background: "#ffd740",
            width: `${progress}%`, borderRadius: 10,
            transition: "width .4s ease",
          }} />
        </div>

        <div
          key={current}
          className="card-in"
          style={{
            width: "100%", maxWidth: 500,
            background: "#181818", border: "1px solid #2a2a2a",
            borderRadius: 16, padding: "24px 20px",
            opacity: animOut ? 0 : 1,
            transform: animOut ? "translateY(-8px)" : "translateY(0)",
            transition: "opacity .3s, transform .3s",
          }}
        >
          <div style={{fontSize: 32, textAlign: "center", marginBottom: 16}}>{q.emoji}</div>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(19px, 5vw, 23px)", fontWeight: 800,
            textAlign: "center", color: "#fff",
            marginBottom: 24, lineHeight: 1.3,
          }}>{q.question}</h2>

          <div style={{display: "flex", flexDirection: "column", gap: 10}}>
            {q.options.map((opt, i) => (
              <button
                key={i}
                className="opt-btn"
                style={{
                  background: selected === opt.score ? "#ffd740" : "rgba(255,255,255,.05)",
                  border: `1.5px solid ${selected === opt.score ? "#ffd740" : "rgba(255,255,255,.1)"}`,
                  borderRadius: 10, padding: "14px 16px",
                  color: selected === opt.score ? "#000" : "#ccc",
                  fontSize: 14, textAlign: "left",
                  fontFamily: "'IBM Plex Mono', monospace",
                  display: "flex", gap: 12,
                  alignItems: "flex-start", lineHeight: 1.5,
                  pointerEvents: selected !== null ? "none" : "auto",
                }}
                onClick={() => handleAnswer(opt)}
              >
                <span style={{
                  color: selected === opt.score ? "#000" : "#555",
                  minWidth: 18, fontSize: 12, paddingTop: 1, fontWeight: 700,
                }}>
                  {["A","B","C","D"][i]}
                </span>
                <span style={{flex: 1}}>{opt.text}</span>
              </button>
            ))}
          </div>

          {reaction && (
            <div className="react-in" style={{
              marginTop: 16, padding: "14px 16px",
              background: "rgba(255,215,64,.07)",
              border: "1px solid rgba(255,215,64,.2)",
              borderRadius: 8,
            }}>
              <span style={{
                fontSize: 10, letterSpacing: 3, color: "#ffd740",
                marginBottom: 6, display: "block", textTransform: "uppercase",
              }}>Verdetto parziale</span>
              <p style={{fontSize: 14, color: "#ddd", fontStyle: "italic", lineHeight: 1.6}}>
                "{reaction}"
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── RESULT ──
  if (screen === "result" && result) return (
    <div style={{...root, background: result.bg, color: "#e0e0e0"}}>
      <style>{css}</style>
      <div style={{maxWidth: 500, width: "100%", paddingTop: 8}}>

        <div className="r1" style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: 28,
        }}>
          <span style={{fontSize: 10, letterSpacing: 3, color: "#555", textTransform: "uppercase"}}>
            Referto Ufficiale
          </span>
          <span style={{
            fontSize: 10, letterSpacing: 2,
            border: `1px solid ${result.accent}`,
            color: result.accent, padding: "3px 10px",
            borderRadius: 3, textTransform: "uppercase",
          }}>Clinica Digitale</span>
        </div>

        <div className="r2" style={{display: "flex", alignItems: "center", gap: 16, marginBottom: 8}}>
          <div style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(76px, 20vw, 100px)", fontWeight: 900,
            lineHeight: 1, letterSpacing: -4,
            color: result.accent, minWidth: "fit-content",
          }}>{result.age}</div>
          <div>
            <div style={{fontSize: 10, letterSpacing: 3, color: result.accent, textTransform: "uppercase", marginBottom: 6}}>
              Anni Mentali
            </div>
            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(19px, 5vw, 24px)", fontWeight: 800,
              color: "#fff", lineHeight: 1.2, marginBottom: 6,
            }}>{result.title}</div>
            <div style={{fontSize: 13, color: result.accent + "cc", lineHeight: 1.4}}>
              {result.subtitle}
            </div>
          </div>
        </div>

        <div className="r3" style={{
          height: 1, background: result.accent + "33",
          margin: "20px 0",
        }} />

        <div className="r3" style={{
          background: result.card,
          border: `1px solid ${result.accent}22`,
          borderRadius: 12, padding: "18px 16px", marginBottom: 20,
        }}>
          <span style={{
            fontSize: 10, letterSpacing: 3, color: result.accent,
            textTransform: "uppercase", marginBottom: 10, display: "block",
          }}>Diagnosi</span>
          <p style={{fontSize: 14, color: "#ccc", lineHeight: 1.85}}>
            {diagTyped}
            {diagTyped !== result.desc && <span className="cursor" style={{color: result.accent}} />}
          </p>
          {(twistTyped.length > 0 || diagTyped === result.desc) && (
            <>
              <span style={{
                fontSize: 10, letterSpacing: 3, color: result.accent,
                textTransform: "uppercase", marginBottom: 8,
                marginTop: 16, display: "block",
              }}>Sentenza Finale</span>
              <p style={{fontSize: 14, color: result.accent + "ee", fontStyle: "italic", lineHeight: 1.7}}>
                {twistTyped}
                {twistTyped.length > 0 && twistTyped !== result.twist && <span className="cursor" style={{color: result.accent}} />}
              </p>
            </>
          )}
        </div>

        <div className="r4" style={{marginBottom: 24}}>
          <div style={{
            fontSize: 10, letterSpacing: 3, color: "#444",
            textTransform: "uppercase", marginBottom: 12,
          }}>Annotazioni</div>
          {reactions.map((r, i) => (
            <div key={i} style={{
              display: "flex", gap: 12, marginBottom: 10, alignItems: "flex-start",
            }}>
              <span style={{fontSize: 11, minWidth: 22, paddingTop: 2, color: result.accent}}>
                {String(i+1).padStart(2,"0")}
              </span>
              <span style={{fontSize: 13, color: "#888", fontStyle: "italic", lineHeight: 1.55}}>
                "{r}"
              </span>
            </div>
          ))}
        </div>

        <div className="r5" style={{display: "flex", flexDirection: "column", gap: 12, marginBottom: 20}}>
          <button
            onClick={copyShare}
            style={{
              background: result.accent, color: result.bg,
              border: "none", borderRadius: 8, padding: "16px",
              fontSize: 14, fontWeight: 700,
              fontFamily: "'IBM Plex Mono', monospace",
              letterSpacing: 1, textTransform: "uppercase",
            }}
          >
            {copied ? "✓ Copiato!" : "Copia e condividi"}
          </button>
          <button
            onClick={startQuiz}
            style={{
              background: "transparent",
              border: `1.5px solid ${result.accent}55`,
              borderRadius: 8, padding: "15px",
              fontSize: 13, color: result.accent,
              fontFamily: "'IBM Plex Mono', monospace",
            }}
          >
            Rifai con domande diverse
          </button>
        </div>

        <p className="r5" style={{fontSize: 11, color: "#333", textAlign: "center"}}>
          Clinica Digitale · revelo.cool
        </p>
      </div>
    </div>
  );

  return null;
}
