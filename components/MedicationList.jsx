import { useEffect, useState } from "react";
import useMedications from "../hooks/useMedications";

const MedicationList = ({ onPurchase }) => {
  const { medications, isLoading, isError } = useMedications();
  // Searching and pagination should be handled by apis, but for now client side searching will help with this large list
  const [query, setQuery] = useState("");
  const [filteredMeds, setFilteredMeds] = useState([]);
  const [cart, setCart] = useState([]);

  const addToCart = (med) => {
    setCart([...cart, med]);
  };

  const removeFromCart = (med) => {
    const index = cart.indexOf(med);
    if (index >= 0) {
      setCart(cart.slice(0, index).concat(cart.slice(index + 1)));
    }
  };

  // Locally filter the medications if the searchQuery is set, else empty filter.
  useEffect(() => {
    if (!query) {
      setFilteredMeds([]);
    } else {
      const filteredMeds = medications.filter((med) => {
        return med.toLowerCase().includes(query.toLowerCase());
      });
      setFilteredMeds(filteredMeds);
    }
  }, [query, medications]);

  // TODO: Handle errors gracefully. Handle isLoading with ghost component
  if (isError || isLoading) {
    return;
  }

  return (
    <div className="grid grid-cols-2 gap-x-10">
      <div>
        <input
          className="text-black"
          type="text"
          placeholder="Search..."
          onChange={(event) => setQuery(event.target.value)}
        />
        <div>
          {((filteredMeds.length > 0 && filteredMeds) || medications).map(
            (med) => {
              return (
                <div className="grid grid-cols-2" key={med}>
                  <div key={med}>{med}</div>
                  {cart.includes(med) ? (
                    "Added to cart!"
                  ) : (
                    <button className="w-fit" onClick={() => addToCart(med)}>
                      Add
                    </button>
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>
      <div>
        <div class="text-center">Your cart</div>
        <div>
          {cart.map((med) => {
            return (
              <div className="grid grid-cols-2" key={med}>
                <div key={med}>{med}</div>
                <button className="w-fit" onClick={() => removeFromCart(med)}>
                  Remove
                </button>
              </div>
            );
          })}
        </div>
        {cart.length > 0 && (
          <div className="mt-2 grid grid-cols-2">
            <button
              className="col-start-2 w-fit"
              onClick={() => onPurchase(cart)}
            >
              Purchase
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicationList;
