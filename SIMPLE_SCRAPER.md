# 🕷️ Simple Wallpaper Scraper - Zero Config

## 🎯 Cos'è¶²

Uno scraper **client-side puro** che:
- ✅ Non richiede backend
- ✅ Non richiede API
- ✅ Non richiede installazioni extra
- ✅ Funziona direttamente nel browser
- ✅ Supporta URL multipli

## 🚀 Come Usare

### 1. Apri Atomizer

```bash
npm run dev
```

### 2. Vai su Tab "Scraper"

Nel pannello di sinistra, clicca l'icona **Download** (ultima tab).

### 3. Incolla URL

Incolla gli URL delle pagine wallpaper che vuoi scrapare:

```
https://wallhaven.cc/search?q=nature
https://wallhaven.cc/search?q=space
https://unsplash.com/s/photos/nature-wallpaper
https://www.pexels.com/search/nature%20wallpaper/
```

### 4. Clicca "Scrape All"

Aspetta che finisca (vedrai il progresso).

### 5. Scarica!

- Click su un'immagine → Preview full-screen
- Click Download → Scarica in alta risoluzione

## 💡 Come Funziona

```
1. Tu incolli URL
       ↓
2. Browser fetch pagina (con proxy CORS)
       ↓
3. Parse HTML ed estrae immagini
       ↓
4. Mostra grid risultati
       ↓
5. Click → Download
```

## 🌐 Siti Supportati

Funziona con **qualsiasi sito** di wallpaper:

- ✅ Wallhaven.cc
- ✅ Unsplash.com
- ✅ Pexels.com
- ✅ Pixabay.com
- ✅ Wallpaper Abyss
- ✅ Qualsiasi altro sito

**Basta incollare l'URL della pagina di ricerca!**

## 🎯 Features

### Multi-URL
- Incolla quanti URL vuoi
- Uno per riga
- Scrapa tutti in sequenza

### Proxy CORS Automatico
- Usa `api.allorigins.win` (gratis)
- Niente config necessaria
- Supera CORS restrictions

### Grid Netflix-Style
- Preview immagini
- Hover effects
- Click per full-screen
- Download diretto

### Zero Backend
- Tutto nel browser
- Niente server
- Niente API key
- Niente installazioni

## 📊 Esempio Uso

```text
# Incolla questo nel textarea:

https://wallhaven.cc/search?q=cyberpunk
https://wallhaven.cc/search?q=minimal
https://unsplash.com/s/photos/dark-wallpaper

# Clicca "Scrape All"
# Aspetta 10-30 secondi
# Vedi 50-150 wallpaper
# Click e scarica!
```

## 🐛 Troubleshooting

### "No wallpapers found"
- Controlla che gli URL siano corretti
- Prova con i siti di esempio
- Alcuni siti potrebbero bloccare lo scraping

### Immagini non caricano
- Il sito potrebbe bloccare hotlink
- Apri la source URL e scarica manualmente
- Prova un proxy CORS diverso

### Scraping lento
- È normale, deve fetchare ogni pagina
- Riduci il numero di URL
- Usa siti più veloci (Unsplash è veloce)

## 🔧 Proxy CORS Alternativi

Se `allorigins.win` non funziona, modifica nel codice:

```typescript
// Sostituisci questa riga:
const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`

// Con uno di questi:
const proxyUrl = `https://cors-anywhere.herokuapp.com/${url}`
const proxyUrl = `https://thingproxy.freeboard.io/fetch/${url}`
const proxyUrl = `https://api.codetabs.com/v1/proxy?fetch=${url}`
```

## 🎉 Tips

1. **Usa URL di ricerca**, non homepage
   - ✅ `https://wallhaven.cc/search?q=nature`
   - ❌ `https://wallhaven.cc`

2. **Piò²²² URL = Più risultati**
   - Ma più lento
   - 3-5 URL è il sweet spot

3. **Salva i tuoi URL preferiti**
   - Tienili in un file di testo
   - Incolla e vai

4. **Usa i preset di esempio**
   - Click "Load Examples" per URL già pronti

## 📦 File

- `src/components/WallpaperScraper.tsx` - Componente principale
- `SIMPLE_SCRAPER.md` - Questa documentazione

**Nient'altro!** Zero backend, zero config, zero problemi. 🎉

---

**Versione**: 1.0.0  
**Data**: 17 Settembre 2026  
**Repo**: https://github.com/reda10nafil/atomizer
