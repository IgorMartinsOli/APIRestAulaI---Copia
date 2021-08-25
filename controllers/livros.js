let User = require('../models/livro');

let bookData = [
    {'id': 1, "nome":"Mistorio", "resumo":"Lorem ipsun", "autor":"eu mesmo"},
    {'id': 2, "nome":"Mistorio2", "resumo":"Lorem ipsun2", "autor":"eu mesmo2"}
];

let nextId = 3;

module.exports = {
    //busca todos os livros
    getAllBooks: (req, res, next) =>{
        res.status(200).json(bookData);
    },
    getBookById: (req, res, next) =>{
       let idBook = req.params.id;

       for(let i=0; i< bookData.length; i++){
        let book = bookData[i];
        if(book.id == idBook){
            return res.status(200).json({book});
        }
       }
    },

    addBook: (req, res, next)=>{
        let nome = req.body.nome;
        let resumo = req.body.resumo;
        let autor = req.body.autor;
        
        let newBook = new Livro(nextId, nome, resumo, autor);

        nextId++;

        bookData.push(newBook);
        return res.status(201).json({msg: "Livro adicionado com sucesso!", book: newBook});
    },

    updateBook: (req, res, next)=>{
        let idBook = req.params.id;

        for(let i=0; i < bookData.length; i++){
            let book = bookData[i];
            if(book.id == idBook){
                book.nome = req.body.nome ? req.body.nome : book.nome;
                book.resumo = req.body.resumo ? req.body.resumo : book.resumo;
                book.autor = req.body.autor ? req.body.autor : book.autor;

                return res.status(200).json({msg: "Livro alterado com sucesso!", book: book});
            }
        }
        return res.status(404).json({msg: "Livro não encontrado!"});
    },

    deleteBook: (req, res, next)=>{
        let idBook = req.params.id;

       for(let i=0; i< bookData.length; i++){
        let book = bookData[i];
        if(book.id == idBook){
            bookData.splice(i, 1);
            return res.status(200).json({msg: "Livro removido com sucesso!"});
        }
       }
       return res.status(404).json({msg: "Livro não encontrado!"});
    },

}