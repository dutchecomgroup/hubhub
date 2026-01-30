# ⚡ Quick Start - Development naar Live

**Snelle referentie voor dagelijkse development workflow**

---

## 🎯 Workflow Overzicht

```
💻 Lokaal ontwikkelen (update/beta)
    ↓ Test op localhost:5000
📤 Push naar GitHub (backup)
    ↓ Verzamelen updates in update/beta
✅ Tevreden met alle updates?
    ↓ Merge naar main branch
🔴 Deploy naar server (server ALTIJD op main)
    ↓
✅ LIVE op https://tcgdeckmaster.com
```

**Belangrijkste regel:** 
- 🟡 `update/beta` = Alleen lokaal testen
- 🔴 `main` = Server (productie)

---

## 🚀 Dagelijkse Workflow

### Stap 1: Lokaal Ontwikkelen & Testen

```powershell
# Open PowerShell, navigeer naar project
cd "d:\Niek Oenema\Documents\ai\projecten\tcgdeckmaster"

# Schakel naar development branch
git checkout update/beta

# Haal laatste wijzigingen op (van GitHub)
git pull origin update/beta

# ⚠️ NA GROTE UPDATES: Installeer nieuwe/gewijzigde packages
npm install

# Open in VS Code
code .

# Start development server
npm run dev
```

**Open browser:** `http://localhost:5000`

**Maak wijzigingen, test grondig!**

---

### Stap 2: Push naar GitHub (Backup)

```powershell
# ⚠️ CHECK EERST WELKE BRANCH JE OP ZIT!
git branch
# Moet tonen: * update/beta
# Als je op main zit, schakel eerst: git checkout update/beta

# Check wat er gewijzigd is
git status

# Voeg alle wijzigingen toe
git add .

# Commit met beschrijving
git commit -m "Feature: Beschrijving van je wijziging"

# Push naar GitHub (update/beta branch)
git push origin update/beta
```

> ⚠️ **LET OP:** Push NOOIT direct naar `main`! Altijd naar `update/beta` pushen en later mergen.

✅ **Code staat nu veilig op GitHub!**

**Je kan dit herhalen zoveel je wilt - blijf testen en pushen tot alles perfect is.**

---

### Stap 3: Merge naar Main (Als Alles Klaar Is)

**Optie A: Via GitHub Pull Request** (Aanbevolen voor review)

```
1. Open: https://github.com/dutchecomgroup/tcgdeckmaster
2. Klik "Pull requests" → "New pull request"
3. Base: main, Compare: update/beta
4. Klik "Create pull request"
5. Voeg beschrijving toe van alle wijzigingen
6. Klik "Merge pull request"
7. Klik "Confirm merge"
```

**Optie B: Lokaal Mergen**

```powershell
# Schakel naar main
git checkout main

# Pull laatste main
git pull origin main

# Merge update/beta in main
git merge update/beta

# Push naar GitHub
git push origin main
```

✅ **Main branch heeft nu alle updates!**

---

### Stap 4: Deploy naar Live Server

**Via MobaXterm** (of PowerShell):

```powershell
# Verbind met server
ssh -i "$env:USERPROFILE\.ssh\" root@85.215.182.227
```

```bash
# Nu op de server:
cd /var/www/vhosts/tcgdeckmaster.com/httpdocs/

# Check dat je op main staat (server blijft ALTIJD op main!)
git branch
# Moet tonen: * main

# Pull de nieuwe code
git pull origin main

# Installeer nieuwe packages (indien package.json gewijzigd)
npm install

# Build productie versie
npm run build

# Restart applicatie
pm2 restart tcgdeckmaster

# Check logs
pm2 logs tcgdeckmaster --lines 30
```

**✅ Test live site:** `https://tcgdeckmaster.com`

---

## � Mobile App Development

De mobile app gebruikt **Expo** (React Native). Volg deze stappen om lokaal te ontwikkelen:

### Eerste Keer Setup

```powershell
# Navigeer naar mobile folder
cd mobile

# Installeer dependencies (VERPLICHT bij eerste keer!)
npm install
```

### Starten van de Mobile App

```powershell
# Start Expo development server
npm start
```

Dit opent Expo DevTools. Je hebt dan de volgende opties:
- **Android:** Scan QR-code met Expo Go app
- **iOS:** Scan QR-code met Camera app (Expo Go moet geïnstalleerd zijn)
- **Web:** Druk op `w` voor web preview

> ⚠️ **LET OP:** De mobile app maakt verbinding met de backend API. Zorg dat `npm run dev` draait in de hoofdfolder voor volledige functionaliteit!

### 📸 Scanner Architecture (Hybrid Mode)
De scanner werkt in twee modi om de ontwikkelsnelheid hoog te houden:

1.  **Expo Go Mode (Fallback)**:
    - Wordt automatisch geladen in de standaard Expo Go app. 
    - Gebruikt de standaard `expo-camera`.
    - **Indicator**: Je ziet een oranje balk: `⚠️ EXPO GO MODE: AUTO-CROP DISABLED`.
    - Gebruik de camera-knop om handmatig een foto te maken.

2.  **Native Mode (Pro)**:
    - Wordt automatisch geactiveerd in een **Custom Development Build**.
    - Gebruikt `react-native-document-scanner-plugin` voor real-time "Green Frame" detectie en auto-cropping.
    - Dit is de modus die uiteindelijk naar de App/Play Store gaat.

*Tip: Ontwikkel UI-wijzigingen in Expo Go (snel), maar test de scan-accuraatheid in een Custom Build (nauwkeurig).*

---

## 📽️ Video Generator (Remotion)

We hebben een krachtige video-generator gebouwd met Remotion om premium social media advertenties en content te maken voor TCGDeckMaster.

### Starten van de Video Studio

```powershell
# Open een nieuwe PowerShell tab in de hoofdfolder
npm run video:studio
```

Dit opent de **Remotion Studio** in je browser op `http://localhost:3000`. 

### Beschikbare Templates
In de sidebar van de Studio kun je kiezen uit verschillende templates:
- **CollectorsJourney**: Toont de groei van een collectie met live waarde-updates (Elite €50+ hits).
- **MarketCarousel**: Een 3D-carrousel van de populairste kaarten.
- **PortfolioPulse**: Data-gedreven visualisatie van portfolio groei.
- **ThePull**: De spanning van een pack reveal in 6 seconden.
- **MarketBattle**: 3D vergelijking tussen twee top hits.

> 💡 **Tip:** Je kunt de "Props" in de sidebar aanpassen om direct andere kaarten of prijzen te testen in de video.


---

## �📋 Snelle Command Lijst

### Lokaal Ontwikkelen

```powershell
cd "d:\Niek Oenema\Documents\ai\projecten\tcgdeckmaster"
git checkout update/beta
git pull origin update/beta
npm install               # Na grote updates
npm run dev               # Test op localhost:5000
```

### Push Updates

```powershell
git add .
git commit -m "Feature: Beschrijving"
git push origin update/beta
```

### Merge naar Main

```powershell
git checkout main
git pull origin main
git merge update/beta
git push origin main
```

### Deploy Live

```bash
# Op server (via SSH)
cd /var/www/vhosts/tcgdeckmaster.com/httpdocs/
git pull origin main
npm install
npm run build
pm2 restart tcgdeckmaster
```

---

## 🗄️ Database Migraties

**Als je `shared/schema.ts` hebt gewijzigd (nieuwe tabel/kolom):**

```powershell
# 1. Test lokaal eerst
npm run dev  # Drizzle past lokale database aan

# 2. Push naar GitHub
git add shared/schema.ts
git commit -m "Database: Nieuwe tabel X toegevoegd"
git push origin update/beta

# 3. Merge naar main (zoals normaal)
git checkout main
git merge update/beta
git push origin main
```

```bash
# 4. Op server: Run migratie
cd /var/www/vhosts/tcgdeckmaster.com/httpdocs/
git pull origin main

# RUN DATABASE MIGRATIE
npm run db:push

# Dit past de database schema aan!

# Build & restart
npm run build
pm2 restart tcgdeckmaster
```

---

## 💾 Database Backup

### Backup Maken (op server via SSH)

```bash
# Op de server
cd /var/www/vhosts/tcgdeckmaster.com/httpdocs/
pg_dump -U tcg_sqluser -d tcgdeckmaster -h localhost > backup_$(date +%Y%m%d_%H%M%S).sql

# Of met compressie
pg_dump -U tcg_sqluser -d tcgdeckmaster -h localhost | gzip > backup_$(date +%Y%m%d).sql.gz
```

### Backup Downloaden naar PC

```powershell
# In PowerShell op je PC
scp -i "$env:USERPROFILE\.ssh\tcgdeckmaster_vps" root@85.215.182.227:/var/www/vhosts/tcgdeckmaster.com/httpdocs/backup_*.sql "C:\Users\Niek Oenema\Documents\backups\"
```

### Backup Terugzetten

```bash
# Op server (alleen bij noodgevallen!)
psql -U tcg_sqluser -d tcgdeckmaster -h localhost < backup_20241224_123456.sql
```

> ⚠️ **TIP:** Maak ALTIJD een backup voordat je schema wijzigingen doet via `npm run db:push`!

---

## ⚠️ Belangrijke Regels

✅ **Server staat ALTIJD op `main` branch**
- De live website draait ALLEEN vanaf `main`
- Nooit `update/beta` deployen naar server

✅ **Lokaal testen op `localhost:5000`**
- Test ALLES lokaal voordat je naar main merged
- Gebruik `update/beta` voor development

✅ **GitHub `update/beta` = Backup**
- Push regelmatig naar GitHub (meerdere keren per dag OK)
- Verzamel updates tot je tevreden bent
- Dan pas merge naar `main`

✅ **Main = Productie**
- Merge alleen naar `main` als alles 100% werkt
- Direct na merge naar main → deploy naar server

---

## 🆘 Problemen?

### Website werkt niet na deployment

```bash
# Check PM2 status
pm2 status

# Check logs
pm2 logs tcgdeckmaster --lines 50

# Restart
pm2 restart tcgdeckmaster

# Rebuild
cd /var/www/vhosts/tcgdeckmaster.com/httpdocs/
npm run build
pm2 restart tcgdeckmaster
```

### Database errors

```bash
# Check PostgreSQL
sudo systemctl status postgresql

# Test database verbinding
psql -U tcg_sqluser -d tcgdeckmaster -h localhost
\dt  # Toon tabellen
\q

# Herrun migratie
npm run db:push
```

### Merge conflicts

```powershell
# Bij merge conflict in VS Code:
# 1. VS Code toont conflict visueel
# 2. Kies: "Accept Current" of "Accept Incoming"
# 3. Save file
git add .
git commit -m "Merge: Resolved conflicts"
git push origin main
```

---

## 🔗 Links

| Wat | URL |
|-----|-----|
| **Live Website** | https://tcgdeckmaster.com |
| **GitHub Repo** | https://github.com/dutchecomgroup/tcgdeckmaster |
| **Plesk Panel** | https://85.215.182.227:8443 |

---

**🎉 Succes met ontwikkelen!**
