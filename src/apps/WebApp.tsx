import React from 'react';

export default function WebApp({ url }: { url: string }) {
  return (
    <div className="w-full h-full bg-white relative">
      <iframe 
        title="Web App"
        src={url} 
        className="absolute inset-0 w-full h-full border-0 pt-12"
        sandbox="allow-scripts allow-same-origin allow-forms"
      />
    </div>
  );
}
