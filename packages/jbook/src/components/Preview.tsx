import { useEffect, useRef } from 'react';

import './preview.css';

interface PreviewProps {
  code: string;
  err: string;
}

const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
        const handleError = function(err) {
          const root = document.getElementById('root');
                root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
                console.error(err);
          };

          window.addEventListener('error', (e) => {
          event.preventDefault();
          handleError(e.error);
          });

          window.addEventListener(
            'message',
            (e) => {
              try {
                eval(e.data);
              } catch (err) {
                handleError(err);
              }
            },
            false
          );
        </script>
      </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = function ({ code, err }) {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div className='preview-wrapper'>
      <iframe
        title='preview'
        ref={iframe}
        srcDoc={html}
        sandbox='allow-scripts'
      />
      {err && <div className='preview-error'>{err}</div>}
    </div>
  );
};

export default Preview;
