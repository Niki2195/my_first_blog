console.log("Блог успешно загружен!");
document.addEventListener("DOMContentLoaded", () => {
  const postLinks = document.querySelectorAll("ul li a");
  postLinks.forEach((link) => {
    link.addEventListener("click", () => {
      alert(`Вы перешли на пост: ${link.textContent}`);
    });
  });
});
