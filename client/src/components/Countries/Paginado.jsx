import {React} from 'react';

export default function Paginado({array, currentPage, paginate, length}){

    const pageNumbers = [0];
  for (let i = 1; i <= Math.ceil((length - 9) / 10); i++) {
    pageNumbers.push(i);
  }
    return(
        <>
            <h3>Paginado</h3>
            {pageNumbers.length > 1 &&
            pageNumbers.map((p, i) =>
            p === currentPage ? (
                <button key={i} className="pag-btn" onClick={() => paginate(p)}>
                  {p + 1}
                </button>
            ) : (
                <button key={i} className="pag-btn" onClick={() => paginate(p)}>
                  {p + 1}
                </button>
            )
          )}
        </>
        
    )
}