import React from "react";
import { Link, useParams } from "react-router-dom";
import "../../../styles/News.css"

interface props  {
  title: string;
  body: string;

}

export default function New(props: props) {


  return (
    <div className="card" style={{width: '30rem'}}>
    <div className="card-body">
      <h5 className="card-title">{props.title}</h5>
      <p className="card-text">{props.body}</p>

    </div>
  </div>
  );
}
