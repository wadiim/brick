import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus
} from '@fortawesome/free-solid-svg-icons';

let nextId = 0;

function FileList() {
  const [files, setFiles] = useState([]);

  function addFile(path) {
    let filename = path.split('/').pop()
    let filetype = filename.split('.').pop()

    setFiles([
      ...files,
      { id: nextId++, path: path, filename: filename, filetype: filetype }
    ]);
  }

  return (
    <>
      <ul className="list-group m-4">
        {
          files.map(files => (
            <li
              key={files.id}
              className="list-group-item text-center p-0 border-0"
            >
              <button
                className="btn btn-outline-primary w-100 mb-2 mx-0"
              >
                {files.filename}
              </button>
            </li>
          ))
        }
      </ul>
      <button
        type="button"
        className="btn btn-primary position-absolute bottom-0 end-0 translate-middle"
        onClick={() => {
          var input = document.createElement('input');
          input.type = 'file';

          input.onchange = e => {
            for (let f of e.target.files) {
              addFile(f.name);
            }
          }

          input.click();
        }}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </>
  );
}

export default FileList;
