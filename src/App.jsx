import { useState, useEffect } from "react";

// ─────────────────────────────────────────────
// PERSONAGGI — 3 varianti per ogni profilo (15 totali)
// ─────────────────────────────────────────────
const CHARACTERS = {
  0: [ // DISTURBANTE
    {
      label: "troppo perfetto",
      svg: (color) => `
        <ellipse cx="54" cy="18" rx="22" ry="6" fill="none" stroke="${color}" stroke-width="2" opacity="0.8"/>
        <rect x="22" y="92" width="64" height="52" rx="14" fill="${color}" stroke="#007a33" stroke-width="2"/>
        <rect x="32" y="92" width="44" height="16" rx="6" fill="#00a040"/>
        <ellipse cx="16" cy="108" rx="9" ry="22" fill="#f5c090" stroke="#c07840" stroke-width="2" transform="rotate(-10,16,108)"/>
        <ellipse cx="92" cy="108" rx="9" ry="22" fill="#f5c090" stroke="#c07840" stroke-width="2" transform="rotate(10,92,108)"/>
        <rect x="80" y="100" width="22" height="36" rx="5" fill="#0a2a14" stroke="${color}" stroke-width="1.5"/>
        <text x="91" y="118" font-size="7" fill="${color}" text-anchor="middle" font-family="monospace">100%</text>
        <text x="91" y="128" font-size="6" fill="${color}" text-anchor="middle" font-family="monospace">✓✓✓</text>
        <ellipse cx="54" cy="60" rx="34" ry="36" fill="#f5c090" stroke="#e0a070" stroke-width="2"/>
        <path d="M22 44 Q32 14 54 12 Q76 14 86 44 Q78 26 54 24 Q30 26 22 44Z" fill="#1a0a00" stroke="#0a0000" stroke-width="1.5"/>
        <path d="M46 12 Q54 -4 62 12" fill="#1a0a00" stroke="#0a0000" stroke-width="1.5"/>
        <ellipse cx="40" cy="58" rx="11" ry="12" fill="white" stroke="#1a0a00" stroke-width="2"/>
        <text x="40" y="63" font-size="14" text-anchor="middle">⭐</text>
        <ellipse cx="68" cy="58" rx="11" ry="12" fill="white" stroke="#1a0a00" stroke-width="2"/>
        <text x="68" y="63" font-size="14" text-anchor="middle">⭐</text>
        <path d="M30 44 Q40 36 50 44" stroke="#1a0a00" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M58 44 Q68 36 78 44" stroke="#1a0a00" stroke-width="3" fill="none" stroke-linecap="round"/>
        <ellipse cx="54" cy="70" rx="5" ry="4" fill="#e0a070" stroke="#c07840" stroke-width="1"/>
        <path d="M40 80 Q54 92 68 80" stroke="#c06840" stroke-width="3" fill="none" stroke-linecap="round"/>
        <ellipse cx="30" cy="74" rx="8" ry="5" fill="#ffaaaa" opacity="0.4"/>
        <ellipse cx="78" cy="74" rx="8" ry="5" fill="#ffaaaa" opacity="0.4"/>
        <text x="10" y="58" font-size="16">✨</text>
        <text x="90" y="68" font-size="14">⭐</text>
      `
    },
    {
      label: "focus mode sempre attiva",
      svg: (color) => `
        <rect x="22" y="92" width="62" height="52" rx="13" fill="${color}" stroke="#007a33" stroke-width="2"/>
        <ellipse cx="14" cy="108" rx="8" ry="20" fill="#f0b880" stroke="#c07840" stroke-width="2" transform="rotate(-8,14,108)"/>
        <ellipse cx="88" cy="108" rx="8" ry="20" fill="#f0b880" stroke="#c07840" stroke-width="2" transform="rotate(8,88,108)"/>
        <rect x="78" y="110" width="12" height="16" rx="2" fill="#3a2000" stroke="${color}" stroke-width="1"/>
        <path d="M84 110 Q80 98 76 94 Q84 96 84 110Z" fill="${color}"/>
        <path d="M84 110 Q88 96 92 94 Q92 100 84 110Z" fill="#00aa40"/>
        <ellipse cx="54" cy="60" rx="33" ry="35" fill="#f0b880" stroke="#d09060" stroke-width="2"/>
        <path d="M22 48 Q30 16 54 14 Q78 16 86 48 Q78 28 54 26 Q30 28 22 48Z" fill="#8B4513"/>
        <path d="M22 48 Q18 68 20 88 Q24 93 26 90" fill="#8B4513"/>
        <path d="M86 48 Q90 68 88 88 Q84 93 82 90" fill="#8B4513"/>
        <ellipse cx="40" cy="58" rx="10" ry="11" fill="white" stroke="#1a0a00" stroke-width="2"/>
        <text x="40" y="63" font-size="13" text-anchor="middle">💚</text>
        <ellipse cx="68" cy="58" rx="10" ry="11" fill="white" stroke="#1a0a00" stroke-width="2"/>
        <text x="68" y="63" font-size="13" text-anchor="middle">💚</text>
        <path d="M31 45 Q40 38 49 45" stroke="#1a0a00" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path d="M59 45 Q68 38 77 45" stroke="#1a0a00" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path d="M40 80 Q54 90 68 80" stroke="#c06840" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <ellipse cx="30" cy="74" rx="7" ry="5" fill="#ffaaaa" opacity="0.4"/>
        <ellipse cx="78" cy="74" rx="7" ry="5" fill="#ffaaaa" opacity="0.4"/>
        <rect x="6" y="22" width="36" height="14" rx="6" fill="${color}" stroke="#007a33" stroke-width="1"/>
        <text x="24" y="32" font-size="7" text-anchor="middle" fill="white" font-weight="bold">FOCUS ON 🎯</text>
      `
    },
    {
      label: "telefono capovolto per scelta",
      svg: (color) => `
        <rect x="22" y="92" width="62" height="52" rx="13" fill="${color}" stroke="#007a33" stroke-width="2"/>
        <ellipse cx="14" cy="108" rx="8" ry="20" fill="#d4a870" stroke="#b07840" stroke-width="2" transform="rotate(-8,14,108)"/>
        <ellipse cx="88" cy="108" rx="8" ry="20" fill="#d4a870" stroke="#b07840" stroke-width="2" transform="rotate(8,88,108)"/>
        <rect x="36" y="140" width="26" height="16" rx="3" fill="#0a2a14" stroke="${color}" stroke-width="1.2" transform="rotate(90,49,148)"/>
        <ellipse cx="54" cy="60" rx="33" ry="35" fill="#d4a870" stroke="#b07840" stroke-width="2"/>
        <path d="M22 46 Q30 18 54 16 Q78 18 86 46 Q78 30 54 28 Q30 30 22 46Z" fill="#1a0800"/>
        <path d="M30 46 Q26 58 28 70" stroke="#1a0800" stroke-width="2" fill="none"/>
        <path d="M78 46 Q82 58 80 70" stroke="#1a0800" stroke-width="2" fill="none"/>
        <path d="M30 58 Q38 54 46 58" stroke="#1a0800" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path d="M62 58 Q70 54 78 58" stroke="#1a0800" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path d="M30 45 Q38 38 46 45" stroke="#1a0800" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path d="M62 45 Q70 38 78 45" stroke="#1a0800" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <ellipse cx="54" cy="70" rx="5" ry="4" fill="#b07040" stroke="#904020" stroke-width="1"/>
        <path d="M40 80 Q54 88 68 80" stroke="#c06840" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <ellipse cx="30" cy="74" rx="7" ry="5" fill="#ffaaaa" opacity="0.35"/>
        <ellipse cx="78" cy="74" rx="7" ry="5" fill="#ffaaaa" opacity="0.35"/>
        <ellipse cx="54" cy="25" rx="24" ry="6" fill="none" stroke="#ffd740" stroke-width="2.5" opacity="0.9"/>
      `
    }
  ],
  1: [ // QUASI SALVO
    {
      label: "47 notifiche ignorate",
      svg: (color) => `
        <rect x="18" y="92" width="64" height="52" rx="14" fill="#0d1e2b" stroke="${color}" stroke-width="2"/>
        <ellipse cx="12" cy="110" rx="8" ry="20" fill="#d4956a" stroke="#b07040" stroke-width="2" transform="rotate(-8,12,110)"/>
        <ellipse cx="88" cy="110" rx="8" ry="20" fill="#d4956a" stroke="#b07040" stroke-width="2" transform="rotate(8,88,110)"/>
        <rect x="6" y="118" width="14" height="16" rx="3" fill="#3a200a" stroke="${color}" stroke-width="1"/>
        <path d="M20 122 Q25 122 25 127 Q25 132 20 132" stroke="${color}" stroke-width="1" fill="none"/>
        <text x="13" y="118" font-size="9" text-anchor="middle">☕</text>
        <rect x="76" y="98" width="20" height="32" rx="4" fill="#0d1e2b" stroke="${color}" stroke-width="1.2"/>
        <circle cx="82" cy="98" r="6" fill="#ff5252"/>
        <text x="82" y="101" font-size="6" text-anchor="middle" fill="white" font-weight="bold">47</text>
        <ellipse cx="50" cy="60" rx="32" ry="34" fill="#d4956a" stroke="#b07040" stroke-width="2"/>
        <path d="M20 50 Q28 20 50 18 Q72 20 80 50 Q72 32 50 30 Q28 32 20 50Z" fill="#2a1a08"/>
        <path d="M20 46 Q16 34 22 28" fill="#2a1a08"/>
        <path d="M80 46 Q84 34 78 28" fill="#2a1a08"/>
        <ellipse cx="36" cy="60" rx="10" ry="9" fill="white" stroke="#1a0a00" stroke-width="2"/>
        <ellipse cx="36" cy="64" rx="10" ry="5" fill="#d4956a" stroke="#1a0a00" stroke-width="2"/>
        <circle cx="37" cy="60" r="5" fill="#1a5a9a"/>
        <circle cx="37" cy="60" r="2.5" fill="#0a1a3a"/>
        <ellipse cx="36" cy="66" rx="10" ry="4" fill="#8060a0" opacity="0.4"/>
        <ellipse cx="64" cy="60" rx="10" ry="9" fill="white" stroke="#1a0a00" stroke-width="2"/>
        <ellipse cx="64" cy="64" rx="10" ry="5" fill="#d4956a" stroke="#1a0a00" stroke-width="2"/>
        <circle cx="65" cy="60" r="5" fill="#1a5a9a"/>
        <circle cx="65" cy="60" r="2.5" fill="#0a1a3a"/>
        <ellipse cx="64" cy="66" rx="10" ry="4" fill="#8060a0" opacity="0.4"/>
        <path d="M28 48 Q36 44 44 48" stroke="#2a1a08" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path d="M56 48 Q64 44 72 48" stroke="#2a1a08" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <ellipse cx="50" cy="70" rx="5" ry="4" fill="#b07040" stroke="#a06030" stroke-width="1"/>
        <path d="M38 78 Q50 80 62 76" stroke="#a07050" stroke-width="2" fill="none" stroke-linecap="round"/>
        <ellipse cx="16" cy="62" rx="5" ry="6" fill="#222" stroke="${color}" stroke-width="1.2"/>
        <ellipse cx="84" cy="62" rx="5" ry="6" fill="#222" stroke="${color}" stroke-width="1.2"/>
        <ellipse cx="78" cy="22" rx="18" ry="11" fill="#1a3a5a" stroke="${color}" stroke-width="1.2"/>
        <circle cx="68" cy="32" r="3" fill="#1a3a5a" stroke="${color}" stroke-width="1"/>
        <circle cx="64" cy="38" r="2" fill="#1a3a5a" stroke="${color}" stroke-width="0.8"/>
        <text x="78" y="26" font-size="9" text-anchor="middle" fill="${color}">perché?</text>
      `
    },
    {
      label: "energy drink come acqua",
      svg: (color) => `
        <rect x="18" y="92" width="64" height="52" rx="13" fill="#0d1e2b" stroke="${color}" stroke-width="2"/>
        <ellipse cx="12" cy="110" rx="8" ry="20" fill="#c8806a" stroke="#a06040" stroke-width="2" transform="rotate(-8,12,110)"/>
        <ellipse cx="88" cy="110" rx="8" ry="20" fill="#c8806a" stroke="#a06040" stroke-width="2" transform="rotate(8,88,110)"/>
        <rect x="78" y="106" width="10" height="20" rx="3" fill="${color}" stroke="#0099cc" stroke-width="1.2"/>
        <text x="83" y="120" font-size="6" text-anchor="middle" fill="white" font-weight="bold">⚡</text>
        <ellipse cx="50" cy="60" rx="32" ry="34" fill="#c8806a" stroke="#a06040" stroke-width="2"/>
        <path d="M20 46 Q28 18 50 16 Q72 18 80 46 Q72 28 50 26 Q28 28 20 46Z" fill="#111"/>
        <rect x="26" y="54" width="18" height="12" rx="3" fill="none" stroke="${color}" stroke-width="2"/>
        <rect x="56" y="54" width="18" height="12" rx="3" fill="none" stroke="${color}" stroke-width="2"/>
        <line x1="44" y1="60" x2="56" y2="60" stroke="${color}" stroke-width="1.8"/>
        <line x1="16" y1="59" x2="26" y2="60" stroke="${color}" stroke-width="1.8"/>
        <line x1="74" y1="60" x2="82" y2="59" stroke="${color}" stroke-width="1.8"/>
        <circle cx="35" cy="60" r="4" fill="#1a5a9a"/>
        <circle cx="35" cy="60" r="2" fill="#0a1a3a"/>
        <circle cx="65" cy="60" r="4" fill="#1a5a9a"/>
        <circle cx="65" cy="60" r="2" fill="#0a1a3a"/>
        <ellipse cx="35" cy="65" rx="9" ry="4" fill="#6040a0" opacity="0.5"/>
        <ellipse cx="65" cy="65" rx="9" ry="4" fill="#6040a0" opacity="0.5"/>
        <path d="M28 48 Q35 45 42 48" stroke="#111" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path d="M58 48 Q65 45 72 48" stroke="#111" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <ellipse cx="50" cy="71" rx="5" ry="4" fill="#a06040" stroke="#804020" stroke-width="1"/>
        <path d="M36 78 Q50 80 64 76" stroke="#906040" stroke-width="2" fill="none" stroke-linecap="round"/>
      `
    },
    {
      label: "847 tab aperti",
      svg: (color) => `
        <rect x="18" y="92" width="64" height="52" rx="13" fill="#0d1e2b" stroke="${color}" stroke-width="2"/>
        <ellipse cx="12" cy="110" rx="8" ry="20" fill="#e0a880" stroke="#c07840" stroke-width="2" transform="rotate(-8,12,110)"/>
        <ellipse cx="88" cy="110" rx="8" ry="20" fill="#e0a880" stroke="#c07840" stroke-width="2" transform="rotate(8,88,110)"/>
        <rect x="76" y="98" width="20" height="30" rx="4" fill="#0d1e2b" stroke="${color}" stroke-width="1.2"/>
        <circle cx="82" cy="98" r="7" fill="#ff5252"/>
        <text x="82" y="101" font-size="6" text-anchor="middle" fill="white" font-weight="bold">847</text>
        <text x="86" y="110" font-size="5" text-anchor="middle" fill="${color}">tab</text>
        <ellipse cx="50" cy="60" rx="32" ry="34" fill="#e0a880" stroke="#c07840" stroke-width="2"/>
        <path d="M20 48 Q26 20 50 18 Q74 20 80 48 Q74 32 50 30 Q26 32 20 48Z" fill="#c04010"/>
        <ellipse cx="18" cy="60" rx="6" ry="9" fill="#e0a880" stroke="#c07840" stroke-width="1.5"/>
        <ellipse cx="82" cy="60" rx="6" ry="9" fill="#e0a880" stroke="#c07840" stroke-width="1.5"/>
        <ellipse cx="36" cy="58" rx="10" ry="11" fill="white" stroke="#1a0a00" stroke-width="2"/>
        <circle cx="37" cy="59" r="7" fill="#1a5a9a"/>
        <circle cx="37" cy="59" r="4" fill="#0a1a3a"/>
        <circle cx="35" cy="57" r="2" fill="white"/>
        <ellipse cx="64" cy="58" rx="10" ry="11" fill="white" stroke="#1a0a00" stroke-width="2"/>
        <circle cx="65" cy="59" r="7" fill="#1a5a9a"/>
        <circle cx="65" cy="59" r="4" fill="#0a1a3a"/>
        <circle cx="63" cy="57" r="2" fill="white"/>
        <path d="M27 45 Q36 41 45 45" stroke="#c04010" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path d="M55 45 Q64 41 73 45" stroke="#c04010" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <ellipse cx="50" cy="70" rx="5" ry="4" fill="#c07840" stroke="#a05820" stroke-width="1"/>
        <path d="M37 78 Q50 74 63 78" stroke="#a07050" stroke-width="2" fill="none" stroke-linecap="round"/>
      `
    }
  ],
  2: [ // MEDIO
    {
      label: "tre telefoni, zero sonno",
      svg: (color) => `
        <rect x="18" y="92" width="68" height="52" rx="14" fill="#3a2a0a" stroke="${color}" stroke-width="2"/>
        <line x1="30" y1="92" x2="30" y2="144" stroke="${color}" stroke-width="1" opacity="0.4"/>
        <line x1="44" y1="92" x2="44" y2="144" stroke="${color}" stroke-width="1" opacity="0.4"/>
        <line x1="58" y1="92" x2="58" y2="144" stroke="${color}" stroke-width="1" opacity="0.4"/>
        <line x1="72" y1="92" x2="72" y2="144" stroke="${color}" stroke-width="1" opacity="0.4"/>
        <line x1="18" y1="110" x2="86" y2="110" stroke="${color}" stroke-width="1" opacity="0.4"/>
        <line x1="18" y1="128" x2="86" y2="128" stroke="${color}" stroke-width="1" opacity="0.4"/>
        <ellipse cx="10" cy="112" rx="10" ry="24" fill="#c07848" stroke="#905030" stroke-width="2" transform="rotate(-15,10,112)"/>
        <ellipse cx="94" cy="112" rx="10" ry="24" fill="#c07848" stroke="#905030" stroke-width="2" transform="rotate(15,94,112)"/>
        <rect x="78" y="94" width="14" height="22" rx="3" fill="#1a1400" stroke="${color}" stroke-width="1.5"/>
        <rect x="81" y="90" width="14" height="22" rx="3" fill="#242000" stroke="${color}" stroke-width="1.2" opacity="0.85"/>
        <rect x="84" y="86" width="14" height="22" rx="3" fill="#3a3000" stroke="${color}" stroke-width="1" opacity="0.7"/>
        <rect x="6" y="116" width="16" height="18" rx="3" fill="#3a2000" stroke="${color}" stroke-width="1"/>
        <path d="M22 120 Q28 120 28 126 Q28 132 22 132" stroke="${color}" stroke-width="1" fill="none"/>
        <text x="14" y="116" font-size="10" text-anchor="middle">☕</text>
        <ellipse cx="52" cy="60" rx="36" ry="36" fill="#c07848" stroke="#905030" stroke-width="2"/>
        <path d="M20 52 Q28 24 52 22 Q76 24 84 52 Q76 36 52 34 Q28 36 20 52Z" fill="#1a1208" opacity="0.85"/>
        <ellipse cx="52" cy="30" rx="16" ry="9" fill="#c07848" opacity="0.85"/>
        <ellipse cx="38" cy="58" rx="12" ry="13" fill="white" stroke="#1a0800" stroke-width="2"/>
        <circle cx="38" cy="58" r="8" fill="#6a3a10"/>
        <circle cx="38" cy="58" r="5" fill="#1a0800"/>
        <circle cx="36" cy="56" r="2" fill="white"/>
        <ellipse cx="38" cy="65" rx="12" ry="5" fill="#9060a0" opacity="0.4"/>
        <ellipse cx="66" cy="58" rx="12" ry="13" fill="white" stroke="#1a0800" stroke-width="2"/>
        <circle cx="66" cy="58" r="8" fill="#6a3a10"/>
        <circle cx="66" cy="58" r="5" fill="#1a0800"/>
        <circle cx="64" cy="56" r="2" fill="white"/>
        <ellipse cx="66" cy="65" rx="12" ry="5" fill="#9060a0" opacity="0.4"/>
        <path d="M28 45 Q38 52 48 46" stroke="#1a1208" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <path d="M56 46 Q66 52 76 45" stroke="#1a1208" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <ellipse cx="52" cy="71" rx="6" ry="5" fill="#a06030" stroke="#905030" stroke-width="1"/>
        <ellipse cx="52" cy="82" rx="10" ry="8" fill="#7a3020" stroke="#1a0800" stroke-width="2"/>
        <ellipse cx="52" cy="80" rx="7" ry="5" fill="#c05040"/>
        <path d="M68" y="22" fill="none"/>
        <ellipse cx="90" cy="30" rx="20" ry="13" fill="${color}" stroke="#cc9900" stroke-width="1.5"/>
        <path d="M76 40 L70 52" stroke="${color}" stroke-width="3.5" stroke-linecap="round"/>
        <text x="90" y="26" font-size="8" text-anchor="middle" fill="#3a2800" font-weight="bold">3 sveglie!</text>
        <text x="90" y="38" font-size="11" text-anchor="middle">😱</text>
      `
    },
    {
      label: "gruppi WhatsApp famiglia",
      svg: (color) => `
        <rect x="18" y="92" width="64" height="52" rx="13" fill="#3a2a0a" stroke="${color}" stroke-width="2"/>
        <ellipse cx="10" cy="110" rx="9" ry="22" fill="#c89060" stroke="#a07040" stroke-width="2" transform="rotate(-12,10,110)"/>
        <ellipse cx="90" cy="110" rx="9" ry="22" fill="#c89060" stroke="#a07040" stroke-width="2" transform="rotate(12,90,110)"/>
        <rect x="76" y="106" width="20" height="16" rx="4" fill="#8B4513" stroke="${color}" stroke-width="1.5"/>
        <path d="M80 106 Q86 98 92 106" stroke="${color}" stroke-width="1.5" fill="none"/>
        <text x="86" y="118" font-size="8" text-anchor="middle">👜</text>
        <ellipse cx="50" cy="60" rx="34" ry="36" fill="#c89060" stroke="#a07040" stroke-width="2"/>
        <path d="M18 52 Q24 22 50 20 Q76 22 82 52 Q76 36 50 34 Q24 36 18 52Z" fill="#8B4513"/>
        <path d="M18 48 Q14 60 18 70" fill="#8B4513"/>
        <path d="M82 48 Q86 60 82 70" fill="#8B4513"/>
        <ellipse cx="16" cy="60" rx="7" ry="11" fill="#c89060" stroke="#a07040" stroke-width="1.5"/>
        <ellipse cx="84" cy="60" rx="7" ry="11" fill="#c89060" stroke="#a07040" stroke-width="1.5"/>
        <ellipse cx="36" cy="58" rx="11" ry="10" fill="white" stroke="#1a0800" stroke-width="2"/>
        <circle cx="37" cy="58" r="7" fill="#6a3a10"/>
        <circle cx="37" cy="58" r="4" fill="#1a0800"/>
        <ellipse cx="36" cy="64" rx="11" ry="5" fill="#9060a0" opacity="0.4"/>
        <ellipse cx="64" cy="58" rx="11" ry="10" fill="white" stroke="#1a0800" stroke-width="2"/>
        <circle cx="65" cy="58" r="7" fill="#6a3a10"/>
        <circle cx="65" cy="58" r="4" fill="#1a0800"/>
        <ellipse cx="64" cy="64" rx="11" ry="5" fill="#9060a0" opacity="0.4"/>
        <path d="M27 46 Q36 52 45 46" stroke="#1a1208" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M55 46 Q64 52 73 46" stroke="#1a1208" stroke-width="3" fill="none" stroke-linecap="round"/>
        <ellipse cx="50" cy="71" rx="6" ry="5" fill="#a06030" stroke="#905030" stroke-width="1"/>
        <ellipse cx="50" cy="82" rx="9" ry="7" fill="#7a3020" stroke="#1a0800" stroke-width="2"/>
        <ellipse cx="50" cy="80" rx="6" ry="4" fill="#c05040"/>
        <rect x="4" y="22" width="32" height="18" rx="5" fill="#25D366" stroke="#128C7E" stroke-width="1"/>
        <text x="20" y="31" font-size="7" text-anchor="middle" fill="white" font-weight="bold">famiglia</text>
        <text x="20" y="38" font-size="6" text-anchor="middle" fill="white">847 msg</text>
        <path d="M14" y="40" fill="none"/>
        <circle cx="14" cy="42" r="3" fill="#25D366" stroke="#128C7E" stroke-width="1"/>
        <circle cx="10" cy="48" r="2" fill="#25D366" stroke="#128C7E" stroke-width="0.8"/>
      `
    },
    {
      label: "capelli e batteria in calo",
      svg: (color) => `
        <rect x="18" y="92" width="64" height="52" rx="13" fill="#3a2a0a" stroke="${color}" stroke-width="2"/>
        <line x1="30" y1="92" x2="30" y2="144" stroke="${color}" stroke-width="1" opacity="0.4"/>
        <line x1="46" y1="92" x2="46" y2="144" stroke="${color}" stroke-width="1" opacity="0.4"/>
        <line x1="62" y1="92" x2="62" y2="144" stroke="${color}" stroke-width="1" opacity="0.4"/>
        <line x1="18" y1="112" x2="82" y2="112" stroke="${color}" stroke-width="1" opacity="0.4"/>
        <ellipse cx="10" cy="112" rx="9" ry="22" fill="#b87040" stroke="#905030" stroke-width="2" transform="rotate(-14,10,112)"/>
        <ellipse cx="90" cy="112" rx="9" ry="22" fill="#b87040" stroke="#905030" stroke-width="2" transform="rotate(14,90,112)"/>
        <rect x="76" y="92" width="14" height="22" rx="3" fill="#1a1400" stroke="${color}" stroke-width="1.5"/>
        <rect x="79" y="88" width="14" height="22" rx="3" fill="#242000" stroke="${color}" stroke-width="1.2" opacity="0.85"/>
        <ellipse cx="50" cy="60" rx="34" ry="36" fill="#b87040" stroke="#905030" stroke-width="2"/>
        <path d="M22 54 Q28 26 50 24 Q72 26 78 54" fill="#2a1a08" opacity="0.7"/>
        <ellipse cx="50" cy="30" rx="14" ry="8" fill="#b87040" opacity="0.9"/>
        <path d="M58 22 Q62 12 64 4" stroke="#2a1a08" stroke-width="1.5" fill="none" opacity="0.7" stroke-linecap="round"/>
        <path d="M62 20 Q68 10 72 2" stroke="#2a1a08" stroke-width="1.5" fill="none" opacity="0.5" stroke-linecap="round"/>
        <ellipse cx="16" cy="60" rx="7" ry="11" fill="#b87040" stroke="#905030" stroke-width="1.5"/>
        <ellipse cx="84" cy="60" rx="7" ry="11" fill="#b87040" stroke="#905030" stroke-width="1.5"/>
        <ellipse cx="36" cy="58" rx="12" ry="13" fill="white" stroke="#1a0800" stroke-width="2"/>
        <circle cx="36" cy="58" r="8" fill="#6a3a10"/>
        <circle cx="36" cy="58" r="5" fill="#1a0800"/>
        <circle cx="34" cy="56" r="2" fill="white"/>
        <ellipse cx="36" cy="65" rx="12" ry="5" fill="#9060a0" opacity="0.4"/>
        <ellipse cx="64" cy="58" rx="12" ry="13" fill="white" stroke="#1a0800" stroke-width="2"/>
        <circle cx="64" cy="58" r="8" fill="#6a3a10"/>
        <circle cx="64" cy="58" r="5" fill="#1a0800"/>
        <circle cx="62" cy="56" r="2" fill="white"/>
        <ellipse cx="64" cy="65" rx="12" ry="5" fill="#9060a0" opacity="0.4"/>
        <path d="M26 46 Q36 53 46 46" stroke="#1a1208" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <path d="M54 46 Q64 53 74 46" stroke="#1a1208" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <ellipse cx="50" cy="71" rx="6" ry="5" fill="#a06030" stroke="#905030" stroke-width="1"/>
        <ellipse cx="50" cy="82" rx="10" ry="8" fill="#7a3020" stroke="#1a0800" stroke-width="2"/>
        <ellipse cx="50" cy="80" rx="7" ry="5" fill="#c05040"/>
        <rect x="4" y="14" width="22" height="10" rx="3" fill="#1a1400" stroke="${color}" stroke-width="1"/>
        <rect x="6" y="16" width="14" height="6" rx="1" fill="#ff5252" opacity="0.6"/>
        <rect x="6" y="16" width="4" height="6" rx="1" fill="#ff5252"/>
        <rect x="26" y="16" width="2" height="4" rx="1" fill="${color}"/>
        <text x="13" y="30" font-size="6" text-anchor="middle" fill="${color}">3%</text>
      `
    }
  ],
  3: [ // AVANZATO
    {
      label: "scotch sullo schermo",
      svg: (color) => `
        <rect x="20" y="92" width="64" height="52" rx="14" fill="#3a1a00" stroke="${color}" stroke-width="2"/>
        <rect x="28" y="88" width="48" height="20" rx="10" fill="#4a2a00"/>
        <ellipse cx="14" cy="110" rx="9" ry="22" fill="#b06030" stroke="#804020" stroke-width="2" transform="rotate(-10,14,110)"/>
        <ellipse cx="90" cy="110" rx="9" ry="22" fill="#b06030" stroke="#804020" stroke-width="2" transform="rotate(10,90,110)"/>
        <rect x="76" y="96" width="20" height="32" rx="4" fill="#1a0800" stroke="${color}" stroke-width="1.5"/>
        <line x1="80" y1="100" x2="90" y2="114" stroke="${color}" stroke-width="1" opacity="0.8"/>
        <line x1="90" y1="114" x2="82" y2="126" stroke="${color}" stroke-width="0.8" opacity="0.6"/>
        <line x1="90" y1="114" x2="94" y2="106" stroke="${color}" stroke-width="0.7" opacity="0.5"/>
        <rect x="83" y="107" width="12" height="7" rx="1" fill="#ffff80" opacity="0.3" stroke="#cc9900" stroke-width="0.5"/>
        <text x="89" y="113" font-size="5" text-anchor="middle" fill="#886600">scotch</text>
        <ellipse cx="52" cy="60" rx="34" ry="36" fill="#b06030" stroke="#804020" stroke-width="2"/>
        <path d="M22 56 Q28 30 52 28 Q76 30 82 56" fill="#aaa" opacity="0.65"/>
        <line x1="30" y1="46" x2="36" y2="38" stroke="#aaa" stroke-width="2" opacity="0.5"/>
        <line x1="52" y1="28" x2="52" y2="22" stroke="#aaa" stroke-width="2" opacity="0.5"/>
        <line x1="74" y1="46" x2="68" y2="38" stroke="#aaa" stroke-width="2" opacity="0.5"/>
        <rect x="24" y="52" width="20" height="14" rx="4" fill="none" stroke="${color}" stroke-width="2.5"/>
        <rect x="58" y="52" width="20" height="14" rx="4" fill="none" stroke="${color}" stroke-width="2.5"/>
        <rect x="27" y="55" width="14" height="8" rx="2" fill="${color}" opacity="0.08"/>
        <rect x="61" y="55" width="14" height="8" rx="2" fill="${color}" opacity="0.08"/>
        <line x1="44" y1="59" x2="58" y2="59" stroke="${color}" stroke-width="2.5"/>
        <line x1="16" y1="58" x2="24" y2="59" stroke="${color}" stroke-width="2.5"/>
        <line x1="78" y1="59" x2="86" y2="58" stroke="${color}" stroke-width="2.5"/>
        <circle cx="34" cy="59" r="4" fill="#603010"/>
        <circle cx="34" cy="59" r="2" fill="#1a0800"/>
        <circle cx="68" cy="59" r="4" fill="#603010"/>
        <circle cx="68" cy="59" r="2" fill="#1a0800"/>
        <path d="M26 50 Q34 46 42 50" stroke="#ccc" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M62 50 Q70 46 78 50" stroke="#ccc" stroke-width="3" fill="none" stroke-linecap="round"/>
        <ellipse cx="52" cy="70" rx="6" ry="5" fill="#904828" stroke="#784020" stroke-width="1.2"/>
        <path d="M38 80 Q52 78 66 80" stroke="#804020" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <ellipse cx="14" cy="30" rx="18" ry="11" fill="#3a1a00" stroke="${color}" stroke-width="1.2"/>
        <circle cx="24" cy="40" r="3" fill="#3a1a00" stroke="${color}" stroke-width="1"/>
        <circle cx="28" cy="46" r="2" fill="#3a1a00" stroke="${color}" stroke-width="0.8"/>
        <text x="14" y="26" font-size="7" text-anchor="middle" fill="${color}">funziona</text>
        <text x="14" y="36" font-size="7" text-anchor="middle" fill="${color}">così...</text>
      `
    },
    {
      label: "tre cover per sicurezza",
      svg: (color) => `
        <rect x="20" y="92" width="62" height="52" rx="13" fill="#3a1a00" stroke="${color}" stroke-width="2"/>
        <ellipse cx="14" cy="110" rx="8" ry="20" fill="#a85828" stroke="#784020" stroke-width="2" transform="rotate(-10,14,110)"/>
        <ellipse cx="88" cy="110" rx="8" ry="20" fill="#a85828" stroke="#784020" stroke-width="2" transform="rotate(10,88,110)"/>
        <rect x="4" y="104" width="18" height="22" rx="2" fill="#f5f0e0" stroke="#cc9900" stroke-width="1"/>
        <line x1="6" y1="109" x2="20" y2="109" stroke="#999" stroke-width="0.8"/>
        <line x1="6" y1="113" x2="20" y2="113" stroke="#999" stroke-width="0.8"/>
        <line x1="6" y1="117" x2="20" y2="117" stroke="#999" stroke-width="0.8"/>
        <text x="13" y="107" font-size="5" text-anchor="middle" fill="#333">NOTIZIE</text>
        <rect x="78" y="96" width="18" height="28" rx="4" fill="#3a1a00" stroke="${color}" stroke-width="1.5"/>
        <rect x="76" y="98" width="18" height="28" rx="4" fill="#4a2a00" stroke="${color}" stroke-width="1" opacity="0.7"/>
        <rect x="74" y="100" width="18" height="28" rx="4" fill="#5a3a00" stroke="${color}" stroke-width="0.8" opacity="0.5"/>
        <ellipse cx="51" cy="60" rx="33" ry="35" fill="#a85828" stroke="#784020" stroke-width="2"/>
        <path d="M22 56 Q28 28 51 26 Q74 28 80 56" fill="#888" opacity="0.6"/>
        <ellipse cx="51" cy="32" rx="18" ry="10" fill="#a85828" opacity="0.9"/>
        <rect x="25" y="52" width="19" height="13" rx="4" fill="none" stroke="${color}" stroke-width="2.5"/>
        <rect x="57" y="52" width="19" height="13" rx="4" fill="none" stroke="${color}" stroke-width="2.5"/>
        <line x1="44" y1="58" x2="57" y2="58" stroke="${color}" stroke-width="2.5"/>
        <line x1="17" y1="58" x2="25" y2="58" stroke="${color}" stroke-width="2.5"/>
        <line x1="76" y1="58" x2="84" y2="58" stroke="${color}" stroke-width="2.5"/>
        <circle cx="34" cy="58" r="3.5" fill="#603010"/>
        <circle cx="34" cy="58" r="1.5" fill="#1a0800"/>
        <circle cx="66" cy="58" r="3.5" fill="#603010"/>
        <circle cx="66" cy="58" r="1.5" fill="#1a0800"/>
        <path d="M27 49 Q34 45 41 49" stroke="#888" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M61 49 Q68 45 75 49" stroke="#888" stroke-width="3" fill="none" stroke-linecap="round"/>
        <ellipse cx="51" cy="70" rx="6" ry="5" fill="#884828" stroke="#684020" stroke-width="1.2"/>
        <path d="M37 78 Q51 76 65 78" stroke="#784020" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      `
    },
    {
      label: "occhiali da lettura sul naso",
      svg: (color) => `
        <rect x="20" y="92" width="62" height="52" rx="13" fill="#3a1a00" stroke="${color}" stroke-width="2"/>
        <rect x="28" y="88" width="48" height="20" rx="10" fill="#4a2a00"/>
        <ellipse cx="14" cy="110" rx="8" ry="20" fill="#c07848" stroke="#904830" stroke-width="2" transform="rotate(-10,14,110)"/>
        <ellipse cx="88" cy="110" rx="8" ry="20" fill="#c07848" stroke="#904830" stroke-width="2" transform="rotate(10,88,110)"/>
        <rect x="76" y="96" width="20" height="30" rx="4" fill="#1a0800" stroke="${color}" stroke-width="1.5"/>
        <line x1="80" y1="100" x2="90" y2="112" stroke="${color}" stroke-width="1" opacity="0.7"/>
        <line x1="90" y1="112" x2="82" y2="124" stroke="${color}" stroke-width="0.8" opacity="0.5"/>
        <rect x="83" y="106" width="11" height="6" rx="1" fill="#ffff80" opacity="0.3" stroke="#cc9900" stroke-width="0.5"/>
        <ellipse cx="51" cy="60" rx="33" ry="35" fill="#c07848" stroke="#904830" stroke-width="2"/>
        <path d="M22 56 Q28 30 51 28 Q74 30 80 56" fill="#888" opacity="0.55"/>
        <ellipse cx="51" cy="32" rx="14" ry="8" fill="#c07848" opacity="0.9"/>
        <rect x="26" y="66" width="18" height="12" rx="3" fill="none" stroke="${color}" stroke-width="2"/>
        <rect x="57" y="66" width="18" height="12" rx="3" fill="none" stroke="${color}" stroke-width="2"/>
        <line x1="44" y1="72" x2="57" y2="72" stroke="${color}" stroke-width="2"/>
        <line x1="18" y1="71" x2="26" y2="72" stroke="${color}" stroke-width="2"/>
        <line x1="75" y1="72" x2="84" y2="71" stroke="${color}" stroke-width="2"/>
        <circle cx="35" cy="58" r="5" fill="#603010"/>
        <circle cx="35" cy="58" r="2.5" fill="#1a0800"/>
        <circle cx="67" cy="58" r="5" fill="#603010"/>
        <circle cx="67" cy="58" r="2.5" fill="#1a0800"/>
        <path d="M27 51 Q35 47 43 51" stroke="#888" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M59 51 Q67 47 75 51" stroke="#888" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M39 82 Q51 80 63 82" stroke="#784020" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      `
    }
  ],
  4: [ // REPERTO STORICO
    {
      label: "nokia nel cuore",
      svg: (color) => `
        <rect x="18" y="92" width="68" height="52" rx="14" fill="#3a0808" stroke="${color}" stroke-width="2"/>
        <path d="M22 102 Q44 94 62 102 Q80 94 86 102" stroke="${color}" stroke-width="1.5" fill="none" opacity="0.5"/>
        <path d="M22 116 Q44 108 62 116 Q80 108 86 116" stroke="${color}" stroke-width="1.5" fill="none" opacity="0.5"/>
        <path d="M22 130 Q44 122 62 130 Q80 122 86 130" stroke="${color}" stroke-width="1.5" fill="none" opacity="0.5"/>
        <ellipse cx="10" cy="112" rx="10" ry="24" fill="#a05828" stroke="#784020" stroke-width="2" transform="rotate(-12,10,112)"/>
        <ellipse cx="94" cy="112" rx="10" ry="24" fill="#a05828" stroke="#784020" stroke-width="2" transform="rotate(12,94,112)"/>
        <rect x="4" y="98" width="14" height="22" rx="3" fill="#1a0808" stroke="${color}" stroke-width="1.5"/>
        <line x1="8" y1="102" x2="14" y2="112" stroke="${color}" stroke-width="0.8"/>
        <line x1="14" y1="112" x2="9" y2="118" stroke="${color}" stroke-width="0.6"/>
        <text x="11" y="110" font-size="7" text-anchor="middle">🍬</text>
        <text x="11" y="118" font-size="5" text-anchor="middle" fill="${color}">lv.847</text>
        <ellipse cx="52" cy="60" rx="36" ry="38" fill="#a05828" stroke="#784020" stroke-width="2"/>
        <ellipse cx="52" cy="30" rx="22" ry="10" fill="#a05828"/>
        <path d="M18 64 Q16 36 26 26" stroke="white" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.9"/>
        <path d="M86 64 Q88 36 78 26" stroke="white" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.9"/>
        <path d="M20 64 Q24 56 28 64" stroke="#784020" stroke-width="1.5" fill="none"/>
        <path d="M76 64 Q80 56 84 64" stroke="#784020" stroke-width="1.5" fill="none"/>
        <path d="M30 82 Q52 88 74 82" stroke="#784020" stroke-width="1.2" fill="none" opacity="0.6"/>
        <ellipse cx="36" cy="60" rx="11" ry="10" fill="white" stroke="#1a0800" stroke-width="2"/>
        <ellipse cx="36" cy="64" rx="11" ry="6" fill="#a05828" stroke="#1a0800" stroke-width="1.5"/>
        <circle cx="37" cy="59" r="6" fill="#502010"/>
        <circle cx="37" cy="59" r="3" fill="#1a0800"/>
        <circle cx="35" cy="57" r="1.5" fill="white"/>
        <ellipse cx="68" cy="60" rx="11" ry="10" fill="white" stroke="#1a0800" stroke-width="2"/>
        <ellipse cx="68" cy="64" rx="11" ry="6" fill="#a05828" stroke="#1a0800" stroke-width="1.5"/>
        <circle cx="69" cy="59" r="6" fill="#502010"/>
        <circle cx="69" cy="59" r="3" fill="#1a0800"/>
        <circle cx="67" cy="57" r="1.5" fill="white"/>
        <path d="M26 46 Q36 36 46 46" stroke="white" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M58 46 Q68 36 78 46" stroke="white" stroke-width="5" fill="none" stroke-linecap="round"/>
        <ellipse cx="52" cy="72" rx="9" ry="8" fill="#904828" stroke="#784020" stroke-width="1.5"/>
        <circle cx="48" cy="74" r="2.5" fill="#784020"/>
        <circle cx="56" cy="74" r="2.5" fill="#784020"/>
        <path d="M34" y="84" fill="none"/>
        <path d="M34 84 Q52 96 70 84" stroke="#783020" stroke-width="3" fill="none" stroke-linecap="round"/>
        <ellipse cx="24" cy="76" rx="9" ry="6" fill="#ff8080" opacity="0.35"/>
        <ellipse cx="80" cy="76" rx="9" ry="6" fill="#ff8080" opacity="0.35"/>
        <ellipse cx="86" cy="30" rx="20" ry="13" fill="${color}" stroke="#cc1133" stroke-width="1.5"/>
        <path d="M70 40 L66 52" stroke="${color}" stroke-width="3.5" stroke-linecap="round"/>
        <text x="86" y="26" font-size="8" text-anchor="middle" fill="white" font-weight="bold">Nokia ❤️</text>
        <text x="86" y="38" font-size="8" text-anchor="middle" fill="white">nel cuore</text>
      `
    },
    {
      label: "usa il tel per le ricette",
      svg: (color) => `
        <rect x="18" y="92" width="66" height="52" rx="13" fill="#3a0808" stroke="${color}" stroke-width="2"/>
        <path d="M22 100 Q44 92 62 100 Q80 92 84 100" stroke="${color}" stroke-width="1.5" fill="none" opacity="0.5"/>
        <path d="M22 118 Q44 110 62 118 Q80 110 84 118" stroke="${color}" stroke-width="1.5" fill="none" opacity="0.5"/>
        <ellipse cx="10" cy="110" rx="9" ry="22" fill="#9a5020" stroke="#784020" stroke-width="2" transform="rotate(-10,10,110)"/>
        <ellipse cx="92" cy="110" rx="9" ry="22" fill="#9a5020" stroke="#784020" stroke-width="2" transform="rotate(10,92,110)"/>
        <rect x="76" y="98" width="20" height="26" rx="3" fill="#1a0808" stroke="${color}" stroke-width="1.5"/>
        <text x="86" y="110" font-size="7" text-anchor="middle">📖</text>
        <text x="86" y="120" font-size="5" text-anchor="middle" fill="${color}">ricette</text>
        <ellipse cx="51" cy="60" rx="35" ry="37" fill="#9a5020" stroke="#784020" stroke-width="2"/>
        <ellipse cx="51" cy="30" rx="22" ry="10" fill="#9a5020"/>
        <path d="M16 63 Q14 36 24 26" stroke="white" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.9"/>
        <path d="M86 63 Q88 36 78 26" stroke="white" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.9"/>
        <ellipse cx="51" cy="22" rx="14" ry="8" fill="white" opacity="0.85"/>
        <circle cx="51" cy="22" r="4" fill="#888"/>
        <path d="M20 64 Q24 56 28 64" stroke="#784020" stroke-width="1.5" fill="none"/>
        <path d="M74 64 Q78 56 82 64" stroke="#784020" stroke-width="1.5" fill="none"/>
        <path d="M28 82 Q51 88 74 82" stroke="#784020" stroke-width="1.2" fill="none" opacity="0.6"/>
        <ellipse cx="35" cy="59" rx="11" ry="10" fill="white" stroke="#1a0800" stroke-width="2"/>
        <ellipse cx="35" cy="63" rx="11" ry="6" fill="#9a5020" stroke="#1a0800" stroke-width="1.5"/>
        <circle cx="36" cy="58" r="6" fill="#502010"/>
        <circle cx="36" cy="58" r="3" fill="#1a0800"/>
        <ellipse cx="67" cy="59" rx="11" ry="10" fill="white" stroke="#1a0800" stroke-width="2"/>
        <ellipse cx="67" cy="63" rx="11" ry="6" fill="#9a5020" stroke="#1a0800" stroke-width="1.5"/>
        <circle cx="68" cy="58" r="6" fill="#502010"/>
        <circle cx="68" cy="58" r="3" fill="#1a0800"/>
        <path d="M25 45 Q35 35 45 45" stroke="white" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M57 45 Q67 35 77 45" stroke="white" stroke-width="5" fill="none" stroke-linecap="round"/>
        <ellipse cx="51" cy="70" rx="9" ry="7" fill="#8a4818" stroke="#784020" stroke-width="1.5"/>
        <path d="M34 82 Q51 94 68 82" stroke="#783020" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <ellipse cx="24" cy="74" rx="8" ry="5" fill="#ff8080" opacity="0.35"/>
        <ellipse cx="78" cy="74" rx="8" ry="5" fill="#ff8080" opacity="0.35"/>
      `
    },
    {
      label: "torcia come funzione principale",
      svg: (color) => `
        <rect x="18" y="92" width="66" height="52" rx="13" fill="#3a0808" stroke="${color}" stroke-width="2"/>
        <path d="M22 100 Q44 92 62 100 Q80 92 84 100" stroke="${color}" stroke-width="1.5" fill="none" opacity="0.5"/>
        <path d="M22 118 Q44 110 62 118 Q80 110 84 118" stroke="${color}" stroke-width="1.5" fill="none" opacity="0.5"/>
        <ellipse cx="10" cy="110" rx="9" ry="22" fill="#a05828" stroke="#784020" stroke-width="2" transform="rotate(-12,10,110)"/>
        <ellipse cx="92" cy="110" rx="9" ry="22" fill="#a05828" stroke="#784020" stroke-width="2" transform="rotate(12,92,110)"/>
        <rect x="4" y="94" width="12" height="22" rx="3" fill="#1a0808" stroke="${color}" stroke-width="1.5" transform="rotate(-30,10,105)"/>
        <circle cx="2" cy="86" r="6" fill="#ffd740" opacity="0.85"/>
        <line x1="2" y1="78" x2="2" y2="72" stroke="#ffd740" stroke-width="1.5" opacity="0.6"/>
        <line x1="8" y1="80" x2="14" y2="76" stroke="#ffd740" stroke-width="1.5" opacity="0.6"/>
        <line x1="-4" y1="80" x2="-10" y2="76" stroke="#ffd740" stroke-width="1.5" opacity="0.6"/>
        <ellipse cx="51" cy="60" rx="35" ry="37" fill="#a05828" stroke="#784020" stroke-width="2"/>
        <ellipse cx="51" cy="30" rx="22" ry="10" fill="#a05828"/>
        <path d="M16 64 Q14 36 24 26" stroke="white" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.9"/>
        <path d="M86 64 Q88 36 78 26" stroke="white" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.9"/>
        <path d="M20 64 Q24 56 28 64" stroke="#784020" stroke-width="1.5" fill="none"/>
        <path d="M74 64 Q78 56 82 64" stroke="#784020" stroke-width="1.5" fill="none"/>
        <circle cx="36" cy="60" r="14" fill="none" stroke="${color}" stroke-width="2.5"/>
        <circle cx="66" cy="60" r="14" fill="none" stroke="${color}" stroke-width="2.5"/>
        <circle cx="36" cy="60" r="11" fill="${color}" opacity="0.05"/>
        <circle cx="66" cy="60" r="11" fill="${color}" opacity="0.05"/>
        <line x1="50" y1="60" x2="52" y2="60" stroke="${color}" stroke-width="2.5"/>
        <line x1="16" y1="58" x2="22" y2="60" stroke="${color}" stroke-width="2.5"/>
        <line x1="80" y1="60" x2="86" y2="58" stroke="${color}" stroke-width="2.5"/>
        <circle cx="36" cy="60" r="6" fill="#502010"/>
        <circle cx="36" cy="59" r="3" fill="#1a0800"/>
        <circle cx="66" cy="60" r="6" fill="#502010"/>
        <circle cx="66" cy="59" r="3" fill="#1a0800"/>
        <path d="M25 44 Q36 34 47 44" stroke="white" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M55 44 Q66 34 77 44" stroke="white" stroke-width="5" fill="none" stroke-linecap="round"/>
        <ellipse cx="51" cy="72" rx="9" ry="7" fill="#904828" stroke="#784020" stroke-width="1.5"/>
        <path d="M35 84 Q51 96 67 84" stroke="#783020" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <ellipse cx="24" cy="76" rx="8" ry="5" fill="#ff8080" opacity="0.35"/>
        <ellipse cx="78" cy="76" rx="8" ry="5" fill="#ff8080" opacity="0.35"/>
      `
    }
  ]
};

const ALL_QUESTIONS = [
  { id:1, emoji:"🔔", question:"La tua suoneria è...", options:[
    {text:"Quella di default. Non l'ho mai cambiata.", score:72, reaction:"Il telefono ti ha adottato. Non il contrario."},
    {text:"Una canzone degli anni in cui ero ottimista.", score:58, reaction:"La nostalgia come sistema operativo."},
    {text:"Silenzioso sempre. Il telefono non fa rumore.", score:18, reaction:"Un misantropo con stile."},
    {text:"Qualcosa che ho impostato questa settimana.", score:12, reaction:"Benvenuto tra chi ha ancora un futuro."},
  ]},
  { id:2, emoji:"⏰", question:"Quante sveglie hai impostate ADESSO?", options:[
    {text:"Una. Basta. Funziona.", score:15, reaction:"Un rapporto adulto con la realtà."},
    {text:"Tre. Non mi fido di me stesso.", score:42, reaction:"Ansioso ma organizzato. Il peggio dei due mondi."},
    {text:"Cinque o più. Alcune disattivate da mesi.", score:78, reaction:"Stai collezionando decisioni non prese dal 2020."},
    {text:"Uso Alexa. Ho delegato il risveglio.", score:28, reaction:"Jeff Bezos ti sveglia ogni mattina."},
  ]},
  { id:3, emoji:"📘", question:"Facebook sul telefono?", options:[
    {text:"Sì e lo uso ogni giorno.", score:82, reaction:"Coerenza rara. Qualcuno mente."},
    {text:"Sì ma non lo apro. È lì per sicurezza.", score:68, reaction:"Un fossile digitale tenuto in vita dall'inerzia."},
    {text:"L'ho disinstallato. Con sollievo.", score:20, reaction:"Almeno una buona scelta nella vita."},
    {text:"Non l'ho mai installato.", score:8, reaction:"Under 22 o filosofo. Nessuna via di mezzo."},
  ]},
  { id:4, emoji:"🔋", question:"Il tuo rapporto con la batteria?", options:[
    {text:"Sempre sotto il 20%. Vivo nel rischio.", score:48, reaction:"Il rischio come stile di vita."},
    {text:"Caricabatterie in ogni stanza, borsa e auto.", score:72, reaction:"La paura del vuoto trasformata in logistica."},
    {text:"Carico la notte, arrivo a sera. Sistema rodato.", score:22, reaction:"Equilibrio raro. Categoria a rischio estinzione."},
    {text:"Ho sempre la powerbank. Sono pronto.", score:35, reaction:"Prepperismo applicato allo smartphone."},
  ]},
  { id:5, emoji:"🎮", question:"Giochi installati?", options:[
    {text:"Candy Crush o Solitario. O entrambi.", score:80, reaction:"Hai trovato la tua meditazione laica."},
    {text:"Solo roba da 5 minuti tipo Wordle.", score:38, reaction:"L'illusione del controllo sul tempo libero."},
    {text:"Nessun gioco. Il telefono è uno strumento.", score:58, reaction:"Lo ripeti anche allo specchio?"},
    {text:"Giochi veri. Sono un gamer.", score:18, reaction:"Almeno sei onesto con te stesso."},
  ]},
  { id:6, emoji:"🙏", question:"Usi 🙏 per dire grazie?", options:[
    {text:"Sì, sempre. È naturalissimo.", score:78, reaction:"Stai pregando o ringraziando? Il dubbio resta."},
    {text:"No. Le emoji le uso con intenzione.", score:15, reaction:"Comunicatore consapevole. Raro come i tartufi."},
    {text:"Non uso emoji nelle conversazioni serie.", score:45, reaction:"Hai una lista di conversazioni serie. Dice tutto."},
    {text:"Uso solo 💀 e 😭 ironicamente.", score:10, reaction:"Gen Z certificato."},
  ]},
  { id:7, emoji:"📸", question:"La foto più vecchia nel rullino?", options:[
    {text:"Prima del 2016. È un archivio storico.", score:82, reaction:"Il tuo telefono è un museo. Non aprire quella cartella."},
    {text:"2017-2019. Ogni tanto faccio pulizia.", score:50, reaction:"Procrastinazione regolare e sistematica."},
    {text:"Solo l'ultimo anno. Sono organizzato.", score:18, reaction:"O sei ordinato o hai cambiato telefono di recente."},
    {text:"Tutto su cloud. Il rullino non esiste.", score:12, reaction:"Hai spostato il problema su Amazon. Elegante."},
  ]},
  { id:8, emoji:"🎤", question:"I tuoi messaggi vocali durano?", options:[
    {text:"Più di 2 minuti. Mi piace spiegarmi bene.", score:80, reaction:"Stai registrando un podcast non richiesto."},
    {text:"30 secondi max. Rispetto il tempo altrui.", score:20, reaction:"Teoria della mente sviluppata. Raro."},
    {text:"Non mando vocali. Scelta etica.", score:40, reaction:"Hai preso una posizione. Tienila."},
    {text:"Non mando vocali e non li ascolto.", score:12, reaction:"Il futuro ti appartiene."},
  ]},
  { id:9, emoji:"🔐", question:"Come sblocchi il telefono?", options:[
    {text:"PIN o password. Non mi fido della biometria.", score:68, reaction:"Diffidenza come sistema di sicurezza. Funziona."},
    {text:"Impronta digitale.", score:25, reaction:"Hai dato il corpo a una multinazionale. Comodamente."},
    {text:"Face ID. Vivo nel presente.", score:15, reaction:"Il tuo viso è la chiave di casa. Pensaci."},
    {text:"Nessun blocco. Chi vuoi che lo prenda.", score:85, reaction:"Ottimismo cosmico applicato alla sicurezza digitale."},
  ]},
  { id:10, emoji:"💔", question:"Lo schermo del tuo telefono?", options:[
    {text:"Rotto. Ci convivo. Non è così grave.", score:78, reaction:"Hai normalizzato il declino. Metafora disponibile."},
    {text:"Protetto da vetro temperato dal giorno uno.", score:55, reaction:"Ansia preventiva applicata alla tecnologia."},
    {text:"Perfetto. Ho cura delle mie cose.", score:20, reaction:"O sei attento o hai comprato il telefono ieri."},
    {text:"Ho la cover ma non il vetro. Sono ottimista.", score:40, reaction:"Mezzo ottimismo. Il più diffuso in natura."},
  ]},
  { id:11, emoji:"📱", question:"App nella schermata principale?", options:[
    {text:"Solo quelle che uso. Tre o quattro.", score:12, reaction:"Minimalismo digitale. Probabilmente hai anche una pianta."},
    {text:"Piena ma so dove sono.", score:45, reaction:"Caos organizzato. La condizione umana."},
    {text:"Ho più schermate. Non ricordo quante.", score:72, reaction:"Hai costruito un labirinto e perso la mappa."},
    {text:"Tutto in cartelle con nomi creativi.", score:35, reaction:"Ti sei dato un sistema. Non funziona ma ci tieni."},
  ]},
  { id:12, emoji:"🗑️", question:"Quando hai svuotato la memoria l'ultima volta?", options:[
    {text:"Ogni settimana. Sono organizzato.", score:10, reaction:"La persona più rara che conosco."},
    {text:"Quando mi dice che la memoria è piena.", score:65, reaction:"Gestione reattiva della vita digitale."},
    {text:"C'è un cestino?", score:82, reaction:"Risposta onesta. Terrificante, ma onesta."},
    {text:"Ho il backup automatico, non mi interessa.", score:30, reaction:"Hai delegato anche il disordine. Strategico."},
  ]},
  { id:13, emoji:"💬", question:"Messaggi non letti adesso?", options:[
    {text:"Zero. Non riesco a dormire altrimenti.", score:20, reaction:"Il telefono ti controlla. In modo ordinato."},
    {text:"Qualche decina. Li leggo ma non rispondo.", score:40, reaction:"Passivo-aggressivo in modo involontario."},
    {text:"Centinaia. Ho smesso di contare.", score:75, reaction:"Hai fatto pace con il caos. Rispetto."},
    {text:"Non lo so. Non guardo quel numero.", score:55, reaction:"Negazione consapevole. Una strategia."},
  ]},
  { id:14, emoji:"🌙", question:"Il telefono di notte?", options:[
    {text:"Sul comodino, schermo verso il basso.", score:45, reaction:"Compromesso tra dipendenza e senso di colpa."},
    {text:"In un'altra stanza. Ho dei limiti.", score:15, reaction:"Forza di volontà rara. O notti agitate."},
    {text:"Sul comodino, carico, notifiche attive.", score:78, reaction:"Il telefono è il tuo coinquilino preferito."},
    {text:"In modalità aereo. Sono serio.", score:10, reaction:"O dormi benissimo o menti benissimo."},
  ]},
  { id:15, emoji:"📞", question:"Quando squilla il telefono tu...", options:[
    {text:"Rispondo sempre. È un telefono.", score:35, reaction:"Un ottimista. O chi non ha abbastanza nemici."},
    {text:"Guardo chi è e decido.", score:25, reaction:"Selezione naturale delle relazioni umane."},
    {text:"Non rispondo mai. Manda un messaggio.", score:60, reaction:"Hai stabilito dei confini chiari."},
    {text:"Va in vivavoce perché non trovo il telefono.", score:72, reaction:"Il caos come ecosistema naturale."},
  ]},
  { id:16, emoji:"🎵", question:"Come ascolti musica?", options:[
    {text:"Spotify o simili. Come tutti.", score:30, reaction:"Nella media. Niente di cui vergognarsi."},
    {text:"YouTube con la pubblicità. Non pago.", score:58, reaction:"Economia domestica applicata alla cultura."},
    {text:"Ho ancora i file mp3 sul telefono.", score:82, reaction:"iPod nella mente, smartphone nella mano."},
    {text:"Non ascolto musica dal telefono.", score:20, reaction:"O hai degli standard o hai perso le cuffie."},
  ]},
  { id:17, emoji:"🗺️", question:"Usi Maps o sai orientarti?", options:[
    {text:"Maps sempre. Anche per posti che conosco.", score:70, reaction:"Hai esternalizzato l'orientamento a Google."},
    {text:"Solo per posti nuovi.", score:22, reaction:"Equilibrio raro tra digitale e analogico."},
    {text:"Maps ma poi mi perdo lo stesso.", score:55, reaction:"Tecnologia come placebo."},
    {text:"Mi oriento da solo. Le mappe sono per i deboli.", score:35, reaction:"Romantico. O vivi in un posto con due strade."},
  ]},
  { id:18, emoji:"🔄", question:"Quando aggiorni le app?", options:[
    {text:"Aggiornamento automatico. Non ci penso.", score:18, reaction:"Hai delegato anche le decisioni tecnologiche."},
    {text:"Quando la notifica mi rompe abbastanza.", score:60, reaction:"Resistenza passiva alla tecnologia. Nobile."},
    {text:"Non aggiorno mai. Funziona così.", score:80, reaction:"Tuo nonno digitale sarebbe fiero."},
    {text:"Manualmente ogni settimana.", score:15, reaction:"Hai troppo tempo libero o troppo poco."},
  ]},
  { id:19, emoji:"🤳", question:"Quante foto hai fatto questa settimana?", options:[
    {text:"Zero. Non era necessario immortalare niente.", score:15, reaction:"O hai vissuto pienamente o non è successo niente."},
    {text:"Qualche foto. Solo le cose che valevano.", score:28, reaction:"Selettività fotografica. Una virtù rara."},
    {text:"Decine. Compreso il pranzo di ieri.", score:65, reaction:"Stai documentando la vita per qualcuno che non la vedrà."},
    {text:"Non lo so, non conto.", score:80, reaction:"Il rullino cresce da solo. Come un fungo."},
  ]},
  { id:20, emoji:"🔕", question:"Il Do Not Disturb lo usi?", options:[
    {text:"Sempre attivo. Il mondo può aspettare.", score:18, reaction:"Confini sani. Probabilmente hai un buon terapeuta."},
    {text:"Solo di notte.", score:32, reaction:"Un minimo di rispetto per il sonno."},
    {text:"Non l'ho mai attivato.", score:75, reaction:"Disponibile 24 ore. Condizione moderna."},
    {text:"Non so neanche dove si trova.", score:60, reaction:"Ignoranza per pigrizia o per scelta. Stesso risultato."},
  ]},
];

const RESULTS = [
  { min:0, max:22, age:19, profileIndex:0, title:"Disturbante", subtitle:"Il tuo telefono è più sano di te.", desc:"Nessuna patologia rilevata. Zero sveglie inutili, zero app zombie. O hai meno di vent'anni o hai fatto un percorso spirituale sul tuo smartphone. In entrambi i casi sei fastidioso da frequentare.", twist:"Probabilmente hai anche una routine mattutina.", accent:"#00e676", bg:"#0a1a0e", card:"#0f2415" },
  { min:23, max:38, age:28, profileIndex:1, title:"Quasi Salvo", subtitle:"Con un po' di impegno potresti farcela.", desc:"Segni di consapevolezza digitale ma con alcune abitudini vestigiali di un sé precedente. La situazione è gestibile. Con sforzo moderato e una buona connessione wi-fi.", twist:"Hai ancora speranza. Non sprecarla.", accent:"#40c4ff", bg:"#08131a", card:"#0d1e2b" },
  { min:39, max:54, age:41, profileIndex:2, title:"Medio in Tutto", subtitle:"Né troppo giovane né troppo vecchio. Semplicemente medio.", desc:"Il telefono rispecchia la vita: funziona, sopravvive, non brilla. Facebook installato per sicurezza. Tre sveglie. Vocali di novanta secondi. Sentenza: adeguato.", twist:"La media è anche una scelta di vita.", accent:"#ffd740", bg:"#1a1400", card:"#242000" },
  { min:55, max:68, age:52, profileIndex:3, title:"Avanzato ma Funzionante", subtitle:"Il declino è iniziato. Procede con dignità.", desc:"L'ecosistema digitale funziona nonostante tutto. Non si sa come. Suoneria di default dal 2019, rullino come archivio nazionale, caricabatterie in ogni stanza.", twist:"Il telefono sopravviverà al paziente. Per inerzia.", accent:"#ff9100", bg:"#1a0d00", card:"#241400" },
  { min:69, max:100, age:67, profileIndex:4, title:"Reperto Storico", subtitle:"Andrebbe esposto in un museo.", desc:"Ha raggiunto uno stadio di stabilità digitale che va oltre la negligenza: è diventato un'identità. Foto dal 2012, Candy Crush a livello quattro cifre, PIN uguale da sempre, schermo rotto da mesi.", twist:"Non cambierà. E in fondo, perché dovrebbe.", accent:"#ff5252", bg:"#1a0808", card:"#240f0f" },
];

const getResult = (scores) => {
  const avg = scores.reduce((a,b)=>a+b,0)/scores.length;
  return RESULTS.find(r=>avg>=r.min&&avg<=r.max)||RESULTS[2];
};

function shuffle(arr) {
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
  return a;
}

function useTypewriter(text,speed=12,active=false){
  const [displayed,setDisplayed]=useState("");
  useEffect(()=>{
    if(!active){setDisplayed("");return;}
    setDisplayed("");let i=0;
    const interval=setInterval(()=>{
      if(i<text.length){setDisplayed(text.slice(0,i+1));i++;}
      else clearInterval(interval);
    },speed);
    return()=>clearInterval(interval);
  },[text,active]);
  return displayed;
}

function CharacterSVG({ profileIndex, accent }) {
  const variants = CHARACTERS[profileIndex];
  const [idx] = useState(() => Math.floor(Math.random() * variants.length));
  const char = variants[idx];
  return (
    <div style={{ textAlign: "center", marginBottom: 20 }}>
      <svg width="108" height="160" viewBox="0 0 108 160" style={{ overflow: "visible" }}
        dangerouslySetInnerHTML={{ __html: char.svg(accent) }} />
      <div style={{ fontSize: 11, color: accent + "bb", fontFamily: "monospace", marginTop: 4 }}>
        {char.label}
      </div>
    </div>
  );
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

  const progress = questions.length>0?(current/questions.length)*100:0;
  const diagTyped = useTypewriter(result?.desc||"",12,resultVisible);
  const twistTyped = useTypewriter(result?.twist||"",12,resultVisible&&diagTyped===result?.desc);

  const startQuiz = () => {
    setQuestions(shuffle(ALL_QUESTIONS).slice(0,10).map(q=>({...q,options:shuffle(q.options)})));
    setCurrent(0);setScores([]);setReactions([]);
    setSelected(null);setReaction("");setAnimOut(false);
    setResult(null);setResultVisible(false);setCopied(false);
    setScreen("quiz");
  };

  const copyShare = () => {
    if(!result)return;
    navigator.clipboard?.writeText(`📱 Il mio telefono ha ${result.age} anni mentali\n"${result.title}" — ${result.subtitle}\n\nFai il test → https://revelo.cool`);
    setCopied(true);
    setTimeout(()=>setCopied(false),2000);
  };

  const handleAnswer = (opt) => {
    if(selected!==null)return;
    setSelected(opt.score);setReaction(opt.reaction);
    setTimeout(()=>{
      setAnimOut(true);
      setTimeout(()=>{
        const ns=[...scores,opt.score];const nr=[...reactions,opt.reaction];
        setScores(ns);setReactions(nr);
        if(current+1>=questions.length){
          const r=getResult(ns);setResult(r);setScreen("result");
          setTimeout(()=>setResultVisible(true),300);
        } else {
          setCurrent(current+1);setSelected(null);setReaction("");setAnimOut(false);
        }
      },350);
    },900);
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=IBM+Plex+Mono:ital,wght@0,400;0,500;1,400&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    body{-webkit-text-size-adjust:100%}
    @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
    @keyframes slideIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
    .f1{animation:fadeUp .5s .0s both}.f2{animation:fadeUp .5s .1s both}.f3{animation:fadeUp .5s .2s both}
    .f4{animation:fadeUp .5s .3s both}.f5{animation:fadeUp .5s .4s both}
    .card-in{animation:fadeUp .3s both}.react-in{animation:slideIn .3s both}
    .r1{animation:fadeUp .4s .05s both}.r2{animation:fadeUp .4s .15s both}.r3{animation:fadeUp .4s .25s both}
    .r4{animation:fadeUp .4s .35s both}.r5{animation:fadeUp .4s .45s both}
    .cursor{display:inline-block;width:2px;height:.85em;background:currentColor;margin-left:2px;animation:blink .7s infinite;vertical-align:text-bottom}
    button{cursor:pointer} button:active{opacity:.8}
  `;

  const root = { minHeight:"100vh", fontFamily:"'IBM Plex Mono',monospace", display:"flex", flexDirection:"column", alignItems:"center", padding:"24px 16px 60px" };

  if(screen==="intro") return (
    <div style={{...root,background:"#0e0e0e",color:"#e0e0e0"}}>
      <style>{css}</style>
      <div style={{maxWidth:440,width:"100%",textAlign:"center",paddingTop:"8vh"}}>
        <div className="f1" style={{display:"inline-block",background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.12)",borderRadius:100,padding:"6px 16px",fontSize:11,letterSpacing:2,color:"#777",marginBottom:32,textTransform:"uppercase"}}>📱 Clinica Digitale</div>
        <h1 className="f2" style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(40px,11vw,64px)",fontWeight:900,lineHeight:1.05,color:"#fff",marginBottom:20,letterSpacing:-1}}>
          Quanti anni ha<br/><span style={{color:"#ffd740"}}>il tuo telefono?</span>
        </h1>
        <p className="f3" style={{fontSize:16,color:"#aaa",lineHeight:1.8,marginBottom:16}}>
          Non l'anno di produzione.<br/>L'<strong style={{color:"#fff"}}>età mentale</strong>.<br/>Quella che non vuoi sapere.
        </p>
        <div className="f4" style={{fontSize:12,color:"#444",letterSpacing:1,marginBottom:40}}>10 domande casuali · risultato immediato</div>
        <button className="f5" onClick={startQuiz} style={{background:"#fff",color:"#000",border:"none",borderRadius:8,padding:"18px 0",fontSize:15,fontWeight:700,letterSpacing:1.5,fontFamily:"'IBM Plex Mono',monospace",width:"100%",textTransform:"uppercase",marginBottom:16,display:"block"}}>
          Inizia la visita →
        </button>
        <p className="f5" style={{fontSize:12,color:"#333"}}>Nessun dato raccolto. Solo verità scomode.</p>
      </div>
    </div>
  );

  if(screen==="quiz"&&questions.length>0) {
    const q=questions[current];
    return (
      <div style={{...root,background:"#0e0e0e",color:"#e0e0e0"}}>
        <style>{css}</style>
        <div style={{width:"100%",maxWidth:500,display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <span style={{fontSize:11,letterSpacing:3,color:"#444",textTransform:"uppercase"}}>Clinica Digitale</span>
          <span style={{fontSize:15,color:"#666"}}>{current+1}<span style={{color:"#333"}}>/{questions.length}</span></span>
        </div>
        <div style={{width:"100%",maxWidth:500,height:3,background:"rgba(255,255,255,.07)",marginBottom:24,borderRadius:10,overflow:"hidden"}}>
          <div style={{height:"100%",background:"#ffd740",width:`${progress}%`,borderRadius:10,transition:"width .4s ease"}}/>
        </div>
        <div key={current} className="card-in" style={{width:"100%",maxWidth:500,background:"#181818",border:"1px solid #2a2a2a",borderRadius:16,padding:"24px 20px",opacity:animOut?0:1,transform:animOut?"translateY(-8px)":"translateY(0)",transition:"opacity .3s,transform .3s"}}>
          <div style={{fontSize:32,textAlign:"center",marginBottom:14}}>{q.emoji}</div>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(19px,5vw,23px)",fontWeight:800,textAlign:"center",color:"#fff",marginBottom:24,lineHeight:1.3}}>{q.question}</h2>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {q.options.map((opt,i)=>(
              <button key={i} style={{background:selected===opt.score?"#ffd740":"rgba(255,255,255,.05)",border:`1.5px solid ${selected===opt.score?"#ffd740":"rgba(255,255,255,.1)"}`,borderRadius:10,padding:"14px 16px",color:selected===opt.score?"#000":"#ccc",fontSize:14,textAlign:"left",fontFamily:"'IBM Plex Mono',monospace",display:"flex",gap:12,alignItems:"flex-start",lineHeight:1.5,pointerEvents:selected!==null?"none":"auto"}}
                onClick={()=>handleAnswer(opt)}>
                <span style={{color:selected===opt.score?"#000":"#555",minWidth:18,fontSize:12,paddingTop:1,fontWeight:700}}>{["A","B","C","D"][i]}</span>
                <span style={{flex:1}}>{opt.text}</span>
              </button>
            ))}
          </div>
          {reaction&&(
            <div className="react-in" style={{marginTop:16,padding:"14px 16px",background:"rgba(255,215,64,.07)",border:"1px solid rgba(255,215,64,.2)",borderRadius:8}}>
              <span style={{fontSize:10,letterSpacing:3,color:"#ffd740",marginBottom:6,display:"block",textTransform:"uppercase"}}>Verdetto parziale</span>
              <p style={{fontSize:14,color:"#ddd",fontStyle:"italic",lineHeight:1.6}}>"{reaction}"</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if(screen==="result"&&result) return (
    <div style={{...root,background:result.bg,color:"#e0e0e0"}}>
      <style>{css}</style>
      <div style={{maxWidth:500,width:"100%",paddingTop:8}}>
        <div className="r1" style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
          <span style={{fontSize:10,letterSpacing:3,color:"#555",textTransform:"uppercase"}}>Referto Ufficiale</span>
          <span style={{fontSize:10,letterSpacing:2,border:`1px solid ${result.accent}`,color:result.accent,padding:"3px 10px",borderRadius:3,textTransform:"uppercase"}}>Clinica Digitale</span>
        </div>

        <div className="r2" style={{display:"flex",alignItems:"center",gap:16,marginBottom:8}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(72px,18vw,96px)",fontWeight:900,lineHeight:1,letterSpacing:-4,color:result.accent,minWidth:"fit-content"}}>{result.age}</div>
          <div>
            <div style={{fontSize:10,letterSpacing:3,color:result.accent,textTransform:"uppercase",marginBottom:6}}>Anni Mentali</div>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(18px,5vw,23px)",fontWeight:800,color:"#fff",lineHeight:1.2,marginBottom:6}}>{result.title}</div>
            <div style={{fontSize:13,color:result.accent+"cc",lineHeight:1.4}}>{result.subtitle}</div>
          </div>
        </div>

        <div className="r2">
          <CharacterSVG profileIndex={result.profileIndex} accent={result.accent} />
        </div>

        <div className="r3" style={{height:1,background:result.accent+"33",margin:"8px 0 18px"}}/>

        <div className="r3" style={{background:result.card,border:`1px solid ${result.accent}22`,borderRadius:12,padding:"18px 16px",marginBottom:20}}>
          <span style={{fontSize:10,letterSpacing:3,color:result.accent,textTransform:"uppercase",marginBottom:10,display:"block"}}>Diagnosi</span>
          <p style={{fontSize:14,color:"#ccc",lineHeight:1.85}}>
            {diagTyped}
            {diagTyped!==result.desc&&<span className="cursor" style={{color:result.accent}}/>}
          </p>
          {(twistTyped.length>0||diagTyped===result.desc)&&(
            <>
              <span style={{fontSize:10,letterSpacing:3,color:result.accent,textTransform:"uppercase",marginBottom:8,marginTop:16,display:"block"}}>Sentenza Finale</span>
              <p style={{fontSize:14,color:result.accent+"ee",fontStyle:"italic",lineHeight:1.7}}>
                {twistTyped}
                {twistTyped.length>0&&twistTyped!==result.twist&&<span className="cursor" style={{color:result.accent}}/>}
              </p>
            </>
          )}
        </div>

        <div className="r4" style={{marginBottom:24}}>
          <div style={{fontSize:10,letterSpacing:3,color:"#444",textTransform:"uppercase",marginBottom:12}}>Annotazioni</div>
          {reactions.map((r,i)=>(
            <div key={i} style={{display:"flex",gap:12,marginBottom:10,alignItems:"flex-start"}}>
              <span style={{fontSize:11,minWidth:22,paddingTop:2,color:result.accent}}>{String(i+1).padStart(2,"0")}</span>
              <span style={{fontSize:13,color:"#888",fontStyle:"italic",lineHeight:1.55}}>"{r}"</span>
            </div>
          ))}
        </div>

        <div className="r5" style={{display:"flex",flexDirection:"column",gap:12,marginBottom:20}}>
          <button onClick={copyShare} style={{background:result.accent,color:result.bg,border:"none",borderRadius:8,padding:"16px",fontSize:14,fontWeight:700,fontFamily:"'IBM Plex Mono',monospace",letterSpacing:1,textTransform:"uppercase"}}>
            {copied?"✓ Copiato!":"Copia e condividi"}
          </button>
          <button onClick={startQuiz} style={{background:"transparent",border:`1.5px solid ${result.accent}55`,borderRadius:8,padding:"15px",fontSize:13,color:result.accent,fontFamily:"'IBM Plex Mono',monospace"}}>
            Rifai con domande diverse
          </button>
        </div>
        <p className="r5" style={{fontSize:11,color:"#333",textAlign:"center"}}>Clinica Digitale · revelo.cool</p>
      </div>
    </div>
  );

  return null;
}
