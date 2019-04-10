
// console.log(target);
accessToken = 'pk.eyJ1IjoibWphbmRlcnM2IiwiYSI6ImNqdHRoYnpmbjFicjg0NG80bnJ4OTQ0ejMifQ.EnYDyXKQdBO7A1JaBUMXsQ'
let key = `e424ea0eb9b536ada64c484c74ceee72`

document.addEventListener('click', ({ target }) => {
    // 
    let cuisineInput = document.querySelector('#cuisine').value
    // 
    let city = document.querySelector('#city').value
    // 
    let state = document.querySelector('#state').value
    // 
    let search = city + ', ' + state
    // 
    if (target.id === 'submitBtn') {
        document.querySelector('#foodSearch').style.display = ""
        document.querySelector('#foodSearch').innerHTML = ''
        document.querySelector('#foodSearch').style.color = 'black'
        if (cuisineInput === "" || city === "" || state === "" || search === "") {
            document.querySelector('#foodSearch').innerHTML = "Enter all information"
            document.querySelector('#foodSearch').style.color = 'red'
        } else {
            
            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/"${search}".json?access_token=${accessToken}&country=us&place`)
            .then(r => r.json())
            .then(r => {
                document.querySelector('#foodSearch').innerHTML = ''
                    let coords
                    // console.log(r.features)
                    let rFeats = r.features
                    rFeats.forEach(element => {
                        if (element.place_type[0] === 'place') {
                            coords = element.geometry.coordinates
                        }
                    });
                    let [lon, lat] = coords
                    return { lon, lat }
    
                })
                .then(({ lon, lat }) => {
                    fetch(`https://developers.zomato.com/api/v2.1/cuisines?lat=${lat}&lon=${lon}&apikey=${key}`)
                        .then(r => r.json())
                        .then(r => {
                            let cuisine_id
                            let cuisineName = r.cuisines
                            cuisineName.forEach((element) => {
                                if (element.cuisine.cuisine_name === cuisineInput) {
                                    // console.log(element);
                                    // console.log(element.cuisine.cuisine_id);
                                    cuisine_id = element.cuisine.cuisine_id
                                }
                            })
                            return { cuisine_id }
                        })
                        .then(({ cuisine_id }) => {
                            // console.log(lon, lat, cuisine_id);
                            let radius = 1609 // in meters
                            fetch(`https://developers.zomato.com/api/v2.1/search?count=10&lat=${lat}&lon=${lon}&radius=${radius}&cuisines=${cuisine_id}&sort=rating&order=desc&apikey=${key}`)
                                .then(r => r.json())
                                .then(r => {
                                    // console.log(r);
                                    let resCall = r.restaurants
                                    // document.querySelector('#foodSearch').innerHTML = ''
                                    resCall.forEach(element => {
                                        // console.log(element.restaurant)
                    
                                        let resElem = document.createElement('div')
                    
                                        resElem.innerHTML = `
                                            <div class="card">
                                                <div class="card-header">
                                                    <a href="${element.restaurant.url}">${element.restaurant.name}</a>
                                                </div>
                            
                                                <div class="crd-container">
                                                    <div class="card-body row">
                                                        <div class="col-8 col-sm-8">
                                                            <p>${element.restaurant.location.address}</p>
                                                            <p>${element.restaurant.location.locality}</p>
                                                        </div>
                            
                                                        <div class="col-4 col-sm-4">
                                                            <p>Rating: ${element.restaurant.user_rating.aggregate_rating} out of 5</p>
                                                            <p>Votes: ${element.restaurant.user_rating.votes}</p>
                                                            <p>Average Cost for 2: $ ${element.restaurant.average_cost_for_two}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        `
                    
                    
                                        document.querySelector('#foodSearch').append(resElem)
                                    });
                                })
                        })
                })
                .catch(e => console.error(e))
        }


    }
})

