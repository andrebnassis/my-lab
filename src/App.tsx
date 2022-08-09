import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const App:React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const urlsToCall = ['https://picsum.photos/200/300','https://picsum.photos/200/300']

  return (<>
  <button onClick={() => setIsOpen(true)}>OPEN IN NEW WINDOW</button>
  {isOpen && <RenderInWindow onClose={() => setIsOpen(false)}>
  <MyComponentWithIframes data={urlsToCall}/>
  </RenderInWindow>}
  </>)
}

const MyComponentWithIframes:React.FC<{data:Array<string>}> = ({data}) => {
  return (
    <div style={{display:'flex', flexDirection:'column'}}>
     {data.map((url) => {
      return <iframe src={url}></iframe>
     })}
    </div>
   );
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
        "width=600,height=400,left=200,top=200"
      );
      // Append container
      newWindow.current.document.body.appendChild(container);
      
      // Save reference to window for cleanup
      const curWindow = newWindow.current;
      curWindow.addEventListener('beforeunload', props.onClose)

      // Return cleanup function
      return () => {
        curWindow.removeEventListener('beforeunload', props.onClose)
        curWindow.close()}
      
    }
  }, [container]);

  return container && createPortal(props.children, container);
};

export default App;
