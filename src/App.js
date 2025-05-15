import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'; 

import jsPDF from 'jspdf';
import Sentiment from 'sentiment';
import html2canvas from 'html2canvas';
import * as mammoth from 'mammoth';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './components/About';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;


function App() {
  const [text, setText] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [grammarSuggestions, setGrammarSuggestions] = useState([]);

  useEffect(() => {
  const saved = localStorage.getItem('draftText');
  if (saved) setText(saved);
}, []);

   // ✅ 1. Save/load from localStorage
  useEffect(() => {
    const savedText = localStorage.getItem('savedText');
    if (savedText) setText(savedText);
  }, []);

  useEffect(() => {
    localStorage.setItem('savedText', text);
  }, [text]);

  // ✅ 2. File upload handler
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const extension = file.name.split('.').pop().toLowerCase();

    if (extension === 'txt') {
      const reader = new FileReader();
      reader.onload = () => setText(reader.result);
      reader.readAsText(file);
    }

    else if (extension === 'docx') {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const result = await mammoth.extractRawText({ arrayBuffer: event.target.result });
        setText(result.value);
      };
      reader.readAsArrayBuffer(file);
    }

    else if (extension === 'pdf') {
      const reader = new FileReader();
      reader.onload = async function () {
        const typedArray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;

        let pdfText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const textItems = content.items.map((item) => item.str).join(' ');
          pdfText += textItems + '\n\n';
        }

        setText(pdfText);
      };
      reader.readAsArrayBuffer(file);
    }

    else {
      alert('Unsupported file type. Please upload .txt, .docx, or .pdf');
    }
  };

  const sentiment = new Sentiment();
  const result = sentiment.analyze(text);

  const toUpperCase = () => setText(text.toUpperCase());
  const toLowerCase = () => setText(text.toLowerCase());
  const toCapitalise = () => {
    const capitalisedText = text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    setText(capitalisedText);
  };
  const clearText = () => setText('');
  const copyText = () => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };
  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };
  const toggleTheme = () => setDarkMode(!darkMode);
  const exportToPDF = () => {
    const input = document.getElementById('text-container');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10);
      pdf.save("text-summary.pdf");
    });
  };
  const analyzeGrammar = async () => {
    const res = await fetch('https://api.languagetoolplus.com/v2/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ text, language: 'en-US' }),
    });
    const data = await res.json();
    setGrammarSuggestions(data.matches);
  };
  const correctGrammar = async () => {
    const res = await fetch('https://api.languagetoolplus.com/v2/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ text, language: 'en-US' }),
    });
    const data = await res.json();
    let corrected = text;
    data.matches.forEach(match => {
      const suggestion = match.replacements[0]?.value;
      if (suggestion) {
        const target = match.context.text.substring(match.context.offset, match.context.offset + match.context.length);
        corrected = corrected.replace(target, suggestion);
      }
    });
    setText(corrected);
    alert("Grammar corrected!");
  };
  const removeExtraSpaces = () => {
    const cleaned = text.replace(/\s+/g, ' ').trim();
    setText(cleaned);
    alert("Extra spaces removed!");
  };

  const theme = {
    backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
    color: darkMode ? '#f1f1f1' : '#212121',
    minHeight: '100vh',
    padding: '20px',
    transition: 'all 0.3s ease',
  };

  const saveDraft = () => {
  localStorage.setItem('draftText', text);
  alert('Draft saved successfully!');
};

  return (
    <div style={theme}>
      <Router>
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={
            <Home
              text={text}
              setText={setText}
              toUpperCase={toUpperCase}
              toLowerCase={toLowerCase}
              toCapitalise={toCapitalise}
              clearText={clearText}
              copyText={copyText}
              speak={speak}
              exportToPDF={exportToPDF}
              analyzeGrammar={analyzeGrammar}
              correctGrammar={correctGrammar}
              removeExtraSpaces={removeExtraSpaces}
              grammarSuggestions={grammarSuggestions}
              result={result}
              handleFileUpload={handleFileUpload} 
              saveDraft={saveDraft} 
            />
          } />
          <Route path="/about" element={<About darkMode={darkMode} />} />
          <Route path="/" element={<Home handleFileUpload={handleFileUpload} />} />
          <Route path="/" element={<Home saveDraft={saveDraft} />} />
        </Routes>
        <Footer darkMode={darkMode} />

      </Router>
    </div>
  );
}

export default App;
