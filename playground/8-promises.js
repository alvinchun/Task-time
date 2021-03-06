const doWorkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Things went wrong");
    resolve([1, 2, 3]);
  }, 2000);
});

doWorkPromise
  .then(result => {
    console.log("successful!", result);
  })
  .catch(error => {
    console.log("failed..", error);
  });
