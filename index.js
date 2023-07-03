const configData = require("./version.json");
const base64 = require("base-64");
const axios = require("axios");

const token = "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";

function getFileSha() {
  const config = {
    method: "GET",
    url: "https://api.github.com/repos/halynamecherzhak/Project2/contents/version.json",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return new Promise((resolve, reject) => {
    axios(config)
      .then((response) => {
        resolve(response.data.sha);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
async function uploadFileApi() {
  const sha = await getFileSha();
  configData = "Hello World";
  const content = base64.encode(configData);
  const data = JSON.stringify({
    message: "Update version.json file",
    sha: sha,
    content: `${content}`,
  });

  const config = {
    method: "PUT",
    url: "https://api.github.com/repos/halynamecherzhak/Project2/contents/version.json",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
uploadFileApi();
