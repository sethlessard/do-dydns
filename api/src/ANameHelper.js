
const calculateANameValueForSubdomain = (domain, subdomain) => {
  let value = "@"
  if (domain !== subdomain) {
    value = subdomain.replace(domain, "");
    if (value.lastIndexOf(".") === value.length - 1) {
      value = value.substr(0, value.lastIndexOf(".") - 1);
    }
  }
  return value;
}

module.exports = {
  calculateANameValueForSubdomain
}
