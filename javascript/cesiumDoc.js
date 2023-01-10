/*
 * @Description: 
 * @Author: zhangyuru
 * @Date: 2022-12-21 15:51:43
 * @LastEditors: zhangyuru
 * @LastEditTime: 2023-01-06 15:40:33
 * @FilePath: \Documentation\javascript\cesiumDoc.js
 */
(function () {
  const filterType = document.getElementById("filterType");
  const classFilter = document.getElementById("ClassFilter");
  const classList = document.getElementById("ClassList");

  function filter () {
    const value = classFilter.value.toLowerCase();

    const items = classList.getElementsByTagName("li");
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      let itemName = item.getAttribute("data-name") || "";
      itemName = itemName.toLowerCase().replace(/\s/g, "");
      if (itemName.includes(value)) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    }
  }
  classFilter.onkeyup = filter;

  function getQueryParameter (name) {
    const match = new RegExp(`[?&]${name}=([^&]*)`).exec(
      window.location.search
    );
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
  }

  const show = getQueryParameter("show");
  if (show) {
    document.getElementById("filterType").value = show;
  }

  const searchTerm = getQueryParameter("classFilter") || "";
  classFilter.value = searchTerm;
  filter();

  function resetFilter () {
    classFilter.value = "";
    filter();
  }

  function updateMenuLinks () {
    const links = classList.getElementsByTagName("a");
    const searchTerm = classFilter.value;
    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      const prefix = link.href.split("?")[0];
      const parts = prefix.split("#");
      link.href =
        parts[0] +
        (searchTerm === "" ? "" : `?classFilter=${searchTerm}`) +
        (parts[1] ? `#${parts[1]}` : "");
    }
  }

  const menuLinks = classList.getElementsByTagName("a");
  for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].onclick = function () {
      updateMenuLinks();
    };
  }

  const titleDom = document.getElementsByClassName('page-title')[0]
  if (titleDom) {
    const title = titleDom.textContent.trim()
    const hash = location.hash ? location.hash.substring(1) : ''
    const list = classList.getElementsByTagName("li");
    for (let i = 0; i < list.length; i++) {
      const item = list[i]
      let text = item.innerText
      if (text.includes('【')) {
        text = text.substring(0, text.indexOf('【'))
      }
      if (text === title || hash === text) {
        item.scrollIntoView(true)
        item.style.background = '#ccc'
        break
      }
    }
  }
})();
