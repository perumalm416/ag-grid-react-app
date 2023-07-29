import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import "./Table.css";
import { Component, Fragment } from "react";
import { AgGridProperties } from "./Ag-grid-properties";
import { ServersideDatasource } from "./ServersideDataSources.js";


export class TableData extends Component {
  constructor() {
    super();
    this.state = {
      gridApi: null,
      columnToggleState: false,
    };
    this.onGridReadyApi = this.onGridReadyApi.bind(this);
    this.onExportFileHandler = this.onExportFileHandler.bind(this);
  }

  // get grid table's api

  onGridReadyApi(param) {
    if (param) {
      this.setState((prev) => {
        return { ...prev, gridApi: param };
      });
    }
    param.api.setServerSideDatasource(ServersideDatasource());  //server side data

    // fetch("http://localhost:4000/comments")
    //   .then((res) => res.json())
    //   .then((res) => {
    //     // param.api.applyTransaction({ add: res });

    //     //below represent go to which page
    //     // param.api.paginationGoToPage(2);
    //   });
  }

  // download the table data to excelsheet format
  onExportFileHandler() {
    this.state.gridApi.exportDataAsCsv();
  }

  onSelectionChanged(event) {
    console.log(event.api.getSelectedRows());
  }
  onIsRowSelectable(event) {
    return event
      ? event.data.id % 2 === 0 || event.data.name.includes("api")
      : false;
  }
  onPaginationSetPageSize(event) {
    console.log(event.target.value);
    const pagesize = event.target.value;
    this.state.gridApi.api.paginationSetPageSize(pagesize);
  }
  onToggleHandler() {
    console.log(this.state.gridApi.columnApi);
    this.state.gridApi.columnApi.setColumnsVisible();
    this.setState({ columnToggleState: !this.state.columnToggleState });
  }
  onQuickFiterHandler = (e) => {
    this.state.gridApi.api.setQuickFilter(e.target.value);
  };
  render() {
    const ag = new AgGridProperties(this.state.columnToggleState);
    const { defaultColInfo, columnInfo } = ag;

    return (
      <Fragment>
        <div style={{ width: "90%", margin: "0px auto" }}>
          <div>
            <button onClick={this.onToggleHandler.bind(this)}>
              Toggle button
            </button>
            <div className="quickfilter-container">
              <label htmlFor="quickfilter-input">Quick Filter</label>
              <input
                type="search"
                id="quickfilter-input"
                className="inputcss"
                placeholder="Search Something here ... "
                onChange={this.onQuickFiterHandler.bind(this)}
              />
            </div>
          </div>
          <div
            className="ag-theme-alpine"
            style={{ height: 400, border: "1px solid black" }}
          >
            <AgGridReact
              // rowData={this.state.data}    static data

              columnDefs={columnInfo}
              defaultColDef={defaultColInfo}
              onGridReady={this.onGridReadyApi} // dynamic data
              rowModelType="serverSide"
              // enableBrowserTooltips={true}
              // tooltipShowDelay={{ tooltipShowDelay: 10 }}
              // rowSelection="multiple"
              // onSelectionChanged={this.onSelectionChanged}
              // rowMultiSelectWithClick={true}
              // isRowSelectable={this.onIsRowSelectable}
              // pagination={true}
              // paginationPageSize={10}
              //  paginationAutoPageSize={true}
            />
          </div>

          <div>
            <button onClick={this.onExportFileHandler}>Export</button>
            <select onChange={this.onPaginationSetPageSize.bind(this)}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
            </select>
          </div>
        </div>
      </Fragment>
    );
  }
}
