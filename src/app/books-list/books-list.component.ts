import { Component, OnInit } from '@angular/core';
import { Book } from './book.model';
import { BooksService } from './books.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-books',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];

  constructor(private booksService: BooksService) {
    this.booksService.getBooks().subscribe(
      (res: Response) => {
        const data = res.json();
        for(const bookJson of data) {
          const book = new Book(
            bookJson.isbn,
            bookJson.title,
            bookJson.author
          );
          this.books.push(book);
          booksService.addBook(book);
        }
      }, 
      (err) => console.log(err)
    );
   }

   onBookClicked(clickedBook: Book) {
     console.log(clickedBook);
   }

  ngOnInit() {
  }

}
