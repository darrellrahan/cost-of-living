import React from "react";
import { useGlobalContext } from "../context";
import Select from "react-select";

function FormCountryArea() {
  const { countryData, setCountryData, setCityData } = useGlobalContext();

  function handleNoOptions({ inputValue }) {
    if (!inputValue) return;
    return "No country found.";
  }

  function handleChange(country) {
    setCountryData({
      ...countryData,
      selectedCountry: { value: country.value, name: country.label },
    });
    setCityData({
      cityOptions: [],
      selectedCity: { value: null, name: null },
    });
  }

  return (
    <div className="select-width">
      <Select
        options={countryData.countryOptions}
        placeholder="Select a country..."
        noOptionsMessage={handleNoOptions}
        onChange={handleChange}
      />
    </div>
  );
}

export default FormCountryArea;
