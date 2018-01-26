import { helper } from "@ember/component/helper";
import { w, htmlSafe } from "@ember/string";

export default helper(function(params) {
  let inputText = params[0];

  //split it into words
  var words = w(inputText.string || inputText).map(function(word){
      if(/^http[s]+:\/\//.test(word)){
          return `<a href="${word}" target="_blank">${word}</a>`;
      }
      return word;
  });

  return htmlSafe(words.join(" "));
});
