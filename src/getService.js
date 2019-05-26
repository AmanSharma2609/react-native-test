import { Toast } from "native-base";

export const Getitems = (method, url) => {
  return fetch(url, {
    method: method,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(
      response => {
        return response;
      },
      function(err) {
        console.log(err);
        Toast.show({
            text: "Something went wrong",
            buttonText: "Okay",
            type: "danger"
          })
      }
    );
};
