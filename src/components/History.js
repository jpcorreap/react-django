import React, { useEffect, useState } from "react";

function History() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    fetch("/deliveries/")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log("LLEGÓ DICIEMBRE", data);
      });
  }, []);

  return (
    <div>
      {data == null ? (
        <p>Fetching data...</p>
      ) : (
        <table id="history">
          <tr>
            <td>Domiciliary ID</td>
            <td>Destination Coor X</td>
            <td>Destination Coor Y</td>
          </tr>
          {data.map((delivery) => (
            <tr>
              <td>{delivery["id"]}</td>
              <td>{delivery["x"]}</td>
              <td>{delivery["y"]}</td>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
}

export default History;
