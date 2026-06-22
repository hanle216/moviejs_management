import React from "react";
import { Link } from "react-router-dom";

const Movie = (props) => {
  const { movie } = props;
  return (
    <Link to={`/detail/${movie.maPhim}`} className="col-3">
      <div className="card">
        <img className="card-img-top" src={movie.hinhAnh} alt="Title" />
        <div className="card-body">
          <h4 className="card-title">{movie.tenPhim}</h4>
        </div>
      </div>
    </Link>
  );
};

export default Movie;
