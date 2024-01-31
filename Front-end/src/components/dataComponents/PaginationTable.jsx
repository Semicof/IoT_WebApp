import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/PaginationTable.css";
import Search from "./Search";
import Sort from "./Sort";

const PaginationTable = ({ endpoint, headers, sortableColumns }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchData();
  }, [currentPage, searchTerm, sortOption, sortOrder]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:4000/api/${endpoint}`,
        {
          params: {
            page: currentPage,
            searchTerm: searchTerm,
            sort: sortOption,
            order: sortOrder,
          },
        }
      );

      if (response.data.length > 0) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (newPage) => {
    if (newPage >= 1) {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:4000/api/${endpoint}`, {
          params: {
            page: newPage,
            searchTerm: searchTerm,
            sort: sortOption,
            order: sortOrder,
          },
        });

        if (response.data.length > 0) {
          setCurrentPage(newPage);
          setData(response.data);
        } else {
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="functionContainer">
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Sort
              sortOption={sortOption}
              setSortOption={setSortOption}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              sortableColumns={sortableColumns}
            />
          </div>
          <div className="tableContainer">
            <table className="myTable">
              <thead>
                <tr>
                  {headers.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    {headers.map((header) => (
                      <td key={header}>
                        {header.toLowerCase() === "time"
                          ? new Date(item[header.toLowerCase()]).toLocaleString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                timeZone: "UTC",
                              }
                            )
                          : header.toLowerCase() === "temperature" ||
                            header.toLowerCase() === "humidity" ||
                            header.toLowerCase() === "brightness"
                          ? `${item[header.toLowerCase()]} ${getUnit(
                              header.toLowerCase()
                            )}`
                          : item[header.toLowerCase()]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="paginationButtons">
              <button onClick={() => handlePageChange(currentPage - 1)}>
                &#10094;
              </button>
              <span>Page {currentPage}</span>
              <button onClick={() => handlePageChange(currentPage + 1)}>
                &#10095;
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const getUnit = (header) => {
  switch (header) {
    case "temperature":
      return "°C";
    case "humidity":
      return "%";
    case "brightness":
      return "lux";
    default:
      return "";
  }
};

export default PaginationTable;
