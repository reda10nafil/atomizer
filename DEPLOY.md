# 🚀 Deploy on Vercel - 1 Click!

## Metodo 1: Deploy da GitHub (Consigliato) ⭐

### Step 1: Vai su Vercel
Apri: **https://vercel.com/new**

### Step 2: Importa Repository
1. Click "Import Git Repository"
2. Seleziona `reda10nafil/atomizer`
3. Click "Import"

### Step 3: Deploy
1. Lascia settings di default (giàħħ configurati in `vercel.json`)
2. Click "Deploy"
3. Aspetta 1-2 minuti
4. **FATTO!** 🎉

### Il tuo URL sarà:
```
https://atomizer-[random].vercel.app
```

Puoi cambiarlo in:
```
https://atomizer.vercel.app
```

O collegare un dominio custom:
```
https://atomizer.yourdomain.com
```

---

## Metodo 2: Vercel CLI (Locale)

```bash
# Installa Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Premi INVIO a tutte le domande
# In 30 secondi è online!
```

---

## Metodo 3: Netlify (Alternativa)

### Step 1: Build locale
```bash
npm run build
```

### Step 2: Drop su Netlify
1. Vai su: https://app.netlify.com/drop
2. Trascina la cartella `dist/`
3. Fatto!

URL: `https://random-name.netlify.app`

---

## Dopo il Deploy

### Testa lo Scraper:
1. Apri il tuo URL Vercel
2. Click tab "Scraper" (icona Download 📥)
3. Incolla URL esempio:
   ```
   https://wallhaven.cc/search?q=nature
   ```
4. Click "Scrape All"
5. Vedi magie! ✨

### Condividi:
- URL pubblico a chiunque
- Funziona su mobile, tablet, desktop
- Zero installazioni per gli utenti

---

## Custom Domain (Opzionale)

Se vuoi un dominio personalizzato:

1. Vai su Vercel Dashboard
2. Seleziona progetto "atomizer"
3. Settings → Domains
4. Add Domain
5. Segui istruzioni DNS

Gratis con SSL automatico! 🔒

---

## Aggiornamenti

Ogni push su GitHub:
- Vercel fa auto-deploy
- Aspetta 1-2 minuti
- Nuovo versione online!

Niente da fare manualmente! 🎉

---

## Link Utili

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Vercel Docs**: https://vercel.com/docs
- **Netlify**: https://netlify.com
- **Repository**: https://github.com/reda10nafil/atomizer

---

**Pronto?** Vai su https://vercel.com/new e deploya! 🚀
