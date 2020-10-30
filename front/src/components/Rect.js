import React, { useState } from "react";

function Rect(props) {
  const [isShown, setIsShown] = useState(false);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      key={this.props.x + ":" + this.props.y}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <rect width="15" height="15" fill="grey"></rect>
      {isShown ? <p>Buenas {this.props.x + ":" + this.props.y} </p> : <></>}
    </svg>
  );
}

export default Rect;
