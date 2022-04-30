@extends('layouts.app')

@section('title', 'Products List')


@section('products')
<div> <h1>ALL PRODUCTS IN SHOP</h1></div>
@foreach ($products as $product)
<div class="container">
  <a href="{{ route('admin.edit', [$product->id]) }}">{{ $product['name'] }}</a>
  <div>
    <h4 class="fs-6">Price: {{ $product->price }}</h1>
  </div>
</div> 
@endforeach

<div class="border d-flex flex-column  justify-content-center align-items-center m-3 p-1">
  <h2>Placed Orders</h2>
  @foreach ($orders as $order )
  <form action="{{ route('admin.deleteOrder', $order->id) }}" method="POST">
    @csrf
    @method('DELETE')
    <div class="container border">{{ $order->id }}
         {{ $order->name }}
         {{ $order->created_at }}
         {{ $order->phone }}
         {{ $order->address }}
         {{ $order->order }}</div>
    <input type="submit" value="DELETE">
  </form>
    
      
  @endforeach
</div>
@endsection