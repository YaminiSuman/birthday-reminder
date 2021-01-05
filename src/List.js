import React from "react";
import ListItem from "./ListItem";

function List({ people }) {
  return (
    <div>
      {people.map(person => {
        console.log(person);
        return (
          <ListItem
            id={person.id}
            name={person.data.name}
            birthdate={new Date(person.data.birthdate?.toDate())
              .toUTCString()
              .split(" ")
              .slice(1, 3)
              .join(" ")}
            image={person.data.image}
          />
        );
      })}
    </div>
  );
}

export default List;
