import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Searchbar = () => {
  let navigate = useNavigate();
  //tried using the global context but wouldnt work... so made local state//gaya
  // const { itemId, setItemId } = useContext(GlobalContext);

  const [items, setItems] = useState();
  const [searchItems, setSearchItems] = useState("");

  const handleKeyUp = (e) => {
    // fetch data from backend for titles of items in searchbar
    fetch("/api/get-items")
      .then((res) => res.json())
      .then((data) => {
        // console.log("itemsdata", data.data);
        setItems(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //finds items list
  const handleFind = (value) => {
    navigate(`/search-result/${value}`);
  };
  //should suggest list as something is typed
  const handleSuggestions = (item) => {
    setItems("");
    navigate(`/items/${item._id}`);
  };

  return (
    <>
      <div>
        <Input
          type="text"
          value={searchItems}
          onChange={(e) => setSearchItems(e.target.value)}
          onKeyUp={(e) => {
            handleKeyUp(e);
          }}
        />
        <Button
          onClick={() => {
            handleFind(searchItems);
          }}
        >
          Search
        </Button>

        {items && searchItems.length > 2 && (
          <ListedItems>
            {items
              ?.filter((item) => {
                return item.name
                  .toLowerCase()
                  .includes(searchItems.toLowerCase());
              })
              .map((item) => {
                return (
                  <ItemsDropdown
                    key={item._id}
                    onClick={() => {
                      handleSuggestions(item);
                    }}
                  >
                    <span>
                      {item.name.slice(
                        0,
                        item.name
                          .toLowerCase()
                          .indexOf(searchItems.toLowerCase()) +
                          searchItems.length
                      )}

                      <Suggestions>
                        {item.name.slice(
                          item.name
                            .toLowerCase()
                            .indexOf(searchItems.toLowerCase()) +
                            searchItems.length
                        )}
                      </Suggestions>
                    </span>
                  </ItemsDropdown>
                );
              })}
          </ListedItems>
        )}
      </div>
    </>
  );
};

const Input = styled.input`
  border-radius: 7px;
  height: 15px;
  width: 500px;
  font-size: 18px;
  position: relative;
  padding: 10px;
  font-family: 'Jost';
  :focus {
    outline: none;
    border-color: rgb(116, 125, 55);
    box-shadow: 0 0 2px rgb(116, 125, 55);
  }
`;

const Button = styled.button`
  border: none;
  border-radius: 5px;
  /* height: 38px;
  width: 52px; */
  padding: 8px 20px;
  margin-top: 1px;
  margin-left: 3px;
  font-family: 'Jost';
  font-size: 14px;
  position: absolute;
  color: white;
  background-color: var(--primary-color);
`;

const ListedItems = styled.ul`
  border-radius: 5px;
  height: 300px;
  width: 500px;
  display: column;
  padding: 10px;
  position: absolute;
  background: white;
  color: black;
  overflow-y: auto;
`;

const Suggestions = styled.span`
  font-weight: bold;
`;

const ItemsDropdown = styled.li`
  border-radius: 7px;
  font-size: 14px;
  padding: 10px;
  :hover {
    cursor: pointer;
    background-color: #e4e6e3;
  }
`;

export default Searchbar;
