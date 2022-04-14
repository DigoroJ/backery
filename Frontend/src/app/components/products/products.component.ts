import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { product } from 'src/app/models/product.model';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: product[] = [
    {
      id: 2,
      price: 20.0,
      shortDescription: ' Lorem ipsum dolor 2',
      longDescription:
        ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis 2',
      name: 'lorem ',
      category: 'fsfsd',
      image: 'https://i.ibb.co/fNbq6VM/Choc-cream-biscuits.jpg',
    },
    {
      id: 1,
      price: 10.0,
      shortDescription: ' Lorem ipsum dolor 1',
      longDescription:
        ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis! 1',
      name: 'lorem ipsun dolor 1',
      category: '../../../assets/p4.jpg',
    },
    {
      id: 4,
      price: 40.0,
      shortDescription: ' Lorem ipsum dolor 4',
      longDescription:
        ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis! 4',
      name: 'lorem ipsun dolor 4',
      category: '../../../assets/p6.jpg',
    },
    {
      id: 3,
      price: 30.0,
      shortDescription: ' Lorem ipsum dolor 3',
      longDescription:
        ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis 3',
      name: 'lorem ipsun dolor 3',
      category: '../../../assets/p3.jpg',
    },
  ];
  
  productInCart: any = [];
  cartItem: any = {};

  totalPriceInCart: number = 0;
  totalInCart: number = 0;

  constructor(
    private sharedDataService: SharedDataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('Products')) {
      let localProduct: any = localStorage.getItem('Products');
      this.productInCart = JSON.parse(localProduct);

      this.productInCart.forEach((data: any) => {
        this.totalInCart += data.quantity;
        console.log(this.totalInCart);
      });
      this.sharedDataService.changeMessage(this.totalInCart);
    }
  }

  addToWishList() {
    console.log('Wish list hs been added');
  }

  updateViewMore: any = {};
  viewMore(product: any) {
    this.updateViewMore = product;
  }
  
  addToCart(currentProduct: any) {
    this.totalInCart++;

    console.log(this.totalInCart);
    this.sharedDataService.changeMessage(this.totalInCart);

    console.log(currentProduct);
    let matched = false;
    this.productInCart.forEach((citem: any) => {
      console.log(this.productInCart);
      if (citem.id == currentProduct.id) {
        citem.quantity++;
        matched = true;
        citem.subtotal = currentProduct.price * citem.quantity;
        this.totalPriceInCart += citem.subtotal;
        this.showSuccess();
      }
    });

    if (!matched) {
      this.cartItem = {
        ...currentProduct,
        quantity: 1,
        subtotal: currentProduct.price,
      };
      this.totalPriceInCart += currentProduct.price;
      this.productInCart.push(this.cartItem);
      this.showSuccess();
    }

    localStorage.setItem('Products', JSON.stringify(this.productInCart));
  }

  showSuccess() {
    this.toastr.success('Product has been added');
  }
}
