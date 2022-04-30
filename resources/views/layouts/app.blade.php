<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>@yield('title')</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>

<body class="bg-light">
    <div class="nav d-flex flex-row border-bottom justify-content-start shadow-sm align-items-center justify-content-center" style="height: 100px">
        <a class="pe-3 m-1 text-decoration-none text-dark" style="font-size: 25px" href="{{ route('admin.index') }}">Home</a>
        <a class="pe-3 m-1 text-decoration-none text-dark" style="font-size: 25px" href="{{ route('admin.create') }}">Add Products</a>
        <a class="pe-3 m-1 text-decoration-none text-dark" style="font-size: 25px" href="{{ route('register')}}" href="">Register</a>
    </div>
    @yield('products')
</body>

</html>
