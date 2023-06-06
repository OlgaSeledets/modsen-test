# Modsen Test

list	GET  /volumes?q={search terms}	Performs a book search.

### Parameters

`q`	*string*	Full-text search query string.

Keywords:
- **intitle**: Returns results where the text following this keyword is found in the title.
- **inauthor**: Returns results where the text following this keyword is found in the author.
- **subject**: Returns results where the text following this keyword is listed in the category list of the volume.

```
q=<text>[+<keyword>:<value>]
```

Example:

```
q=home+subject:art
```

`orderBy`	string	Sort search results. `
  - "newest" - Most recently published.
  - "relevance" - Relevance to search terms.

`startIndex`	unsigned integer	Index of the first result to return (starts at 0)

`maxResults`	*unsigned integer*	Maximum number of results to return. Acceptable values are 0 to 40, inclusive.

```
curl "https://www.googleapis.com/books/v1/volumes?q=home+subject:art&key=AIzaSyCe2JsmWBjV6Sg5do4S7lNPitIrl3iaNIY&maxResults=2"
```
