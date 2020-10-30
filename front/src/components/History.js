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
    <div className="section">
      <div className="text-center">
        {data == null ? (
          <p>Fetching data...</p>
        ) : (
          <table id="history" className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Domiciliary ID</th>
                <th>Destination X</th>
                <th>Destination Y</th>
              </tr>
            </thead>
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
    </div>
  );
}

export default History;
