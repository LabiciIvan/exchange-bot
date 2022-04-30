@extends('layouts.users')

@section('title', 'shop')

@section('products')
    <div class="d-flex  w-100 h-100 justify-content-center mt-4 border border-danger ">
        <div class="d-flex flex-row justify-content-center w-75 h-100 ">
            <div class="d-flex flex-column w-75 shadow m-2 border-top">
                <h4>Name: {{ $product->name }}</h4>
                <h4>Quantity: {{ $product->stock }}</h4>
                <h4>Price: {{ $product->price }}</h4>
            </div>
            <div class="d-flex flex-column align-items-center border-top w-25 h-100 shadow m-2">
                <a class="d-flex" href="">Add cart</a>  
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </div>
        </div>

    </div>
    <div class="d-flex  w-100 h-100 justify-content-center mt-4 shadow">
        <h2>Reviews</h2>
        <form action="{{ route('review.addReview', $product->id) }}" method="POST">
            @csrf
     
            <input type="text" name="content">
            <button type="Submit">Add review</button>
        </form>

        @foreach ($product->review as $review)
            <p>{{ $review->content }} </a> </p>
        @endforeach
    </div>
@endsection
