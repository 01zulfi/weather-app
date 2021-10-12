import pubsub from "./Pubsub";

const formFunction = () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityName = form.cityNameInput;
    pubsub.publish("getCityName", cityName.value);
    form.reset();
  });
};

const domModule = {
  execute: () => {
    formFunction();
  },
};

export default domModule;
