import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonsForm from "./components/PersonsForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [filtered, setFiltered] = useState("");

  useEffect(() => {
    personsService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };

    const duplicate = persons.find((person) => person.name === nameObject.name);

    if (duplicate) {
      window.confirm(
        `${nameObject.name} is already added to the phonebook, replace the old number with a new one?`
      );
      const updatedPerson = { ...duplicate, number: nameObject.number };

      personsService
        .updatePerson(duplicate.id, updatedPerson)
        .then((response) => {
          setPersons(
            persons.map((p) => (p.id === duplicate.id ? response.data : p))
          );
        });
    } else {
      personsService
        .addNew(nameObject)
        .then((response) => setPersons(persons.concat(response.data)));
    }

    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);

    person &&
      window.confirm(`Delete ${person.name}?`) &&
      personsService
        .deletePerson(person.id)
        .then(setPersons(persons.filter((person) => person.id !== id)))
        .catch((error) => console.log("fail"));
  };

  const handleAddNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleAddName = (event) => {
    setNewName(event.target.value);
  };

  const handleFilter = (event) => {
    setShowAll(false);
    setFiltered(event.target.value);
  };

  const peopleToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(filtered.toLowerCase())
      );

  return (
    <div>
      <h2>Phone book</h2>
      <Filter filtered={filtered} handleFilter={handleFilter} />
      <h2>Add a new</h2>
      <PersonsForm
        addName={addName}
        newName={newName}
        handleAddName={handleAddName}
        newNumber={newNumber}
        handleAddNumber={handleAddNumber}
      />
      <h2>Numbers</h2>
      <Persons peopleToShow={peopleToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
