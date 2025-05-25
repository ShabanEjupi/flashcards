Sub KrijoPrezantimSiguriIoT()
    ' Deklarimi i variablave
    Dim pptApp As Object
    Dim pptPres As Object
    Dim pptSlide As Object
    Dim i As Integer
    Dim slideTitleText As String
    Dim slideBodyText As String
    Dim shp As Object
    
    ' Krijimi i instancës së re të PowerPoint
    On Error Resume Next
    Set pptApp = GetObject(, "PowerPoint.Application")
    If Err.Number <> 0 Then
        Set pptApp = CreateObject("PowerPoint.Application")
    End If
    On Error GoTo 0
    
    ' Bëj aplikacionin të dukshëm
    pptApp.Visible = True
    
    ' Krijo një prezantim të ri me tema moderne
    Set pptPres = pptApp.Presentations.Add(msoTrue)
    
    ' Ngjyrat kryesore për prezantimin
    Dim primaryColor As Long
    Dim secondaryColor As Long
    Dim accentColor As Long
    primaryColor = RGB(41, 105, 176)    ' Blu e errët
    secondaryColor = RGB(133, 193, 233) ' Blu e lehtë
    accentColor = RGB(46, 204, 113)     ' Jeshile
    
    ' ---- Slide 1: Slide e parë (Titulli) ----
    Set pptSlide = pptPres.Slides.Add(1, 1) ' 1=pozicioni, 1=layout titulli
    
    ' Sfond me gradient për slide-n e titullit
    pptSlide.FollowMasterBackground = False
    With pptSlide.Background.Fill
        .TwoColorGradient msoGradientHorizontal, 1
        .ForeColor.RGB = RGB(41, 105, 176)
        .BackColor.RGB = RGB(21, 67, 96)
    End With
    
    pptSlide.Shapes(1).TextFrame.TextRange.Text = "Siguria e pajisjeve IoT"
    pptSlide.Shapes(2).TextFrame.TextRange.Text = "Sfidat, sulmet dhe teknikat e mbrojtjes" & vbCrLf & vbCrLf & "Autor: Shaban Ejupi"
    
    ' Stilizimi i slide-s së titullit
    With pptSlide.Shapes(1).TextFrame.TextRange
        .Font.Name = "Segoe UI Light"
        .Font.Size = 50
        .Font.Bold = True
        .Font.Color.RGB = RGB(255, 255, 255)
    End With
    
    With pptSlide.Shapes(2).TextFrame.TextRange
        .Font.Name = "Segoe UI"
        .Font.Size = 24
        .Font.Color.RGB = RGB(255, 255, 255)
    End With
    
    ' Shto një ikonë/simbol dekorativ për faqen e titullit
    Set shp = pptSlide.Shapes.AddPicture("https://img.icons8.com/color/96/000000/cyber-security.png", msoFalse, msoTrue, 480, 50, 100, 100)
    
    ' ---- Slide 2: Përmbajtja ----
    Set pptSlide = pptPres.Slides.Add(2, 2) ' 2=pozicioni, 2=layout me titull dhe përmbajtje
    pptSlide.Shapes(1).TextFrame.TextRange.Text = "Përmbajtja"
    
    ' Shto përmbajtjen (sentence case)
    slideBodyText = "1. Abstrakt" & vbCrLf & _
                    "2. Hyrje" & vbCrLf & _
                    "3. Arkitektura e IoT dhe sipërfaqet e rrezikut" & vbCrLf & _
                    "4. Dobësitë kryesore të sigurisë në pajisjet IoT" & vbCrLf & _
                    "5. Demonstrimi i sulmeve dhe zgjidhjet" & vbCrLf & _
                    "6. Teknologjitë dhe praktikat e mbrojtjes" & vbCrLf & _
                    "7. Konkluzione dhe rekomandime" & vbCrLf & _
                    "8. Referencat"
    
    pptSlide.Shapes(2).TextFrame.TextRange.Text = slideBodyText
    
    ' Shto vijë dekorative
    Set shp = pptSlide.Shapes.AddLine(50, 80, 650, 80)
    With shp.Line
        .Weight = 2
        .ForeColor.RGB = accentColor
    End With
    
    ' ---- Slide 3: Abstrakt ----
    Set pptSlide = pptPres.Slides.Add(3, 2)
    pptSlide.Shapes(1).TextFrame.TextRange.Text = "Abstrakt"
    
    slideBodyText = "• Analizë e aspekteve kryesore të sigurisë në pajisjet IoT" & vbCrLf & _
                    "• Identifikim i dobësive të zakonshme në infrastrukturën IoT" & vbCrLf & _
                    "• Demonstrim i sulmeve në protokollet MQTT dhe CoAP" & vbCrLf & _
                    "• Implementim i zgjidhjeve efektive (mutual-TLS, DTLS)" & vbCrLf & _
                    "• Diskutim i teknologjive moderne (ARM PSA, OAuth2.0/JWT)" & vbCrLf & _
                    "• Rekomandime për implementimin e sigurisë ""by-design"""
                    
    pptSlide.Shapes(2).TextFrame.TextRange.Text = slideBodyText
    
    ' Shto ikonë për abstraktin
    Set shp = pptSlide.Shapes.AddPicture("https://img.icons8.com/color/96/000000/document.png", msoFalse, msoTrue, 500, 300, 80, 80)
    
    ' ---- Slide 4: Hyrje ----
    Set pptSlide = pptPres.Slides.Add(4, 2)
    pptSlide.Shapes(1).TextFrame.TextRange.Text = "Hyrje"
    
    slideBodyText = "• IoT: një revolucion teknologjik me mbi 75 miliardë pajisje deri në 2025" & vbCrLf & _
                    "• Rritja e shpejtë sjell sfida serioze të sigurisë" & vbCrLf & vbCrLf & _
                    "Çfarë analizon ky raport:" & vbCrLf & _
                    "• Arkitekturën tipike IoT dhe sipërfaqet e sulmit" & vbCrLf & _
                    "• Dobësitë kryesore të sigurisë" & vbCrLf & _
                    "• Demonstrimin e sulmeve në protokollet e përdorura" & vbCrLf & _
                    "• Zgjidhjet dhe praktikat moderne të mbrojtjes"
                    
    pptSlide.Shapes(2).TextFrame.TextRange.Text = slideBodyText
    
    ' Shto grafikë të rritjes së pajisjeve IoT
    Set shp = pptSlide.Shapes.AddShape(msoShapeRectangle, 500, 120, 140, 100)
    With shp
        .Fill.ForeColor.RGB = primaryColor
        .Line.Visible = msoFalse
    End With
    
    Set shp = pptSlide.Shapes.AddShape(msoShapeRectangle, 520, 160, 140, 140)
    With shp
        .Fill.ForeColor.RGB = secondaryColor
        .Line.Visible = msoFalse
    End With
    
    Set shp = pptSlide.Shapes.AddShape(msoShapeRectangle, 540, 200, 140, 180)
    With shp
        .Fill.ForeColor.RGB = accentColor
        .Line.Visible = msoFalse
    End With
    
    ' Shto tekst mbi graf
    Set shp = pptSlide.Shapes.AddTextbox(msoTextOrientationHorizontal, 500, 100, 140, 20)
    shp.TextFrame.TextRange.Text = "2015: 15B"
    
    Set shp = pptSlide.Shapes.AddTextbox(msoTextOrientationHorizontal, 520, 140, 140, 20)
    shp.TextFrame.TextRange.Text = "2020: 30B"
    
    Set shp = pptSlide.Shapes.AddTextbox(msoTextOrientationHorizontal, 540, 180, 140, 20)
    shp.TextFrame.TextRange.Text = "2025: 75B"
    
    ' ---- Slide 5: Arkitektura e IoT ----
    Set pptSlide = pptPres.Slides.Add(5, 2)
    pptSlide.Shapes(1).TextFrame.TextRange.Text = "Arkitektura e IoT dhe sipërfaqet e rrezikut"
    
    slideBodyText = "Komponentët kryesorë:" & vbCrLf & _
                    "• Pajisjet/sensorët" & vbCrLf & _
                    "• Gateway-t" & vbCrLf & _
                    "• Cloud/backend" & vbCrLf & _
                    "• Aplikacionet mobile/web" & vbCrLf & vbCrLf & _
                    "Sipërfaqet e rrezikut përfshijnë:" & vbCrLf & _
                    "• Ndërfaqet fizike (UART, JTAG)" & vbCrLf & _
                    "• Protokollet pa enkriptim (MQTT, CoAP)" & vbCrLf & _
                    "• API të pasigurta" & vbCrLf & _
                    "• Menaxhim i dobët i të dhënave sensitive"
                    
    pptSlide.Shapes(2).TextFrame.TextRange.Text = slideBodyText
    
    ' Vizato një diagram të thjeshtë të arkitekturës IoT
    ' Sensori
    Set shp = pptSlide.Shapes.AddShape(msoShapeRoundedRectangle, 450, 100, 60, 40)
    With shp
        .Fill.ForeColor.RGB = secondaryColor
        .TextFrame.TextRange.Text = "Sensori"
        .TextFrame.TextRange.Font.Size = 10
    End With
    
    ' Gateway
    Set shp = pptSlide.Shapes.AddShape(msoShapeRoundedRectangle, 450, 180, 100, 40)
    With shp
        .Fill.ForeColor.RGB = primaryColor
        .TextFrame.TextRange.Text = "Gateway"
        .TextFrame.TextRange.Font.Size = 10
        .TextFrame.TextRange.Font.Color.RGB = RGB(255, 255, 255)
    End With
    
    ' Cloud
    Set shp = pptSlide.Shapes.AddShape(msoShapeCloud, 450, 260, 80, 50)
    With shp
        .Fill.ForeColor.RGB = RGB(153, 204, 255)
        .TextFrame.TextRange.Text = "Cloud"
        .TextFrame.TextRange.Font.Size = 10
    End With
    
    ' Shigjetat lidhëse
    Set shp = pptSlide.Shapes.AddLine(480, 140, 480, 180)
    With shp.Line
        .EndArrowheadStyle = msoArrowheadTriangle
        .Weight = 1.5
        .ForeColor.RGB = RGB(0, 0, 0)
    End With
    
    Set shp = pptSlide.Shapes.AddLine(480, 220, 480, 260)
    With shp.Line
        .EndArrowheadStyle = msoArrowheadTriangle
        .Weight = 1.5
        .ForeColor.RGB = RGB(0, 0, 0)
    End With
    
    ' ---- Slide 6: Dobësitë Kryesore ----
    Set pptSlide = pptPres.Slides.Add(6, 2)
    pptSlide.Shapes(1).TextFrame.TextRange.Text = "Dobësitë kryesore të sigurisë në pajisjet IoT"
    
    slideBodyText = "• Kredencialet default të pasigurta (admin/admin, root/1234)" & vbCrLf & _
                    "• Komunikimi pa enkriptim (MQTT:1883, CoAP:5683)" & vbCrLf & _
                    "• Menaxhimi i dobët i përditësimeve (pa verifikim integriteti)" & vbCrLf & _
                    "• Mungesa e segmentimit të rrjetit (pa VLAN, pa izolim)" & vbCrLf & vbCrLf & _
                    "Vulnerabilitete të identifikuara nga modeli STRIDE:" & vbCrLf & _
                    "   - Spoofing (Falsifikimi i identitetit)" & vbCrLf & _
                    "   - Tampering (Manipulimi i të dhënave)" & vbCrLf & _
                    "   - Information disclosure (Zbulimi i informacionit)" & vbCrLf & _
                    "   - Denial of service (Mohimi i shërbimit)"
                    
    pptSlide.Shapes(2).TextFrame.TextRange.Text = slideBodyText
    
    ' Shto ikonë për sigurinë
    Set shp = pptSlide.Shapes.AddPicture("https://img.icons8.com/color/96/000000/warning-shield.png", msoFalse, msoTrue, 500, 250, 80, 80)
    
    ' ---- Slide 7: Sulmi MQTT pa TLS ----
    Set pptSlide = pptPres.Slides.Add(7, 2)
    pptSlide.Shapes(1).TextFrame.TextRange.Text = "Sulmi ""man-in-the-middle"" në MQTT pa TLS"
    
    ' Shto dritare të ngjashme me kod
    Set shp = pptSlide.Shapes.AddShape(msoShapeRectangle, 50, 80, 500, 160)
    With shp
        .Fill.ForeColor.RGB = RGB(240, 240, 240)
        .Line.ForeColor.RGB = RGB(200, 200, 200)
        .Line.Weight = 1
    End With
    
    slideBodyText = "Kodi i pajisjes së pasigurt:" & vbCrLf & _
                    "import paho.mqtt.client as mqtt" & vbCrLf & _
                    "client = mqtt.Client()" & vbCrLf & _
                    "client.connect(""test.mosquitto.org"", 1883, 60)" & vbCrLf & _
                    "client.publish(""home/livingroom/temperature"", payload)" & vbCrLf & vbCrLf & _
                    "Sulmuesit mund të përdorin Wireshark ose skripte si:" & vbCrLf & _
                    "from scapy.all import *" & vbCrLf & _
                    "def packet_callback(packet):" & vbCrLf & _
                    "    if packet[TCP].dport == 1883:" & vbCrLf & _
                    "        print(f""Kapur mesazh MQTT: {packet[Raw].load}"")" & vbCrLf & _
                    "sniff(filter=""tcp port 1883"", prn=packet_callback)"
                    
    pptSlide.Shapes(2).TextFrame.TextRange.Text = slideBodyText
    
    ' Shto ikonë sulmuesi
    Set shp = pptSlide.Shapes.AddPicture("https://img.icons8.com/color/96/000000/hacker.png", msoFalse, msoTrue, 500, 250, 70, 70)
    
    ' ---- Slide 8: Zgjidhja me mutual-TLS ----
    Set pptSlide = pptPres.Slides.Add(8, 2)
    pptSlide.Shapes(1).TextFrame.TextRange.Text = "Implementimi i mutual-TLS për MQTT"
    
    ' Bëj një dritare të ngjashme me kod
    Set shp = pptSlide.Shapes.AddShape(msoShapeRectangle, 50, 80, 500, 200)
    With shp
        .Fill.ForeColor.RGB = RGB(240, 240, 240)
        .Line.ForeColor.RGB = RGB(200, 200, 200)
        .Line.Weight = 1
    End With
    
    slideBodyText = "Gjenerimi i certifikatave:" & vbCrLf & _
                    "openssl req -x509 -newkey rsa:2048 -days 365 -nodes \" & vbCrLf & _
                    "  -keyout ca.key -out ca.crt -subj ""/CN=MyIoTCA""" & vbCrLf & vbCrLf & _
                    "Konfigurimi i klientit të sigurt:" & vbCrLf & _
                    "import paho.mqtt.client as mqtt" & vbCrLf & _
                    "client = mqtt.Client()" & vbCrLf & _
                    "client.tls_set(" & vbCrLf & _
                    "    ca_certs=""ca.crt""," & vbCrLf & _
                    "    certfile=""client.crt""," & vbCrLf & _
                    "    keyfile=""client.key""" & vbCrLf & _
                    ")" & vbCrLf & _
                    "client.connect(""test.mosquitto.org"", 8883, 60)"
                    
    pptSlide.Shapes(2).TextFrame.TextRange.Text = slideBodyText
    
    ' Shto ikonë sigurie
    Set shp = pptSlide.Shapes.AddPicture("https://img.icons8.com/color/96/000000/ssl.png", msoFalse, msoTrue, 500, 250, 70, 70)
    
    ' ---- Slide 9: CoAP me DTLS ----
    Set pptSlide = pptPres.Slides.Add(9, 2)
    pptSlide.Shapes(1).TextFrame.TextRange.Text = "Dobësitë e CoAP dhe mbrojtja me DTLS"
    
    slideBodyText = "CoAP është i ngjashëm me MQTT në dobësi pa DTLS" & vbCrLf & vbCrLf & _
                    "Implementimi i sigurt:" & vbCrLf & _
                    "import asyncio" & vbCrLf & _
                    "from aiocoap import Context, Message" & vbCrLf & _
                    "from aiocoap.credentials import DTLSCredentials" & vbCrLf & vbCrLf & _
                    "client_credentials = DTLSCredentials(" & vbCrLf & _
                    "    private_key_file=""client.key""," & vbCrLf & _
                    "    certificate_file=""client.crt""," & vbCrLf & _
                    "    ca_file=""ca.crt""" & vbCrLf & _
                    ")" & vbCrLf & _
                    "client = await Context.create_client_context(client_credentials)" & vbCrLf & _
                    "# Tani kërkesat dërgohen në portin e sigurt 5684 (DTLS)"
                    
    pptSlide.Shapes(2).TextFrame.TextRange.Text = slideBodyText
    
    ' Shto diagram te thjeshtë që tregon komunikimin e sigurt
    ' Klienti
    Set shp = pptSlide.Shapes.AddShape(msoShapeRoundedRectangle, 550, 100, 60, 40)
    With shp
        .Fill.ForeColor.RGB = secondaryColor
        .TextFrame.TextRange.Text = "Pajisje"
        .TextFrame.TextRange.Font.Size = 10
    End With
    
    ' Server
    Set shp = pptSlide.Shapes.AddShape(msoShapeRoundedRectangle, 550, 200, 60, 40)
    With shp
        .Fill.ForeColor.RGB = primaryColor
        .TextFrame.TextRange.Text = "Server"
        .TextFrame.TextRange.Font.Size = 10
        .TextFrame.TextRange.Font.Color.RGB = RGB(255, 255, 255)
    End With
    
    ' DTLS Shield
    Set shp = pptSlide.Shapes.AddShape(msoShapeOval, 530, 150, 100, 40)
    With shp
        .Fill.ForeColor.RGB = accentColor
        .TextFrame.TextRange.Text = "DTLS"
        .TextFrame.TextRange.Font.Size = 10
        .TextFrame.TextRange.Font.Bold = True
    End With
    
    ' Shigjetat lidhëse
    Set shp = pptSlide.Shapes.AddLine(580, 140, 580, 160)
    With shp.Line
        .EndArrowheadStyle = msoArrowheadTriangle
        .Weight = 1.5
        .ForeColor.RGB = RGB(0, 0, 0)
    End With
    
    Set shp = pptSlide.Shapes.AddLine(580, 170, 580, 200)
    With shp.Line
        .EndArrowheadStyle = msoArrowheadTriangle
        .Weight = 1.5
        .ForeColor.RGB = RGB(0, 0, 0)
    End With
    
    ' ---- Slide 10: ARM PSA ----
    Set pptSlide = pptPres.Slides.Add(10, 2)
    pptSlide.Shapes(1).TextFrame.TextRange.Text = "ARM PSA dhe framework-et e sigurisë"
    
    slideBodyText = "ARM Platform Security Architecture (PSA):" & vbCrLf & _
                    "• Root of trust - bazuar në hardware" & vbCrLf & _
                    "• Secure boot - ekzekutim vetëm i software-it të autorizuar" & vbCrLf & _
                    "• Trusted execution environment (TEE)" & vbCrLf & _
                    "• Crypto API - standardizim i operacioneve kriptografike" & vbCrLf & vbCrLf & _
                    "Zephyr RTOS integron PSA dhe ofron:" & vbCrLf & _
                    "• Memory protection units (MPU)" & vbCrLf & _
                    "• Secure storage" & vbCrLf & _
                    "• Privileged/unprivileged execution" & vbCrLf & _
                    "• Resource isolation"
                    
    pptSlide.Shapes(2).TextFrame.TextRange.Text = slideBodyText
    
    ' Shto diagram konceptual të ARM PSA
    Set shp = pptSlide.Shapes.AddShape(msoShapeRectangle, 470, 110, 140, 30)
    With shp
        .Fill.ForeColor.RGB = RGB(200, 30, 30)
        .TextFrame.TextRange.Text = "Aplikacionet"
        .TextFrame.TextRange.Font.Size = 10
        .TextFrame.TextRange.Font.Color.RGB = RGB(255, 255, 255)
    End With
    
    Set shp = pptSlide.Shapes.AddShape(msoShapeRectangle, 470, 140, 140, 30)
    With shp
        .Fill.ForeColor.RGB = RGB(40, 120, 200)
        .TextFrame.TextRange.Text = "PSA API"
        .TextFrame.TextRange.Font.Size = 10
        .TextFrame.TextRange.Font.Color.RGB = RGB(255, 255, 255)
    End With
    
    Set shp = pptSlide.Shapes.AddShape(msoShapeRectangle, 470, 170, 140, 30)
    With shp
        .Fill.ForeColor.RGB = RGB(30, 130, 30)
        .TextFrame.TextRange.Text = "Secure Partition Manager"
        .TextFrame.TextRange.Font.Size = 10
        .TextFrame.TextRange.Font.Color.RGB = RGB(255, 255, 255)
    End With
    
    Set shp = pptSlide.Shapes.AddShape(msoShapeRectangle, 470, 200, 140, 30)
    With shp
        .Fill.ForeColor.RGB = RGB(40, 40, 100)
        .TextFrame.TextRange.Text = "Root of Trust"
        .TextFrame.TextRange.Font.Size = 10
        .TextFrame.TextRange.Font.Color.RGB = RGB(255, 255, 255)
    End With
    
    ' ---- Slide 11: OAuth2.0 dhe JWT ----
    Set pptSlide = pptPres.Slides.Add(11, 2)
    pptSlide.Shapes(1).TextFrame.TextRange.Text = "Autentikimi me OAuth2.0 dhe JWT"
    
    ' Dritare kodi me ngjyrë të lehtë
    Set shp = pptSlide.Shapes.AddShape(msoShapeRectangle, 50, 80, 450, 200)
    With shp
        .Fill.ForeColor.RGB = RGB(245, 245, 245)
        .Line.ForeColor.RGB = RGB(200, 200, 200)
        .Line.Weight = 1
    End With
    
    slideBodyText = "Kodi i implementimit:" & vbCrLf & _
                    "def get_oauth_token():" & vbCrLf & _
                    "    response = requests.post(" & vbCrLf & _
                    "        ""https://auth.example.com/oauth/token""," & vbCrLf & _
                    "        data={" & vbCrLf & _
                    "            ""grant_type"": ""client_credentials""," & vbCrLf & _
                    "            ""client_id"": ""thermostat_001""," & vbCrLf & _
                    "            ""client_secret"": ""device_secret""," & vbCrLf & _
                    "            ""scope"": ""publish:temperature""" & vbCrLf & _
                    "        }" & vbCrLf & _
                    "    )" & vbCrLf & _
                    "    return response.json()[""access_token""]" & vbCrLf & vbCrLf & _
                    "Përfitimet:" & vbCrLf & _
                    "• Tokenët me afat të kufizuar" & vbCrLf & _
                    "• Qasje granulare me scopes" & vbCrLf & _
                    "• Revokimi i lehtë i tokenëve"
                    
    pptSlide.Shapes(2).TextFrame.TextRange.Text = slideBodyText
    
    ' Shto diagram OAuth2.0 flow
    Set shp = pptSlide.Shapes.AddShape(msoShapeRoundedRectangle, 520, 100, 80, 40)
    With shp
        .Fill.ForeColor.RGB = secondaryColor
        .TextFrame.TextRange.Text = "Pajisje IoT"
        .TextFrame.TextRange.Font.Size = 10
    End With
    
    Set shp = pptSlide.Shapes.AddShape(msoShapeRoundedRectangle, 520, 180, 80, 40)
    With shp
        .Fill.ForeColor.RGB = accentColor
        .TextFrame.TextRange.Text = "MQTT Broker"
        .TextFrame.TextRange.Font.Size = 10
    End With
    
    Set shp = pptSlide.Shapes.AddShape(msoShapeRoundedRectangle, 520, 260, 80, 40)
    With shp
        .Fill.ForeColor.RGB = primaryColor
        .TextFrame.TextRange.Text = "Auth Server"
        .TextFrame.TextRange.Font.Size = 10
        .TextFrame.TextRange.Font.Color.RGB = RGB(255, 255, 255)
    End With
    
    ' Shigjetat
    Set shp = pptSlide.Shapes.AddLine(520, 120, 470, 260)
    With shp.Line
        .EndArrowheadStyle = msoArrowheadTriangle
        .Weight = 1
        .ForeColor.RGB = RGB(0, 0, 0)
    End With
    
    Set shp = pptSlide.Shapes.AddLine(550, 260, 550, 220)
    With shp.Line
        .EndArrowheadStyle = msoArrowheadTriangle
        .Weight = 1
        .ForeColor.RGB = RGB(0, 0, 0)
    End With
    
    Set shp = pptSlide.Shapes.AddLine(550, 140, 550, 180)
    With shp.Line
        .EndArrowheadStyle = msoArrowheadTriangle
        .Weight = 1
        .ForeColor.RGB = RGB(0, 0, 0)
    End With
    
    ' ---- Slide 12: Monitorimi ----
    Set pptSlide = pptPres.Slides.Add(12, 2)
    pptSlide.Shapes(1).TextFrame.TextRange.Text = "Monitorimi i anomalive në IoT"
    
    slideBodyText = "Zeek për monitorimin e MQTT:" & vbCrLf & _
                    "@load base/protocols/mqtt" & vbCrLf & _
                    "event mqtt_connect(c: connection, msg: MQTT::ConnectMsg)" & vbCrLf & _
                    "{" & vbCrLf & _
                    "    if (msg$client_id !in authorized_clients)" & vbCrLf & _
                    "        alert(""Unauthorized MQTT client: "" + msg$client_id);" & vbCrLf & _
                    "}" & vbCrLf & vbCrLf & _
                    "Elastic Stack (ELK) për monitorim:" & vbCrLf & _
                    "• Beats (Filebeat, Packetbeat)" & vbCrLf & _
                    "• Logstash për normalizim" & vbCrLf & _
                    "• Elasticsearch për ruajtje dhe kërkim" & vbCrLf & _
                    "• Kibana për vizualizim"
                    
    pptSlide.Shapes(2).TextFrame.TextRange.Text = slideBodyText
    
    ' Shto diagram vizual për ELK Stack
    Set shp = pptSlide.Shapes.AddShape(msoShapeOval, 520, 80, 80, 40)
    With shp
        .Fill.ForeColor.RGB = RGB(87, 173, 87)
        .TextFrame.TextRange.Text = "Beats"
        .TextFrame.TextRange.Font.Size = 12
        .TextFrame.TextRange.Font.Color.RGB = RGB(255, 255, 255)
    End With
    
    Set shp = pptSlide.Shapes.AddShape(msoShapeOval, 520, 140, 80, 40)
    With shp
        .Fill.ForeColor.RGB = RGB(240, 173, 78)
        .TextFrame.TextRange.Text = "Logstash"
        .TextFrame.TextRange.Font.Size = 12
        .TextFrame.TextRange.Font.Color.RGB = RGB(255, 255, 255)
    End With
    
    Set shp = pptSlide.Shapes.AddShape(msoShapeOval, 520, 200, 80, 40)
    With shp
        .Fill.ForeColor.RGB = RGB(65, 131, 196)
        .TextFrame.TextRange.Text = "Elasticsearch"
        .TextFrame.TextRange.Font.Size = 12
        .TextFrame.TextRange.Font.Color.RGB = RGB(255, 255, 255)
    End With
    
    Set shp = pptSlide.Shapes.AddShape(msoShapeOval, 520, 260, 80, 40)
    With shp
        .Fill.ForeColor.RGB = RGB(85, 85, 85)
        .TextFrame.TextRange.Text = "Kibana"
        .TextFrame.TextRange.Font.Size = 12
        .TextFrame.TextRange.Font.Color.RGB = RGB(255, 255, 255)
    End With
    
    ' Shigjetat lidhëse
    Set shp = pptSlide.Shapes.AddLine(560, 120, 560, 140)
    With shp.Line
        .EndArrowheadStyle = msoArrowheadTriangle
        .Weight = 1.5
        .ForeColor.RGB = RGB(0, 0, 0)
    End With
    
    Set shp = pptSlide.Shapes.AddLine(560, 180, 560, 200)
    With shp.Line
        .EndArrowheadStyle = msoArrowheadTriangle
        .Weight = 1.5
        .ForeColor.RGB = RGB(0, 0, 0)
    End With
    
    Set shp = pptSlide.Shapes.AddLine(560, 240, 560, 260)
    With shp.Line
        .EndArrowheadStyle = msoArrowheadTriangle
        .Weight = 1.5
        .ForeColor.RGB = RGB(0, 0, 0)
    End With
    
    ' ---- Slide 13: Konkluzione ----
    Set pptSlide = pptPres.Slides.Add(13, 2)
    pptSlide.Shapes(1).TextFrame.TextRange.Text = "Konkluzione dhe rekomandime"
    
    ' Ndrysho layout për këtë slide të rëndësishme
    With pptSlide.Background.Fill
        .PresetGradient msoGradientVertical, 1, msoGradientSilver
    End With
    
    ' Titull me stil special
    With pptSlide.Shapes(1).TextFrame.TextRange
        .Font.Name = "Segoe UI Light"
        .Font.Size = 32
        .Font.Bold = True
        .Font.Color.RGB = primaryColor
    End With
    
    slideBodyText = "Rekomandimet kryesore:" & vbCrLf & _
                    "1. Siguria by-design - siguria që nga fillimi i projektimit" & vbCrLf & _
                    "2. Enkriptimi i komunikimit - gjithmonë TLS/DTLS" & vbCrLf & _
                    "3. Autentikimi i fortë - çertifikata ose OAuth2.0/JWT" & vbCrLf & _
                    "4. Segmentimi i rrjetit - VLAN të veçanta për IoT" & vbCrLf & _
                    "5. Përditësime të sigurta - me verifikim integriteti" & vbCrLf & _
                    "6. Praktika të sigurta të kodimit - udhëzimet OWASP" & vbCrLf & _
                    "7. Monitorimi i vazhdueshëm - zbulim të shpejtë të anomalive" & vbCrLf & _
                    "8. Vlerësimi i rregullt i sigurisë - teste penetrimi" & vbCrLf & vbCrLf & _
                    "Siguria nuk është opsionale, por domosdoshmëri për mbrojtjen e privatësisë dhe besueshmërisë!"
                    
    pptSlide.Shapes(2).TextFrame.TextRange.Text = slideBodyText
    
    ' Shto një element grafik
    Set shp = pptSlide.Shapes.AddShape(msoShapeRoundedRectangle, 30, 320, 550, 40)
    With shp
        .Fill.ForeColor.RGB = accentColor
        .TextFrame.TextRange.Text = "Siguria e IoT është përgjegjësi e përbashkët e të gjithë aktorëve në ekosistem"
        .TextFrame.TextRange.Font.Color.RGB = RGB(255, 255, 255)
        .TextFrame.TextRange.Font.Size = 16
        .TextFrame.TextRange.Font.Bold = True
        .TextFrame.TextRange.ParagraphFormat.Alignment = ppAlignCenter
    End With
    
    ' ---- Slide 14: Referencat ----
    Set pptSlide = pptPres.Slides.Add(14, 2)
    pptSlide.Shapes(1).TextFrame.TextRange.Text = "Referencat"
    
    slideBodyText = "1. OWASP IoT Top 10. (2023). OWASP Foundation." & vbCrLf & _
                    "2. ETSI EN 303 645. (2023). Cyber security for consumer IoT." & vbCrLf & _
                    "3. IoT Security Foundation. (2022). IoT security compliance framework." & vbCrLf & _
                    "4. ARM. (2024). Platform security architecture." & vbCrLf & _
                    "5. NIST SP 800-183. (2022). Networks of 'things'." & vbCrLf & _
                    "6. Antonakakis, M., et al. (2017). Understanding the Mirai botnet." & vbCrLf & _
                    "7. Smith, J. (2023). Mutual TLS in IoT environments." & vbCrLf & _
                    "8. Jones, M., et al. (2021). JSON web token best current practices." & vbCrLf & _
                    "9. Elastic. (2024). Monitoring IoT devices with the elastic stack." & vbCrLf & _
                    "10. Zephyr Project. (2025). Security overview."
                    
    pptSlide.Shapes(2).TextFrame.TextRange.Text = slideBodyText
    
    ' Shto dekorim për referencat
    Set shp = pptSlide.Shapes.AddShape(msoShapeBevel, 30, 80, 10, 220)
    With shp
        .Fill.ForeColor.RGB = accentColor
        .Line.Visible = msoFalse
    End With
    
    ' ---- Slide 15: Slide e fundit (Falemnderim) ----
    Set pptSlide = pptPres.Slides.Add(15, 1) ' Layout i titullit
    pptSlide.Shapes(1).TextFrame.TextRange.Text = "Faleminderit për vëmendjen!"
    pptSlide.Shapes(2).TextFrame.TextRange.Text = "Pyetje?"
    
    ' Stilizimi i slide-s së fundit
    With pptSlide.Background.Fill
        .PresetGradient msoGradientDiagonalDown, 1, msoGradientOcean
    End With
    
    With pptSlide.Shapes(1).TextFrame.TextRange
        .Font.Name = "Segoe UI Light"
        .Font.Size = 44
        .Font.Bold = True
        .Font.Color.RGB = RGB(255, 255, 255)
    End With
    
    With pptSlide.Shapes(2).TextFrame.TextRange
        .Font.Name = "Segoe UI Light"
        .Font.Size = 28
        .Font.Color.RGB = RGB(255, 255, 255)
    End With
    
    ' Shto informacionet e kontaktit
    Set shp = pptSlide.Shapes.AddTextbox(msoTextOrientationHorizontal, 180, 280, 400, 80)
    With shp.TextFrame.TextRange
        .Text = "Kontakt:" & vbCrLf & "shaban.ejupi@example.com"
        .Font.Name = "Segoe UI"
        .Font.Size = 20
        .Font.Color.RGB = RGB(255, 255, 255)
        .ParagraphFormat.Alignment = ppAlignCenter
    End With
    
    ' Aplikimi i tranzicioneve të ndryshme në të gjitha slide-t
    Dim transitionEffects As Variant
    transitionEffects = Array(ppEffectFade, ppEffectCut, ppEffectPush, ppEffectWipe, ppEffectSplit, ppEffectReveal)
    
    For i = 1 To pptPres.Slides.Count
        Dim effectIndex As Integer
        effectIndex = (i Mod 6)
        
        With pptPres.Slides(i).SlideShowTransition
            .EntryEffect = transitionEffects(effectIndex)
            .Duration = 1
            .AdvanceOnTime = msoFalse
            .AdvanceOnClick = msoTrue
        End With
    Next i
    
    ' Stilizimi i të gjitha slide-ve (përveç titullit dhe konkluzioneve që u stilizuan veçmas)
    For i = 2 To pptPres.Slides.Count
        If i <> 13 And i <> 15 Then ' Skip slides already styled
            ' Stili i titullit të slide-ve
            With pptPres.Slides(i).Shapes(1).TextFrame.TextRange
                .Font.Name = "Segoe UI"
                .Font.Size = 28
                .Font.Bold = True
                .Font.Color.RGB = primaryColor
            End With
            
            ' Stili i përmbajtjes
            With pptPres.Slides(i).Shapes(2).TextFrame.TextRange
                .Font.Name = "Segoe UI"
                .Font.Size = 18
            End With
        End If
    Next i
    
    ' Ruaj prezantimin
    pptPres.SaveAs "C:\Users\Public\Siguria_Pajisjeve_IoT.pptx"
    
    MsgBox "Prezantimi u krijua me sukses me dizajn të përmirësuar!", vbInformation
End Sub