import "materialize-css/dist/js/materialize.min";

export function toastMessage(message) {
  M.toast({
    html: "<span>" + `<strong>${message}</strong>` + "</span>",
  });
}

export function toastError(message) {
  M.toast({
    html:
      '<span class="red-text text-darken-2">' +
      `  <strong>${message}</strong>` +
      "</span>",
  });
}
