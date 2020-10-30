import React from "react";

function Square(props) {
  /*¿const [type, setType] = useState(0);

  function changeType(newState) {
    console.log("Entróó con ", newState);
    setType(1);
  }*/
  let fillColor = "";

  // eslint-disable-next-line default-case
  switch (props.type) {
    // Blank square, nothing important
    case 0:
      fillColor = "white";
      break;
    // Blue square, person location
    case 1:
      fillColor = "blue";
      break;
    // Black square, domiciliary location
    case 2:
      fillColor = "black";
      break;
    // Yellow square, nearest domiciliary location
    case 3:
      fillColor = "yellow";
      break;
  }

  /*{
    props.id != null ? (
      <text className="domiciliaryId">{props.id}</text>
    ) : (
      <></>
    );
  }*/

  return (
    <svg xmlns="http://www.w3.org/2000/svg">
      <rect width="15" height="15" fill={fillColor}></rect>
    </svg>
  );
}

export default Square;
