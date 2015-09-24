import Ember from 'ember';

export default Ember.Helper.helper(function(params) {
  let inputText = params[0];

  //split it into words
  var words = Ember.String.w(inputText.string || inputText).map(function(word){
      if(/^http[s]+:\/\//.test(word)){
          return `<a href="${word}" target="_blank">${word}</a>`;
      }
      return word;
  });

  return Ember.String.htmlSafe(words.join(" "));
});
