@extends('layouts.app')

@section('title')
{{ $product['name']}}
@endsection

@section('products')

<div>{{ $product['name'] }}</div>
<div>{{ $product['stock'] }}</div>
<div>{{ $product['price'] }}</div>
  @foreach ($product->review as $review )
    <div>
      <h4>{{ $review->content }}</h4>
      <form action="{{ route('review.deleteReview', [$product->id, $review->id]) }}" method="POST">
        @csrf
        @method('DELETE')
        <input type="submit" value="DELETE">
      </form>
    </div>
  @endforeach
@endsection