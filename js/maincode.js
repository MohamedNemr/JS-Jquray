let row= document.querySelector('.row');
let cont=document.querySelector('.cont');
let forma=document.querySelector('.forma');
let body=document.body;
let Data=[];


$('.selecto').click(function(){
    $('.leftNav').toggle(500,function(){
        $('.search').slideToggle(500,function(){
            $('.categories').slideToggle(200,function(){
                $('.area').slideToggle(200,function(){
                    $('.ingred').slideToggle(200,function(){
                        $('.contact').slideToggle(500)
                    })
                })
            })
        })
    });
    

})

async function defaults(){
    let meal=await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    let response= await meal.json();
    Data= response.meals;
    console.log(Data);
    displayData();
    

   
   

}


function displayData(){
    let categ='';
    for(let i=0;i<Data.length;i++){
        categ+=`
        <div class="col-lg-3 position-relative">
     <div onclick=' getDataById(${Data[i].idMeal})'>
                
        <div class="layer fs-2 px-3"><div>${Data[i].strMeal}
        </div>
        
    </div>


        <img class="w-100" src="${Data[i].strMealThumb}
        " alt="">
</div>
</div>
        `

    }
    row.innerHTML=categ;
    

  
    


    
}

async function getDataById(id){
    let trs='';
    let x=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let response=await x.json();
    console.log(response);
    trs+=`
    <div class="row">
    <div class="col-lg-6">
        <img class="w-75" src="${response.meals[0].strMealThumb}" alt="">


    </div>
    <div class="col-lg-6 text-white">
        <h2>instructions</h2>
        <p>${response.meals[0].strInstructions}</p>
        <div class="d-flex justify-content-start">
            <p class="px-1 fw-bold">Area:</p>
            <p>${response.meals[0].strArea}</p>
        </div>
        <div class="d-flex justify-content-start">
            <p class="px-1 fw-bold">Category:</p>
            <p>${response.meals[0].strCategory}</p>
        </div>
        <h2>Recipes:</h2>
        <div class="d-flex flex-wrap mb-4 ">
            <div class="recipeBg p-2  m-2 rounded">${response.meals[0].strIngredient1}</div>
            <div class="recipeBg p-2  m-2 rounded">${response.meals[0].strIngredient2}</div>
            <div class="recipeBg p-2  m-2 rounded">${response.meals[0].strIngredient3}</div>
            <div class="recipeBg p-2  m-2 rounded">${response.meals[0].strIngredient4}</div>
            <div class="recipeBg p-2  m-2 rounded">${response.meals[0].strIngredient5}</div>
            <div class="recipeBg p-2  m-2 rounded">${response.meals[0].strIngredient6}</div>
            <div class="recipeBg p-2  m-2 rounded">${response.meals[0].strIngredient7}</div>
            <div class="recipeBg p-2  m-2 rounded">${response.meals[0].strIngredient8}</div>
            <div class="recipeBg p-2  m-2 rounded">${response.meals[0].strIngredient9}</div>
       
            

        </div>
        <h2>Tags</h2>
        <div class="d-flex flex-wrap mb-4">
            <div class="tagBg p-2  m-2 rounded">${response.meals[0].strTags}</div>



        </div>
        <div>
            <div class="btn bg-success text-white"><a href="${response.meals[0].strSource}">Source</a></div>
            <div class="btn bg-danger"><a href="${response.meals[0].strYoutube}">youtube</a></div>
        </div>
        

        
    </div>

</div>
    
    `
    row.innerHTML=trs;



    



}
 defaults();


async function category(){
   
    let meals= await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
   let response= await meals.json();
    Data=response.categories;
    console.log(Data);
    displayData();
   

    
    
}

async function search(){
    
    forma.innerHTML=`
    <input id=inp1 type="text" class="form form-control me-3 bg-black text-white names" onkeyup="filterSearch()" placeholder="Search By Name">
    <input id=inp2 type="text" class="form form-control bg-black text-white letters" placeholder="Search By First Letter..." maxlength="1" >
    `
    row.innerHTML='';
    $('#inp1').keyup(function(){
        console.log($('#inp1').val());
        filterSearch($('#inp1').val());
    })
   $('#inp2').keyup(function(){
    filterSearch($('#inp2').val());

   })
}

 async function filterSearch(id){
    let x=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${id}`)

    let response=await x.json();
    Data=response.meals;
    console.log(Data);
    
   
    let trs='';

    for(let i=0;i<Data.length;i++){
        trs+=`
        <div class="col-lg-3 position-relative">
        <div onclick=' getDataById(${Data[i].idMeal})'>
                   
           <div class="layer fs-2 px-3"><div>${Data[i].strMeal}
           </div>
           
       </div>
   
   
           <img class="w-100" src="${Data[i].strMealThumb}
           " alt="">
       
   
     </div>
   </div>

        `
    }

    row.innerHTML=trs;
}

 async function categories(){
    let x= await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    let response= await x.json();
    console.log(response.categories);
    Data=response.categories;
    let trs='';
    for(let i=0;i<Data.length;i++){
   
       trs+=`
       
       <div class="col-lg-3 position-relative">
        <div onclick="filterCateg('${Data[i].strCategory}')">
                   
           <div class="layer fs-2 px-3"><div>${Data[i].strCategory}
           </div>
           
       </div>
   
   
           <img class="w-100" src="${Data[i].strCategoryThumb}
           " alt="">
   </div>
   </div>
   
       
       `
    }
    row.innerHTML=trs;
    forma.innerHTML='';

}

 
async function filterCateg(cara){
    let trs='';
    let x= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cara}`)
    let response=await x.json();
    Data=response.meals;
    console.log(Data);
    for(let i=0;i<Data.length;i++){
        trs+=`
        <div class="col-lg-3 position-relative">
       
        <div onclick=' getDataById(${Data[i].idMeal})'>
        <div class="layer fs-2 px-3"><div>${Data[i].strMeal}
        </div>
        
    </div>


        <img class="w-100" src="${Data[i].strMealThumb}
        " alt="">
</div>
</div>

        
        
        `
    }
    row.innerHTML=trs;
    forma.innerHTML='';


}

async function area(){
    let trs='';
let x =await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
let response= await x.json()
Data=response.meals;
console.log(Data);
for(let i=0;i<Data.length;i++){
    trs+=`
    <div class="col-lg-3 position-relative">
    <div onclick="filterByArea('${Data[i].strArea}')">

    <div><i class="icon build  fa-solid fa-city"></i>></div>
    <div class='fs-3 text-white'>${Data[i].strArea}</div>
    </div>

</div>

    
    `
}
row.innerHTML=trs;
forma.innerHTML='';

}

async function filterByArea(id){
    let trs='';
    let x=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${id}`);
    let response=await x.json();
    Data=response.meals;
    for(let i=0;i<Data.length;i++){
        trs+=`
        <div class="col-lg-3 position-relative">
        <div onclick=' getDataById(${Data[i].idMeal})'>
                   
           <div class="layer fs-2 px-3"><div>${Data[i].strMeal}
           </div>
           
       </div>
   
   
           <img class="w-100" src="${Data[i].strMealThumb}
           " alt="">
   </div>
   </div>
   
   
        
        `
    }
    row.innerHTML=trs;
    forma.innerHTML='';


}

async function ingred(){
    trs='';
    let x=await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    let response=await x.json();
    Data=response.meals;
    console.log(Data);
    for(let i=0;i<20;i++){
        trs+=`
        <div class="col-lg-3 position-relative mb-5 text-center">
        <div onclick="filterIngred('${Data[i].strIngredient}')">

    <div><i class="iconingred fs-1 fa-solid fa-bowl-food"></i></div>
    <div class='fs-2 text-white'>${Data[i].strIngredient}</div>
    <div class='testingred text-white'>${Data[i].strDescription}</div>
    </div>
    </div>



        
        `
    }
    row.innerHTML=trs;
    forma.innerHTML='';
}

async function filterIngred(id){
    let trs='';
    let x=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${id}`);
    let response= await x.json();
    Data=response.meals;
    for(let i=0;i<Data.length;i++){
        trs+=`
        <div class="col-lg-3 position-relative">
        <div onclick=' getDataById(${Data[i].idMeal})'>
                   
           <div class="layer fs-2 px-3"><div>${Data[i].strMeal}
           </div>
           
       </div>
   
   
           <img class="w-100" src="${Data[i].strMealThumb}
           " alt="">
   </div>
   </div>
        
        `
    }
    row.innerHTML=trs;
    forma.innerHTML='';

}


// CONTACT US