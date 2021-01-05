import React from "react";

function ListItem({ id, name, birthdate, image }) {
  console.log(id, image, name, birthdate);
  return (
    <article key={id} className="person">
      <img src={image} alt=""></img>
      <div>
        <h4>{name}</h4>
        <p> Born on {birthdate} </p>
      </div>
    </article>
  );
}

export default ListItem;
