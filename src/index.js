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
                    <div className="wrapper-table container">
                        <ul>
                            <TableHead
                                setSortBy={setSortBy}
                                sortBy={sortBy}
                                direction={direction}
                                toggleDirection={toggleDirection}
                            />
                            <TableBody data={data}/>
                        </ul>
                        <Flex style={{justifyContent: 'space-between'}}>
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
        <div>
        <tr>{items}</tr>
        </div>
    );
}

function HeadToggle({children, active, onClick}) {
    return (
        <td
            onClick={onClick}
            style={{fontWeight: active ? "bold" : "normal", cursor: "pointer"}}
        >
            {children}
        </td>
    );
}

function TableBody({data}) {
    return (
        <tbody className="tbody col-sm-9">
        {data.map(({singer, song, ganre, year}) => (
            <tr className="tr row">
                <td className="col-3">{singer}</td>
                <td className="col-3">{song}</td>
                <td className="col-3">{ganre}</td>
                <td className="col-3">{year}</td>
            </tr>
        ))}
        </tbody>
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
