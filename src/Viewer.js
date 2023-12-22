import FileViewer from 'react-file-viewer';

function Viewer({show, file}) {
  if (show === true && file) {
    return (
      <>
       <FileViewer fileType={file.type} filePath={file.path} />
      </>
    );
  } else {
    return null;
  }
}

export default Viewer;
