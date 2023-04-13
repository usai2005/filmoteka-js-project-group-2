// function that cuts titles if they are too long

function formatTitle(title, maxLength) {
  let formatedTitle;
  if (title.length <= maxLength) {
    formatedTitle = title;
  } else {
    formatedTitle = message.slice(0, maxLength) + '...';
  }
  return formatedTitle;
}

export default formatTitle;
