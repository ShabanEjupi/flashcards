const questions = [
    {
        question: "Cilat janë orientimet afariste?",
        answer: "Orientimi prodhues, Orientimi i shitjes, Koncepti i marketingut, Marketingu holistik."
    },
    {
        question: "Dallimi mes konceptit të shitjes dhe marketingut në bazë të qëllimit?",
        answer: "Shitja fokusohet në produkte ekzistuese, ndërsa marketingu fokusohet në nevojat dhe kërkesat e konsumatorit."
    },
    {
        question: "Cilat janë elementet e Marketingut MIX?",
        answer: "Produkti, Çmimi, Promovimi, Distribuimi."
    },
    {
        question: "Cilat janë detyrat e marketingut?",
        answer: "Të krijojë, Të promovojë, Të dërgojë mallin/produktin te blerësi."
    },
    {
        question: "Çka është tregu?",
        answer: "Tregu është vendi ku takohen shitësi dhe blerësi, ku kryhet transaksioni dhe ndërrimi i pronësisë mbi produktin/shërbimin."
    },
    {
        question: "Çka është segmentimi i tregut?",
        answer: "Segmentimi është ndarja e tregut në pjesë më të vogla homogjene për të menaxhuar më lehtë kërkesat e ndryshme."
    },
    {
        question: "Fazat e segmentimit të tregut?",
        answer: "Segmentimi i tregut, Zgjedhja e tregut cak, Pozicionimi."
    },
    {
        question: "Karakteristikat e segmenteve të tregut?",
        answer: "Të matshme, Të përfitueshme, Të arritshme, Të qëndrueshme."
    },
    {
        question: "Përparësitë afariste të segmentimit?",
        answer: "Analiza e konsumatorëve, Analiza e konkurrencës, Shpërndarja më efikase e resurseve, Planifikimi strategjik."
    },
    {
        question: "Variablat e segmentimit të konsumatorit final?",
        answer: "Gjeografike, Demografike, Socio-ekonomike, Psikologjike, Bihevioristike."
    },
    {
        question: "Strategjitë alternative të tregut?",
        answer: "Marketing i padiferencuar, Marketing i diferencuar, Marketing i koncentruar."
    },
    {
        question: "Llojet e kërkesës?",
        answer: "Kërkesa efektive, Kërkesa potenciale, Kërkesa totale."
    },
    {
        question: "Çka janë kërkimet e tregut?",
        answer: "Proces i mbledhjes dhe analizimit të të dhënave përmes metodave shkencore për të marrë vendime marketingu."
    },
    {
        question: "Procesi i kërkimeve të tregut?",
        answer: "Përcaktimi i problemit, Përpilimi i planit kërkimor, Mbledhja e të dhënave, Analiza e të dhënave, Zbatimi i aksionit."
    },
    {
        question: "Metodat dhe instrumentet kërkimore?",
        answer: "Metodat: vrojtimi, anketa, eksperimenti, metoda historike; Instrumentet: pyetësori, përkujtuesi, pajisjet mekanike."
    },
    {
        question: "Çka është produkti?",
        answer: "Çdo gjë që ofrohet në treg për t'u konsumuar apo blerë që plotëson një nevojë."
    },
    {
        question: "Nivelet e produktit?",
        answer: "Berthama e produktit – benefiti, Materializimi i produktit, Vlera e shtuar."
    },
    {
        question: "Çka është gama e produktit?",
        answer: "Gama: tërësia e produkteve të ndërmarrjes; Thellësia: numri i produkteve në linjë; Gjërësia: numri i linjave; Gjatësia: numri total i produkteve."
    },
    {
        question: "Rregulla e Paretos?",
        answer: "80% e shitjeve vjen nga 20% e produkteve; 20% e shitjeve vjen nga 80% e produkteve."
    },
    {
        question: "Matrica e Ansoffit?",
        answer: "Pushtimi i tregut: PE → TE; Zhvillimi i tregut: PE → TR; Zhvillimi i produktit: PR → TE; Diversifikimi: PR → TR."
    },
    {
        question: "Dallimi për shënjestrën: shitje vs marketing?",
        answer: "Shitje – produkte ekzistuese; Marketing – nevojat dhe kërkesat e konsumatorit."
    },
    {
        question: "Detyrat e marketingut?",
        answer: "Të krijojë, Të promovojë, Të dërgojë mallin/produktin te blerësi."
    },
    {
        question: "Shpjegim i tregut dhe segmentimit me fazat?",
        answer: "Tregu: vendi i transaksioneve; Segmentimi: ndarje në pjesë homogjene; Fazat: segmentimi, tregu cak, pozicionimi."
    },
    {
        question: "Përparësitë e segmentimit të tregut?",
        answer: "Analiza e konsumatorëve, Analiza e konkurrencës, Shpërndarja më efikase e resurseve, Planifikimi strategjik."
    },
    {
        question: "Variablat e segmentimit?",
        answer: "Gjeografike, Demografike, Socio-ekonomike, Psikologjike, Bihevioristike."
    },
    {
        question: "Konsumatorët në kërkesën efektive?",
        answer: "Konsumatorët që kanë dëshirë, mundësi financiare dhe gatishmëri për të blerë."
    },
    {
        question: "Strategjitë alternative të tregut?",
        answer: "Marketing i padiferencuar, Marketing i diferencuar, Marketing i koncentruar."
    },
    {
        question: "Detyrat e marketingut?",
        answer: "Të krijojë, Të promovojë, Të dërgojë mallin/produktin te blerësi."
    },
    {
        question: "Shembull segmentimi: tekstil për femra?",
        answer: "Variabla: demografike (mosha), psikografike (stili); Treg cak: femrat 18–35 vjeç; Strategjia: marketing i diferencuar."
    },
    {
        question: "Nëse s'ka shitje: si bëhet analiza e tregut?",
        answer: "Përkufizimi i problemit, Planifikimi i kërkimit, Mbledhja e të dhënave, Analiza, Raporti për menaxhmentin."
    },
    {
        question: "Shembull për gamën?",
        answer: "4 linja × 3 produkte = Gjatësia = 12; Gjërësia = 4; Thellësia = 3."
    },
    {
        question: "Strategjitë e Ansoffit dhe zbatimi në letër?",
        answer: "Pushtimi i tregut: PE → TE; Zhvillimi i tregut: PE → TR; Zhvillimi i produktit: PR → TE; Diversifikimi: PR → TR."
    },
    {
        question: "Shembull: Zhvillimi i produktit të ri?",
        answer: "Fazat: ideja → koncepti → zhvillimi → testimi → prodhimi → lançimi (p.sh. një bluzë me material antibakterial)."
    },
    {
        question: "Metodat e llogaritjes së çmimit + tabela?",
        answer: "Më dërgo tabelën për ta plotësuar."
    },
    {
        question: "Strategjitë alternative të distribucionit?",
        answer: "Intensive, Selektive, Ekskluzive."
    },
    {
        question: "Përparimi i shitjes dhe publiciteti me shembuj?",
        answer: "Përparimi i shitjes: metoda për të nxitur blerjen (p.sh. zbritje); Publiciteti: promovim përmes mediave (p.sh. artikull në gazetë)."
    },
    {
        question: "Strategjitë alternative të promocionit?",
        answer: "Reklama, Publiciteti, Shitja personale, Promocioni i shitjes."
    }
];

export default questions;