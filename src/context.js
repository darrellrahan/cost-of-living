import React, { useContext, useEffect, useState } from "react";
import { getData } from "./api";
import { chartBarData } from "./data";

const GlobalContext = React.createContext();

export function useGlobalContext() {
  return useContext(GlobalContext);
}

export function AppProvider({ children }) {
  const [countryData, setCountryData] = useState({
    countryOptions: [],
    selectedCountry: { value: null, name: null },
  });
  const [cityData, setCityData] = useState({
    cityOptions: [],
    selectedCity: { value: null, name: null },
  });
  const [costData, setCostData] = useState(null);
  const [chartData, setChartData] = useState({
    labels: chartBarData.map((data) => data.country),
    datasets: [
      {
        label: "Cost of Living Index: ",
        data: chartBarData.map((data) => data.index),
        backgroundColor: [
          "#00ADB5",
          "#00ADB5",
          "#00ADB5",
          "#00ADB5",
          "#00ADB5",
        ],
      },
    ],
  });

  // get countries
  useEffect(() => {
    getData({ type: "GET_PLACES" }).then((res) => {
      const newCountryOptions = res.map((countryData) => ({
        value: countryData.country,
        label: countryData.country_name
          .replace(/-/g, " ")
          .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()),
      }));

      setCountryData({ ...countryData, countryOptions: newCountryOptions });
    });
  }, []); // eslint-disable-line

  // get cities
  useEffect(() => {
    if (countryData.selectedCountry.value) {
      getData({
        type: "GET_PLACES",
        payload: countryData.selectedCountry.value,
      }).then((res) => {
        const newCityOptions = res.map((cityData) => ({
          value: cityData.city,
          label: cityData.name.split(",")[0],
        }));

        setCityData({ ...cityData, cityOptions: newCityOptions });
      });
    }
  }, [countryData.selectedCountry.value]); // eslint-disable-line

  return (
    <GlobalContext.Provider
      value={{
        countryData,
        cityData,
        costData,
        chartData,
        setCountryData,
        setCityData,
        setCostData,
        setChartData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
