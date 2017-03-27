var GameOverScreen = function(assetManager, stage) {
    "use strict";
  
    var screen = new createjs.Container();
    
    // add background to screen
    var background = assetManager.getSprite("uiAssets");
    background.gotoAndStop("gameOverScreen");
    screen.addChild(background);
    
    // ---------------------------------- public methods
    this.showMe = function() {
        // anything else that needs to be done when the screen is shown!
        // ...
        stage.addChild(screen);
    };
    
    this.hideMe = function() {
        stage.removeChild(screen);
    };
    
};