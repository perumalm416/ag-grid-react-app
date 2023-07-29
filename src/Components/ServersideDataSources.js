export const ServersideDatasource = () => {
  return {
    getRows(params) {
      console.log(params.request, null, 1);
      console.log(params.request.startRow);
      let url = "http://localhost:4000/comments?";
      const { startRow, endRow, filterModel, sortModel } = params.request;
      // start and end
      url += `_start=${startRow}&_end=${endRow}&`;

      // filter
      const filterKeys = Object.keys(filterModel);
      filterKeys.forEach((filter) => {
        console.log(filter);
        url += `${filter}=${filterModel[filter].filter}&`;
      });
      //sort
      if (sortModel.length) {
        const { colId, sort } = sortModel[0];
        url += `_sort=${colId}&_order=${sort}&`;
      }

      console.log(url);
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          params.successCallback(res, 499);
        })
        .catch((error) => {
          params.failCallback();
        });
    },
  };
};
