import React, { useState } from "react";
import "./Pagination.css";

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = 2;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="pagination">

      {/* Previous */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-btn"
      >
        <span>←</span>
        Previous
      </button>

      {/* Page Numbers */}
      <div className="pagination-pages">
        {[1, 2].map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`page-number ${
              currentPage === page ? "active" : ""
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-btn"
      >
        Next
        <span>→</span>
      </button>

    </div>
  );
};

export default Pagination;