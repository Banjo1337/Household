# Hur man installerar

1. Klona ner projekt.
2. CD'a in i root-mappen.
3. Kör kommandot "npm i --force" och starta emulatorn(om emulator skall användas).
```
npm i --force
```
4. Kör kommandot "npm run start".
```
npm run start
```
5. Du är nu redo att skanna QR-koden i Expo Go på en fysisk telefon, eller ladda appen i en android emulator!

### Exempel inlogg är: 

Användarnamn: tuco

Lösenord: Password_A1

Två profiler finns. Räven ger tillgång till ett levande hushåll med sysslor och statistik. Ugglan ger ett nystartat hushåll.


# Beskrivning
Denna app används för att tilldela och spara vem som gör olika sysslor i ett hushåll. Ett hushåll består av upp till 8 personer, där statistik lagras för varje nuvarande vecka, nästa vecka samt föregående månad. Grafisk layout är barnanpassad. 

![image](https://user-images.githubusercontent.com/90799243/199994327-a87be9a5-4752-42db-aeb6-31890f8f1b2b.png)

# Avgränsningar

Applikationen är utvecklad specifikt för Androidtelefoner.

I vår applikation så syns enbart den senaste medlemmen av ett hushåll som gjort en syssla. Vill man istället se vem som gjort mest så hänvisas man till statistik.

Arkiverade engångssysslor syns i ett dygn efter att den markerats som färdig.

Görs en syssla kommer siffran 1/x visas vilket indikerar att den gjorts senaste dygnet.

Skapas däremot en syssla så står 0/x i dagsvyn vilket indikerar att den aldrig gjorts.

"Completed" i sysslodetaljer står som completed om sysslan inte är försenad.

En bock med grön bakgrund visas enbart i dagsvy på engångssysslor som är avklarade och arkiverade.

Tolkningen "ägare" i vårt projekt är att en ägare är admin och ett hushåll kan ha många admins.

I produktbeställningen är karusellen för att välja poäng/frekvens på sysslor horisontell men efter diskussion med beställare godkänns en vertikal "picker".
Även i vårt val av styling och design har visa friheter tagits med produktbeställare utan protester. 

Egentligen kanske användare inte skulle få göra något innan man valt avatar. I nuläget representeras användare som inte valt avatar av ett timglas.

Vi har två properties som inte används i Chore, AudioUrl och ImageUrl. Detta för att tiden att implementera inte fanns där.

# Reflektioner
Vi har lite reflekterat huruvida man vill ha ett riktigt liveflöde som att när man har appen framför sig, se tex sysslor som läggs till i faktisk realtid. Å ena sidan kan det vara bra men osäker på om det egentligen är nödvändigt för den här typen av app.  Vi hade kanske velat ha lagt till det här om vi haft mer tid (websockets, signalR).

# [Frontend repo](https://github.com/Banjo1337/Household)
# [Backend repo](https://github.com/boborjim/household-backend)
# [Presentation](https://docs.google.com/presentation/d/1H7-LkNMmhEaNceBP7-F0jG0_xjJD7SWJPvsmaN3SC90/edit?usp=sharing)
# [Figma](https://www.figma.com/file/KeYmGL1RYzPfQBJy00JnTM/household?node-id=0%3A1)

# Krav

### Krav uppfyllda: 36/40

## Kravlista (4)

-   [x] En logga, splashscreen och appikon ska designas och användas. *

-   [x] Applikationen ska byggas med RN, Expo & TS. *

-   [x] Designen av appen ska utgå ifrån befintliga skisser, undantag kan ges men ska diskuteras
        med produktägare, godkännas och dokumenteras. *

-   [x] Information ska kommuniceras till och från en server. (VG)

## Hushåll (7)

-   [x] Ett hushåll ska ha ett namn och en genererad (enkel) kod så andra kan gå med i hushållet,
        namnet ska gå att ändra. *

-   [x] Alla användare i ett hushåll ska kunna se vilka som tillhör ett hushåll.

-   [x] En ägare av ett hushåll ska kunna se förfrågningar om att gå med i hushållet.

-   [x] En ägare ska kunna acceptera eller neka förfrågningar.

-   [x] En ägare ska kunna göra andra till ägare.

-   [x] En ägare ska kunna pausa en användare och under pausade perioder ska användare inte
        tas med i statistiken.

-   [x] Om en använder har pausats under en del av en period i statistiken ska graferna
        normaliseras.

## Konto (5)

-   [x] En användare ska kunna registrera och logga in sig. *

-   [x] En användare ska kunna skapa ett nytt hushåll. *

-   [x] En användare ska kunna gå med i ett hushåll genom att ange hushållets kod. *

-   [x] När en användare har valt att gå med i ett hushåll behöver en ägare av hushållet först
        godkänna användaren.

-   [x] En användare ska kunna lämna ett hushåll.

## Profil (6)

-   [x] En användare ska kunna ange sitt namn. *

-   [x] En användare ska kunna välja en avatar (emoji-djur + färg) från en fördefinierad lista. *

-   [x] Valda avatarer ska inte kunna väljas av andra användare i hushållet. *

-   [x] Avataren ska användas i appen för att visa vad användaren har gjort. *

-   [x] En användare ska kunna ställa in appens utseende (mörkt, ljust, auto).

-   [x] Om en användare tillhör två eller fler hushåll ska denne kunna välja att byta mellan de
        olika hushållen.

## Sysslor (6)

-   [x] En ägare ska kunna lägga till sysslor att göra i hemmet. *

-   [x] En syssla ska ha ett namn, en beskrivning (text), hur ofta den ska göras (dagar), och en
        vikt som beskriver hur energikrävande den är. *

-   [ ] En användare ska kunna lägga till en ljudinspelning och en bild för att beskriva sysslan
        ytterligare.

-   [x] En ägare ska kunna redigera en syssla. *

-   [x] En ägare ska kunna ta bort en syssla.

-   [x] När en syssla tas bort ska användaren få en varning om att all statistik gällande sysslan
        också kommer att tas bort och få valet att arkivera sysslan istället.

## Dagsvyn (3)

-   [x] Alla sysslor ska listas i en dagsvy och ge en översikt kring vad som behöver göras. *

-   [x] Utöver sysslans namn ska även vem/vilka som har gjort sysslan visas, hur många dagar
        sedan sysslan gjordes senast samt om den är försenad. *

-   [x] När en användare väljer en syssla ska beskrivningen av sysslan visas och det ska även
        med ett enkelt tryck gå att markera sysslan som gjord. *

## Statistik (6)

-   [x] En användare ska kunna se fördelningen av gjorda sysslor mellan användarna i sitt
        hushåll. *

-   [x] Varje statistikvy ska visa den totala fördelningen (inräknat vikterna för sysslorna) samt
        fördelning av varje enskild syssla. *

-   [x] Det ska finnas en statistikvy över ”nuvarande vecka”. *

-   [x] Det ska finnas en statistikvy över ”förra vecka”.

-   [x] Det ska finnas en statistikvy över ”förra månaden”.

-   [x] Om det inte finns statistik för en av vyerna ska den vyn inte visas.

## Schemaläggning (3)

-   [ ] En ägare ska kunna tilldela och ta bort sysslor från användare i hushållet.

-   [ ] Användare ska kunna se de tilldelade sysslorna i sitt gränssnitt.

-   [ ] En ägare ska kunna skapa grupper av sysslor som automatiskt tilldelas användarna i
        hushållet och roteras baserat på ett intervall i dagar.
        
![image](https://user-images.githubusercontent.com/79047651/199952354-950c0a9f-69e8-4512-b84e-b22d0de5d405.png) 
![image](https://user-images.githubusercontent.com/79047651/199952406-3d10f545-bd51-47a5-a070-06f7e280aaea.png)
![image](https://user-images.githubusercontent.com/79047651/199952472-f6fed771-ce59-4337-bb7e-e09154b275ce.png)
![image](https://user-images.githubusercontent.com/79047651/199952547-f822ba92-c6d0-4450-948c-59e3384ec020.png)
![image](https://user-images.githubusercontent.com/79047651/199952609-8d0b49b7-756b-4268-8513-b6bb648a7a48.png)




 
 
 
 

