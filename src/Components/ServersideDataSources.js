export const ServersideDatasource=()=>{
    return {
        getRows(params) {
          console.log(params);
          fetch("http://localhost:4000/comments")
            .then((res) => res.json())
            .then((res) => {
              params.successCallback(res, 499);
            })
            .catch((error) => {
              params.failCallback();
            });
        },
      };
}