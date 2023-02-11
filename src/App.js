import { useState } from "react";

function CheckboxRow({ label }) {
  const [permissions, setPermissions] = useState({
    read: false,
    write: false,
    delete: false,
  });

  console.log(permissions);

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
  return (
    <div className="app-container">
      <div className="grid">
        <span></span>
        <label>read</label>
        <label>write</label>
        <label>delete</label>
        <CheckboxRow label="t1" />
        <CheckboxRow label="t2" />
        <CheckboxRow label="t3" />
        <CheckboxRow label="t4" />
      </div>
      {/* <button>Submit</button> */}
    </div>
  );
}

export default App;
