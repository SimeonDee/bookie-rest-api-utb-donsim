
module.exports = function(app, data){

    // Root route
    app.get('/', (req, res)=>{
        res.render('index');
    });

    // Fetch all
    app.get('/books', (req, res)=>{
        res.send({books: data});
    });

    //Create
    app.post('/books', (req, res)=>{
        const book = req.body.book;
        //console.log(req.body);
        if (req.body.book.author && req.body.book.title){
            
            const new_id = data.length + 1;
            const new_book = {id: new_id, author: book.author, title: book.title}
            data.push(new_book);
            
            //Return result to client
            res.json({status: 'success', message: 'New book saved successfully.'});
            res.end();

        } else {
            res.json({status: 'failure', message: 'Invalid input supplied.'});
            res.end();
        }
        
    });

    // Update
    app.put('/books/:id', (req, res)=>{
        const id = Number.parseInt(req.params.id);
        const updated_author = req.body.book.author;
        const updated_title = req.body.book.title;
        let updated_book;
        let update_flag = false;

        if(updated_author || updated_title){
            for(let book of data){
                
                if(book.id === id){
                    book.author = updated_author;
                    book.title = updated_title;
                    update_flag = true;
                    updated_book = book;
                    break;
                }
            }

            if(update_flag && updated_book){
                res.json({status:'success', message:'Successfully updated book #' + id + 
                    '.\n\nUPDATES: \nAuthor: ' + updated_book.author + '\nTitle: '+ updated_book.title});
                res.end();
            } else {
                res.json({status:'failure', message:'Failed updating book #' + id + '.'});
                res.end();
            }

        } else {

            res.json({status:'failure', message:'Failed updating book #' + id + '.'});
            res.end();

        }
    
    });


    // Delete
    app.delete('/books/:id', (req, res)=>{
        const id = Number.parseInt(req.params.id);
        let delete_flag = false;
        let deleted_book;

        
        data.forEach((book, index)=>{
            if(book.id === id && !delete_flag){
                data.splice(index, 1);
                delete_flag = true;
                deleted_book = book;
            }
        });

        if(delete_flag && deleted_book){
            const msg = `Successfully deleted book #' ${id}.
            \nDELETED BOOK DETAILS: 
            Id: ${deleted_book.id} 
            Author: ${deleted_book.author}
            Title: ${deleted_book.title}`;

            res.json({status:'success', message: msg});
            res.end();
        } else {
            res.json({status:'failure', message:'Failed deleting book #' + id + '.\nDeleted' + JSON.stringify(deleted_book)});
            res.end();
        }
    
    });
}