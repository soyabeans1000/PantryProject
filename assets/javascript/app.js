let ingredientList = []

const renderIngredients = _ => {

  document.querySelector('#ingredients').innerHTML = ''
  ingredientList.forEach((item1, i) => {
    let recipeElem = document.createElement('span')
    recipeElem.textContent = item1
    recipeElem.style.padding = '5px'
    recipeElem.className = 'listItem'
    recipeElem.setAttribute('data-loc', i)
    recipeElem.innerHTML = `${item1}<a href="#"><i class="fa fa-remove" style="font-size:24px;color:red" data-loc="i"></i></a>`
    document.querySelector('#ingredients').append(recipeElem)
  })
}

document.querySelector('#addItem').addEventListener('click', e => {
  e.preventDefault()
  ingredientList.push(document.querySelector('#item1').value)
  document.querySelector('#item1').value = ''
  renderIngredients()
  displayrecipelist()
})

renderIngredients()

function displayrecipelist() {
  document.querySelector('#reciepe_container').style.display = ""
  document.querySelector('#reciepe_container').innerHTML = ""
  console.log(`https://api.edamam.com/search?q=${ingredientList}&app_id=4d9c5eb2&app_key=90e03d78717765f04108f5baf0340f64`)
  fetch(`https://api.edamam.com/search?q=${ingredientList}&app_id=4d9c5eb2&app_key=90e03d78717765f04108f5baf0340f64`)
    .then(r => r.json())
    .then(r => {

      console.log(r)

      console.log(r.hits)
      r.hits.forEach(listItem => {

        console.log(listItem)


        let articleElm = document.createElement('div')

        articleElm.className = 'card mb-3'



        articleElm.innerHTML = `<div class="row no-gutters">
                        <div class="col-md-4">
                          <img src="${listItem.recipe.image}" class="card-img" alt="...">
                        </div>
                        <div class="col-md-8">
                          <div class="card-body">
                            <h5 class="card-title"><a href="${listItem.recipe.url}"> ${listItem.recipe.label}</a></h5>
                         <p class="card-text">Source:${listItem.recipe.source}<br>
                         Calories:${Math.round(parseInt(listItem.recipe.calories))}
                          <br><a href="https://www.facebook.com/sharer/sharer.php?u=${listItem.recipe.url}" title="Share on Facebook" target="_blank" class="btn btn-facebook"><i class="fa fa-facebook"></i> Facebook</a><a href="http://twitter.com/home?status=${listItem.recipe.url}" title="Share on Twitter" target="_blank" class="btn btn-twitter"><i class="fa fa-twitter"></i> Twitter</a></p>
                            </div>
                        </div>
                      </div>`
        document.querySelector('#reciepe_container').append(articleElm)
        document.querySelector('#reciepe_container').append(document.createElement('BR'))

      })

    })
    //catch any errors
    .catch(e => console.error(e))
}

document.addEventListener('click', e => {
  //if trash button clicked
  if (e.target.className === 'fa fa-remove') {
    let delIndex = e.target.getAttribute('data-loc')
    ingredientList.splice(delIndex, 1)
    renderIngredients()
 }

})
