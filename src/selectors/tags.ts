export default (tags: string[], text: string) => {
  for (var i = 0; i < tags.length; i++) {
    if (tags[i].toLowerCase().includes(text.toLowerCase())) {
      return true;
    }
  }
  return false;
};
