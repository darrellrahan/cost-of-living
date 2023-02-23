import React from "react";
import { useGlobalContext } from "../context";
import {
  AiOutlineAlert,
  AiOutlineShoppingCart,
  AiOutlineCar,
} from "react-icons/ai";
import { RiRestaurantLine, RiBillLine } from "react-icons/ri";
import {
  MdOutlineSportsSoccer,
  MdOutlineChildFriendly,
  MdOutlineApartment,
} from "react-icons/md";
import { CiMoneyCheck1 } from "react-icons/ci";
import { IoBedOutline } from "react-icons/io5";

function CostResultArea() {
  const { costData } = useGlobalContext();

  function renderPrices(icon, title, data) {
    if (!data) return;

    return (
      <div className="cost-data">
        <h3 className="cost-type">
          {icon} {title}
        </h3>
        {data.map((current, index) => (
          <div
            key={index}
            style={{
              width: "900px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "1rem 0",
              paddingBottom: "0.5rem",
              borderBottom: "0.25px solid #393e46",
            }}
            className={index % 2 === 0 ? "default-bg" : "white-bg"}
          >
            <span className="cost-label">{current.Cost}</span>{" "}
            <span>{current.Value} USD</span>
          </div>
        ))}
      </div>
    );
  }

  if (!costData) return;
  if (costData === "loading")
    return (
      <h1
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        Loading...
      </h1>
    );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        marginTop: "2.5rem",
      }}
    >
      <h1>
        Cost of Living in{" "}
        {!costData["City Name"]
          ? costData["Country Name"]
          : `${costData["City Name"]}, ${costData["Country Name"]}`}
      </h1>
      <div className="cost-data summary">
        <h3 className="cost-type">{<AiOutlineAlert />} Summary</h3>
        <span className="cost-label" style={{ width: "1000px" }}>
          {costData["Note"]}
        </span>
      </div>
      {renderPrices(
        <RiRestaurantLine />,
        "Restaurants",
        costData["Restaurants prices"]
      )}
      {renderPrices(
        <AiOutlineShoppingCart />,
        "Markets",
        costData["Markets prices"]
      )}
      {renderPrices(
        <AiOutlineCar />,
        "Transportation",
        costData["Transportation prices"]
      )}
      {renderPrices(
        <RiBillLine />,
        "Utilities (Monthly)",
        costData["Utilities Per Month prices"]
      )}
      {renderPrices(
        <MdOutlineSportsSoccer />,
        "Sports And Leisure",
        costData["Sports And Leisure prices"]
      )}
      {renderPrices(
        <CiMoneyCheck1 />,
        "Salaries And Financing",
        costData["Salaries And Financing prices"]
      )}
      {renderPrices(
        <MdOutlineChildFriendly />,
        "Childcare",
        costData["Childcare prices"]
      )}
      {renderPrices(
        <IoBedOutline />,
        "Rent (Monthly)",
        costData["Rent Per Month prices"]
      )}
      {renderPrices(
        <MdOutlineApartment />,
        "Apartment",
        costData["Buy Apartment prices"]
      )}
    </div>
  );
}

export default CostResultArea;
