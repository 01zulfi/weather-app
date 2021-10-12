const pubsub = {
  events: {},
  publish: (eventName, data) => {
    if (this.events[eventName]) {
      this.events[eventName].forEach((callback) => callback(data));
    }
  },
  subscribe: (eventName, callback) => {
    if (!Array.isArray(this.events[eventName])) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  },
};

export default pubsub;
