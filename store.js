let title =document.getElementById("title")
let price =document.getElementById("price")
let taxes =document.getElementById("tax")
let ads =document.getElementById("ads")
let discount =document.getElementById("discount")
let total =document.getElementById("total")
let count =document.getElementById("count")
let category =document.getElementById("category")
let submitbtn =document.getElementById("submit")
// get total
function gettotal(){
    if(price.value!="")
    // dont leave a space here
    {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value ;
        // to change string into number ,and leave a space
        total.innerText = result
        total.style.background="#040"
    }
    else{
        total.innerHTML=""
        total.style.background="#7d0000"
    }
}



// create product
let dataPro
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}
else{
    dataPro=[] ;
}
// if there are products , the array will be equl to the products
submitbtn.addEventListener("click" ,()=>{
    let newPro = {
        title :title.value.toLowerCase() ,
        price : price.value ,
        taxes :taxes.value ,
        ads :ads.value ,
        discount : discount.value,
        total :total.innerHTML,
        count :count.value , 
        category :category.value.toLowerCase() ,
    }
    // you can save many objects safely in array
    
        if(newPro.count > 1){
            for(let i = 0; i < newPro.count; i++){
                dataPro.push(newPro)
            }
        }
        else{
            dataPro.push(newPro)
        }
    
    
    
    // excellent
    // then we need to save the array in the localstorage
    localStorage.setItem("product"
     , JSON.stringify(dataPro))
     cleardata()
     showdata()
})
// save data in localstorage
// done
// delete old data
function cleardata(){
    title.value =''
    price.value =''
    taxes.value =''
    ads.value =''
    discount.value =''
    total.innerHTML =''
    count.value=''
    category.value=''
}
// read
function showdata(){
    let table = ''
    for(let i = 0 ; i < dataPro.length;i++){
        table +=  `
        <tr>
        <td class = "one" >${i + 1}</td>
        <td class = "two" >${dataPro[i].title}</td>
        <td class = "three" >${dataPro[i].price}</td>
        <td class = "four" >${dataPro[i].taxes}</td>
        <td class = "five" >${dataPro[i].ads}</td>
        <td class = "six" >${dataPro[i].discount}</td>
        <td class = "seven" >${dataPro[i].total}</td>
        <td class = "eight" >${dataPro[i].category}</td>
        <td class = "nine" ><button onclick ="deldata(${i})" id="delete">Delete</button></td>
    </tr>
        `
    }
    let btndelete = document.querySelector(".deleteall")
    document.getElementById("tbody").innerHTML =table
    if (dataPro.length > 0){
        btndelete.innerHTML=`
        <button onclick =deleteall()>Delete All(${dataPro.length})</button>
        `
    }
    else{
        btndelete.innerHTML = ``
    }
}
showdata()
// count
// delete products
function deldata(ind){
    dataPro.splice(ind ,1)
    // start deleting from ind , remove only one
    localStorage.product = JSON.stringify(dataPro)
    // now it delets but we must add showdata()to be visible
    showdata()
}

// all

function deleteall(){
    localStorage.clear()
    // to remove it from localstorage
    dataPro.splice(0)
    // or
    //     dataPro=[]

    // delete from array
    showdata()

}






// update


function updata(i){
    title.value = dataPro[i].title
    price.value = dataPro[i].price
    ads.value = dataPro[i].ads
    taxes.value = dataPro[i].taxes
    discount.value = dataPro[i].discount
    category.value = dataPro[i].category
    count.style.display = "none"
    gettotal()
    submitbtn.innerHTML = `Update`
    mode = `update`
    tmp = i
    scroll({
        top :0 , 
        behavior :"smooth"
    })
}












// search
let searchmode = `title`
function src(id){
    let searchele = document.getElementById("search")
    if(id === `searchtitle`){
        searchmode = `title`
    }
    else{
        searchmode = `category`
    }
    searchele.focus()
    searchele.value = ''
    showdata()
}


function searchdata(val){
    let table=``
    if(searchmode == `title`){
        for(let i = 0 ;i < dataPro.length ; i++){
            if(dataPro[i].title.includes(val.toLowerCase())){
                table +=  `
                <tr>
                <td class="one">${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick ="deldata(${i})" id="delete">Delete</button></td>
            </tr>
                `    
            }
        }
    }
    else{
        for(let i = 0 ;i < dataPro.length ; i++){
            if(dataPro[i].category.includes(val.toLowerCase())){
                table +=  `
                <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick ="deldata(${i})" id="delete">Delete</button></td>
            </tr>
                `    
            }
        }
    }
    document.getElementById("tbody").innerHTML =table
}
















// clean-data