#pragma strict

var launched: boolean;
var isGameOver: boolean;
var screen: String;

var leftTiltButton: GameObject;
var rightTiltButton: GameObject;

function Start () {
    Reset();
}

function Update () {
    updateParams();
    updateBalance();
}



function GameOver(){
        toggleGameOver(true);
        toggleTryAgainButton(true);
        toggleInFlightUi(false);
        toggleExplodeButton(false);
        toggleScore(true);
        // var score = GameObject.Find("Game").GetComponent(Game).altitudeRecord;
        // GameObject.Find("ScoreText").GetComponent(UI.Text).text = score + "m";
        isGameOver = true;
        Canvas.ForceUpdateCanvases();
}

function Reset(){
    toggleTryAgainButton(false);
    toggleLaunchButton(true);
    toggleGameOver(false);
    toggleBalance(true);
    toggleFlightData(false);
    toggleBackToLaunchButton(false);
    toggleInFlightUi(true);
    toggleExplodeButton(false);
    Canvas.ForceUpdateCanvases();
}

function toggleLaunchButton(isVisible: boolean){
    if (isVisible){
        GameObject.Find("LaunchButton").GetComponent(RectTransform).sizeDelta = Vector2(300,60);
        screen = "Launchpad";
    } else {
        GameObject.Find("LaunchButton").GetComponent(RectTransform).sizeDelta = Vector2(0,0);
    }
    Canvas.ForceUpdateCanvases();
}

function toggleExplodeButton(isVisible: boolean){
    // if (isVisible){
    //     GameObject.Find("ExplodeButton").GetComponent(RectTransform).sizeDelta = Vector2(50,50);
    // } else {
    //     GameObject.Find("ExplodeButton").GetComponent(RectTransform).sizeDelta = Vector2(0,0);
    // }
    // Canvas.ForceUpdateCanvases();
}



//OLD METHOD BELLOW

function toggleBalance(isVisible: boolean){
    if (isVisible){
        GameObject.Find("ethereumBalance").GetComponent(RectTransform).sizeDelta = Vector2(60,30);
        GameObject.Find("bitcoinBalance").GetComponent(RectTransform).sizeDelta = Vector2(60,30);
        GameObject.Find("storeIcon").GetComponent(RectTransform).sizeDelta = Vector2(60,30);
    } else {
        GameObject.Find("ethereumBalance").GetComponent(RectTransform).sizeDelta = Vector2(0,0);
        GameObject.Find("bitcoinBalance").GetComponent(RectTransform).sizeDelta = Vector2(0,0);
        GameObject.Find("storeIcon").GetComponent(RectTransform).sizeDelta = Vector2(0,0);
    }
    Canvas.ForceUpdateCanvases();
}

function toggleGameOver(isVisible: boolean){
    if (isVisible){
        isGameOver = true;
       GameObject.Find("GameOverText").GetComponent(RectTransform).sizeDelta = Vector2(200,60);
       GameObject.Find("GameOverText").GetComponent(UI.Text).text = "Game Over";
    } else {
        isGameOver = false;
       GameObject.Find("GameOverText").GetComponent(RectTransform).sizeDelta = Vector2(0,0);
       GameObject.Find("GameOverText").GetComponent(UI.Text).text = "";
    }
    Canvas.ForceUpdateCanvases();
}

function toggleScore(isVisible: boolean){
    if (isVisible){
       GameObject.Find("ScoreText").GetComponent(RectTransform).sizeDelta = Vector2(200,60);
    } else {
        GameObject.Find("ScoreText").GetComponent(RectTransform).sizeDelta = Vector2(0,0);
    }
    Canvas.ForceUpdateCanvases();
}

function toggleTryAgainButton(isVisible: boolean){
    if (isVisible){
        GameObject.Find("TryAgainButton").GetComponent(RectTransform).sizeDelta = Vector2(300,60);
    } else {
        GameObject.Find("TryAgainButton").GetComponent(RectTransform).sizeDelta = Vector2(0,0);
    }
    Canvas.ForceUpdateCanvases();
}


function toggleInFlightUi(isVisible: boolean){
    var stages = GameObject.Find("Rocket").GetComponent(Rocket).stages;
    if (isVisible){
      switch (stages) {
        case 1:
          GameObject.Find("Stage1Button").GetComponent(RectTransform).sizeDelta = Vector2(50,50);
          GameObject.Find("Stage1Detach").GetComponent(RectTransform).sizeDelta = Vector2(50,10);
          break;
        case 2:
          GameObject.Find("Stage1Button").GetComponent(RectTransform).sizeDelta = Vector2(50,50);
          GameObject.Find("Stage1Detach").GetComponent(RectTransform).sizeDelta = Vector2(50,10);
          GameObject.Find("Stage2Button").GetComponent(RectTransform).sizeDelta = Vector2(50,50);
          GameObject.Find("Stage2Detach").GetComponent(RectTransform).sizeDelta = Vector2(50,10);
            break;
        case 3:
          GameObject.Find("Stage1Button").GetComponent(RectTransform).sizeDelta = Vector2(50,50);
          GameObject.Find("Stage1Detach").GetComponent(RectTransform).sizeDelta = Vector2(50,10);
          GameObject.Find("Stage2Button").GetComponent(RectTransform).sizeDelta = Vector2(50,50);
          GameObject.Find("Stage2Detach").GetComponent(RectTransform).sizeDelta = Vector2(50,10);
          GameObject.Find("Stage3Button").GetComponent(RectTransform).sizeDelta = Vector2(50,50);
            break;
      }

    } else {
        GameObject.Find("Stage1Button").GetComponent(RectTransform).sizeDelta = Vector2(0,0);
        GameObject.Find("Stage2Button").GetComponent(RectTransform).sizeDelta = Vector2(0,0);
        GameObject.Find("Stage3Button").GetComponent(RectTransform).sizeDelta = Vector2(0,0);
        GameObject.Find("Stage1Detach").GetComponent(RectTransform).sizeDelta = Vector2(0,0);
        GameObject.Find("Stage2Detach").GetComponent(RectTransform).sizeDelta = Vector2(0,0);
    }
    Canvas.ForceUpdateCanvases();
}


function toggleBackToLaunchButton(isVisible: boolean){
    if (isVisible){
        GameObject.Find("backToLaunchButton").GetComponent(RectTransform).sizeDelta = Vector2(60,60);
    } else {
        GameObject.Find("backToLaunchButton").GetComponent(RectTransform).sizeDelta = Vector2(0,0);
    }
    Canvas.ForceUpdateCanvases();
}

function toggleEditButton(isVisible: boolean){
    if (isVisible){
        GameObject.Find("EditButton").GetComponent(RectTransform).sizeDelta = Vector2(160,30);
    } else {
        GameObject.Find("EditButton").GetComponent(RectTransform).sizeDelta = Vector2(0,0);
    }
    Canvas.ForceUpdateCanvases();
}

function toggleFlightData(isVisible: boolean){
    if (isVisible){
        GameObject.Find("Altitude").GetComponent(RectTransform).sizeDelta = Vector2(160,30);
        GameObject.Find("Speed").GetComponent(RectTransform).sizeDelta = Vector2(160,30);
    } else {
        GameObject.Find("Altitude").GetComponent(RectTransform).sizeDelta = Vector2(0,0);
        GameObject.Find("Speed").GetComponent(RectTransform).sizeDelta = Vector2(0,0);
    }
    Canvas.ForceUpdateCanvases();
}

function updateParams(){
    var Rocket = GameObject.Find("Rocket").GetComponent(Rocket);
    GameObject.Find("Altitude").GetComponent(UI.Text).text = Rocket.altitude + " m";
    GameObject.Find("Speed").GetComponent(UI.Text).text = Rocket.speed + " km/h";
}

function updateBalance(){
    var Player = GameObject.Find("Player").GetComponent(Player);
    GameObject.Find("ethereumBalance").GetComponent(UI.Text).text = Player.ethereum + "$";
    GameObject.Find("bitcoinBalance").GetComponent(UI.Text).text = Player.bitcoin + "🐧";
}
