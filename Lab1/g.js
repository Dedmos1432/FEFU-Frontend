items = new Set();
lists = [...document.getElementsByClassName("list")].forEach((it) => {
  [...it.children].forEach((it) => items.add(it.textContent));
});
console.log(items);
