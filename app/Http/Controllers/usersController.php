<?php

namespace App\Http\Controllers;
use App\Models\Products;
use Illuminate\Http\Request;
use App\Http\Requests\StoreOrder;
use App\Models\Order;
use Illuminate\Support\Facades\Session;
class usersController extends Controller
{
    public function index(Products $request) {

        return view('users.products', ['products' => Products::all()]);
    }

    public function show($id) {
       return view('users.show', ['product' => Products::with('review')->findOrFail($id)]);
    }

    public function contact() {
        return view('users.contact');
    }
    
    public function addCart($id) {
      
         $product =  Products::findOrFail($id);
         $notAdded = true;
         $quantity = 1;

         $toSession = array(
             'id' => $product->id,
             'created_at' => date($product->created_at),
             'updated_at' => date($product-> updated_at),
             'name' => $product-> name,
             'stock' => $product->stock,
             'price' => $product->price, 
             'totalPrice' => (double)$product->price * $quantity,             
             'quantity' => $quantity,
         );
         if (Session::has('product')) {
            foreach (Session::get('product') as $key => $value) {
                if ($value['id'] == $id) {
                    
                  ++$value['quantity'];
                  $notAdded = false;
                  Session::put('product.'.$key, $value);
                }
            }
         }
          if($notAdded) {
              Session::push('product', $toSession);
          }
    
        return redirect()->route('users.index');
    }


    public function viewCart() {
        $total = 0;
        $element = Session::get('product');
        if ($element) {
            foreach ($element as $key => $product) {
                $total += (double)$product['price'] * (double)$product['quantity'];
            }

        }
        return view('users.addCart', ['element' => $element, 'total' => $total]);
    }

    public function deleteCart($id) {

        foreach (Session::get('product') as $key => $value) {
            if ($value['id'] == $id) {
                Session::pull('product.'.$key);
            }
        }
        return redirect()->route('users.viewCart');
    }

    public function checkout($total) {

        $order = Session::get('product');

        $command = "";

        foreach ($order as $key => $value) {
            $command .= $value['name'] . ","; 
        }

        

        return view('users.checkout', ['total' => $total, 'order' => $order, 'command' => $command]);
    }

    public function placeOrder(StoreOrder $request) {
        
        $validate = $request->validated();

        Order::create($validate);

        Session::flash('status', 'The order was placed successfully');

        Session::forget('product');
        return redirect()->route('users.index');

    }

    public function increaseQunatity($id) {
        foreach (Session::get('product') as $key => $value) {
            if($value['id'] == $id) {
                ++$value['quantity'];
                Session::put('product.' .$key, $value);
            }
        }
        return redirect()->route('users.viewCart');
    }

    public function decreaseQuantity($id) {
        foreach (Session::get('product') as $key => $value) {
            if($value['id'] == $id && $value['quantity'] > 1) {
                --$value['quantity'];
                Session::put('product.' .$key, $value);
            }
        }
        return redirect()->route('users.viewCart');
    }
}
