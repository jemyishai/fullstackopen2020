import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import Form from "./Form";
import Persons from "./Persons";
import Notification from "./Notification";
import services from "./services/numbers.js";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    services
      .getAll()
      .then((response) => {
        console.log(response);
        setPersons(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState("notice");

  const reset = () => {
    setNewName("");
    setNewNumber("");
    services
      .getAll()
      .then((response) => {
        setPersons(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const submitName = (event) => {
    event.preventDefault();

    //name and number must be filled out - front end handles this
    if (!newName || !newNumber) {
      setNotificationType("error");
      setNotification("Name & Number must be filled out");
      setTimeout(() => {
        setNotification(null);
        setNotificationType("notice");
      }, 5000);
    }

    //run this getAll call in case multiple tabs are creating same person

    if (newName && newNumber) {
      services
        .getAll()
        .then((res) => {
          console.log("Going to run some checks");
          if (res.every((nameCheck) => nameCheck.name !== newName)) {
            services
              .create({ name: newName, number: newNumber })
              .then((response) => {
                setPersons([...persons, response]);
                setNotificationType("notice");
                setNotification(`Added ${newName}`);
                setTimeout(() => {
                  setNotification(null);
                }, 5000);
              })
              .catch((error) => {
                setNotificationType("error");
                setNotification(
                  `Following issue: ${error.response.data.error}`
                );
                console.log(error.response.data.error);
                setTimeout(() => {
                  setNotification(null);
                  setNotificationType("notice");
                }, 5000);
                console.log(error);
              });
            reset();
          } else {
            let result = window.confirm(
              `${newName} is already added to phonebook, replace the old number with a new one?`
            );
            if (result) {
              let personObj = res.find((person) => person.name === newName);
              console.log(personObj);
              services
                .update(personObj.id, { name: newName, number: newNumber })
                .then((UpdateRes) => {
                  setPersons([
                    ...persons.filter((person) => person.id !== personObj.id),
                    UpdateRes,
                  ]);
                  setNotification(`Updated ${newName}'s number`);
                  setTimeout(() => {
                    setNotification(null);
                  }, 5000);
                })
                .catch((error) => {
                  setNotificationType("error");
                  setNotification(
                    `Information of ${newName} has not been updated due to: ${error.response.data.error}`
                  );
                  setTimeout(() => {
                    setNotification(null);
                    setNotificationType("notice");
                  }, 5000);
                  console.error(error);
                });
            }
            reset();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const deletion = (name) => {
    let result = window.confirm(`Delete ${name} ?`);
    if (result) {
      let personObj = persons.find((person) => person.name === name);
      services
        .deletePerson(personObj.id)
        .then((res) => {
          console.log("delete res here", res);
          setPersons(persons.filter((person) => person.id !== personObj.id));
        })
        .catch((error) => {
          console.error(error);
        });
      setNotification(`${personObj.name} has been deleted`);
      setPersons(persons.filter((person) => person.id !== personObj.id));
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
    reset();
  };

  const onChangeName = (event) => {
    setNewName(event.target.value);
  };

  const onChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const filterTest = ({ name }) => {
    const filteringNames = new RegExp(filter, "ig");
    return filteringNames.test(name);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} styling={notificationType} />
      <Filter filter={filter} setFilter={setFilter} />
      <Form
        onSubmit={submitName}
        valueName={newName}
        valueNumber={newNumber}
        onChangeName={onChangeName}
        onChangeNumber={onChangeNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filterTest={filterTest} deletion={deletion} />
    </div>
  );
};

export default App;
