var IntroScreen = function(assetManager, stage) {
    "use strict";
    
    // custom event for next button
    var eventScreenComplete = new createjs.Event("introFinished");
    var eventScreenPrevious = new createjs.Event("introPrevious");
    // construct container to hold all sprites of screen
    var screen = new createjs.Container();
    
    // add background to screen
    var background = assetManager.getSprite("uiAssets");
    background.gotoAndStop("introScreen");
    screen.addChild(background);
    
    // construct hitspot sprite
    var hitAreaSprite = assetManager.getSprite("uiAssets");
    
    // add next button
    var btnEnter = assetManager.getSprite("uiAssets");
    btnEnter.gotoAndStop("nextUp");
    btnEnter.x = 40;
    btnEnter.y = 180;
    btnEnter.buttonHelper = new createjs.ButtonHelper(btnEnter, "enterUp", "enterOver", "enterOver", false, hitAreaSprite, "hitArea");
    btnEnter.addEventListener("click", onEnter);
    screen.addChild(btnEnter);

    // ---------------------------------- event handlers
    function onEnter(e){
        console.log("clicked on next!"); 
        // telling the world the next button has been clicked!
        stage.dispatchEvent(eventScreenComplete);
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