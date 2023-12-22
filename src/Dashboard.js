import Header from "./Header";
import FileList from "./FileList";
import Viewer from "./Viewer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

let nextId = 0;

function Dashboard() {
  const [files, setFiles] = useState([]);
  const [fileSelected, setFileSelected] = useState();

  function addFile(name, path) {
    let type = name.split('.').pop()

    setFiles([
      ...files,
      { id: nextId++, path: path, name: name, type: type }
    ]);
  }

  return (
    <>
      <Header />
      <div className="container m-0 p-0 min-vh-100">
        <div className="row min-vh-100">
          <div className="col-4 min-vh-100">
            <FileList files={files} setFileSelected={setFileSelected} />
          </div>
          <div className="col min-vh-100">
            <Viewer show={true} file={files.length > 0 ? files.find((e) => e.id === fileSelected) : null} />
          </div>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-primary position-fixed bottom-0 end-0 translate-middle"
        onClick={() => {
          var input = document.createElement('input');
          input.type = 'file';

          input.onchange = e => {
            for (let f of e.target.files) {
              addFile(f.name, window.URL.createObjectURL(f));
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

export default Dashboard;
