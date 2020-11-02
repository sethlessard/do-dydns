
/**
 * Calculate the A name value for a subdomain.
 * @param domain the domain.
 * @param subdomain the subdomain.
 */
export const calculateANameValueForSubdomain = (domain: string, subdomain: string) => {
  let value = "@"
  if (domain !== subdomain) {
    value = subdomain.replace(domain, "");
    if (value.lastIndexOf(".") === value.length - 1) 
      value = value.substr(0, value.lastIndexOf(".") - 1);
  }
  return value;
}
