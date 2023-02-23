import React from "react";
import Select from "react-select";
import { getData } from "../api";
import { useGlobalContext } from "../context";

function FormCityArea() {
  const { countryData, cityData, setCityData, setCostData } =
    useGlobalContext();

  function handleNoOptions({ inputValue }) {
    if (!inputValue) return;
    return "No city found.";
  }

  function handleChange(city) {
    setCityData({
      ...cityData,
      selectedCity: {
        value: !city ? null : city.value,
        name: !city ? null : city.label,
      },
    });
  }

  function handleSearch() {
    setCostData("loading");
    getData({
      type: "GET_COST",
      payload: !cityData.selectedCity.value
        ? { country: countryData.selectedCountry.value }
        : {
            country: countryData.selectedCountry.value,
            city: cityData.selectedCity.value,
          },
    }).then((res) => {
      setCostData(res);
    });
  }

  if (!countryData.selectedCountry.value) return;
  if (cityData.cityOptions.length === 0) return <p>Loading...</p>;

  return (
    <>
      <div className="select-width">
        <Select
          isClearable
          options={cityData.cityOptions}
          placeholder={`Select a city in ${countryData.selectedCountry.name}...`}
          noOptionsMessage={handleNoOptions}
          onChange={handleChange}
        />
        <p className="optional">
          Optional - You can just go ahead and click on the search button.
        </p>
      </div>
      <button className="search-btn" onClick={handleSearch}>
        Search
      </button>
    </>
  );
}

export default FormCityArea;
