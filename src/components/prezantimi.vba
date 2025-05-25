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
    
    ' Zgjidh një font që ka mbështetje të mirë për karakteret shqipe
    Dim mainFont As String
    mainFont = "Calibri" ' Calibri ka mbështetje të mirë për shqip
    
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
        .Font.Name = mainFont
        .Font.Size = 50
        .Font.Bold = True
        .Font.Color.RGB = RGB(255, 255, 255)
    End With
    
    With pptSlide.Shapes(2).TextFrame.TextRange
        .Font.Name = mainFont
        .Font.Size = 24
        .Font.Color.RGB = RGB(255, 255, 255)
    End With
    
    ' Shto një ikonë/simbol dekorativ për faqen e titullit
    Set shp = pptSlide.Shapes.AddPicture("https://img.icons8.com/color/96/000000/cyber-security.png", msoFalse, msoTrue, 480, 50, 100, 100)
    
    ' ---- Slide 2: Përmbajtja ----
    Set pptSlide = pptPres.Slides.Add(2, 2) ' 2=pozicioni, 2=layout me titull dhe përmbajtje
    pptSlide.Shapes(1).TextFrame.TextRange.Text = "Përmbajtja"
    
    ' Aplikimi i fontit të standardizuar për titullin
    With pptSlide.Shapes(1).TextFrame.TextRange
        .Font.Name = mainFont
        .Font.Size = 32
        .Font.Bold = True
        .Font.Color.RGB = primaryColor
    End With
    
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
    
    ' Aplikimi i fontit për përmbajtjen
    With pptSlide.Shapes(2).TextFrame.TextRange
        .Font.Name = mainFont
        .Font.Size = 20
    End With
    
    ' Shto vijë dekorative
    Set shp = pptSlide.Shapes.AddLine(50, 80, 650, 80)
    With shp.Line
        .Weight = 2
        .ForeColor.RGB = accentColor
    End With
    
    ' ---- Slide 3: Abstrakt ----
    Set pptSlide = pptPres.Slides.Add(3, 2)
    pptSlide.Shapes(1).TextFrame.TextRange.Text = "Abstrakt"
    
    ' Aplikimi i fontit për titullin
    With pptSlide.Shapes(1).TextFrame.TextRange
        .Font.Name = mainFont
        .Font.Size = 32
        .Font.Bold = True
        .Font.Color.RGB = primaryColor
    End With
    
    slideBodyText = "• Analizë e aspekteve kryesore të sigurisë në pajisjet IoT" & vbCrLf & _
                    "• Identifikim i dobësive të zakonshme në infrastrukturën IoT" & vbCrLf & _
                    "• Demonstrim i sulmeve në protokollet MQTT dhe CoAP" & vbCrLf & _
                    "• Implementim i zgjidhjeve efektive (mutual-TLS, DTLS)" & vbCrLf & _
                    "• Diskutim i teknologjive moderne (ARM PSA, OAuth2.0/JWT)" & vbCrLf & _
                    "• Rekomandime për implementimin e sigurisë ""by-design"""
                    
    pptSlide.Shapes(2).TextFrame.TextRange.Text = slideBodyText
    
    ' Aplikimi i fontit për përmbajtjen
    With pptSlide.Shapes(2).TextFrame.TextRange
        .Font.Name = mainFont
        .Font.Size = 20
    End With
    
    ' Shto ikonë për abstraktin
    Set shp = pptSlide.Shapes.AddPicture("https://img.icons8.com/color/96/000000/document.png", msoFalse, msoTrue, 500, 300, 80, 80)
    
    ' Standardizimi i fontit për të gjitha slides
    For i = 4 To 15 ' Përshtat numrin bazuar në numrin total të slide-ve
        ' Krijo një slide të re me layout titulli dhe përmbajtje
        Set pptSlide = pptPres.Slides.Add(i, 2)
        
        ' Vendos fontin për titullin
        With pptSlide.Shapes(1).TextFrame.TextRange
            .Font.Name = mainFont
            .Font.Size = 32
            .Font.Bold = True
            .Font.Color.RGB = primaryColor
        End With
        
        ' Vendos fontin për përmbajtjen
        With pptSlide.Shapes(2).TextFrame.TextRange
            .Font.Name = mainFont
            .Font.Size = 20
        End With
    Next i
    
    ' Titulli i slide 4
    pptPres.Slides(4).Shapes(1).TextFrame.TextRange.Text = "Hyrje"
    
    ' Titulli i slide 5
    pptPres.Slides(5).Shapes(1).TextFrame.TextRange.Text = "Arkitektura e IoT dhe sipërfaqet e rrezikut"
    
    ' Titulli i slide 6
    pptPres.Slides(6).Shapes(1).TextFrame.TextRange.Text = "Dobësitë kryesore të sigurisë në pajisjet IoT"
    
    ' Titulli i slide 7
    pptPres.Slides(7).Shapes(1).TextFrame.TextRange.Text = "Sulmi ""man-in-the-middle"" në MQTT pa TLS"
    
    ' Titulli i slide 8
    pptPres.Slides(8).Shapes(1).TextFrame.TextRange.Text = "Implementimi i mutual-TLS për MQTT"
    
    ' Titulli i slide 9
    pptPres.Slides(9).Shapes(1).TextFrame.TextRange.Text = "Dobësitë e CoAP dhe mbrojtja me DTLS"
    
    ' Titulli i slide 10
    pptPres.Slides(10).Shapes(1).TextFrame.TextRange.Text = "ARM PSA dhe framework-et e sigurisë"
    
    ' Titulli i slide 11
    pptPres.Slides(11).Shapes(1).TextFrame.TextRange.Text = "Autentikimi me OAuth2.0 dhe JWT"
    
    ' Titulli i slide 12
    pptPres.Slides(12).Shapes(1).TextFrame.TextRange.Text = "Monitorimi i anomalive në IoT"
    
    ' Titulli i slide 13
    pptPres.Slides(13).Shapes(1).TextFrame.TextRange.Text = "Konkluzione dhe rekomandime"
    
    ' Titulli i slide 14
    pptPres.Slides(14).Shapes(1).TextFrame.TextRange.Text = "Referencat"
    
    ' Titulli i slide 15
    pptPres.Slides(15).Shapes(1).TextFrame.TextRange.Text = "Faleminderit për vëmendjen!"
    
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
    
    ' Ruaj prezantimin
    pptPres.SaveAs "C:\Users\Public\Siguria_Pajisjeve_IoT.pptx"
    
    MsgBox "Prezantimi u krijua me sukses me karaktere shqipe të rregulluara!", vbInformation
End Sub