@extends('layouts.users')

@section('title', 'Place your order')

@section('products')
<div class="container border border-1 mt-1 w-50 h-10 shadow">
  <h1 class="d-flex justify-content-center border-bottom">Your Bill</h1>
  @foreach ($order as $item)
  <div class="d-flex flex-row justify-content-between border-bottom">
    <p>{{ $item['name'] }}</p>
    <p>{{ $item['price'] }} Lei</p>
  </div>
@endforeach
  <div class="d-flex flex-row justify-content-between">
    <h1>Total bill:</h1>
    <h1>{{ $total }} Lei</h1>
  </div>
</div>

<div class="container d-flex flex-column  border border-1 mt-1 w-50 h-10 shadow mt-4">
  <h3 class="d-flex justify-content-center border-bottom">Shipping address</h3>

  <form class="container d-flex justify-content-center" action="{{ route('users.placeOrder')}}" method="POST">
    @csrf

    <label for="name">Name</label>
    <input type="text" name="name">

    <label for="phone">Phone</label>
    <input type="text" name="phone">

    <label for="address">Adress</label>
    <input type="text" name="address">
    
    <input type="text" name="order" value="{{ $command }}">
    <input type="submit" value="Place Order">
  </form>
</div>
@endsection
