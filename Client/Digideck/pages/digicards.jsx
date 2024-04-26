import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../components/preloader";
import { HashLink } from "react-router-hash-link";

function Menu() {
  const [card, setcard] = useState({});
  const [search, setSearch] = useState("");
  const [color, setColor] = useState(null);
  const [sort, setSort] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);

  async function fetchCard() {
    try {
      const response = await axios({
        method: "GET",
        url: import.meta.env.VITE_API_BASE_URL + `/pub/digimon`,
        params: {
          search: search,
          color: color,
          type: null,
          sort: sort,
          "page[number]": pageNumber,
          "page[size]": 20,
        },
      });
      setcard(response.data);
      setLoading(false);
    } catch (error) {
      const errMsg = error.response.data.message;
      Swal.fire({
        title: `Error!`,
        text: errMsg,
        icon: `error`,
      });
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCard();
  }, [search, color, sort, pageNumber]);

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handlePagination = (newPageNumber) => {
    setPageNumber(newPageNumber);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    setPageNumber(1);
    fetchCard();
  };

  const handleCategoryClick = (color) => {
    setColor(color);
    setPageNumber("1");
  };

  const getPageNumbers = () => {
    const totalPage = card.totalPage;
    return Array.from({ length: totalPage }, (_, index) => index + 1);
  };

  return (
    <>
      <section id="menu">
        <div className="container-fluid" style={{ paddingBottom: "20px" }}>
          <div className="card bg-body-secondary">
            <div className="card-header text-center">
              <h4 className="pb-4 ">Our Card</h4>
            </div>
            <div className="row p-3">
              {loading ? (
                <Loader />
              ) : (
                <>
                  <div className="col-12 d-flex justify-content-between ">
                    <div className="input-group mb-3 " style={{ width: "70%" }}>
                      <input type="text" className="form-control" placeholder="Search..." value={search} onChange={handleSearchChange} />
                      <button className="btn btn-outline-secondary" type="button" onClick={handleSubmitSearch}>
                        Search
                      </button>
                    </div>
                    <div className="dropdown mb-3 pl-2">
                      <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Sorting
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <button className="dropdown-item" onClick={() => setSort("+")}>
                            Ascending
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item" onClick={() => setSort("-")}>
                            Descending
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div className="dropdown mb-3">
                      <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Color
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <button className="dropdown-item" onClick={() => setColor(null)}>
                            All
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item" onClick={() => setColor("Red")}>
                            Red
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item" onClick={() => setColor("Yellow")}>
                            Yellow
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item" onClick={() => setColor("Blue")}>
                            Blue
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-12">
                    {/* {categories.map((el) => ( */}
                    <Productbox cardFetchData={card.data} />
                    {/* ))} */}
                  </div>
                </>
              )}
            </div>
            <div className="card-footer">
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end">
                  <li className={`page-item ${pageNumber === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => handlePagination(pageNumber - 1)}>
                      Previous
                    </button>
                  </li>
                  {getPageNumbers().map((page) => (
                    <li key={page} className={`page-item ${pageNumber === page ? "active" : ""}`}>
                      <button className="page-link" onClick={() => handlePagination(page)}>
                        {page}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${pageNumber === card.totalPage ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => handlePagination(pageNumber + 1)}>
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Productbox({ cardFetchData }) {
  return (
    <div className="tab-pane" role="tabpanel" aria-labelledby="menu2-tab">
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {cardFetchData && cardFetchData.map((el, index) => <ProductCard key={el.id} index={index + 1} card={el} />)}
      </div>
    </div>
  );
}

function ProductCard({ card }) {
  const postMain = async (id) => {
    try {
      const response = await axios({
        method: "POST",
        url: import.meta.env.VITE_API_BASE_URL + `/mainDeck`,
        headers: {
          Authorization: `Bearer ${localStorage.acces_token}`,
        },
        data: {
          DigimonId: id,
        },
      });
      Swal.fire({
        title: `Success!`,
        text: "Succes Add Card",
        icon: `success`,
      });
    } catch (error) {
      console.log(error);
      const errMsg = error.response.data.message;
      Swal.fire({
        title: `Error!`,
        text: errMsg,
        icon: `error`,
      });
    }
  };

  const postEgg = async (id) => {
    try {
      const response = await axios({
        method: "POST",
        url: import.meta.env.VITE_API_BASE_URL + `/eggDeck`,
        headers: {
          Authorization: `Bearer ${localStorage.acces_token}`,
        },
        data: {
          DigimonId: id,
        },
      });
      Swal.fire({
        title: `Success!`,
        text: "Succes Add Card",
        icon: `success`,
      });
    } catch (error) {
      const errMsg = error.response.data.message;
      Swal.fire({
        title: `Error!`,
        text: errMsg,
        icon: `error`,
      });
    }
  };
  return (
    <>
      <div className="col">
        <div className="card h-100">
          <img src={card.imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{card.cardName}</h5>
          </div>
          <div className="card-footer">
            {card.type == "Digi-Egg" ? (
              <button onClick={() => postEgg(card.id)} className="btn btn-lg btn-primary rounded-pill w-100 p-2">
                Add to Egg Deck
              </button>
            ) : (
              <button onClick={() => postMain(card.id)} className="btn btn-lg btn-primary rounded-pill w-100 p-2">
                Add to Main Deck
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;
