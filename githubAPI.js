const axios = require("axios");
const fs = require("fs");
const base64 = require("base-64");

const token = "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";

function requestUserRepos(username) {
  return Promise.resolve(
    axios(`https://api.github.com/users/${username}/repos`)
  );
}

requestUserRepos("halynamecherzhak").then((response) => {
  for (let i in response.data) {
    console.log("Repo:", response.data[i].name);
    console.log("Description:", response.data[i].description);
    console.log("URL:", response.data[i].html_url);
    console.log("=========================");
  }
});

///repos/{owner}/{repo}/contents/{path}
function getFileData(username) {
  return Promise.resolve(
    axios.get(
      `https://api.github.com/repos/${username}/Project1/contents/version.json`
    )
  );
}

getFileData("halynamecherzhak").then((response) => {
  const data = base64.decode(response.data.content);
  console.log("Data from version.json file");
  console.log(data);
});

function updateFileData() {
  let file = fs.readFileSync("version.json").toString();
  const content = base64.encode(file);
  uploadFileApi(token, content);
}

//Creation of new file if it isn't exist
function uploadFileApi(token, content) {
  const data = JSON.stringify({
    message: "txt file",
    content: `${content}`,
  });

  const config = {
    method: "PUT",
    url: "https://api.github.com/repos/halynamecherzhak/Project1/contents/version2.json",
    headers: {
      Authorization: `Bearer ${token}`,
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

updateFileData();

//Creation of new repo
// (function createNewRepo() {
//   const config = {
//     method: "POST",
//     url: "https://api.github.com/user/repos",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     data: { name: "TestPostman2" },
//   };

//   axios(config)
//     .then((response) => {
//       console.log(response.data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// })();
