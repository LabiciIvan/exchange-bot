<?php include("../globals.php")  ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Log in</title>
    <script defer src="<?= $GLOBALS['to_js'] ?>/login.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>
    <link rel="stylesheet" href="<?= $GLOBALS['to_css'] ?>/login.css">
</head>
<body>
    <div class="FE-section_login">
        <form class="login-form">
            <div class="login-info">
                <h4 class="login-title">Log in</h4>
            </div>

            <div class="login-inputs">
                <input class="email" type="email" placeholder="Enter email...">
                <input class="password" type="password" placeholder="Enter password...">
                <button type="submit" class="login-btn">Log in</button>
            </div>
        </form>
    </div>
    
</body>
</html>