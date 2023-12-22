import './Viewer.css';

import { useState } from 'react';
import FileViewer from 'react-file-viewer';

function Viewer({show, file}) {
  var [content, setContent] = useState("");

  if (show !== true || !file) {
    return null;
  } else if (file.type === 'txt') {

    fetch(file.path)
      .then((response) => { return response.text(); })
      .then((data) => { setContent(data); })

    return (
      <>
        <p>{ content }</p>
      </>
    );
  } else {
    return (
     <FileViewer key={file.id} fileType={file.type} filePath={file.path} />
    );
  }
}

export default Viewer;
