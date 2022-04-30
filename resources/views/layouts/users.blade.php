<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>@yield('title')</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>

<body>
    <div class="nav d-flex flex-row border-bottom shadow-sm  justify-content-center align-items-center "
        style="height:100px">
        <a class="me-4 text-dark text-decoration-none" style="font-size: 25px"
            href="{{ route('users.index') }}">Home</a>
        <a class="me-4 text-dark text-decoration-none" style="font-size: 25px"
            href="{{ route('users.contact') }}">Contact</a>
        <a class="me-4 text-dark text-decoration-none" style="font-size: 25px"
            href="{{ route('users.viewCart') }}">Cart</a>

            @guest
                @if(Route::has('register'))
                    <a class="me-4 text-dark text-decoration-none" style="font-size: 25px"
                        href="{{ route('register') }}">Register</a>
                @endif
                <a class="me-4 text-dark text-decoration-none" style="font-size: 25px"
                    href="{{ route('login') }}">Login</a>
            @else
                <a class="me-4 text-dark text-decoration-none" style="font-size: 25px"
                    href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit()">Logout</a>

                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                    @csrf
                </form>
        @endguest
    </div>
    @yield('products')
</body>

</html>
