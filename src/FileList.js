function FileList({ files, setFileSelected }) {
  return (
    <ul className="list-group m-4">
      {
        files.map(files => (
          <li
            key={files.id}
            className="list-group-item text-center p-0 border-0"
          >
            <button
              className="btn btn-outline-primary w-100 mb-2 mx-0"
              onClick={() => setFileSelected(files.id)}
            >
              {files.name}
            </button>
          </li>
        ))
      }
    </ul>
  );
}

export default FileList;
