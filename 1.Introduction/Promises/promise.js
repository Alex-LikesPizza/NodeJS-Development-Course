const fetchData = () =>
  new Promise((resolve, reject) => {
    //Simulating API fetch
    setTimeout(() => {
      const data = {message: 'You forgot the stove on!'}

      resolve(data);
      // reject(new Error("Unexpected interference"));
    }, 2000);
  });

fetchData()
  .then(data => {
    console.log(data.message);
  })
  .catch(error => {
    console.error(error.message)
  });