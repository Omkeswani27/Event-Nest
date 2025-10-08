import React from "react";
import JsonData from "../data/data.json";
import "./feature.css"

export const Features = (props) => {
  return (
    <div id="features" className="text-center mt-5">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title" style={{textAlign: 'center', marginLeft: "65px"}}>
          <h2>What Event Nest Provides
          </h2>
        </div>
        <div className="row">
          {JsonData.Features
            ? JsonData.Features.map((d, i) => (
                <div key={`${d.title}-${i}`} className="col-xs-6 col-md-3 mt-5">
                  {" "}
                  <i className={d.icon}></i>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};
