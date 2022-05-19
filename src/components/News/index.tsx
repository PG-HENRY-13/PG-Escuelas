import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { URL_API } from "../../env";
import "../../styles/News.css";
import New from "./New";

interface NewI {
  id: string;
  title: string;
  text: string;
  createdAt: string;
}

export default function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL_API}news`)
      .then((response) => {
        setNews(response.data);
      })
      .catch((error) => {
        toast.error("Ocurrió un error al cargar las news");
      });
  }, []);

  return (
    <div className="container bootstrap snippets bootdeys">
      <div className="row">
        {news.map((n: NewI) => {
          console.log(n);
          return <New title={n.title} body={n.text} date={n.createdAt.split('T')[0]} />;
        })}
      </div>
    </div>
    // <div className="container ">
    //   {news.map((n: NewI) => {
    //     console.log(n);
    //     return <New title={n.title} body={n.text} />;
    //   })}
    // </div>
  );
}
