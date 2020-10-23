import React, { useEffect, useState } from "react";
import Square from "./Square.js";

function Board() {
  const [domiciliary, setDomiciliary] = useState(null);
  const [board, setBoard] = useState([]);
  const [xcoor, setXCoor] = useState(0);
  const [ycoor, setYCoor] = useState(0);

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    fetch("/domiciliary/")
      .then((response) => response.json())
      .then((data) => {
        setDomiciliary(data);
        console.log("Llegó la data ", data);
        setBoard(buildFullBoard(null, data));
      });
  }, []);

  const listaCien = [];

  for (let i = 0; i < 100; i++) {
    listaCien.push(i + 1);
  }

  function validateCoordenates() {
    return xcoor > 0 && xcoor <= 100 && ycoor > 0 && ycoor <= 100;
  }

  function buildBlankBoard() {
    let newBoard = [];
    for (let i = 0; i < 100; i++) {
      let fila = [];
      for (let j = 0; j < 100; j++)
        fila.push(<Square key={i + ":" + j} type={0} />);
      newBoard.push(fila);
    }
    return newBoard;
  }

  function buildFullBoard(nearest, others, person) {
    // Creates new blank board
    let blankBoard = buildBlankBoard();
    console.log(others);
    // Draws all domiciliarys
    others.map(function (other) {
      console.log(other);
      blankBoard[other["x"] - 1][other["y"] - 1] = (
        <Square
          key={other["x"] - 1 + ":" + (other["y"] - 1)}
          type={2}
          id={other["id"]}
        />
      );
    });

    // Draws nearest domicilary info
    if (nearest != null) {
      blankBoard[nearest["x"] - 1][nearest["y"] - 1] = (
        <Square key={nearest["x"] - 1 + ":" + (nearest["y"] - 1)} type={3} />
      );
    }

    if (validateCoordenates())
      blankBoard[xcoor - 1][ycoor - 1] = (
        <Square key={xcoor - 1 + ":" + (ycoor - 1)} type={1} />
      );

    return blankBoard;
  }

  function draw() {
    if (validateCoordenates()) {
      fetch("/nearest_domiciliary/" + xcoor + "/" + ycoor)
        .then((response) => response.json())
        .then(function (asJson) {
          console.log("Data is ok", asJson);

          let nearest = asJson["nearest"];
          let others = asJson["others"];

          let boardToRender = buildFullBoard(nearest, others);

          setBoard(boardToRender);
        })
        .catch(function (ex) {
          console.log("parsing failed", ex);
        });
    } else {
      let boardToRender = buildBlankBoard();
      boardToRender[xcoor - 1][ycoor - 1] = (
        <Square key={xcoor - 1 + ":" + (ycoor - 1)} type={1} />
      );
      setBoard(boardToRender);
    }
  }

  return (
    <div>
      <label htmlFor="xcoor">X Coordenate: </label>
      <input onChange={(event) => setXCoor(event.target.value)} type="number" />

      <label htmlFor="ycoor">Y Coordenate: </label>
      <input onChange={(event) => setYCoor(event.target.value)} type="number" />

      <button onClick={() => draw()}>Pintar</button>

      {domiciliary != null ? (
        <table id="tablero">
          {board.map((fila) => (
            <tr>
              {fila.map((casilla) => (
                <td>{casilla}</td>
              ))}
            </tr>
          ))}
        </table>
      ) : (
        <p>Fetching data...</p>
      )}
    </div>
  );
}

export default Board;
