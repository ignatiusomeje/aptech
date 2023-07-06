const form = document.getElementById("userData");
const embed = document.getElementById("check");
const fullName = document.querySelector("[name=fullName]");
const email = document.querySelector("[name=email]");
const whichSocialMedia = document.querySelectorAll("[name=whichSocialMedia]");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formCheck = new FormData(e.target);
  const userData = {
    fullName:
      formCheck.get("fullName").trim() !== "" && formCheck.get("fullName"),
    email: formCheck.get("email").trim() !== "" && formCheck.get("email"),
    whichSocialMedia:
      formCheck.get("whichSocialMedia") !== "" &&
      formCheck.get("whichSocialMedia"),
  };
  if (
    (userData.fullName || userData.email || userData.whichSocialMedia) !== null
  ) {
    try {
      const file = await axios.post(
        "http://127.0.0.1:3000/Api/v1/user/save",
        userData,
        {
          responseType: "blob",
        }
      );
      const url = URL.createObjectURL(file.data);
      window.open(url, "__blank");
      URL.revokeObjectURL(url);
      fullName.value = "";
      email.value = "";
      whichSocialMedia.forEach((Element) => (Element.checked = false));
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "error",
          title: "Email already exists",
        });
        fullName.value = "";
        email.value = "";
        whichSocialMedia.forEach((Element) => (Element.checked = false));
      }
    }
  }
});
