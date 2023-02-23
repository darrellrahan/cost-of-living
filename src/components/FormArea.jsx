import React from "react";
import FormCityArea from "./FormCityArea";
import FormCountryArea from "./FormCountryArea";

function FormArea() {
  return (
    <div className="form">
      <FormCountryArea />
      <FormCityArea />
    </div>
  );
}

export default FormArea;
