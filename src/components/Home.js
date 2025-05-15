import React from 'react';

const Home = ({
  text, setText, toUpperCase, toLowerCase, toCapitalise,
  clearText, copyText, speak, exportToPDF, analyzeGrammar,
  correctGrammar, removeExtraSpaces, grammarSuggestions,
  result,handleFileUpload,saveDraft
}) => {
  return (
    <div className="container">
      <h1 className="text-center mt-4 mb-4">📝 TypeToolbox</h1>

 <input type="file" onChange={handleFileUpload} />
      <textarea
        className="form-control mb-3"
        id="text-container"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        placeholder="Enter or paste your text here"
      />
      <div className="d-flex flex-wrap gap-2 mb-4">
        <button className="btn btn-primary fs-5" onClick={toUpperCase}>UPPERCASE 🔠</button>
        <button className="btn btn-secondary fs-5" onClick={toLowerCase}>lowercase 🔡</button>
        <button className="btn btn-success fs-5" onClick={toCapitalise}>Capitalize 🅰️</button>
        <button className="btn btn-info fs-5" onClick={clearText}>Clear ❌</button>
        <button className="btn btn-warning fs-5" onClick={copyText}>Copy 📋</button>
        <button className="btn btn-primary fs-5" onClick={speak}>Speak 🔊</button>
        <button className="btn btn-secondary fs-5" onClick={exportToPDF}>Export to PDF 📄</button>
        <button className="btn btn-danger fs-5" onClick={analyzeGrammar}>Check Grammar 🧐</button>
        <button className="btn btn-info fs-5" onClick={correctGrammar}>Correct Grammar ✏️</button>
        <button className="btn btn-warning fs-5" onClick={removeExtraSpaces}>Clear Extra Spaces 🧹</button>
        <button className="btn btn-danger fs-5" onClick={saveDraft}>Save as Draft 💾</button>

      </div>

      <h3>Text Summary</h3>
      <p><strong>Word Count:</strong> {text.trim().split(/\s+/).filter(Boolean).length}</p>
      <p><strong>Character Count:</strong> {text.length}</p>
     
      <h3 className="mt-4">Sentiment Analysis</h3>
      <p><strong>Sentiment Score:</strong> {result.score}</p>
      <p><strong>Positive Words:</strong> {result.positive.join(", ")}</p>
      <p><strong>Negative Words:</strong> {result.negative.join(", ")}</p>


      {grammarSuggestions.length > 0 && (
        <>
          <h3 className="mt-4">Grammar Suggestions</h3>
          <ul>
            {grammarSuggestions.map((suggestion, i) => (
              <li key={i}>
                <strong>{suggestion.message}</strong> <br />
                <em>Suggested: {suggestion.replacements.map(r => r.value).join(', ')}</em>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Home;
