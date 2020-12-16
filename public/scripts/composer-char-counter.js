$(document).ready(function() {
  console.log("Document Ready");
  let form = document.getElementById("tweet-text");
  form.addEventListener('input', function() {
    const input = $(this).val();
    const count = $(this).siblings(".button-count").children(".counter");
    const length = input.length
    let output = count.val(140 - length);
    console.log(output.val());
    if (output.val() < 0) {
      output.css("color", "red");
    } else {
      output.css("color", "#545149");
    }
  });
});