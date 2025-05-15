import React from 'react';

const Home = ({
  text, setText, toUpperCase, toLowerCase, toCapitalise,
  clearText, copyText, speak, exportToPDF, analyzeGrammar,
  correctGrammar, removeExtraSpaces, grammarSuggestions,
  result,handleFileUpload,saveDraft
}) => {
  return (
    <div className="container">
      <h2 className="text-center mt-2 mb-2">📝 TypeToolBox</h2>

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
        <button className="btn btn-primary " onClick={toUpperCase}>UPPERCASE 🔠</button>
        <button className="btn btn-secondary " onClick={toLowerCase}>lowercase 🔡</button>
        <button className="btn btn-success " onClick={toCapitalise}>Capitalize 🅰️</button>
        <button className="btn btn-info " onClick={clearText}>Clear ❌</button>
        <button className="btn btn-warning " onClick={copyText}>Copy 📋</button>
        <button className="btn btn-primary " onClick={speak}>Speak 🔊</button>
        <button className="btn btn-secondary " onClick={exportToPDF}>Export to PDF 📄</button>
        <button className="btn btn-danger " onClick={analyzeGrammar}>Check Grammar 🧐</button>
        <button className="btn btn-info " onClick={correctGrammar}>Correct Grammar ✏️</button>
        <button className="btn btn-warning " onClick={removeExtraSpaces}>Clear Extra Spaces 🧹</button>
        <button className="btn btn-danger " onClick={saveDraft}>Save as Draft 💾</button>

      </div>

      <h4>Text Summary</h4>
      <h5>Word Count: {text.trim().split(/\s+/).filter(Boolean).length}</h5>
      <h5>Character Count: {text.length}</h5>
     
      <h4 className='mt-4'>Sentiment Analysis</h4>
      <h5>Sentiment Score: {result.score}</h5>
      <h5>Positive Words: {result.positive.join(", ")}</h5>
      <h5>Negative Words: {result.negative.join(", ")}</h5>


      {grammarSuggestions.length > 0 && (
        <>
          <h4 className="mt-4">Grammar Suggestions</h4>
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
