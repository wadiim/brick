import Header from "./Header";
import FileList from "./FileList";
import Viewer from "./Viewer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useReducer } from 'react';
import { useLocation } from "react-router-dom";

function Dashboard() {
  const [files, setFiles] = useState([]);
  const [fileSelected, setFileSelected] = useState();
  const [filter, setFilter] = useState(() => ((e) => e));
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const { state } = useLocation();
  const { email } = state;

  const userID = email;
  const bucketName = userID.substring(0, 12).replace("@", "-");

  useEffect(() => {
    let loadedFiles = []

    fetch('http://sampleapp.us-east-1.elasticbeanstalk.com/file/getUserFiles/' + userID)
      .then((response) => response.json())
      .then((data) => {
        console.log("User files:")
        for (const d of data) {
          let fileID = d.fileID;
          let fileURL = d.fileURL;
          let fileName = d.fileName.split('-').splice(1).join('');
          let fileType = d.fileName.split('.').pop();

          console.log("    fileID: " + fileID
                      + ", fileURL: " + fileURL
                      + ", fileName: " + fileName
                      + ", fileType: " + fileType
          );
          loadedFiles.push({ id: fileID, path: fileURL, name: fileName, type: fileType });
        }
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        forceUpdate();
      });

    console.log(loadedFiles);
    setFiles(loadedFiles);
  }, [userID]);

  const addFile = async (name, path, blob) => {
    const type = name.split('.').pop();
    const id = window.crypto.randomUUID();

    setFiles([
      ...files,
      { id: id, path: path, name: name, type: type }
    ]);

    const formData = new FormData();
    formData.append("file", blob);

    fetch('http://sampleapp.us-east-1.elasticbeanstalk.com/file/upload?bucketName='
          + bucketName + '&fileID=' + id + '&fileVersion=1.0&userID=' + userID, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err);
      });
  }

  const deleteFile = async (id) => {
    setFiles(files.filter((e) => e.id !== id));

    fetch('http://sampleapp.us-east-1.elasticbeanstalk.com/file/deleteFile?id='
          + id + '&bucketName=' + bucketName, {
        method: "DELETE",
    });

  }

  return (
    <>
      <Header setFilter={setFilter} />
      <div className="container-fluid m-0 p-0 vh-100 vw-100">
        <div className="row vh-100">
          <div className="col-4 vh-100">
            <FileList files={files.filter(filter)} setFileSelected={setFileSelected} deleteFile={deleteFile} />
          </div>
          <div className="col vh-100 pt-3">
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
              addFile(f.name, window.URL.createObjectURL(f), f);
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
