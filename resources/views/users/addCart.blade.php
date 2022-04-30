@extends('layouts.users')

@section('title', 'Session data')

@section('products')
    <div class="d-flex justify-content-center align-items-center border w-100 h-100 mt-4 p-1">
        @if ($element)
            <div class="d-flex flex-column  justify-content-center align-items-center shadow-lg  w-75 h-50 p-1">
                @foreach ($element as $product)
                    <div class="d-flex flex-column bg-light shadow border  w-100 m-2 pb-1 ps-1">
                        <div class="d-flex justify-content-start p-1">{{ $product['name'] }}</div>
                        <div class="container d-flex flex-row justify-content-center align-items-center border-bottom  w-100 ">
                            <form action="{{ route('users.decreaseQuantity', $product['id']) }}" method="POST">
                                @csrf
                                <button class="btn btn-outline-primary me-1" type="submit" value="">-</button>
                            </form>
                            Quantity:{{ $product['quantity'] }}
                            <form action="{{ route('users.increaseQunatity', $product['id']) }}" method="POST">
                                @csrf
                                <button class="btn btn-outline-primary ms-1" type="submit">+</button> </div>
                            </form>
                        <div class="d-flex justify-content-end me-1">{{ (double)$product['price'] * (int)$product['quantity'] }} <h3 class="ml-1">Lei</h3> </div>

                        <form action="{{ route('users.deleteCart', $product['id']) }}" method="POST">
                            @csrf
                            <input type="hidden" value="{{ $product['id'] }}">
                            <input class="btn btn-danger" type="submit" value="DELETE">
                        </form>
                    </div>
                @endforeach
                <div class="d-flex flex-column w-100">
                  <h4 class="d-flex justify-content-end">Total: {{ $total }} Lei</h1>

                    <form class="d-flex justify-content-end " action="{{ route('users.checkout', $total) }}" method="POST">
                      @csrf
                      <input class="btn btn-warning" type="submit" value="Proceed to checkout">
                    </form>
                </div>
            </div>
            @else
            <div>No products in cart</div>
        @endif
    </div>
@endsection
