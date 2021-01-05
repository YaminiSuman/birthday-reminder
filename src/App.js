import React, { useState, useEffect } from "react";
import data from "./data";
import List from "./List";
import { db } from "./firebase";
import Form from "./Form";

function App() {
  const SHOW_FORM = "Add New Birthday to the List";
  const HIDE_FORM = "Hide Form";

  const [peopleList, setPeopleList] = useState([]);
  const [displayFormFlag, setDisplayFormFlag] = useState(false);
  const [btnText, setButtonText] = useState(SHOW_FORM);
  useEffect(() => {
    db.collection("BirthdayList")
      .orderBy("birthdate", "asc")
      .onSnapshot(snap =>
        setPeopleList(snap.docs.map(doc => ({ id: doc.id, data: doc.data() })))
      );
  }, []);

  const toggleFlagAndText = () => {
    setDisplayFormFlag(!displayFormFlag);
    if (btnText === SHOW_FORM) {
      setButtonText(HIDE_FORM);
    } else setButtonText(SHOW_FORM);
  };

  return (
    <main>
      <div className="container">
        <h3>Upcoming Birthdays !!</h3>
        <List people={peopleList} />
        <button onClick={toggleFlagAndText}>{btnText}</button>
        {displayFormFlag && <Form />}
      </div>
    </main>
  );
}

export default App;
