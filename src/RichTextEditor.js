import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles
import './RichTextEditor.css'; // for custom styles

const RichTextEditor = () => {
  const [answer, setAnswer] = useState('');

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'script',
    'indent',
    'direction',
    'color', 'background',
    'font',
    'align',
    'link', 'image', 'video'
  ];

  return (
    <div className="rich-text-editor">
      <ReactQuill 
        theme="snow"
        value={initialValue}
        onChange={(e) => setAnswer(e.target.value)}
        modules={modules}
        formats={formats}
      />
      <div className="character-count">
        Characters: {answer.replace(/<[^>]*>/g, '').length}
      </div>
    </div>
  );
};

export default RichTextEditor;