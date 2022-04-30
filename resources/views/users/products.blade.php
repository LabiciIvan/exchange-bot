@extends('layouts.users')

@section('title', 'Shop Online')



@section('products')
    <h1 class="d-flex justify-content-center m-4 p-2 border border-2 border-top-0 border-end-0 border-start-0">Shop Online
    </h1>
    @if (session('status'))
        <h4 class="container d-flex justify-content-center alert alert-success w-25">
            {{ session('status') }}
        </h4>
    @endif
    <div class="container d-flex flex-column flex-md-row flex-wrap  justify-content-center ">
        @foreach ($products as $product)
            <div class="container d-flex-inline flex-column  justify-content-center m-4 " style="width:200px; height:260px">
                <div class="d-flex flex-row p-1 bd-highlight border border-1 w-100 h-100 justify-content-center">
                    <a href="{{ route('users.show', [$product->id]) }}" class="fs-6 text-decoration-none">
                        <div> {{ $product->name }}</div>
                        <div class="d-flex justify-content-center mt-5">{{ $product->price }} Lei</div>
                    </a>
                </div>


                <form class="d-flex flex-column  text-center mt-1 " action="{{ route('users.addCart', [$product->id]) }}"
                    method="POST">
                    @csrf
                    <input type="hidden" value="{{ $product->name }}">
                    <input class="d-flex justify-content-center border border-none text-decoration-none text-dark bg-warning"
                        type="submit" value="Add cart">
                </form>

            </div>
        @endforeach
    @endsection
</div>
