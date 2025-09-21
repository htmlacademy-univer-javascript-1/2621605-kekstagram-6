const checkLength = function(string, maxLength)
{
  return string.length <= maxLength;
};
const checkPalindrome = function(word)
{
  const newWord = word.replaceAll(' ','').toLowerCase();
  let palindrome = '';
  for (let i = newWord.length - 1; i >= 0; i--)
  {
    palindrome += newWord[i];
  }
  return newWord === palindrome;
};

checkLength('проверяемая строка', 20);
checkPalindrome('Лёша на полке клопа нашёл');
