
export default function request(url, options) {
    let opt = options||{};
    return fetch(url, opt);
  }
  