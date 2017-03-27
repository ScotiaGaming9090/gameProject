var ContentScreen = function(assetManager, stage) {
    "use strict";
    
    // custom event for next button
    var eventScreenComplete = new createjs.Event("contentFinished");
    var eventScreenPrevious = new createjs.Event("contentPrevious");
    // construct container to hold all sprites of screen
    var screen = new createjs.Container();
    
    // add background to screen
    var background = assetManager.getSprite("uiAssets");
    background.gotoAndStop("contentScreen");
    screen.addChild(background);
    
    // construct hitspot sprite
    var hitAreaSprite = assetManager.getSprite("uiAssets");
    
    // add Play button
    var btnPlay = assetManager.getSprite("uiAssets");
    btnPlay.gotoAndStop("playUp");
    btnPlay.x = 120;
    btnPlay.y = 240;
    btnPlay.buttonHelper = new createjs.ButtonHelper(btnPlay, "playUp", "playOver", "playOver", false, hitAreaSprite, "hitArea");
    btnPlay.addEventListener("click", onPlay);
    screen.addChild(btnPlay);
    
    // add Quit button
    var btnQuit = assetManager.getSprite("uiAssets");
    btnQuit.gotoAndStop("previousUp");
    btnQuit.x = 3.5;
    btnQuit.y = 240;
    btnQuit.buttonHelper = new createjs.ButtonHelper(btnQuit, "quitUp", "quitOver", "quitOver", false, hitAreaSprite, "hitArea");
    btnQuit.addEventListener("click",onQuit);
    screen.addChild(btnQuit);

    // ---------------------------------- event handlers
    function onPlay(e){
        console.log("clicked on next!"); 
        // telling the world the next button has been clicked!
        stage.dispatchEvent(eventScreenComplete);
    }
    
    function onQuit(e){
        console.log("clicked on prev!")
        // telling the world the prev button has been clicked!
        stage.dispatchEvent(eventScreenPrevious);
    }
    
    // ---------------------------------- public methods
    this.showMe = function() {
        // anything else that needs to be done when the screen is shown!
        // ...
        stage.addChild(screen);
    }
    
    this.hideMe = function() {
        stage.removeChild(screen);
    }
    
    
       
    
    
};