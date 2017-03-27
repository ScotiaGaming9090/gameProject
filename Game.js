(function() {
    "use strict";

    window.addEventListener("load", onInit);

    // game variables
    var stage = null;
    var canvas = null;

    // frame rate of game
    var frameRate = 24;

    // game objects
    var assetManager = null;
    var introScreen = null;
    var contentScreen = null;
    var endScreen = null;
    var gameScreen = null;
    var gameOverScreen = null;
    
    
    // ------------------------------------------------------------ event handlers
	
	function onInit() {
        console.log(">> initializing");

        // get reference to canvas
        canvas = document.getElementById("stage");
        // set canvas to as wide/high as the browser window
        canvas.width = 300;
        canvas.height = 300;
        // create stage object
        stage = new createjs.Stage(canvas);
		stage.enableMouseOver(10);

        // construct the assetManager to load the assets
        assetManager = new AssetManager(stage);
        stage.addEventListener("onAllAssetsLoaded", onReady);
        // load the assets!
        assetManager.loadAssets(manifest);
        
        
        // startup the ticker
        createjs.Ticker.setFPS(frameRate);
        createjs.Ticker.addEventListener("tick", onTick);
    }
    

    function onReady(e) {
        console.log(">> adding sprites to game");
        stage.removeEventListener("onAllAssetsLoaded", onReady);

        // construct our game objects!
        introScreen = new IntroScreen(assetManager, stage);
        introScreen.showMe();
        contentScreen = new ContentScreen(assetManager, stage);
        gameOverScreen = new GameOverScreen(assetManager, stage);
        gameScreen = new GameScreen(assetManager, stage);
        
        stage.addEventListener("introFinished", onIntroFinished);
        stage.addEventListener("contentFinished", onContentFinished);
        stage.addEventListener("playFinished", onPlayFinished);
        
        stage.addEventListener("introPrevious", onIntroPrevious);
        stage.addEventListener("contentPrevious", onContentPrevious);
        stage.addEventListener("playPrevious", onPlayPrevious);
        
        
        console.log(">> game ready");
    }

    
    function onIntroFinished(e){
        introScreen.hideMe();
        contentScreen.showMe();
    }
    
    function onContentFinished(e){
        contentScreen.hideMe();
        gameScreen.showMe();
        // TIMER
//        if (timer == null) startTimer();
    }
    
    function onPlayFinished(e){
        gameScreen.hideMe();
        gameOverScreen.showMe();
    }

     function onIntroPrevious(e){
        introScreen.hideMe();
        gameScreen.showMe();
    }
    
        function onContentPrevious(e){
        contentScreen.hideMe();
        introScreen.showMe();
    }
    
    function onPlayPrevious(e){
        gameScreen.hideMe();
        introScreen.showMe();
    }
    
    
    function onTick(e) {
        // TESTING FPS
        document.getElementById("fps").innerHTML = createjs.Ticker.getMeasuredFPS();

        // put your other stuff here!
        // ...

        // update the stage!
        stage.update();
    }

})();