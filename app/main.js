function redirect() {
  const currentUrl = window.location.origin;
  location.assign(currentUrl + "/login/");
}
redirect();
