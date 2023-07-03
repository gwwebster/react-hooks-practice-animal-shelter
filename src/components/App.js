import React, { useState } from "react";
import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });


  function handleChangeType(e) {
    setFilters({ type: e.target.value });
  }

  function handleFindPets() {
    fetch(filters.type === "all" ? "http://localhost:3001/pets?" :
    "http://localhost:3001/pets?" + new URLSearchParams({ type: filters.type }))
    .then(r => r.json())
    .then(data => setPets(data));
  }

  function handleAdoptPet(id) {
    setPets(pets.map(pet => (
      pet.id === id ? {...pet, isAdopted: true} : pet
    )));
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={handleChangeType} onFindPetsClick={handleFindPets} />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={handleAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;