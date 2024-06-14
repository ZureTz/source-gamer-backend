// export function checkUsername(username) {
//   //   ^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$
//   //    └─────┬────┘└───┬──┘└─────┬─────┘└─────┬─────┘ └───┬───┘
//   //          │         │         │           │           no _ or . at the end
//   //          │         │         │           │
//   //          │         │         │           allowed characters
//   //          │         │         │
//   //          │         │         no __ or _. or ._ or .. inside
//   //          │         │
//   //          │         no _ or . at the beginning
//   //          │
//   //          username is 8-20 characters long
//   const regex = new RegExp(
//     /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
//   );
//   return regex.test(username);
// }

export function checkEmail(email) {
  const regex = new RegExp(
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
  );
  return regex.test(email);
}

export function checkPassword(password) {
  // Minimum eight characters, at least one letter and one number
  const regex = new RegExp(/^[a-zA-Z\d!#$%&'*+/=?^_`{|}~-]{6,20}$/);
  return regex.test(password);
}
