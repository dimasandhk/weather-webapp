fetch("/weather?address=pondok pinang")
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
  });
