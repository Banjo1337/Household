### ⚠ Fritt fram första veckan att pusha i main, ingen branch protection! ⚠

Kravlista
*: Dessa krav måste göras (20st).
Antal krav: 40.
G: 20 (50%).
VG: 32 (80%).
Kravlista (4)
En logga, splashscreen och appikon ska designas och användas. *
Applikationen ska byggas med RN, Expo & TS. *
Designen av appen ska utgå ifrån befintliga skisser, undantag kan ges men ska diskuteras
med produktägare, godkännas och dokumenteras. *
Information ska kommuniceras till och från en server. (VG)
Hushåll (7)
Ett hushåll ska ha ett namn och en genererad (enkel) kod så andra kan gå med i hushållet,
namnet ska gå att ändra. *
Alla användare i ett hushåll ska kunna se vilka som tillhör ett hushåll.
En ägare av ett hushåll ska kunna se förfrågningar om att gå med i hushållet.
En ägare ska kunna acceptera eller neka förfrågningar.
En ägare ska kunna göra andra till ägare.
En ägare ska kunna pausa en användare och under pausade perioder ska användare inte
tas med i statistiken.
Om en använder har pausats under en del av en period i statistiken ska graferna
normaliseras.

1

Konto (5)
En användare ska kunna registrera och logga in sig. *
En användare ska kunna skapa ett nytt hushåll. *
En användare ska kunna gå med i ett hushåll genom att ange hushållets kod. *
När en användare har valt att gå med i ett hushåll behöver en ägare av hushållet först
godkänna användaren.
En användare ska kunna lämna ett hushåll.
Profil (6)
En användare ska kunna ange sitt namn. *
En användare ska kunna välja en avatar (emoji-djur + färg) från en fördefinierad lista. *
Valda avatarer ska inte kunna väljas av andra användare i hushållet. *
Avataren ska användas i appen för att visa vad användaren har gjort. *
En användare ska kunna ställa in appens utseende (mörkt, ljust, auto).
Om en användare tillhör två eller fler hushåll ska denne kunna välja att byta mellan de
olika hushållen.
Sysslor (6)
En ägare ska kunna lägga till sysslor att göra i hemmet. *
En syssla ska ha ett namn, en beskrivning (text), hur ofta den ska göras (dagar), och en
vikt som beskriver hur energikrävande den är. *
En användare ska kunna lägga till en ljudinspelning och en bild för att beskriva sysslan
ytterligare.
En ägare ska kunna redigera en syssla. *
En ägare ska kunna ta bort en syssla.
När en syssla tas bort ska användaren få en varning om att all statistik gällande sysslan
också kommer att tas bort och få valet att arkivera sysslan istället.
Dagsvyn (3)
Alla sysslor ska listas i en dagsvy och ge en översikt kring vad som behöver göras. *
Utöver sysslans namn ska även vem/vilka som har gjort sysslan visas, hur många dagar
sedan sysslan gjordes senast samt om den är försenad. *
När en användare väljer en syssla ska beskrivningen av sysslan visas och det ska även
med ett enkelt tryck gå att markera sysslan som gjord. *
Statistik (6)
En användare ska kunna se fördelningen av gjorda sysslor mellan användarna i sitt
hushåll. *
Varje statistikvy ska visa den totala fördelningen (inräknat vikterna för sysslorna) samt
fördelning av varje enskild syssla. *
Det ska finnas en statistikvy över ”nuvarande vecka”. *
Det ska finnas en statistikvy över ”förra vecka”.
Det ska finnas en statistikvy över ”förra månaden”.

2

Om det inte finns statistik för en av vyerna ska den vyn inte visas.
Schemaläggning (3)
En ägare ska kunna tilldela och ta bort sysslor från användare i hushållet.
Användare ska kunna se de tilldelade sysslorna i sitt gränssnitt.
En ägare ska kunna skapa grupper av sysslor som automatiskt tilldelas användarna i
hushållet och roteras baserat på ett intervall i dagar.
Inlämning
För att bli godkänd på den här uppgiften MÅSTE ni använda GIT och GitHub.
Inlämningen sker som vanligt via läroplattformen. I din projektmapp ska det finnas
(utöver all kod) en README.md fil. Den ska innehålla en titel, beskrivning av projektet,
info om hur projektet byggs och körs samt vilka krav som är uppfyllda. Samt en .git mapp
så jag kan hitta till erat publika repo.
Presentation
Presentationen är uppdelad i tre moment. Det första momentet är en pitch på cirka 2-3
minuter där ni ska försöka sälja in era lösningar och designval. Den andra delen är ett
demo av applikationen. Slutligen ska ni reflektera kring projektet. Varje grupp har ca 20
minuter på sig.
Opponering & Individuell reflektion
I slutet av kursen ska ni genomföra en opponering på varandras arbeten och i samband
med det även lämna in en individuell reflektion. Ni kommer få ut mer information om
hur det kommer att gå till längre fram.
Krav för godkänt:
1. De nödvändiga kraven ifrån kravlistan ovan är uppfyllda
2. Git & GitHub har använts.
3. Projektmappen innehåller en README.md fil - (läs ovan för mer info)
4. Uppgiften lämnas in i tid!
5. Muntlig presentation är genomförd
Krav för väl godkänt:
1. Alla punkter för godkänt är uppfyllda
2. Ni har använt CI/CD under projektet.
3. Applikationen kommunicerar data till och från en backend tjänst (ni väljer) med hjälp
av Redux & redux-thunk.