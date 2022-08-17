import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const App:React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const userIdArr = [1,2]

  return (<>
  <button onClick={() => {
    setIsOpen(true);}}>OPEN IN NEW WINDOW</button>
  {isOpen && <RenderInWindow onClose={() => setIsOpen(false)}>
  {userIdArr.map((userId) => 
  
    <iframe 
        id={`timesheet_${userId}`} 
        src={'http://localhost:8400/'} 
        frameBorder="0">
    </iframe>)
  
  }
  </RenderInWindow>
  }
  </>)
}

const RenderInWindow = (props:any) => {
  const [container, setContainer] = useState<any>(null);
  const newWindow = useRef<any>(null);

  useEffect(() => {
    // Create container element on client-side
    setContainer(document.createElement("div"));
  }, []);

  useEffect(() => {
    // When container is ready
    if (container) {
      // Create window
      newWindow.current = window.open(
        "",
        "",
        "width=600,height=1500,left=200,top=200"
      );
      // Append container
      newWindow.current.document.body.appendChild(container);
      
      // Save reference to window for cleanup
      const curWindow = newWindow.current;
      
      const resizeIframeEventHandler = (e:any) => {
        const { event } = e.data;
    
        if (event === 'resize') {
          const { user, height } = e.data;
          const iframe = curWindow.document.getElementById(`timesheet_${user}`);
          iframe.setAttribute('height', height);
        }
      }

      curWindow.addEventListener('beforeunload', props.onClose)
      
      curWindow.addEventListener('message', resizeIframeEventHandler);

      return () => {
        curWindow.removeEventListener('beforeunload', props.onClose);
        curWindow.removeEventListener('message', resizeIframeEventHandler);
        curWindow.close()}
      
    }
  }, [container]);

  return container && createPortal(props.children, container);
};

export default App;
