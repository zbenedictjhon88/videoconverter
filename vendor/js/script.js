function filevalidate(file) {
  types = /(\.|\/)(mp4)$/i;
  if (types.test(file.type) || types.test(file.name)) {
    $("input[type=submit]").attr("disabled", false);
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong! Please select mp4 file.",
      showConfirmButton: true,
    });
  }
}
