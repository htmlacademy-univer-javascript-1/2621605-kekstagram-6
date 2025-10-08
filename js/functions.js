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


const timeInMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const checkTime = (workStart, workEnd, meetingStart, meetingTime) => {
  const workStartMinutes = timeInMinutes(workStart);
  const workEndMinutes = timeInMinutes(workEnd);
  const meetingStartMinutes = timeInMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + meetingTime;
  return meetingStartMinutes >= workStartMinutes && meetingEndMinutes <= workEndMinutes;
};

checkTime('08:00', '17:30', '14:00', 90);
