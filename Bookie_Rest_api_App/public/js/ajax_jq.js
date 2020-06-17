/**************************************************************************
Author:   Adeyemi Adedoyin Simeon
Date:     20th Oct., 2019
Language: NodeJs, Express, jQuery, Vanilla-Js, CSS, HTML, SQL, AJAX, JSON
Version:  1.4
E-mail:   adeyemi.sa1@gmail.com
Github:   https://github.com/SimeonDee
Link:     https://github.com/SimeonDee/bookie-rest-api-utb-donsim
Status:   Completed...
***************************************************************************

*Note: Please reference the author whenever and wherever you use all/portion of this code*
*/

/*
# --------------------------------------------------------------------------------------------------------
                                    MY PROFILE:
# --------------------------------------------------------------------------------------------------------                            
    
Contact:
    For more details, projects, training or consultancy on AI, ML or Software Dev.
    
    Phone:   +2348064555381 
    Mail:    adeyemi.sa1@gmail.com 
    Github:  https://github.com/SimeonDee
      
* Web, Mobile  or Desktop Software Developments:
  I code in ...
     * Python 
         {MACHINE LEARNING: numpy, pandas, matplotlib, seaborn, sci-kit learn, nltk, keras, pytouch, etc; 
         WEB: DJango} 
     
     * Javascript {WEB: Node, express react, angular, passport; MOBILE: Cordova}
     * PHP (Laravel);
     * Java (Spring Boot), 
     * VB.Net
     * Others: {Lang: Kotlin, Dart; UI: Flutter, React} 
    
* DBase Backends:
  Have used ...  
    MongoDB, MySQL, Ms SQL Server, PostGress, SQLite.
    
* App. Deployments and Cloud Orchestration:
  Conversant with and Have Accessed ...

    Docker Container(Docker, Docker Hub), 
    (Kubernetes) on GCP, Ms Azure, AWS (Elastic BeanStalk);
    Heroku
    Cloud Services Worked with: GCP, Ms Azure, AWS, IBM Cloud

* Collaborations, Code Bases and Repositories:
  Currently using ...
    GitHub
    Docker Hub
    NPM
    
* Blockchain Tech:
    Hyperledger Fabric, Composer

* Platforms: 
    GitHub:     https://github.com/SimeonDee
    Hackerrank: https://www.hackerrank.com/adeyemi_sa1
    Kaggle:     https:/www.kaggle.com/simeondee
    Zindi:      https://zindi.africa/users/SimeonDee
    LinkedIn:   https://www.linkedin.com/in/adedoyin-adeyemi-a7827b160
    twitter:    @SimeonDeeCrown

* Professional Body Memberships:
    Member, Data Science Nigeria (DSN)
    Member, Nigeria Computer Society (NCS)
    Member, Intn'l Strategic Management Institute (ISMI)

# --------------------------------------------------------------------------------------------------------
                                    END PROFILE
# --------------------------------------------------------------------------------------------------------                            
*/ 

/* 
IMPORTANT NOTE:
    * Comment/Comment any portion of either JQuery or Vanilla-js that you don't wish to use, 
    * Don't leave the two open at any given time, there will be conflict
    * I intentionally created two forms so that you can switch to the
*/



// ********************************************************************************
// jQUERY-ONLY VERSION HERE FOR REST API - Ajax Requests (GET, POST, PUT & DELETE)
// ********************************************************************************

$(()=>{

    // Handling GET/FETCH Api
    $('#get-books').on('click', ()=>{
       //console.log('Hello jQuery');
       $.ajax({
           url: '/books',
           method: 'GET',
           contentType: 'application/json',
           success: (response) =>{
               
               let books = response.books;
               //console.log(books);
               
               let tbodyEl = $("#table-body");
               tbodyEl.html(''); // resets in case it previously contain data
               let htmlStr = '';
            
               $(".content-body").hide();
               books.forEach(book=>{
                htmlStr += `<tr id='${book.id}'>
                                <td class='id'> ${book.id} </td>
                                <td> <input class='author' type='text' value='${book.author}'> </td>
                                <td> <input class='title' type='text' value='${book.title}'> </td>
                                <td> 
                                    <button class='update-button'> Update </button> 
                                    <button class='delete-button'> Delete </button> 
                                </td>
                            </tr>`;
               });
               
               tbodyEl.html(htmlStr);
               $(".content-body").show();

           },
           error: (error)=>{
               if(error){
                   alert('Could not get resource from server: ', error.message);
               }
           }

       });
    });

    // Handling POST/SAVE Api
    $("#input-form").on("submit", (event)=>{
        event.preventDefault();
        const authorEl = $("#author");
        const titleEl = $("#title");

        if(authorEl.val() && titleEl.val()){ // Post if contains data
        
            $.ajax({
                url: '/books',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({book: {author: authorEl.val(), title: titleEl.val()}}),
                success: (response)=>{
                    //console.log(response);
                    authorEl.val('');
                    titleEl.val('');
                    
                    // Show feedback
                    alert(response.message);
                    
                    // Get updated records
                    $('#get-books').click();
                    authorEl.focus();
                },
                error: (error)=>{
                    if(error){
                        console.log(error);
                        throw error;

                    }
                }
            });

        } else{

            alert('All fields are required. Confirm your entries.')
            $("#author").focus();

        }
        
    });

    // Handling UPDATE(PUT)/DELETE Api
    $('#book-table').on('click', '.update-button', (event)=>{
        
        
        const clickedEl = $(event.target)[0];
        
        const rowEl = clickedEl.parentNode.parentNode;
        const id = rowEl.id;

        const author = $(rowEl).find('.author').val();
        const title = $(rowEl).find('.title').val();
        
        
        if(id){
            $.ajax({
                url: '/books/' + id,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({book: {author: author, title: title}}),
                success: (response) =>{
                    alert(response.message);
                    
                    $('#get-books').click();  // force-click to show updated record

                },
                error: (error)=>{
                    if(error){
                        alert('Could not update resource. Server error: \n', error.message);
                    }
                }

            });

        } else { // no id found
            alert('Cannot find book ID');
        }

    }); 


    // Handling DELETE Api Request
    $('#book-table').on('click', '.delete-button', ()=>{
        const clickedEl = $(event.target)[0];
        //const id = clickedEl.classList[1];
        const rowEl = clickedEl.parentNode.parentNode;
        const id = rowEl.id;

        if(id){
            $.ajax({
                url: '/books/' + id,
                method: 'DELETE',
                contentType: 'application/json',
                success: (response) =>{
                    alert(response.message);
                    
                    $('#get-books').click();  // force-click to show updated record

                },
                error: (error)=>{
                    if(error){
                        alert('Could not update resource. Server error: \n', error.message);
                    }
                }

            });

        } else { // no id found
            alert('Cannot find book ID');
        }

    });

});


// ********************************************************************************
// VANILLA JAVASCRIPT-ONLY VERSION HERE for Ajax Requests (GET, POST, PUT & DELETE)
// ********************************************************************************

/*
document.getElementById("get-books-js").addEventListener('click', onGetBooksClick);
//document.getElementById("input-form").addEventListener("submit", onFormInputSubmit);

async function onGetBooksClick(){
    let response = await fetch('/books', {method:'GET', contentType: 'application/json'});
    let result = await response.json();
    let books = result.books;

    const tbodyEl = document.getElementById('table-body');
    const bookBodyEl = document.getElementsByClassName("content-body")[0];
    
    bookBodyEl.style.display = 'none';
    tbodyEl.innerHTML = '';
               
    books.forEach(book=>{
        tbodyEl.innerHTML +=`<tr id='${book.id}'>
                    <td> ${book.id} </td>
                    <td> <input class='author' type='text' value='${book.author}'> </td>
                    <td> <input class='title' type='text' value='${book.title}'> </td>
                    <td> 
                        <button class='update-button'}' onclick='updateButtonClickhandler(event);'> Update </button> 
                        <button class='delete-button' onclick='deleteButtonClickhandler(event);'> Delete </button> 
                    </td>
                </tr>`;
    });

    bookBodyEl.style.display = 'block';
}


// Handling POST/SAVE Api (Vanilla-JS)
document.getElementById('input-form').addEventListener('submit', onFormInputSubmit);
async function onFormInputSubmit(event){
    event.preventDefault();
    const authorEl = document.getElementById("author");
    const titleEl = document.getElementById("title");

    let author = authorEl.value;
    let title = titleEl.value;

    //console.log(author + ' : ' + title);
    if(author && title){ // Post if contains data
        let response = await fetch('/books', {
            method:'POST', 
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({book: {author: author, title: title}}),
        });

        let result = await response.json(); // geting the feedback
        
        console.log(result);

        if(result){

            // Clear fields
            authorEl.value = '';
            titleEl.value = '';
            
            // Show feedback
            alert(result.message);
            
            // Get updated records (force a click)
            document.getElementById('get-books-js').click();
            authorEl.focus();
        
        }
    
    } else{

        alert('All fields are required. Verify your entries.')
        authorEl.focus();

    }

}

// Handling UPDATE(PUT) Api (Vanilla-JS)
// NOTE: Attach this function to the update button's (generated during GET Api) 'onclick' event attribute.
async function updateButtonClickhandler(event){
    
    const clickedEl = event.target;
    const rowEl = clickedEl.parentNode.parentNode;
    const id = rowEl.id;

    const author = rowEl.getElementsByClassName('author')[0].value;
    const title = rowEl.getElementsByClassName('title')[0].value
    //console.log(author, title)

    if(id){
        
        let response = await fetch('/books/' + id, {
            method:'PUT', 
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({book: {author: author, title: title}}),
        });

        let result = await response.json(); // geting the feedback
        
        if(result){
            
            // Show feedback
            alert(result.message);
            
            // Get updated records (force a click on get-books button)
            document.getElementById('get-books-js').click();
        
        }
        
    } else { // no id found
        alert('Cannot find book ID');
    }

}


// Handling DELETE Api Request Click (Vanilla-JS)
// NOTE: Attach this function to the delete button's (generated during GET Api) 'onclick' event attribute.
async function deleteButtonClickhandler(event){
    
    const clickedEl = event.target;
    const rowEl = clickedEl.parentNode.parentNode;
    const id = rowEl.id;

    if(id){
        
        let response = await fetch('/books/' + id, {
            method:'DELETE', 
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        let result = await response.json(); // geting the feedback
        
        if(result){
            
            // Show feedback
            alert(result.message);
            
            // Get updated records (force a click on get-books button)
            document.getElementById('get-books-js').click();
        
        }
        
    } else { // no id found
        alert('Cannot find book ID');
    }

}

*/