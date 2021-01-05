import React, { useState } from "react";
import { db, storage } from "./firebase";
import "./Form.css";

function Form() {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const format = userBirthDate => {
    const dateArr = userBirthDate.split("");
    dateArr.splice(0, 4, "2", "0", "0", "0").join("");
    return dateArr.join("");
  };
  const addBirthdate = e => {
    let userBirthDate = e.target.value;
    const formattedDate = format(userBirthDate);
    console.log(formattedDate);
    setBirthdate(formattedDate);
  };

  const handleUpload = () => {
    console.log(`image ${image}`);
    const uploadTask = storage
      .ref(`images/${image ? image.name : "default"}`)
      .put(image);

    uploadTask.on(
      "state_changed",
      snapshot => {
        //progress function
        const progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      err => {
        //Error function
        console.log(err);
        alert(err.message);
      },
      () => {
        // complete function
        storage
          .ref("images")
          .child(image?.name || "default")
          .getDownloadURL()
          .then(url => {
            //post image inside db
            db.collection("BirthdayList").add({
              birthdate: new Date(birthdate),
              name: name,
              image: url
            });
            setProgress(0);
            setName("");
            setImage(null);
            setBirthdate("");
          });
      }
    );
  };

  return (
    <div className="imageupload">
      <progress className="imageupload__progress" value={progress} max="100" />
      <input
        type="text"
        placeholder="Person Name"
        value={name}
        required
        onChange={e => setName(e.target.value)}
      />
      <input
        type="date"
        name="birthdate"
        value={birthdate}
        required
        // onChange={e => setBirthdate(e.target.value)}
        onChange={addBirthdate}
      />
      <input type="file" onChange={handleChange} />
      <button
        onClick={handleUpload}
        disabled={!(name.length && birthdate.length)}
      >
        Add to the List
      </button>
    </div>
  );
}

export default Form;
