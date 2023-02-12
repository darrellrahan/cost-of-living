import { useEffect, useRef, useState } from "react";

function CheckboxRow({ label, setPermissionResults }) {
  const [permissions, setPermissions] = useState({
    read: false,
    write: false,
    delete: false,
  });

  useEffect(() => {
    setPermissionResults((prev) => ({ ...prev, [label]: permissions }));
  }, [permissions, label, setPermissionResults]);

  function handleCheckboxChange(type, isChecked) {
    if (type === "delete") {
      setPermissions((prev) => {
        return isChecked
          ? { ...prev, read: true, write: true, delete: true }
          : { ...prev, delete: false };
      });
    } else {
      setPermissions((prev) => {
        return isChecked
          ? { ...prev, [type]: true }
          : { ...prev, [type]: false, delete: false };
      });
    }
  }

  return (
    <>
      <label>{label}</label>
      <input
        type="checkbox"
        checked={permissions.read}
        onChange={(e) => handleCheckboxChange("read", e.target.checked)}
      />
      <input
        type="checkbox"
        checked={permissions.write}
        onChange={(e) => handleCheckboxChange("write", e.target.checked)}
      />
      <input
        type="checkbox"
        checked={permissions.delete}
        onChange={(e) => handleCheckboxChange("delete", e.target.checked)}
      />
    </>
  );
}

function App() {
  const [permissionResults, setPermissionResults] = useState({});
  const resultsRef = useRef(null);

  function showResults() {
    console.log(permissionResults);
    resultsRef.current.innerHTML = `<pre>${JSON.stringify(
      permissionResults,
      null,
      4
    )}</pre>`;
  }

  return (
    <div className="app-container">
      <div className="grid">
        <span></span>
        <label>read</label>
        <label>write</label>
        <label>delete</label>
        <CheckboxRow label="t1" setPermissionResults={setPermissionResults} />
        <CheckboxRow label="t2" setPermissionResults={setPermissionResults} />
        <CheckboxRow label="t3" setPermissionResults={setPermissionResults} />
        <CheckboxRow label="t4" setPermissionResults={setPermissionResults} />
      </div>
      <button onClick={showResults}>Submit</button>
      <div ref={resultsRef}></div>
    </div>
  );
}

export default App;
