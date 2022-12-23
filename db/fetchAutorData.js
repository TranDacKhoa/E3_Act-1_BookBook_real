fetch("./top-selling-NYT.json")
  .then((response) => response.json())
  .then((json) => json.results.books)
  .then(async (bookList) => {
    const getAuthorKey = async (author) => {
      var authorKey = await fetch(
        `https://openlibrary.org/search/authors.json?q=${book.author}`
      );
      authorKey = await authorKey.json();
      return authorKey.docs[0].key;
    };
    let list = [];
    for (book of bookList) {
      const a = [
        "rank",
        "title",
        "author",
        "book_image",
        "amazon_product_url",
      ].reduce((result, key) => {
        result[key] = book[key];
        return result;
      }, {});
      const res = await getAuthorKey(book.author);
      list.push(
        Object.assign(a, {
          authorAvatar: `https://covers.openlibrary.org/a/olid/${res}-S.jpg`,
        })
      );
    }
    return list;
  })
  .then(async (list) => console.log(list));
