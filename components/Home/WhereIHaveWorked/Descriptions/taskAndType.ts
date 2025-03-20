export const getTasksTextWithHighlightedKeyword = (text: string, keywords: string[] | []) => {
	if (keywords.length > 0) {
	  // Escape special regex characters in keywords
	  const escapedKeywords = keywords.map((kw) => kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
	  const regex = new RegExp(escapedKeywords.join("|"), "gi");
	  
	  return text.replace(regex, (match) => `<span class="text-AAsecondary">${match}</span>`);
	}
	return text;
  };
  