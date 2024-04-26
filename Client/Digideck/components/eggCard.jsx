import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";

function EggCard({ card, fetch, fetchtotal }) {
  async function handleDelete() {
    try {
      const response = await axios({
        method: "DELETE",
        url: import.meta.env.VITE_API_BASE_URL + `/eggDeck/${card.id}`,
        headers: {
          Authorization: `Bearer ${localStorage.acces_token}`,
        },
      });
      fetch();
      fetchtotal();
    } catch (error) {
      const errMsg = error.response.data.message;
      Swal.fire({
        title: `Error!`,
        text: errMsg,
        icon: `error`,
      });
    }
  }
  async function handleIncrement() {
    try {
      const response = await axios({
        method: "PUT",
        url: import.meta.env.VITE_API_BASE_URL + `/eggDeck/increment/${card.id}`,
        headers: {
          Authorization: `Bearer ${localStorage.acces_token}`,
        },
      });
      fetch();
      fetchtotal();
    } catch (error) {
      const errMsg = error.response.data.message;
      console.log(error);
      Swal.fire({
        title: `Error!`,
        text: errMsg,
        icon: `error`,
      });
    }
  }
  async function handleDecrement() {
    try {
      const response = await axios({
        method: "PUT",
        url: import.meta.env.VITE_API_BASE_URL + `/eggDeck/decrement/${card.id}`,
        headers: {
          Authorization: `Bearer ${localStorage.acces_token}`,
        },
      });
      fetch();
      fetchtotal();
    } catch (error) {
      Swal.fire({
        title: `Error!`,
        text: errMsg,
        icon: `error`,
      });
    }
  }
  console.log(card);
  return (
    <>
      <div className="col">
        <div className="card h-100">
          <img src={card.Digimon.imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{card.Digimon.cardName}</h5>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-between align-items-center">
              {card.quantity == 1 ? (
                <button onClick={handleDelete} className="btn btn-danger flex-fill" type="button">
                  -
                </button>
              ) : (
                <button onClick={handleDecrement} className="btn btn-danger flex-fill" type="button">
                  -
                </button>
              )}
              <h6 className="flex-fill">{card.quantity}</h6>
              <button onClick={handleIncrement} className="btn btn-primary flex-fill" type="button">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EggCard;
