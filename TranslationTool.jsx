import React, { useState } from 'react';
import { Volume2, Copy, Check } from 'lucide-react';

export default function TranslationApp() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const languages = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    it: 'Italian',
    pt: 'Portuguese',
    ja: 'Japanese',
    zh: 'Chinese',
    ko: 'Korean',
    ru: 'Russian',
    ar: 'Arabic',
    hi: 'Hindi',
    ta: 'Tamil',
    te: 'Telugu',
    ml: 'Malayalam',
    kn: 'Kannada',
    tanglish: 'Tanglish'
  };

  // Simple Copy Function
  const copyText = (text, type) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(''), 2000);
    }
  };

  // Simple Speak Function
  const speakText = (text) => {
    if (!text.trim()) return;
    
    // Cancel any ongoing speech
    speechSynthesis.cancel();
    
    // Create utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    
    // Set language
    if (sourceLang === 'zh') utterance.lang = 'zh-CN';
    else if (sourceLang === 'pt') utterance.lang = 'pt-BR';
    else if (sourceLang === 'ta') utterance.lang = 'ta-IN';
    else if (sourceLang === 'te') utterance.lang = 'te-IN';
    else if (sourceLang === 'ml') utterance.lang = 'ml-IN';
    else if (sourceLang === 'kn') utterance.lang = 'kn-IN';
    else {
      utterance.lang = sourceLang;
    }
    
    setIsSpeaking(true);
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    
    // Speak
    speechSynthesis.speak(utterance);
  };

  const speakTranslation = (text) => {
    if (!text.trim()) return;
    
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    
    if (targetLang === 'zh') utterance.lang = 'zh-CN';
    else if (targetLang === 'pt') utterance.lang = 'pt-BR';
    else if (targetLang === 'ta') utterance.lang = 'ta-IN';
    else if (targetLang === 'te') utterance.lang = 'te-IN';
    else if (targetLang === 'ml') utterance.lang = 'ml-IN';
    else if (targetLang === 'kn') utterance.lang = 'kn-IN';
    else {
      utterance.lang = targetLang;
    }
    
    setIsSpeaking(true);
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    
    speechSynthesis.speak(utterance);
  };

  // Translate
  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 500,
          messages: [{
            role: 'user',
            content: `Translate this ${languages[sourceLang]} text to ${languages[targetLang]}. Only give the translation, nothing else:\n\n${sourceText}`
          }]
        }),
      });

      const data = await response.json();
      setTranslatedText(data.content[0].text);
    } catch (error) {
      setTranslatedText('Translation failed. Try again.');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <h1 style={{ textAlign: 'center', color: '#00d4ff', fontSize: '40px', marginBottom: '10px' }}>
          🌍 Language Translator
        </h1>
        <p style={{ textAlign: 'center', color: '#888', marginBottom: '30px' }}>
          Translate & Hear 17 Languages
        </p>

        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '20px' }}>
          {/* Left Panel - Source */}
          <div style={{ background: '#0f3460', padding: '20px', borderRadius: '10px', border: '2px solid #00d4ff' }}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ color: '#00d4ff', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                Source Language
              </label>
              <select 
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #00d4ff', background: '#1a1a2e', color: '#fff', fontSize: '14px' }}
              >
                {Object.entries(languages).map(([code, name]) => (
                  <option key={code} value={code}>{name}</option>
                ))}
              </select>
            </div>

            <textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="Enter text here..."
              style={{
                width: '100%',
                height: '150px',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #00d4ff',
                background: '#1a1a2e',
                color: '#fff',
                fontSize: '14px',
                marginBottom: '15px',
                resize: 'none'
              }}
            />

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => speakText(sourceText)}
                disabled={!sourceText.trim()}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: sourceText.trim() ? '#ff6b6b' : '#444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: sourceText.trim() ? 'pointer' : 'not-allowed',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Volume2 size={18} />
                🔊 Speak
              </button>

              <button
                onClick={() => copyText(sourceText, 'source')}
                disabled={!sourceText.trim()}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: copied === 'source' ? '#51cf66' : sourceText.trim() ? '#00d4ff' : '#444',
                  color: '#000',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: sourceText.trim() ? 'pointer' : 'not-allowed',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Copy size={18} />
                {copied === 'source' ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Right Panel - Target */}
          <div style={{ background: '#0f3460', padding: '20px', borderRadius: '10px', border: '2px solid #00d4ff' }}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ color: '#00d4ff', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                Target Language
              </label>
              <select 
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #00d4ff', background: '#1a1a2e', color: '#fff', fontSize: '14px' }}
              >
                {Object.entries(languages).map(([code, name]) => (
                  <option key={code} value={code}>{name}</option>
                ))}
              </select>
            </div>

            <div style={{
              width: '100%',
              minHeight: '150px',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #00d4ff',
              background: '#1a1a2e',
              color: '#fff',
              fontSize: '14px',
              marginBottom: '15px',
              overflow: 'auto'
            }}>
              {translatedText || <span style={{ color: '#666' }}>Translation will appear here...</span>}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => speakTranslation(translatedText)}
                disabled={!translatedText.trim()}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: translatedText.trim() ? '#ff6b6b' : '#444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: translatedText.trim() ? 'pointer' : 'not-allowed',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Volume2 size={18} />
                🔊 Speak
              </button>

              <button
                onClick={() => copyText(translatedText, 'target')}
                disabled={!translatedText.trim()}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: copied === 'target' ? '#51cf66' : translatedText.trim() ? '#00d4ff' : '#444',
                  color: '#000',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: translatedText.trim() ? 'pointer' : 'not-allowed',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Copy size={18} />
                {copied === 'target' ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>

        {/* Translate Button */}
        <button
          onClick={handleTranslate}
          disabled={loading || !sourceText.trim()}
          style={{
            width: '100%',
            padding: '15px',
            background: loading ? '#666' : '#00d4ff',
            color: '#000',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            fontSize: '16px',
            marginBottom: '20px'
          }}
        >
          {loading ? '⟳ Translating...' : '🚀 Translate'}
        </button>

        {/* Info */}
        <div style={{ background: '#0f3460', padding: '15px', borderRadius: '10px', textAlign: 'center', color: '#00d4ff', fontSize: '13px' }}>
          ✨ Type → Click Translate → Click Speak to HEAR AUDIO 🎵
        </div>
      </div>
    </div>
  );
}
