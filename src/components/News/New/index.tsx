import { prototype } from "events";
import React from "react";
import { Link, useParams } from "react-router-dom";
import "../../../styles/News.css";

interface props {
  title: string;
  body: string;
  date: string;
}

export default function New(props: props) {
  return (
    <div className="col-md-4 col-sm-6 content-card mx-auto">
      
        <h4 className="form-label fs-2 mt-4 mx-auto">Listado de Novedades</h4>
   
      <div className="card-big-shadow ">
        <div
          className="card card-just-text"
          data-background="color"
          data-color="brown"
          data-radius="none"
        >
          <div className="content">
            <h3 className="category fs-5">{props.date}</h3>
            <h2 className="title " style={{ color: "#202C39" }}>
              {props.title}
            </h2>
            <p className="description">{props.body} </p>
          </div>
        </div>
      </div>
    </div>
  );
}
