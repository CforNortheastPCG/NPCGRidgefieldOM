import { useState } from 'react';
import EditorPanel from './components/EditorPanel';
import PreviewPanel from './components/PreviewPanel';
import { defaultPost } from './data/defaults';
import './App.css';

export default function App() {
  const [data, setData] = useState({ ...defaultPost });

  return (
    <div className="app">
      <EditorPanel data={data} onChange={setData} />
      <div className="app-split" />
      <PreviewPanel data={data} />
    </div>
  );
}
