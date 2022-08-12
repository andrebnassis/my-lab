import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const App:React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const urlsToCall = ['https://picsum.photos/200/300','https://picsum.photos/200/300']

  return (<>
  <button onClick={() => setIsOpen(true)}>OPEN IN NEW WINDOW</button>
  {isOpen && <RenderInWindow onClose={() => setIsOpen(false)}>
  <ResizeIframe userId={1}/>
  <ResizeIframe userId={2}/>
  </RenderInWindow>
  }
  <ResizeIframe userId={1}/>
  <ResizeIframe userId={2}/>
  </>)
}

const ResizeIframe:React.FC<{userId:number}> = ({userId}) =>{
  const iframeRef = useRef<any>(null);

  useEffect(() => {
    if(!iframeRef || !iframeRef.current){
      return;
    }
 
    window.addEventListener('message', (e) => {
      const { event } = e.data;
  
      if (event === 'resize') {
        console.log({event});
        const { user, height } = e.data;
        //const iframe = window.document.getElementById(`timesheet_${user}`);
        if(iframeRef.current.id === `timesheet_${user}`)
          iframeRef.current.height = height;
      }
    });

  },[])

  return (<iframe id={`timesheet_${userId}`} ref={iframeRef} src={'http://localhost:8400/'}></iframe>)
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
      curWindow.addEventListener('beforeunload', props.onClose)
      
      curWindow.addEventListener('message', (e:any) => {
        const { event } = e.data;
    
        if (event === 'resize') {
          console.log({event});
          const { user, height } = e.data;
          const iframe = curWindow.document.getElementById(`timesheet_${user}`);
          console.log(iframe);
          console.log(user);
          (iframe as any).height = height;
        }
      });


      // Return cleanup function
      return () => {
        curWindow.removeEventListener('beforeunload', props.onClose);
        curWindow.removeEventListener('message', (e:any) => {
          const { event } = e.data;
      
          if (event === 'resize') {
            console.log({event});
            const { user, height } = e.data;
            const iframe = curWindow.document.getElementById(`timesheet_${user}`);
            console.log(iframe);
            console.log(user);
            (iframe as any).height = height;
          }
        });
        curWindow.close()}
      
    }
  }, [container]);

  return container && createPortal(props.children, container);
};

export default App;
