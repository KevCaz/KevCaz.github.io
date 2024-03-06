var x = document.querySelectorAll(".ctt-main-content .article-main h1, .ctt-main-content .article-main h2, .addto-second-navbar");
var i;

for (i = 0; i < x.length; i++) {
  if (x[i].id != "title") {
    id = "sidebar_secondary_id_" + i;
    x[i].id = id;
    if (x[i].tagName == "H1") {
      document.write("<h1> <a href='#" + id + "'>" + x[i].innerHTML + "</a></h1>");
    } else if (x[i].tagName == "H2") {
      document.write("<h2> <a href='#" + id + "'>" +  x[i].innerHTML + "</a></h2>");
    }
  }
}