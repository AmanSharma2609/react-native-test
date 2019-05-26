import { Toast } from "native-base";

export const items = (method, body, url) => {
  console.log(body);
  let request = JSON.stringify(body);
  return fetch(url, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: request
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
