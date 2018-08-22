import encryptData from './encrypt';

export default function request(url, options) {
    let opt = options||{};
    if(opt.body){
      opt.body = encryptData(opt.body);
      console.log(opt.body);
    }
    return fetch(url, opt);
  }
  