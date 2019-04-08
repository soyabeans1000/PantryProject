//ALLERGIES
//let allergies = ['Gluten', 'Eggs', 'Wheat', 'Shellfish', 'Peanuts', 'Dairy', 'Soy', 'Fish', 'Tree Nuts']
//DIET
let diet = [ 'high-fiber', 'high-protien', 'low-carb', 'low-fat', 'low-sodium', 'balanced']
let allergies = ['fish-free','gluten-free','kosher']

//push clicked items to aArray and dArray
let aArray = []
let dArray = []
//console.log(aArray)
// aSelected = ""
displayA()
displayD()



// //on click that displays aContent that holds a list of allergies with the class of checkA
// document.getElementById('aBtn').addEventListener('click', function () {
//     document.getElementById("content").classList.toggle("show");
// })

//loop through array to display allergy checkboxes
function displayA() {
    //element(), index. 
    allergies.forEach((x, i) => {
        document.getElementById('aContent').innerHTML += `
            
                <input type="checkbox" id='a${i + 1}' value='${allergies[i]}'>
                <label class="form-check-label text-warning" for='${this.id}'>
                    ${allergies[i]}
                </label>
           
        `;
        console.log($(`#a${i + 1}`).val());
    })
};

// on click to display diet Content

// document.getElementById('dBtn').addEventListener('click', function () {
//     document.getElementById("info").classList.toggle("show");

// })
//loop through array to display allergy checkboxes
function displayD() {

    diet.forEach((x, i) => {
        document.getElementById('dContent').innerHTML += `
        
        <input type="checkbox" id='d${i + 1}' value='${diet[i]}'>
                <label class="form-check-label text-warning" for='${this.id}'>
                    ${diet[i]}
                </label>
            `
    })
}



// function to grab selected buttons and push to array
document.getElementById('submit').addEventListener('click', function (e) {
    e.preventDefault();
    aArray = [];
// allergies
    $('.checkA:checked').each(function () {

        aArray.push($(this).val());
    });
   console.log('button pressed');
// diet
    $('.checkD:checked').each(function () {
      
        dArray.push($(this).val());
    });
   // console.log(dArray);

    displayrecipelist()

})