# 🌍 Language Translation Tool

A powerful, user-friendly translation application built with React that supports 17 languages including English, Spanish, French, German, Italian, Portuguese, Japanese, Chinese, Korean, Russian, Arabic, Hindi, Tamil, Telugu, Malayalam, Kannada, and Tanglish.

**Live Demo:** [Add your deployed link here]

---

## ✨ Features

- 🌐 **17 Languages Supported** - Including South Indian languages (Tamil, Telugu, Malayalam, Kannada) and Tanglish
- 🔊 **Text-to-Speech** - Hear pronunciations in all supported languages using browser's native Web Speech API
- 📋 **One-Click Copy** - Easily copy source or translated text to clipboard
- ⚡ **Real-time Translation** - Powered by Claude API for accurate, context-aware translations
- 🔄 **Swap Languages** - Quickly reverse source and target languages
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- ♿ **Accessible UI** - Clean, intuitive interface with keyboard shortcuts
- 🎨 **Modern Design** - Beautiful gradient UI with smooth animations

---

## 📋 Supported Languages

| Language | Code | Region |
|----------|------|--------|
| English | en | Global |
| Spanish | es | Spain/Latin America |
| French | fr | France |
| German | de | Germany |
| Italian | it | Italy |
| Portuguese | pt | Brazil/Portugal |
| Japanese | ja | Japan |
| Chinese | zh | China |
| Korean | ko | Korea |
| Russian | ru | Russia |
| Arabic | ar | Middle East |
| Hindi | hi | India |
| Tamil | ta | South India |
| Telugu | te | South India |
| Malayalam | ml | South India |
| Kannada | kn | South India |
| Tanglish | tanglish | Tamil (Roman Script) |

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- An Anthropic API key ([Get one here](https://console.anthropic.com))

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/language-translator.git
   cd language-translator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory:
   ```
   REACT_APP_ANTHROPIC_API_KEY=your_api_key_here
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000`

---

## 💻 Usage

### Basic Translation

1. **Select Source Language** - Choose the language of your input text
2. **Enter Text** - Type or paste text in the source panel
3. **Click Translate** - Click the "🚀 Translate" button
4. **View Translation** - Translation appears in the target panel
5. **Listen** - Click "🔊 Speak" to hear the pronunciation
6. **Copy** - Click "Copy" to copy text to clipboard

### Keyboard Shortcuts

- **Ctrl + Enter** - Quickly translate text
- **Tab** - Navigate between fields

---

## 🔧 How It Works

### Architecture

```
┌─────────────────────┐
│   React Component   │
│  (TranslationApp)   │
└──────────┬──────────┘
           │
     ┌─────▼─────┐
     │  User I/O  │
     └─────┬─────┘
           │
      ┌────▼────┐
      │ Translate│  ──► Anthropic Claude API
      │ Function │
      └────┬────┘
           │
    ┌──────▼──────┐
    │  Web Speech  │  ──► Browser Audio
    │     API      │
    └──────┬──────┘
           │
      ┌────▼────┐
      │ Clipboard│  ──► Copy to Clipboard
      │   API    │
      └──────────┘
```

### Technology Stack

- **Frontend Framework:** React 18
- **Translation API:** Anthropic Claude API
- **Text-to-Speech:** Web Speech API
- **Styling:** Inline CSS (No dependencies)
- **Icons:** Lucide React

### API Integration

The tool uses the Anthropic Claude API for translations:

```javascript
fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 500,
    messages: [{
      role: 'user',
      content: `Translate from ${sourceLang} to ${targetLang}: ${text}`
    }]
  })
})
```

---

## 📦 Project Structure

```
language-translator/
├── src/
│   ├── components/
│   │   └── TranslationTool.jsx      # Main translation component
│   ├── App.js                        # Main app component
│   ├── index.js                      # React entry point
│   └── styles/                       # Optional: CSS files
├── public/
│   ├── index.html
│   └── favicon.ico
├── .env.local                        # Environment variables (git ignored)
├── .gitignore                        # Git ignore rules
├── package.json                      # Dependencies & scripts
├── README.md                         # This file
├── LICENSE                           # MIT License
├── CONTRIBUTING.md                   # Contribution guidelines
└── INSTALLATION.md                   # Detailed installation guide
```

---

## 🛠️ Development

### Running Tests

```bash
npm test
```

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

### Code Quality

```bash
npm run lint
```

---

## 🌟 Features in Detail

### Translation Engine

- **Context-Aware:** Understands cultural nuances and context
- **Accurate:** Powered by Claude's advanced language model
- **Fast:** Real-time translation with minimal latency
- **Tanglish Support:** Unique feature for Tamil written in Roman script

### Text-to-Speech

- **Browser Native:** Uses Web Speech API (no external dependencies)
- **Multiple Languages:** Supports all 17 languages
- **Natural Voice:** Uses system voices for natural pronunciation
- **Adjustable Speed:** Control speech rate and pitch

### Accessibility

- **Keyboard Navigation:** Full keyboard support
- **Screen Reader Friendly:** Semantic HTML structure
- **Color Contrast:** WCAG AA compliant colors
- **Mobile Friendly:** Responsive design for all screen sizes

---

## 🐛 Troubleshooting

### Text-to-Speech Not Working

**Solution:**
1. Check if browser supports Web Speech API (Chrome, Edge, Safari)
2. Ensure system volume is not muted
3. Check browser permissions for audio
4. Try a different browser

### Translation Fails

**Solution:**
1. Verify API key is correct
2. Check internet connection
3. Ensure text is not too long (max 1000 characters)
4. Check API rate limits

### Copy Button Not Working

**Solution:**
1. Use HTTPS (required for Clipboard API)
2. Check browser permissions
3. Try a different browser
4. Use Ctrl+C as alternative

---

## 📈 Future Enhancements

- [ ] Add more languages (German, Italian variants)
- [ ] Implement offline translation
- [ ] Add translation history
- [ ] Implement user authentication
- [ ] Add favorites/bookmarks feature
- [ ] Support for document translation
- [ ] Integration with Google Translate API option
- [ ] Dark/Light theme toggle
- [ ] Translation quality feedback

---

## 🔐 Security

### API Key Security

- **Never** commit API keys to repository
- Use `.env.local` file (added to `.gitignore`)
- Rotate API keys regularly
- Use environment variables in production

### HTTPS Only

- Always use HTTPS in production
- Clipboard API requires secure context

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## 👨‍💻 Author

**Codealpha Intern Project**
- Internship: Artificial Intelligence at Codealpha
- Task 1: Language Translation Tool

---

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact: [your-email@example.com]
- Documentation: See [INSTALLATION.md](INSTALLATION.md)

---

## 🙏 Acknowledgments

- Anthropic for Claude API
- React community for excellent framework
- All contributors and testers

---

## 📊 Stats

- **Languages:** 17
- **Features:** 5+
- **Browser Support:** Chrome, Edge, Safari, Firefox
- **Mobile Ready:** ✅
- **Accessibility:** ✅
- **API Required:** Anthropic Claude API

---

**Made with ❤️ for language learners and translators worldwide**

[⬆ Back to top](#-language-translation-tool)
