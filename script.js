const searchBookInput = document.getElementById("searchBook")
const searchAuthorBtn = document.getElementById("searchByAuthor")
const searchCategoryBtn = document.getElementById("searchByCategory")
const bookDisplayBtn = document.querySelector("#bookAdd")

const bookFormDisplay = document.querySelector("#bookFormContainerWrapper")
const addBookForm = document.getElementById("addBookForm")
const addBook = document.querySelector("#addBook")
const closeBookAddition = document.querySelector("#closeBookAddition")

const priceHighFilter = document.getElementById("priceHigh")
const priceLowFilter = document.getElementById("priceLow")
const priceStandartFilter = document.getElementById("standartOrder")
const bookContainer = document.querySelector(".bookContainer")
let LSmasyvas = [];

window.addEventListener("load", (event) => {
  if (localStorage.getItem('bookArray') === null) {
    localStorage.setItem("bookArray", JSON.stringify(LSmasyvas));
}
  const localStrorageMasyvas = localStorage.getItem("bookArray");
  const masyvas1 = JSON.parse(localStrorageMasyvas)
  for (let i = 0; i < masyvas1.length; i++) {
    const bookCard = document.createElement("div")
    bookCard.setAttribute("id", `${i}`)
    bookCard.classList.add("bookCard")

    const bookImgContainer = document.createElement("div")
    bookImgContainer.classList.add("bookImgContainer")
    const image = document.createElement("img")
    image.src = masyvas1[i].vaizdas
    bookImgContainer.appendChild(image)

    const bookDetails = document.createElement("div")
    bookDetails.classList.add("bookDetails")

    const bookTitleAndAuthor = document.createElement("div")
    bookTitleAndAuthor.classList.add("bookTitleAndAuthor")
    const bookName = document.createElement("p")
    bookName.setAttribute("id", "bookName")
    bookName.textContent = masyvas1[i].pavadinimas
    const ind = masyvas1.findIndex(item => { return item.pavadinimas == bookName.textContent});
    const authorName = document.createElement("p")
    authorName.setAttribute("id", "authorName")
    authorName.textContent = masyvas1[i].autorius
    bookTitleAndAuthor.appendChild(bookName)
    bookTitleAndAuthor.appendChild(authorName)
    
    const bookCatAndYear = document.createElement("div")
    bookCatAndYear.classList.add("bookCatAndYear")
    const categoryName = document.createElement("p")
    categoryName.setAttribute("id", "categoryName")
    categoryName.textContent = masyvas1[i].kategorija
    const yearPublish = document.createElement("p")
    yearPublish.setAttribute("id", "yearPublish")
    yearPublish.textContent = masyvas1[i].metai
    bookCatAndYear.appendChild(categoryName)
    bookCatAndYear.appendChild(yearPublish)

    const bookPriceAndLike = document.createElement("div")
    bookPriceAndLike.classList.add("bookPriceAndLike")
    const bookPrice = document.createElement("p")
    bookPrice.setAttribute("id", "bookPrice")
    bookPrice.innerHTML = `${masyvas1[i].kaina}&nbsp;€`
    const bookLike = document.createElement("i")
    bookLike.setAttribute("id", "bookLike")
    bookLike.classList.add(`${masyvas1[i].heart}`)
    bookLike.classList.add("fa-heart")
    bookLike.onclick = function() {
      const bookId = document.getElementById(`${i}`)
      const heart = bookId.getElementsByTagName("i")[0];
    if (heart.classList.contains("fa-regular")) {
        heart.classList.remove("fa-regular");
        heart.classList.add("fa-solid");
        const localStrorageMasyvas = localStorage.getItem("bookArray");
        const LSmasyvas = JSON.parse(localStrorageMasyvas)
        LSmasyvas[`${i}`].heart = "fa-solid";
        const bookArray = JSON.stringify(LSmasyvas)
        localStorage.removeItem("bookArray")
        localStorage.setItem("bookArray", bookArray)
    } else if (heart.classList.contains("fa-solid")) {
        heart.classList.remove("fa-solid");
        heart.classList.add("fa-regular");
        const localStrorageMasyvas = localStorage.getItem("bookArray");
        const heartmasyvas = JSON.parse(localStrorageMasyvas)
        heartmasyvas[`${i}`].heart = "fa-regular";
        const bookArray = JSON.stringify(heartmasyvas)
        localStorage.removeItem("bookArray")
        console.log(heartmasyvas)
        localStorage.setItem("bookArray", bookArray)
    }
  }
    bookPriceAndLike.appendChild(bookPrice)
    bookPriceAndLike.appendChild(bookLike)

    const bookCardButtons = document.createElement("div")
    bookCardButtons.classList.add("bookCardButtons")
    const editBook = document.createElement("button")
    editBook.setAttribute("id", "editBook")
    editBook.textContent = "Taisyti"
    editBook.onclick = function() {
      bookFormDisplay.style.display = "block"
      const bookEdit = document.getElementById(`${i}`)
      document.getElementById("addBookForm")
      let bookEditVal = document.getElementById("bookTitle")
      let authorEditVal = document.getElementById("author")
      let categoryEditVal = document.getElementById("category")
      let yearEditVal = document.getElementById("yearPub")
      let priceEditVal = document.getElementById("price")
      let pictureEditVal = document.getElementById("picture")
      let heartEditVal = document.getElementById("bookLike")

      const editBookBtn = document.getElementById("addBook")
      editBookBtn.innerHTML = "Taisyti"

      


      const StrorageMasyvas = localStorage.getItem("bookArray");
      const masyvasedit = JSON.parse(StrorageMasyvas)

      bookEditVal.value = masyvasedit[`${i}`].pavadinimas
      authorEditVal.value = masyvasedit[`${i}`].autorius
      categoryEditVal.value = masyvasedit[`${i}`].kategorija
      yearEditVal.value = masyvasedit[`${i}`].metai
      priceEditVal.value = masyvasedit[`${i}`].kaina
      pictureEditVal.value = masyvasedit[`${i}`].vaizdas
      heartEditVal.value = masyvasedit[`${i}`].heart
      console.log(heartEditVal.value)



      editBookBtn.addEventListener("click", function(){
        masyvasedit.splice(`${i}`, 1);
        const removeItem = document.getElementById(`${i}`)
        removeItem.remove()
        const bookArray = JSON.stringify(masyvasedit)
        localStorage.removeItem("bookArray")
        localStorage.setItem("bookArray", bookArray)
        bookFormDisplay.style.display = "none"
      })
      
      

    }
    const deleteBook = document.createElement("button")
    deleteBook.setAttribute("id", "deleteBook")
    deleteBook.textContent = "Ištrinti"
    deleteBook.onclick = function() {
      const StrorageMasyvas = localStorage.getItem("bookArray");
      const masyvasdelete = JSON.parse(StrorageMasyvas)
      masyvasdelete.splice(ind, 1);
      const bookArray = JSON.stringify(masyvasdelete)
      localStorage.removeItem("bookArray")
      localStorage.setItem("bookArray", bookArray)
      const removeItem = document.getElementById(`${ind}`)
      removeItem.remove()
    }
    bookCardButtons.appendChild(editBook)
    bookCardButtons.appendChild(deleteBook)

    bookDetails.appendChild(bookTitleAndAuthor)
    bookDetails.appendChild(bookCatAndYear)
    bookDetails.appendChild(bookPriceAndLike)
    bookDetails.appendChild(bookCardButtons)

    bookCard.appendChild(bookImgContainer)
    bookCard.appendChild(bookDetails)

    bookContainer.append(bookCard)
    }
});

bookDisplayBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (bookFormDisplay.style.display === "block") {
        bookFormDisplay.style.display = "none";
    } else {
        bookFormDisplay.classList.toggle("bookFormContainerWrapper");
        bookFormDisplay.style.display = "block";
    }
  });

  addBookForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const bookTitle = document.getElementById("bookTitle").value
    const authorTitle = document.getElementById("author").value
    const categoryTitle = document.getElementById("category").value
    const yearTitle = document.getElementById("yearPub").value
    const priceTitle = document.getElementById("price").value
    const pictureTitle = document.getElementById("picture").value
    const bookContainer = document.getElementById("bookContainer")

    let obj = {
      pavadinimas: bookTitle,
      autorius: authorTitle,
      kategorija: categoryTitle,
      metai: yearTitle,
      kaina: priceTitle,
      vaizdas: pictureTitle, 
      heart: "fa-regular"
    }

    const bookCard = document.createElement("div")
    bookCard.classList.add("bookCard")

    const localStrorageMasyvas = localStorage.getItem("bookArray");
    const LSmasyvas = JSON.parse(localStrorageMasyvas)
    LSmasyvas.push(obj)
    const bookArray = JSON.stringify(LSmasyvas)
    localStorage.removeItem("bookArray")
    console.log(LSmasyvas)
    localStorage.setItem("bookArray", bookArray)
    location.reload()

  }
)

  closeBookAddition.addEventListener("click", function (e) {
    e.preventDefault();
    bookFormDisplay.style.display = "none";
  })

  searchBookInput.addEventListener("keypress", function (e) {
    if(e.key === "Enter") {
    const localStrorageMasyvas = localStorage.getItem("bookArray");
    const bookValue = searchBookInput.value
    const LSmasyvas = JSON.parse(localStrorageMasyvas)
    const results = LSmasyvas.filter(obj => {
      return obj.pavadinimas === bookValue;
         
    }
    );
    let bookContainer = document.getElementById("bookContainer")
    bookContainer.innerHTML = null
    for (let i = 0; i < results.length; i++) {
      const bookCard = document.createElement("div")
      bookCard.setAttribute("id", `${i}`)
      bookCard.classList.add("bookCard")
  
      const bookImgContainer = document.createElement("div")
      bookImgContainer.classList.add("bookImgContainer")
      const image = document.createElement("img")
      image.src = results[i].vaizdas
      bookImgContainer.appendChild(image)
  
      const bookDetails = document.createElement("div")
      bookDetails.classList.add("bookDetails")
  
      const bookTitleAndAuthor = document.createElement("div")
      bookTitleAndAuthor.classList.add("bookTitleAndAuthor")
      const bookName = document.createElement("p")
      bookName.setAttribute("id", "bookName")
      bookName.textContent = results[i].pavadinimas
      const ind = results.findIndex(item => { return item.pavadinimas == bookName.textContent});
      const authorName = document.createElement("p")
      authorName.setAttribute("id", "authorName")
      authorName.textContent = results[i].autorius
      bookTitleAndAuthor.appendChild(bookName)
      bookTitleAndAuthor.appendChild(authorName)
      
      const bookCatAndYear = document.createElement("div")
      bookCatAndYear.classList.add("bookCatAndYear")
      const categoryName = document.createElement("p")
      categoryName.setAttribute("id", "categoryName")
      categoryName.textContent = results[i].kategorija
      const yearPublish = document.createElement("p")
      yearPublish.setAttribute("id", "yearPublish")
      yearPublish.textContent = results[i].metai
      bookCatAndYear.appendChild(categoryName)
      bookCatAndYear.appendChild(yearPublish)
  
      const bookPriceAndLike = document.createElement("div")
      bookPriceAndLike.classList.add("bookPriceAndLike")
      const bookPrice = document.createElement("p")
      bookPrice.setAttribute("id", "bookPrice")
      bookPrice.innerHTML = `${results[i].kaina}&nbsp;€`
      const bookLike = document.createElement("i")
      bookLike.setAttribute("id", "bookLike")
      bookLike.classList.add(`${results[i].heart}`)
      bookLike.classList.add("fa-heart")
      bookPriceAndLike.appendChild(bookPrice)
      bookPriceAndLike.appendChild(bookLike)
  
      const bookCardButtons = document.createElement("div")
      bookCardButtons.classList.add("bookCardButtons")
      const editBook = document.createElement("button")
      editBook.setAttribute("id", "editBook")
      editBook.textContent = "Taisyti"
      const deleteBook = document.createElement("button")
      deleteBook.setAttribute("id", "deleteBook")
      deleteBook.textContent = "Ištrinti"
      bookCardButtons.appendChild(editBook)
      bookCardButtons.appendChild(deleteBook)
  
      bookDetails.appendChild(bookTitleAndAuthor)
      bookDetails.appendChild(bookCatAndYear)
      bookDetails.appendChild(bookPriceAndLike)
      bookDetails.appendChild(bookCardButtons)
  
      bookCard.appendChild(bookImgContainer)
      bookCard.appendChild(bookDetails)
  
      bookContainer.append(bookCard)
      }
    }
  })
  searchAuthorBtn.addEventListener("click", function () {
    const localStrorageMasyvas = localStorage.getItem("bookArray");
    const authorValue = searchBookInput.value
    const LSmasyvas = JSON.parse(localStrorageMasyvas)
    const results = LSmasyvas.filter(obj => {
      return obj.autorius === authorValue;
         
    }
    );
    let bookContainer = document.getElementById("bookContainer")
    bookContainer.innerHTML = null
    for (let i = 0; i < results.length; i++) {
      const bookCard = document.createElement("div")
      bookCard.setAttribute("id", `${i}`)
      bookCard.classList.add("bookCard")
  
      const bookImgContainer = document.createElement("div")
      bookImgContainer.classList.add("bookImgContainer")
      const image = document.createElement("img")
      image.src = results[i].vaizdas
      bookImgContainer.appendChild(image)
  
      const bookDetails = document.createElement("div")
      bookDetails.classList.add("bookDetails")
  
      const bookTitleAndAuthor = document.createElement("div")
      bookTitleAndAuthor.classList.add("bookTitleAndAuthor")
      const bookName = document.createElement("p")
      bookName.setAttribute("id", "bookName")
      bookName.textContent = results[i].pavadinimas
      const ind = results.findIndex(item => { return item.pavadinimas == bookName.textContent});
      const authorName = document.createElement("p")
      authorName.setAttribute("id", "authorName")
      authorName.textContent = results[i].autorius
      bookTitleAndAuthor.appendChild(bookName)
      bookTitleAndAuthor.appendChild(authorName)
      
      const bookCatAndYear = document.createElement("div")
      bookCatAndYear.classList.add("bookCatAndYear")
      const categoryName = document.createElement("p")
      categoryName.setAttribute("id", "categoryName")
      categoryName.textContent = results[i].kategorija
      const yearPublish = document.createElement("p")
      yearPublish.setAttribute("id", "yearPublish")
      yearPublish.textContent = results[i].metai
      bookCatAndYear.appendChild(categoryName)
      bookCatAndYear.appendChild(yearPublish)
  
      const bookPriceAndLike = document.createElement("div")
      bookPriceAndLike.classList.add("bookPriceAndLike")
      const bookPrice = document.createElement("p")
      bookPrice.setAttribute("id", "bookPrice")
      bookPrice.innerHTML = `${results[i].kaina}&nbsp;€`
      const bookLike = document.createElement("i")
      bookLike.setAttribute("id", "bookLike")
      bookLike.classList.add(`${results[i].heart}`)
      bookLike.classList.add("fa-heart")
      bookPriceAndLike.appendChild(bookPrice)
      bookPriceAndLike.appendChild(bookLike)
  
      const bookCardButtons = document.createElement("div")
      bookCardButtons.classList.add("bookCardButtons")
      const editBook = document.createElement("button")
      editBook.setAttribute("id", "editBook")
      editBook.textContent = "Taisyti"
      const deleteBook = document.createElement("button")
      deleteBook.setAttribute("id", "deleteBook")
      deleteBook.textContent = "Ištrinti"
      bookCardButtons.appendChild(editBook)
      bookCardButtons.appendChild(deleteBook)
  
      bookDetails.appendChild(bookTitleAndAuthor)
      bookDetails.appendChild(bookCatAndYear)
      bookDetails.appendChild(bookPriceAndLike)
      bookDetails.appendChild(bookCardButtons)
  
      bookCard.appendChild(bookImgContainer)
      bookCard.appendChild(bookDetails)
  
      bookContainer.append(bookCard)
      }
    }
  )
  searchCategoryBtn.addEventListener("click", function () {
    const localStrorageMasyvas = localStorage.getItem("bookArray");
    const catValue = searchBookInput.value
    const LSmasyvas = JSON.parse(localStrorageMasyvas)
    const results = LSmasyvas.filter(obj => {
      return obj.kategorija === catValue;
         
    }
    );
    let bookContainer = document.getElementById("bookContainer")
    bookContainer.innerHTML = null
    for (let i = 0; i < results.length; i++) {
      const bookCard = document.createElement("div")
      bookCard.setAttribute("id", `${i}`)
      bookCard.classList.add("bookCard")
  
      const bookImgContainer = document.createElement("div")
      bookImgContainer.classList.add("bookImgContainer")
      const image = document.createElement("img")
      image.src = results[i].vaizdas
      bookImgContainer.appendChild(image)
  
      const bookDetails = document.createElement("div")
      bookDetails.classList.add("bookDetails")
  
      const bookTitleAndAuthor = document.createElement("div")
      bookTitleAndAuthor.classList.add("bookTitleAndAuthor")
      const bookName = document.createElement("p")
      bookName.setAttribute("id", "bookName")
      bookName.textContent = results[i].pavadinimas
      const ind = results.findIndex(item => { return item.pavadinimas == bookName.textContent});
      const authorName = document.createElement("p")
      authorName.setAttribute("id", "authorName")
      authorName.textContent = results[i].autorius
      bookTitleAndAuthor.appendChild(bookName)
      bookTitleAndAuthor.appendChild(authorName)
      
      const bookCatAndYear = document.createElement("div")
      bookCatAndYear.classList.add("bookCatAndYear")
      const categoryName = document.createElement("p")
      categoryName.setAttribute("id", "categoryName")
      categoryName.textContent = results[i].kategorija
      const yearPublish = document.createElement("p")
      yearPublish.setAttribute("id", "yearPublish")
      yearPublish.textContent = results[i].metai
      bookCatAndYear.appendChild(categoryName)
      bookCatAndYear.appendChild(yearPublish)
  
      const bookPriceAndLike = document.createElement("div")
      bookPriceAndLike.classList.add("bookPriceAndLike")
      const bookPrice = document.createElement("p")
      bookPrice.setAttribute("id", "bookPrice")
      bookPrice.innerHTML = `${results[i].kaina}&nbsp;€`
      const bookLike = document.createElement("i")
      bookLike.setAttribute("id", "bookLike")
      bookLike.classList.add(`${results[i].heart}`)
      bookLike.classList.add("fa-heart")
      bookPriceAndLike.appendChild(bookPrice)
      bookPriceAndLike.appendChild(bookLike)
  
      const bookCardButtons = document.createElement("div")
      bookCardButtons.classList.add("bookCardButtons")
      const editBook = document.createElement("button")
      editBook.setAttribute("id", "editBook")
      editBook.textContent = "Taisyti"
      const deleteBook = document.createElement("button")
      deleteBook.setAttribute("id", "deleteBook")
      deleteBook.textContent = "Ištrinti"
      bookCardButtons.appendChild(editBook)
      bookCardButtons.appendChild(deleteBook)
  
      bookDetails.appendChild(bookTitleAndAuthor)
      bookDetails.appendChild(bookCatAndYear)
      bookDetails.appendChild(bookPriceAndLike)
      bookDetails.appendChild(bookCardButtons)
  
      bookCard.appendChild(bookImgContainer)
      bookCard.appendChild(bookDetails)
  
      bookContainer.append(bookCard)
      }
    }
  )
  priceHighFilter.addEventListener("click", function () {
    const localStrorageMasyvas = localStorage.getItem("bookArray");
    const LSmasyvas = JSON.parse(localStrorageMasyvas)
    let results = LSmasyvas.sort((a, b) => b.kaina - a.kaina);
    let bookContainer = document.getElementById("bookContainer")
    bookContainer.innerHTML = null     
    
    
    for (let i = 0; i < results.length; i++) {
      const bookCard = document.createElement("div")
      bookCard.setAttribute("id", `${i}`)
      bookCard.classList.add("bookCard")
  
      const bookImgContainer = document.createElement("div")
      bookImgContainer.classList.add("bookImgContainer")
      const image = document.createElement("img")
      image.src = results[i].vaizdas
      bookImgContainer.appendChild(image)
  
      const bookDetails = document.createElement("div")
      bookDetails.classList.add("bookDetails")
  
      const bookTitleAndAuthor = document.createElement("div")
      bookTitleAndAuthor.classList.add("bookTitleAndAuthor")
      const bookName = document.createElement("p")
      bookName.setAttribute("id", "bookName")
      bookName.textContent = results[i].pavadinimas
      const ind = results.findIndex(item => { return item.pavadinimas == bookName.textContent});
      const authorName = document.createElement("p")
      authorName.setAttribute("id", "authorName")
      authorName.textContent = results[i].autorius
      bookTitleAndAuthor.appendChild(bookName)
      bookTitleAndAuthor.appendChild(authorName)
      
      const bookCatAndYear = document.createElement("div")
      bookCatAndYear.classList.add("bookCatAndYear")
      const categoryName = document.createElement("p")
      categoryName.setAttribute("id", "categoryName")
      categoryName.textContent = results[i].kategorija
      const yearPublish = document.createElement("p")
      yearPublish.setAttribute("id", "yearPublish")
      yearPublish.textContent = results[i].metai
      bookCatAndYear.appendChild(categoryName)
      bookCatAndYear.appendChild(yearPublish)
  
      const bookPriceAndLike = document.createElement("div")
      bookPriceAndLike.classList.add("bookPriceAndLike")
      const bookPrice = document.createElement("p")
      bookPrice.setAttribute("id", "bookPrice")
      bookPrice.innerHTML = `${results[i].kaina}&nbsp;€`
      const bookLike = document.createElement("i")
      bookLike.setAttribute("id", "bookLike")
      bookLike.classList.add(`${results[i].heart}`)
      bookLike.classList.add("fa-heart")
      bookPriceAndLike.appendChild(bookPrice)
      bookPriceAndLike.appendChild(bookLike)
  
      const bookCardButtons = document.createElement("div")
      bookCardButtons.classList.add("bookCardButtons")
      const editBook = document.createElement("button")
      editBook.setAttribute("id", "editBook")
      editBook.textContent = "Taisyti"
      const deleteBook = document.createElement("button")
      deleteBook.setAttribute("id", "deleteBook")
      deleteBook.textContent = "Ištrinti"
      bookCardButtons.appendChild(editBook)
      bookCardButtons.appendChild(deleteBook)
  
      bookDetails.appendChild(bookTitleAndAuthor)
      bookDetails.appendChild(bookCatAndYear)
      bookDetails.appendChild(bookPriceAndLike)
      bookDetails.appendChild(bookCardButtons)
  
      bookCard.appendChild(bookImgContainer)
      bookCard.appendChild(bookDetails)
  
      bookContainer.append(bookCard)
      }
    }
  )
  priceLowFilter.addEventListener("click", function () {
    const localStrorageMasyvas = localStorage.getItem("bookArray");
    const LSmasyvas = JSON.parse(localStrorageMasyvas)
    let results = LSmasyvas.sort((a, b) => a.kaina - b.kaina);
    let bookContainer = document.getElementById("bookContainer")
    bookContainer.innerHTML = null     
    
    
    for (let i = 0; i < results.length; i++) {
      const bookCard = document.createElement("div")
      bookCard.setAttribute("id", `${i}`)
      bookCard.classList.add("bookCard")
  
      const bookImgContainer = document.createElement("div")
      bookImgContainer.classList.add("bookImgContainer")
      const image = document.createElement("img")
      image.src = results[i].vaizdas
      bookImgContainer.appendChild(image)
  
      const bookDetails = document.createElement("div")
      bookDetails.classList.add("bookDetails")
  
      const bookTitleAndAuthor = document.createElement("div")
      bookTitleAndAuthor.classList.add("bookTitleAndAuthor")
      const bookName = document.createElement("p")
      bookName.setAttribute("id", "bookName")
      bookName.textContent = results[i].pavadinimas
      const ind = results.findIndex(item => { return item.pavadinimas == bookName.textContent});
      const authorName = document.createElement("p")
      authorName.setAttribute("id", "authorName")
      authorName.textContent = results[i].autorius
      bookTitleAndAuthor.appendChild(bookName)
      bookTitleAndAuthor.appendChild(authorName)
      
      const bookCatAndYear = document.createElement("div")
      bookCatAndYear.classList.add("bookCatAndYear")
      const categoryName = document.createElement("p")
      categoryName.setAttribute("id", "categoryName")
      categoryName.textContent = results[i].kategorija
      const yearPublish = document.createElement("p")
      yearPublish.setAttribute("id", "yearPublish")
      yearPublish.textContent = results[i].metai
      bookCatAndYear.appendChild(categoryName)
      bookCatAndYear.appendChild(yearPublish)
  
      const bookPriceAndLike = document.createElement("div")
      bookPriceAndLike.classList.add("bookPriceAndLike")
      const bookPrice = document.createElement("p")
      bookPrice.setAttribute("id", "bookPrice")
      bookPrice.innerHTML = `${results[i].kaina}&nbsp;€`
      const bookLike = document.createElement("i")
      bookLike.setAttribute("id", "bookLike")
      bookLike.classList.add(`${results[i].heart}`)
      bookLike.classList.add("fa-heart")
      bookPriceAndLike.appendChild(bookPrice)
      bookPriceAndLike.appendChild(bookLike)
  
      const bookCardButtons = document.createElement("div")
      bookCardButtons.classList.add("bookCardButtons")
      const editBook = document.createElement("button")
      editBook.setAttribute("id", "editBook")
      editBook.textContent = "Taisyti"
      const deleteBook = document.createElement("button")
      deleteBook.setAttribute("id", "deleteBook")
      deleteBook.textContent = "Ištrinti"
      bookCardButtons.appendChild(editBook)
      bookCardButtons.appendChild(deleteBook)
  
      bookDetails.appendChild(bookTitleAndAuthor)
      bookDetails.appendChild(bookCatAndYear)
      bookDetails.appendChild(bookPriceAndLike)
      bookDetails.appendChild(bookCardButtons)
  
      bookCard.appendChild(bookImgContainer)
      bookCard.appendChild(bookDetails)
  
      bookContainer.append(bookCard)
      }
    }
  )
  priceStandartFilter.addEventListener("click", function () {
    location.reload()
    }
  )

  