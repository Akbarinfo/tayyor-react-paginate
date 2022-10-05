import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import News from "../../database/news.json";

//pagnite
import ReactPaginate from "react-paginate";

const Main = () => {
  function Items({ currentItems }) {
    return (
      <>
        <ul className="main__list">
          {currentItems &&
            currentItems.map((item, key) => (
              <li key={key + 87} className="main__item">
                <div className="main__imgbox">
                  <Image src={item.images} width="365" height={"200"} />
                </div>
                <div className="main__box">
                  <h3 className="main__subtitle">{item.title}</h3>
                  <p className="main__text">{item.desc}</p>

                  <div className="main__item-box">
                    <Link href="/">
                      <a className="main__link">Batafsil</a>
                    </Link>

                    <div>
                      <span className="main__date">{item.date}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(News.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(News.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % News.length;
      setItemOffset(newOffset);
    };

    return (
      <>
        <Items currentItems={currentItems} />
        <ReactPaginate
          className="main__pagbox"
          breakLabel="..."
          nextLabel=">>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel="<<"
          renderOnZeroPageCount={null}
        />
      </>
    );
  }

  return (
    <section className="main">
      <div className="container">
        <h2 className="main__title">Yangiliklar</h2>

        <PaginatedItems itemsPerPage={3} />
      </div>
    </section>
  );
};

export default Main;
