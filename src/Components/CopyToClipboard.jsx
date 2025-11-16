import React, { useState } from 'react';

const CopyToClipboard = ({ text, className }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset after 2.5 seconds
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  return (
    <div
      className={className}
      style={{ cursor: 'pointer', display: 'inline-block' }}
      onClick={handleCopy}
    >
      {copied ? 'Copied!' : text}
    </div>
  );
};

export default CopyToClipboard;
