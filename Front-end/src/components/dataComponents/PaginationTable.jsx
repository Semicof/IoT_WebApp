import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import "../../styles/PaginationTable.css";
import Search from "./Search";

const PaginationTable = ({ endpoint, headers}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState({ time: "" });
  const [sortOption, setSortOption] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    fetchData();
  }, [currentPage, searchTerm, sortOption, sortOrder]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:4000/api/v1/${endpoint}`,
        {
          params: {
            page: currentPage,
            searchTerm: searchTerm.time,
            sort: sortOption,
            order: sortOrder,
          },
        }
      );

      if (response.data.length > 0) {
        setData(response.data);
        setSearchResult('data');
      } else {
        setData([]);
        setSearchResult('noResults');
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
        const response = await axios.get(
          `http://localhost:4000/api/v1/${endpoint}`,
          {
            params: {
              page: newPage,
              searchTerm: searchTerm.time,
              sort: sortOption,
              order: sortOrder,
            },
          }
        );

        if (response.data.length > 0) {
          setCurrentPage(newPage);
          setData(response.data);
        } else {
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSortChange = (column) => {
    if (sortOption === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortOption(column);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (column) => {
    if (sortOption === column) {
      return sortOrder === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />;
    }
    return null;
  };

  return (
    <div>
      <Search setSearchTerm={setSearchTerm} searchResult={searchResult} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
        <div className="tableContainer">
          {searchResult === 'data' ? (
            <table className="myTable">
              <thead>
                <tr>
                  {headers.map((header) => (
                    <th key={header} onClick={() => handleSortChange(header)}>
                      {header}
                      {header === 'id' || header === 'time' ? getSortIcon(header) : null}
                    </th>
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
                              "vi-VN",
                              {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
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
          ) : searchResult === 'noResults' ? (
            <p>No results found.</p>
          ) : (
            <p>Error fetching data.</p>
          )}
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
