import {Component, Input} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {ProductItem} from '../shared/ProductItem';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() Productanditem: ProductItem;
  title = 'Product ';
  items: FirebaseListObservable<any[]>;

  isEdit = true;
  isAdd = false;
  model = new ProductItem();
  currentDate = new Date();
  datetime: string;
  editKey: string;
  deleteKey: string;
  // qr code atrribute

  testchild: FirebaseListObservable<any[]>;
  elementType : 'url' | 'canvas' | 'img' = 'url';
  value : string = 'Techiediaries';
  addChildKey: string;
  constructor(private af: AngularFireDatabase) {
    this.items = af.list('/ProductInfo');


      // progress2

     this.testchild = af.list('/ProductInfo/-KpzS2rHGeiAyir2MJeB');
    // this.testchild.push({
    //   'InUse': this.model.InUse = true,
    //
    //
    // })
    //   .then(
    //     () => alert('Hola!!!')
    //   );

  }

  deleteItem(): string {
    // delete single item
    // the first slot is path or child
    // the second is key
    try {
      const pathFirebase = 'ProductInfo/' + this.deleteKey;
      this.af.object(pathFirebase)
        .remove()
        .then(() => alert('Successful for deleting product'));

      return this.deleteKey + 'has been deleted';
    }catch (err) {
      return 'error';
    }
  }

  updateItem(): string {
    // this.af.object('Item/{key}').update({'name': 'Jasmine' } );
    try {
      this.onEdit();
      this.datetime = this.currentDate.getDate() + '/'
        + (this.currentDate.getMonth() + 1 ) + '/'
        + this.currentDate.getFullYear() + ' @ '
        + this.currentDate.getHours() + ':'
        + this.currentDate.getMinutes() + ':'
        + this.currentDate.getSeconds();
      const pathFirebase = 'ProductInfo/' + this.editKey;
      this.af.object(pathFirebase)
        .update({'Price': this.model.Price,
          'ProductName': this.model.ProductName,
          'LastUpdate' : this.model.LastUpdate = this.datetime,
          'InUse': true} )
        .then(() => alert('Successful for Updating '));

      return this.editKey + 'has been update';
    }catch (err) {
      return 'error';
    }
  }

  addItem(): string {
    //   อาจจะรับมาเป็น Product type ในหน้า html คงเป็น item  จสกนนั้นใน method ก็เขียนว่า 'CreatedDate' : productparam.CreatedDate
    try{
      this.datetime = this.currentDate.getDate() + '/'
        + (this.currentDate.getMonth() + 1 ) + '/'
        + this.currentDate.getFullYear() + ' @ '
        + this.currentDate.getHours() + ':'
        + this.currentDate.getMinutes() + ':'
        + this.currentDate.getSeconds();

      this.items.push({
        'InUse': this.model.InUse = true,
        'Price': this.model.Price,

        'ProductName': this.model.ProductName,
        'CreatedDate': this.model.CreatedDate = this.datetime,
        'LastUpdate' : this.model.LastUpdate = this.datetime
      })
        .then(
          () => alert('Successful for adding new item')
        );
      this.model.InUse = null;
      this.model.ProductName = null;
      this.model.Price = null;
      this.model.CreatedDate = null;
      this.onAdding();
      return   'item has been added';
    }catch (err) {
      return 'error';
    }
  }


  onEdit(): string {
    // this method for change the state of isEdit that can disabled the button Edit or Save
    if (this.isEdit === true) {
      this.isEdit = false;
    } else {
      this.isEdit = true;
      return 'isEdit = true';
    }
    return 'isEdit = false';
  }

  onAdding(): string {
    // this method for enable the user to adding the new product
    if (this.isAdd === true) {
      this.isAdd = false;
    } else {
      this.isAdd = true;
      return 'isAdd = true';
    }
    return 'isAdd = false';
  }

  keyToEdit(keyparam: string, item: ProductItem) {
    this.editKey = keyparam;
    this.model = Object.assign({}, item);
    console.log(this.model);
  }

  keyToDelete(keyparam: string) {
    this.deleteKey = keyparam;
  }

  // Progress2
  keyToAddChild(keyparam: string) {
    this.addChildKey = keyparam;
  }

  isEmpty() {
    return this.model.ProductName && this.model.Price && (this.model.Price > 0);
  }

  clearData() {
    this.model = Object.assign({}, null);
  }

// Progress2

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print preview</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}

addChildeItem(): string {
    //   อาจจะรับมาเป็น Product type ในหน้า html คงเป็น item  จสกนนั้นใน method ก็เขียนว่า 'CreatedDate' : productparam.CreatedDate

     try {
      this.onEdit();
      this.datetime = this.currentDate.getDate() + '/'
        + (this.currentDate.getMonth() + 1 ) + '/'
        + this.currentDate.getFullYear() + ' @ '
        + this.currentDate.getHours() + ':'
        + this.currentDate.getMinutes() + ':'
        + this.currentDate.getSeconds();
      const pathFirebase = 'ProductInfo/' + this.addChildKey;

      for(let  i = 0;i < 5; i++) {
        this.testchild.push({



          'CreatedDate': this.model.CreatedDate = this.datetime,

        })
      }


      this.model.InUse = null;
      this.model.ProductName = null;
      this.model.Price = null;
      this.model.CreatedDate = null;
      this.onAdding();
      return   'item has been added';
    }catch (err) {
      return 'error';
    }
  }

}
