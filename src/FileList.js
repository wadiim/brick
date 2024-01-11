import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash, faDownload
} from '@fortawesome/free-solid-svg-icons';

function FileItem({ file, setFileSelected, deleteFile, downloadFile }) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <li
      key={file.id}
      className="list-group-item text-center p-0 border-0 container-fluid"
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
      style={{ backgroundColor: "#dfdbe5" }}
    >
      <button
        className="btn btn-outline-primary mb-2 mx-0 col-7"
        onClick={() => setFileSelected(file.id)}
      >
        {file.name}
      </button>
      <button
        className="btn btn-outline-danger mb-2 me-0 ms-2 col-2"
        onClick={() => deleteFile(file.id)}
        style={{ visibility: isHovering ? "visible" : "hidden" }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <button
        className="btn btn-outline-secondary mb-2 ms-2 col-2"
        onClick={() => downloadFile(file.id)}
        style={{ visibility: isHovering ? "visible" : "hidden" }}
      >
        <FontAwesomeIcon icon={faDownload} />
      </button>
    </li>
  );
}

function FileList({ files, setFileSelected, deleteFile, downloadFile }) {
  return (
    <div style={{ backgroundColor: "#dfdbe5" }}>
      <ul
        className="list-group m-4"
      >
        {
          files.map(f => (
            <FileItem
              file={f}
              setFileSelected={setFileSelected}
              deleteFile={deleteFile}
              downloadFile={downloadFile}
            />
          ))
        }
      </ul>
    </div>
  );
}

export default FileList;
