<html lang="{{ app()->getLocale() }}">
    <head>
        <title>@yield('title') — Hack Cambridge</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="stylesheet" href="{{ mix('assets/css/app.css') }}" />
<<<<<<< HEAD
        <link rel="stylesheet" href="https://unpkg.com/@shopify/polaris@5.9.1/dist/styles.css" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
                integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
                crossorigin=""/>
        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
                integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
                crossorigin=""></script>
=======
        <link rel="stylesheet" href="https://unpkg.com/@shopify/polaris@5.13.1/dist/styles.css" />
>>>>>>> 71b8014f2784c7c9698ddad374f88fb4ae0f8357
        <link rel="shortcut icon" type="image/png" href="{{ asset('images/favicon.png') }}"/>
    </head>
    <body>
        @yield('content')
    </body>
</html>