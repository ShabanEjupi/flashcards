const questions = [
    {
        question: "Cilat janë orientimet afariste?",
        answer: "Orientimi prodhues, Orientimi i shitjes, Koncepti i marketingut, Marketingu holistik."
    },
    {
        question: "Dallimi mes konceptit të shitjes dhe marketingut në bazë të qëllimit?",
        answer: "Koncepti i shitjes: Pikënisja - Ndërmarrja, Shënjestra - Produkte ekzistuese, Mjetet - Shitja dhe promocioni, Qëllimi - Fitimi në bazë të vëllimit të shitjes. Koncepti i marketingut: Pikënisja - Tregu, Shënjestra - Nevojat dhe kërkesat e konsumatorit, Mjetet - Marketingu integral 4P, Qëllimi - Fitimi duke plotësuar kërkesat e konsumatorit."
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
        answer: "Segmentimi i tregut do të thotë ndarja e tregut në pjesë më të vogla me qëllim të menaxhimit më të lehtë dhe me qëllim të kthimit të nevojave, dëshirave dhe kërkesave heterogjene, në sa më shumë homogjene."
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
        answer: "Procesi i mbledhjes, regjistrimit, përpunimit, procesimit, dhe të projektimit të të dhënave dhe informacioneve përmes metodave shkencore me qëllim të marrjes së vendimeve të marketingut."
    },
    {
        question: "Procesi i kërkimeve të tregut?",
        answer: "Përkufizimi i problemit dhe i qëllimeve kërkimore, Përpilimi i planit kërkimor, Mbledhja e të dhënave, Përpilimi dhe analiza e të dhënave, Implementimi i aksionit."
    },
    {
        question: "Metodat dhe instrumentet kërkimore?",
        answer: "Metodat kërkimore, të dhënat primare: Vrojtimi, Anketa, Eksperimenti dhe të dhënat sekondare: metoda historike. Instrumentet kryesore: Pyetësori, Përkujtuesi, Pajisjet Mekanike."
    },
    {
        question: "Çka është produkti?",
        answer: "Produkti është çdo gjë që mund të ofrohet në treg në mënyrë të dukshme, të blihet apo të konsumohet duke plotësuar kështu një nevojë."
    },
    {
        question: "Nivelet e produktit?",
        answer: "1. Bërthama e produktit - Benefiti, 2. Materializimi i produktit, 3. Vlera e shtuar e produktit."
    },
    {
        question: "Çka është gama e produktit?",
        answer: "Gama: tërësia e produkteve të ndërmarrjes; Thellësia: numri i produkteve në linjë; Gjërësia: numri i linjave; Gjatësia: numri total i produkteve."
    },
    {
        question: "Rregulla e Paretos?",
        answer: "80/20: 80% e shitjeve realizohet nga shitja e 20% të produkteve; 20/80: 20% e shitjeve realizohet nga shitja e 80% të produkteve."
    },
    {
        question: "Matrica e Ansoffit?",
        answer: "Strategjia e pushtimit të tregut (PE → TE), Strategjia e zhvillimit të tregut (PE → TR), Strategjia e zhvillimit të produktit (PR → TE), Diversifikimi (PR → TR)."
    },
    {
        question: "Dallimi për shënjestrën: shitje vs marketing?",
        answer: "Shitja - fokus në produkte ekzistuese; Marketingu - fokus në nevojat dhe kërkesat e konsumatorit."
    },
    {
        question: "Detyrat e marketingut?",
        answer: "Të krijojë, Të promovojë, Të dërgojë mallin/produktin te blerësi."
    },
    {
        question: "Shpjegim i tregut dhe segmentimit me fazat?",
        answer: "Tregu: vendi ku takohen shitësi dhe blerësi, kryhet transaksion shitës-blerës; Segmentimi: ndarja e tregut në pjesë më të vogla homogjene; Fazat: segmentimi i tregut, zgjedhja e tregut cak, pozicionimi."
    },
    {
        question: "Përparësitë e segmentimit të tregut?",
        answer: "Analiza e konsumatorëve, Analiza e konkurrencës, Shpërndarja më efikase e resurseve, Planifikimi strategjik i marketingut."
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
        answer: "Strategjia e marketingut të padiferencuar: nënkupton strategjinë me të cilën ndërmarrja i qaset tregut me politikë të njëjtë 4P. Strategjia e marketingut të diferencuar: nënkupton atë strategji në të cilën ndërmarrja i qaset saktësisht tregut me një politikë të veçantë 4P. Strategjia e marketingut të koncentruar: nënkupton atë strategji në të cilën ndërmarrja i qaset një segmenti të tregut që njihet si 'treg cak' me politikën më të mirë të 4P."
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
        answer: "Pushtimi i tregut: PE → TE (shitje më e madhe e produkteve ekzistuese në tregjet ekzistuese); Zhvillimi i tregut: PE → TR (shitja e produkteve ekzistuese në tregje të reja); Zhvillimi i produktit: PR → TE (zhvillimi i produkteve të reja për tregjet ekzistuese); Diversifikimi: PR → TR (zhvillimi i produkteve të reja për tregje të reja)."
    },
    {
        question: "Shembull: Zhvillimi i produktit të ri?",
        answer: "Fazat: ideja → koncepti → zhvillimi → testimi → prodhimi → lançimi (p.sh. një bluzë me material antibakterial)."
    },
    {
        question: "Cilat janë metodat e llogaritjes së çmimit dhe plotëso tabelën më poshtë?",
        answer: `
            <div>
                <p><strong>Metodat e llogaritjes së çmimit:</strong></p>
                <ul>
                    <li><strong>Bazuar në kosto:</strong> Kosto plus fitim, pikë kritike e rentabilitetit</li>
                    <li><strong>Bazuar në konkurrencë:</strong> Çmimi i tregut, çmimi i liderit</li>
                    <li><strong>Bazuar në kërkesë:</strong> Çmimi psikologjik, çmimi i diferencuar</li>
                </ul>
                <p><strong>Tabela e plotësuar:</strong></p>
                <table border="1" style="width: 100%; border-collapse: collapse;">
                    <tr style="background-color: #f0f0f0;">
                        <th>Çmimi për njësi</th>
                        <th>Kërkesa</th>
                        <th>E hyra</th>
                        <th>PKR</th>
                        <th>Shpenz totale</th>
                        <th>Rez finale</th>
                    </tr>
                    <tr>
                        <td>60</td>
                        <td>8</td>
                        <td>480</td>
                        <td>5</td>
                        <td>360</td>
                        <td>120</td>
                    </tr>
                    <tr>
                        <td>100</td>
                        <td>4</td>
                        <td>400</td>
                        <td>2.5</td>
                        <td>280</td>
                        <td>120</td>
                    </tr>
                </table>
                <p><small>Supozimet: Shpenzimet fikse = 200; Kosto variabile për njësi = 20</small></p>
                <p><strong>Shpjegim i llogaritjeve:</strong></p>
                <ul>
                    <li>E hyra = Çmimi × Kërkesa</li>
                    <li>PKR = Shpenzimet fikse ÷ (Çmimi - Kosto variabile për njësi)</li>
                    <li>Shpenz totale = Shpenzimet fikse + (Kosto variabile × Kërkesa)</li>
                    <li>Rez finale = E hyra - Shpenz totale</li>
                </ul>
            </div>
        `
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
    },
    {
        question: "Cilat janë vështirësitë e brendshme dhe të jashtme në përcaktimin e çmimit?",
        answer: "Vështirësitë e brendshme: kostot e prodhimit, politikat e çmimeve, objektivat e marketingut; Vështirësitë e jashtme: konkurrenca, kërkesa e tregut, faktorët ekonomikë dhe ligjorë."
    },
    {
        question: "Cilat janë përparësitë dhe mangësitë e publicitetit dhe pse llogariten si përparësi e pse si mangësi?",
        answer: "Përparësitë: arrin audiencë të gjerë, kosto e ulët për person, krijon imazh pozitiv. Mangësitë: mungesa e feedback-ut të menjëhershëm, vështirësi në matjen e efektivitetit, mesazh jo-personal."
    },
    {
        question: "Çka është pika kritike e rentabilitetit dhe çka tregon ajo?",
        answer: "Pika kritike e rentabilitetit është niveli i shitjeve ku të hyrat totale barazohen me shpenzimet totale. Tregon se sa produkte duhet të shesë ndërmarrja për të mbuluar kostot."
    },
    {
        question: "Nëse jeni duke shitur produkte të plastikës shpjegoni si do të bënit reklamimin dhe shitjen personale sipas konsumatorëve (afarist dhe final)?",
        answer: "Reklamimi për konsumatorët final: fokus në karakteristikat e produktit, reklama në TV dhe mediat sociale. Për konsumatorët afaristë: fokus në cilësinë dhe qëndrueshmërinë, shitja personale me prezantime të personalizuara dhe katalogë të detajuar."
    },
    {
        question: "Shpjego orientimet afariste secilën dhe fokusohu më shumë te sqarimi i marketingut holistik?",
        answer: "Orientimi prodhues: fokus në prodhim dhe efikasitet; Orientimi i shitjes: fokus në shitjen e produkteve ekzistuese; Koncepti i marketingut: fokus në nevojat e konsumatorit; Marketingu holistik: integron të gjitha aspektet e marketingut (marrëdhëniet, marketingu i integruar, marketingu i brendshëm dhe marketingu i përgjegjshëm social)."
    }
];

export default questions;