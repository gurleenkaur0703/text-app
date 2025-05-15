import { Accordion } from 'react-bootstrap';

const About = ({ darkMode }) => {
  const sectionStyle = {
    padding: '40px',
    marginTop: '30px',
    borderRadius: '8px',
    backgroundColor: darkMode ? '#2c2c2c' : '#f1f1f1',
    color: darkMode ? '#f1f1f1' : '#212529',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  };

  return (
    <section id="about" style={sectionStyle}>

 <h2 className="mb-3"><strong>📘 WriteRight</strong></h2>
      {/* Accordion for Features and Compatibility */}
      <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header><strong>🖊️ About WriteRight</strong></Accordion.Header>
          <Accordion.Body>
      <p>
        WriteRight is a modern, browser-based text utility application built using React.
         It’s designed to help users improve their writing productivity by offering intelligent tools to transform, analyze, and export text content.
      </p>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header><strong>✨ Features</strong></Accordion.Header>
          <Accordion.Body>
            <ul>
              <li>🔠 Convert text to UPPERCASE</li>
              <li>🔡 Convert text to lowercase</li>
              <li>🅰️ Capitalize each word</li>
              <li>📋 Copy text to clipboard</li>
              <li>🧹 Remove extra/unnecessary spaces</li>
              <li>🔊 Read the text aloud (Text-to-Speech)</li>
              <li>🧠 Grammar checking using the LanguageTool API</li>
              <li>📈 Sentiment analysis using NLP</li>
              <li>📄 Export content as PDF using jsPDF</li>
              <li>📊 Count words, characters, and spaces</li>
              <li>💡 Auto-load last saved draft on refresh</li>
              <li>💾 Save current text as a draft using localStorage</li>
              <li>📂 Upload .txt, .docx, and .pdf files and extract text</li>
              <li>💡 Auto-load last saved draft on refresh</li>
              <li>💬 Display grammar suggestions with replacements</li>
              <li>🌙 Light/Dark theme toggle</li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header><strong>🖥️ Compatibility</strong></Accordion.Header>
          <Accordion.Body>
            Works on all modern browsers:
            <ul>
              <li>✔️ Google Chrome</li>
              <li>✔️ Firefox</li>
              <li>✔️ Safari</li>
              <li>✔️ Microsoft Edge</li>
              <li>✔️ Opera</li>
              <li>✔️ Brave</li>
            </ul>
            Use it for blogs, essays, emails, reports, or web text!
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </section>
  );
};

export default About;
