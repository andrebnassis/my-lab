import React from 'react';
import { EditorView, basicSetup } from "@codemirror/basic-setup";
import CodeEditor from "./CodeEditor"

const pasteOnlyOnSpecificPosition = () => EditorView.domEventHandlers({
        
  paste(event:any, view:any)
  {

    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pastedData = clipboardData.getData('Text');
   
    console.log(view.state);
    view.dispatch(
      {
        changes:{
            from: 51, 
            to: 51, 
            insert: pastedData 
          },
      })

      return true;
  }
  
})

const App = () => {

  const initialCode = 
  `read-only line 1
read-only line 2
read-only line 3
<Here you can modify>
read-only line 4` 

return (<CodeEditor onView={console.log} initialDocValue={initialCode} extensions={[basicSetup, pasteOnlyOnSpecificPosition() ]} />);
}

export default App;
