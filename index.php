<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>CSS Slider - Template</title>
    <link rel="stylesheet" href="../css/slider.css" />
    <style>
	    * {
	    	box-sizing: border-box;
	    }
        .csslider .navigation label {
            background: #B1B1B1;
        }
        .csslider .arrows label {
            border-left-color: #B1B1B1;
            border-right-color: #B1B1B1;
        }
        .csslider.inside .navigation label {
            border: 1px solid #FFF;
        }

        @import url(http://fonts.googleapis.com/css?family=Raleway:400,700|Lato);

        * {
            margin: 0;
            padding: 0;
        }

        ::-webkit-scrollbar {
            width: 2px;
            background: rgba(255, 255, 255, 0.1);
        }

        ::-webkit-scrollbar-track {
            background: none;
        }

        ::-webkit-scrollbar-thumb {
            background: rgba(0, 94, 168, 0.6);
        }

        ul, ol {
            padding-left: 40px;
        }

        html, body {
            height: 100%;
            text-align: center;
            font: 400 100% 'Raleway', 'Lato';
            color: #333;
            background-color: #FFF;
            background-image: -webkit-radial-gradient(50% 10%, ellipse farthest-corner, #ffffff 35%, #cccccc);
            background-image: -moz-radial-gradient(50% 10%, ellipse farthest-corner, #ffffff 35%, #cccccc);
            background-image: -ms-radial-gradient(50% 10%, ellipse farthest-corner, #ffffff 35%, #cccccc);
            background-image: -o-radial-gradient(50% 10%, ellipse farthest-corner, #ffffff 35%, #cccccc);
            background-image: radial-gradient(farthest-corner ellipse at 50% 10%, #ffffff 35%, #cccccc);
        }

        h1 {
            font-weight: 700;
            font-size: 310%;
        }

        h2 {
            font-weight: 400;
            font-size: 120%;
            color: #008FDF;
        }

        #slider1 {
            margin: 20px;
            font-family: 'Lato';
        }

            #slider1 > ul > li:nth-of-type(3) {
                background: url(./themes/fruit.jpg);
            }

            #slider1 > input:nth-of-type(3):checked ~ ul #bg {
                width: 80%;
                padding: 22px;
                -moz-transition: .5s .5s;
                -o-transition: .5s .5s;
                -webkit-transition: .5s .5s;
                transition: .5s .5s;
            }

                #slider1 > input:nth-of-type(3):checked ~ ul #bg div {
                    -moz-transform: translate(0);
                    -ms-transform: translate(0);
                    -o-transform: translate(0);
                    -webkit-transform: translate(0);
                    transform: translate(0);
                    -moz-transition: .5s .9s;
                    -o-transition: .5s .9s;
                    -webkit-transition: .5s .9s;
                    transition: .5s .9s;
                }

        #bg {
            color: #000;
            padding: 22px 0;
            position: absolute;
            left: 0;
            top: 16%;
            height: 20%;
            width: 0;
            z-index: 10;
            overflow: hidden;
        }

            #bg:before {
                content: '';
                position: absolute;
                left: -1px;
                top: 1px;
                height: 100%;
                width: 100%;
                z-index: -1;
                background: url(./themes/fruit.jpg) 1px 23%;
                -webkit-filter: blur(7px);
            }

            #bg:after {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                width: 100%;
                z-index: 20;
                background: rgba(0, 0, 0, 0.35);
                pointer-events: none;
            }

            #bg div {
                -moz-transform: translate(120%);
                -ms-transform: translate(120%);
                -o-transform: translate(120%);
                -webkit-transform: translate(120%);
                transform: translate(120%);
            }

        .scrollable p {
            padding: 30px;
            text-align: justify;
            line-height: 140%;
            font-size: 120%;
        }
    </style>
</head>
<body>
    <h1 style="padding-top: 60px;">CSS Slider</h1>
    <h2>Pure CSS Slider. No JS. Because it's possieble!</h2>


    <div id="slider1" class="csslider infinity inside">
        <input type="radio" name="slides" id="slides_1" checked />
        <?php 
            for($i = 2; $i < 20; $i++) {
                ?>
                <input type="radio" name="slides" id="slides_<?=$i?>" />
                <?php
            }
        ?>
        <ul>
        	<?php 
        		for($i = 1; $i < 20; $i++) {
        			?>
		            <li id="<?=$i?>">
		                <h1><?=$i?></h1>
		                <p>CSSlider is lightweight & easy to use slider. No JS - pure CSS.</p>
		            </li>
        			<?php
        		}
        	?>
        </ul>
        <div class="arrows left">
        <?php 
            for($i = 1; $i < 20; $i++) {
                ?>
            <label for="slides_<?=$i?>"></label>
                <?php
            }
        ?>
        </div>
        <div class="arrows right">
        <?php 
            for($i = 1; $i < 20; $i++) {
                ?>
            <label for="slides_<?=$i?>"></label>
                <?php
            }
        ?>
        </div>
        <div class="navigation">
            <div>
                <?php 
                    for($i = 1; $i < 20; $i++) {
                        ?>
                    <label for="slides_<?=$i?>"></label>
                        <?php
                    }
                ?>
            </div>
        </div>
    </div>
</body>
</html>
