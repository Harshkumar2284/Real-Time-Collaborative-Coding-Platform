import React, { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { throttle } from 'lodash';
import axios from 'axios';
import Button from '../ui/Button';

export default function IDE({ socket, roomId }) {
  const editorRef = useRef(null);
  const isInternalChange = useRef(false);
  
  // --- STATE ---
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  // --- DATABASE SAVING (THROTTLED) ---
  const throttledSaveToDb = useRef(
    throttle(async (codeContent) => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        console.log("Saving progress to database...");
        await axios.post(
          `http://localhost:5000/api/projects/${roomId}/save`, 
          { code: codeContent },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error("Database save failed:", error);
      }
    }, 5000, { leading: false, trailing: true })
  ).current;

  // --- CODE EXECUTION LOGIC ---
  // --- SIMPLIFIED EXECUTION LOGIC ---
  // --- CODE EXECUTION LOGIC ---
const handleExecute = () => {
  if (!editorRef.current) return;
  
  const codeContent = editorRef.current.getValue();

  // If the language isn't javascript, we let the user know we can't run it locally
  if (language !== "javascript") {
    setOutput(`Local execution is only supported for JavaScript. Your current language is ${language}.`);
    return;
  }

  setIsRunning(true);
  setOutput("Running locally..."); 

  // Create a buffer to capture console.log outputs
  let logs = [];
  const nativeLog = console.log;
  
  // Override console.log to push to our buffer
  console.log = (...args) => {
    logs.push(args.map(arg => 
      typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
    ).join(' '));
  };

  try {
    // We use a self-invoking function to avoid polluting global scope 
    // and to catch synchronous errors
    const result = eval(codeContent);

    // If the code returns a value (like 2+2), we add it to the logs
    if (result !== undefined) {
      logs.push(`Returned: ${result}`);
    }

    setOutput(logs.length > 0 ? logs.join('\n') : "Program finished with no output.");
  } catch (error) {
    console.error("Execution failed:", error);
    setOutput(`Execution Error: ${error.message}`);
  } finally {
    // CRITICAL: Restore the native console.log
    console.log = nativeLog;
    setIsRunning(false);
  }
};

  // --- SOCKET & CHANGE HANDLING ---
  const handleChange = (newValue) => {
    if (isInternalChange.current) return;

    // 1. Sync with other users via Socket
    socket.emit("code-change", {
      projectId: roomId,
      code: newValue
    });

    // 2. Queue Database Save
    throttledSaveToDb(newValue);
  };

  useEffect(() => {
    if (!socket) return;

    const handleReceiveCode = (incomingCode) => {
      if (editorRef.current && incomingCode !== editorRef.current.getValue()) {
        isInternalChange.current = true;
        
        const cursorPosition = editorRef.current.getPosition();
        editorRef.current.setValue(incomingCode);
        editorRef.current.setPosition(cursorPosition);
        
        isInternalChange.current = false;
      }
    };

    socket.on("receive-code", handleReceiveCode);

    return () => {
      socket.off("receive-code");
      throttledSaveToDb.cancel();
    };
  }, [socket, throttledSaveToDb]);

  return (
    <div className='h-screen flex flex-col bg-[#1e1e1e]'>
      {/* TOOLBAR */}
      <div className='flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-gray-700'>
        <select 
          className='bg-[#3c3c3c] text-white text-sm rounded px-2 py-1 outline-none'
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
          <option value="csharp">C#</option>
        </select>
        <span className='text-gray-400 text-xs'>Room ID: {roomId}</span>
      </div>

      {/* EDITOR AREA */}
      <div className='flex-grow'>
        <Editor
          height="100%"
          theme='vs-dark'
          language={language}
          onMount={handleEditorDidMount}
          onChange={handleChange}
          defaultValue="// Start Coding..."
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
          }}
        />
      </div>

      {/* TERMINAL / OUTPUT AREA */}
      <div className='h-64 bg-black text-white p-0 border-t border-gray-700 flex flex-col'>
        <div className='flex justify-between items-center bg-[#252526] px-4 py-1'>
          <p className='text-gray-400 text-xs uppercase tracking-widest font-bold'>Terminal</p>
          <Button 
            onClick={handleExecute} 
            disabled={isRunning}
            className={`text-xs px-4 py-1 my-1 ${isRunning ? 'bg-gray-600' : 'bg-green-600 hover:bg-green-500'}`}
          >
            {isRunning ? "Running..." : "Execute"}
          </Button>
        </div>
        
        <div className='grow p-4 font-mono text-sm overflow-y-auto'>
          <pre className='whitespace-pre-wrap'>
            {output ? output : <span className='text-gray-600'>Click "Execute" to see results...</span>}
          </pre>
        </div>
      </div>
    </div>
  );
}