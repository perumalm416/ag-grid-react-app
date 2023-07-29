export class AgGridProperties {
  columnToggleState = null;
  AgGridProperties(toggleState) {
    this.columnToggleState = toggleState;
  }
  // data: [
  //   { name: "perumal", age: 24, id: 1 },
  //   { name: "bigmal", age: 16, id: 2 },
  //   { name: "abdul", age: 22, id: 3 },
  // ],
  columnInfo = [
    {
      headerName: "S.No",
      field: "id",
      tooltipField: "name",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      filter:"agNumberColumnFilter"
    },
    {
      headerName: "Group Id",
      field: "postId",
      tooltipField: "name",

      // cellStyle:(param)=>param.value>=18?{backgroundColor:"green"}:{backgroundColor:"red"}
      cellClass: (param) =>
        param.value % 2 === 0 ? "evenUserId" : "oddUserId",
        filter:"agNumberColumnFilter",
    },
    { headerName: "Name", field: "name", filter:"agTextColumnFilter" },
    {
      headerName: "Email",
      field: "email",
      hide: this.columnToggleState,
      filter:"agTextColumnFilter"
    },
    {
      headerName: "Action",
      field: "id",
      editable: false,
      cellRenderer: (columnParam) => (
        //<CustomComponentForCell cellParam={columnParam}/>
        <div>
          <button
            onClick={() => {
              console.log("Action", columnParam);
              alert(`Hi ${columnParam.data.email}`);
            }}
          >
            Button
          </button>
        </div>
      ),
      hide: this.columnToggleState,
      
    },
  ];
  defaultColInfo = {
    sortable: true,
    editable: true,
    filter: true,
    floatingFilter:true,
    flex: 1,
  };
}
