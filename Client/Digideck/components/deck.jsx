import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../components/preloader";
import { HashLink } from "react-router-hash-link";
import MainCard from "./mainCard";
import EggCard from "./eggCard";

function Deck(params) {
  const [mainCard, setMainCard] = useState([]);
  const [eggCard, setEggCard] = useState([]);
  const [mainTotal, setMainTotal] = useState("");
  const [eggTotal, setEggTotal] = useState("");

  async function fetchMainCard() {
    try {
      const response = await axios({
        method: "GET",
        url: import.meta.env.VITE_API_BASE_URL + `/mainDeck`,
        headers: {
          Authorization: `Bearer ${localStorage.acces_token}`,
        },
      });
      setMainCard(response.data);

      //   setLoading(false);
    } catch (error) {
      const errMsg = error.response.data.message;
      Swal.fire({
        title: `Error!`,
        text: errMsg,
        icon: `error`,
      });
      //   setLoading(false);
    }
  }

  async function fetchEggCard() {
    try {
      const response = await axios({
        method: "GET",
        url: import.meta.env.VITE_API_BASE_URL + `/eggDeck`,
        headers: {
          Authorization: `Bearer ${localStorage.acces_token}`,
        },
      });
      setEggCard(response.data);
      //   setLoading(false);
    } catch (error) {
      const errMsg = error.response.data.message;
      Swal.fire({
        title: `Error!`,
        text: errMsg,
        icon: `error`,
      });
      //   setLoading(false);
    }
  }

  async function totalMainCard() {
    try {
      const response = await axios({
        method: "GET",
        url: import.meta.env.VITE_API_BASE_URL + `/mainDeck/total`,
        headers: {
          Authorization: `Bearer ${localStorage.acces_token}`,
        },
      });
      setMainTotal(response.data);
      //   setLoading(false);
    } catch (error) {
      const errMsg = error.response.data.message;
      Swal.fire({
        title: `Error!`,
        text: errMsg,
        icon: `error`,
      });
      //   setLoading(false);
    }
  }

  async function totalEggCard() {
    try {
      const response = await axios({
        method: "GET",
        url: import.meta.env.VITE_API_BASE_URL + `/eggDeck/total`,
        headers: {
          Authorization: `Bearer ${localStorage.acces_token}`,
        },
      });
      setEggTotal(response.data);
      //   setLoading(false);
    } catch (error) {
      const errMsg = error.response.data.message;
      Swal.fire({
        title: `Error!`,
        text: errMsg,
        icon: `error`,
      });
      console.log(error);
      //   setLoading(false);
    }
  }

  useEffect(() => {
    fetchMainCard();
    fetchEggCard();
    totalEggCard();
    totalMainCard();
  }, []);

  return (
    <>
      ;
      <section id="menu">
        <div className="container" style={{ paddingBottom: "20px" }}>
          <div className="card bg-body-secondary">
            <div className="card-header text-center">
              <h4 className="pb-2 ">Main Deck</h4>
              <p>Total Main Card: {mainTotal.totalDeck}/50</p>
              <div className="card-body">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                  {mainCard.map((el, index) => {
                    return <MainCard key={el.id} index={index + 1} card={el} fetch={fetchMainCard} fetchtotal={totalMainCard} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="menu">
        <div className="container" style={{ paddingBottom: "20px" }}>
          <div className="card bg-body-secondary">
            <div className="card-header text-center">
              <h4 className="pb-2 ">Egg Deck</h4>
              <p>Total Egg Card: {eggTotal.totalDeck}/5</p>
              <div className="card-body">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                  {eggCard.map((el, index) => {
                    return <EggCard key={el.id} index={index + 1} card={el} fetch={fetchEggCard} fetchtotal={totalEggCard} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Deck;
