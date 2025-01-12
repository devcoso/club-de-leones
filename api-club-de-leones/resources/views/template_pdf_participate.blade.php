<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Diploma de participación en {{ $session->event->name }}</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9;
        }
        .container {
            width: 800px;
            margin: auto;
            margin-top: 50px;
            padding: 20px;
            background-color: #ffffff;
            border: 10px solid #23609a;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
        }
        .header img {
            width: 150px;
        }
        .header h1 {
            color: #23609a;
            font-size: 32px;
            font-weight: bold;
        }
        .colored {
            color: #23609a;
        }
        .subheading {
            text-align: center;
            font-size: 18px;
            margin-bottom: 20px;
        }
        .content {
            font-size: 16px;
            text-align: center;
            line-height: 1.6;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            margin-top: 40px;
            color: #777;
        }
        .signature {
            text-align: center;
            margin-top: 50px;
            font-size: 18px;
            font-style: italic;
        }
        .date {
            text-align: center;
            font-size: 14px;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Logo y título del evento -->
        <div class="header">
            <img src="{{ public_path('images/logo.png') }}" alt="Logo de la empresa">
            <h1>{{ $session->event->name }}</h1>
        </div>

        <!-- Información sobre el participante -->
        <div class="subheading">
            <p>Diploma de participación otorgado a:</p>
            <h2>{{ $session->user->fullname }}</h2>
        </div>

        <!-- Descripción del evento -->
        <div class="content">
            <p>Por su destacada participación en el evento <span class="colored">{{ $session->event->name }}</span> el día <span class="colored">{{ date("d/m/Y", strtotime($session->participated_at)) }}</span>,
            @if($session->duration)
                donde logró un tiempo de <span class="colored">{{ $session->duration }}</span>.
            @else
                donde demostró su esfuerzo y dedicación.
            @endif
            </p>
            <p class="footer"> <span class="colored">{{ $session->event->branch->name }}</span> ubicado en {{ $session->event->branch->location }}</p>
        </div>

    </div>
</body>
</html>
