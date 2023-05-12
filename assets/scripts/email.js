const d = new Date();
document.getElementById("copyright").innerHTML = `Copyright ${d.getFullYear()} SEO Keyword Counter | Rob Saunders, UK | All rights reserved`;
const emailAddress = ["m","e","@","r","o","b","-","s","a","u","n","d","e","r","s",".","c","o",".","u","k"];
const email = document.getElementById("email");
email.setAttribute("href", `mailto: ${emailAddress.join('')}`);
email.innerHTML = emailAddress.join('');