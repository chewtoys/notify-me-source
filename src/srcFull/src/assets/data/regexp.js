/* Regexp */
/* eslint-disable-next-line no-control-regex */
export const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
/* Password Regexp
  /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})/;
  (                     # Start of group
    (?=.*\d)            # must contains one digit from 0-9
    (?=.*[a-z])         # must contains one lowercase characters
    (?=.*[A-Z])         # must contains one uppercase characters
    (?=.*[\W])          # must contains at least one special character
    .                   # match anything with previous condition checking
    {8,20}              # length at least 8 characters and maximum of 20
  )                     # End of group
*/

/* Use 8 or more characters with a mix of letters, numbers & symbols */
export const passwordRegExp = /(((?=.*\d)|(?=.*[\W]))(?=.*[a-z]).{8,20})/