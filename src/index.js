import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {render} from "react-dom";
import Datasort from "react-data-sort";
import tableData from "./data";
import './App.css';

// import 'bootstrap/dist/css/bootstrap.min.css';

function MyTable() {
    return (
        <Datasort
            data={tableData}
            defaultSortBy="singer"
            paginate
            render={({
                         data,
                         setSortBy,
                         sortBy,
                         direction,
                         activePage,
                         toggleDirection,
                         goToPage,
                         nextPage,
                         prevPage,
                         pages
                     }) => {
                return (
                    <div className="wrapper-all container">
                        <div className="wrapper-table row">
                            <TableHead
                                setSortBy={setSortBy}
                                sortBy={sortBy}
                                direction={direction}
                                toggleDirection={toggleDirection}
                            />
                            <TableBody data={data}/>
                        </div>
                        <Flex className="pagination-wrapper row">
                            <GoToPage goToPage={goToPage} pages={pages}/>
                            <PageIndicator pages={pages} activePage={activePage}/>
                            <Navigation
                                activePage={activePage}
                                goToPage={goToPage}
                                nextPage={nextPage}
                                prevPage={prevPage}
                                pages={pages}
                            />

                        </Flex>
                    </div>
                );
            }}
        />
    );
}

function TableHead({setSortBy, sortBy, direction, toggleDirection}) {
    const columns = [
        {key: "singer", title: "Singer"},
        {key: "song", title: "Song"},
        {key: "ganre", title: "Ganre"},
        {key: "year", title: "Year"}
    ];
    const items = columns.map(({key, title}) => {
        const active = key === sortBy;
        return (
            <HeadToggle
                key={key}
                active={active}
                onClick={() => {
                    if (active) {
                        toggleDirection();
                    }
                    setSortBy(key);
                }}
            >
                {title} {active ? direction === "asc" ? "▲" : "▼" : null}
            </HeadToggle>
        );
    });
    return (
        <div className="form-wrapper col-sm-2">
            <div className="">{items}</div>
        </div>
    );
}

function HeadToggle({children, active, onClick}) {
    return (
        <div className="form"
            onClick={onClick}
            style={{fontWeight: active ? "bold" : "normal", cursor: "pointer"}}
        >
            {children}
        </div>
    );
}

function TableBody({data}) {
    return (
        <table className="table table table-striped table-striped col-sm-10">
            <thead  className="thead-dark">
            <tr>
                <th scope="col">Singer</th>
                <th scope="col">Song</th>
                <th scope="col">Ganre</th>
                <th scope="col">Year</th>
            </tr>
            </thead>
            <tbody>
            {data.map(({singer, song, ganre, year}) => (
                <tr>
                    <td>{singer}</td>
                    <td>{song}</td>
                    <td>{ganre}</td>
                    <td>{year}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

// function Form({children, style}) {
//     return <div style={{display: "flex", ...style}}>{children}</div>;
// }

function Flex({children, style}) {
    return <div style={{display: "flex", ...style}}>{children}</div>;
}

function GoToPage({goToPage, pages}) {
    const options = []
    for (let i = 0; i < pages; i++) {
        options.push(<option value={i}>{i + 1}</option>)
    }
    return <div>Go to page <select onChange={e => goToPage(parseInt(e.target.value))}>{options}</select></div>
}

function Navigation({activePage, goToPage, nextPage, prevPage, pages}) {
    return (
        <Flex>
            {/*<button disabled={activePage === 0} onClick={() => goToPage(0)}>*/}
            {/*    {"<<"}*/}
            {/*</button>*/}
            <button disabled={activePage === 0} onClick={prevPage}>
                {"<"}
            </button>

            <button disabled={activePage === pages - 1} onClick={nextPage}>
                {">"}
            </button>
            {/*<button*/}
            {/*    disabled={activePage === pages - 1}*/}
            {/*    onClick={() => goToPage(pages - 1)}*/}
            {/*>*/}
            {/*    {">>"}*/}
            {/*</button>*/}
        </Flex>
    );
}

function PageIndicator({pages, activePage}) {
    return <div>
        <b>{activePage + 1}</b> / {pages}
    </div>
}

const App = () => (
    <div className="wrapper">
        <MyTable/>
    </div>
);

render(<App/>, document.getElementById("root"));
