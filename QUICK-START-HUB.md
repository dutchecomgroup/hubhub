# ⚡ QUICK START - Mega Hub (HubHub)

**De enige cockpit die je nodig hebt voor al je projecten en je leven.**

---

## 🎯 Project Overzicht
- **Local Path:** `d:\Niek Oenema\Documents\ai\projecten\hubhub\hubhub`
- **GitHub:** `https://github.com/dutchecomgroup/hubhub`
- **Productie Server:** `85.215.182.227` (TCG Server)
- **Server Pad:** `/var/www/vhosts/hubhub/`

---

## 🚀 Development Workflow

### 1. Lokaal Werken
```powershell
cd "d:\Niek Oenema\Documents\ai\projecten\hubhub\hubhub"
npm run dev
```
Open browser op: `http://localhost:3000`

### 2. Opslaan & Backup (GitHub)
```powershell
git add .
git commit -m "Feature: Beschrijving van update"
git push origin main
```

### 3. Deploy naar de Cockpit (Server)
```bash
# SSH naar de TCG Server
ssh -i "C:\Users\Niek Oenema\.ssh\tcg_vps" root@85.215.182.227

# Navigeer naar de hubhub map
cd /var/www/vhosts/hubhub/

# Pull en herstart
git pull origin main
npm install
npm run build
pm2 restart hubhub
```

---

## 🛠️ De Centrale Kracht (Remote Control)
Vanuit deze hub beheer je de andere projecten.

### DutchThrift Management
- **SSH:** `root@85.215.181.179`
- **Target Path:** `/var/www/dutchthrifthub`
- **Action:** De hub voert automatisch `pm2 restart dutchthrift` uit via de SSH-brug.

### TCGDeckMaster Management
- **Target Path:** `/var/www/vhosts/tcgdeckmaster.com/httpdocs/`
- **Action:** De hub monitort de Expo builds en Remotion rendering.

---

## 🗄️ Database Beheer
De hub gebruikt een eigen PostgreSQL database `hubhub` op de TCG server.

**Nieuwe tabel toevoegen?**
1. Wijzig `db/schema.ts`
2. Run `npm run db:push` (Past de live database aan)

---

## 🔐 Veiligheid Eerst
De Mega Hub bewaart al je geheimen.
- **Login:** Master account met 2FA.
- **Wachtwoorden:** Altijd AES-256 versleuteld in de database.
- **Geen Hardcoding:** Gebruik `.env` voor API keys en DB strings.

---

**🔥 Let's build the ultimate cockpit!**
