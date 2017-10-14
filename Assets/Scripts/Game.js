#pragma strict

// import System;
import UnityEngine.SceneManagement;

var altitudeRecord: float;
var flightStatus: String;

var isGameOver: boolean = false;
var isEditMode: boolean = false;

var isSubOrbital: boolean = false;

var rocket: GameObject;
var ui: GameObject;
var storage: GameObject;

var Landscape: GameObject;
var Planet: GameObject;


function Start(){
    rocket = GameObject.Find("Rocket");
    ui.gameObject.SetActive(true);
}

function Update () {
    checkRocket();
    if (isEditMode){
        storage.SetActive(true);
    } else {
        storage.SetActive(false);
    }
    var alt = rocket.GetComponent(Rocket).altitude;

    if (alt >= 15000){
      subOrbitalMode();
    }

    if (isSubOrbital){
      Planet.transform.position.x = rocket.transform.position.x;
      Planet.transform.position.z = rocket.transform.position.z;
    }
}

function subOrbitalMode(){
    isSubOrbital = true;
    Landscape.SetActive(false);
    Planet.SetActive(true);
    Planet.transform.position.x = rocket.transform.position.x;
    Planet.transform.position.z = rocket.transform.position.z;
}

function checkRocket(){
    // if (!isGameOver){
    //     if (rocket.GetComponent(Rocket).falling || rocket.GetComponent(Rocket).exploded){
    //         gameOver();
    //     }
    // }
}

function EditMode(){
    isEditMode = true;
    var camera = GameObject.Find("Camera");
    camera.GetComponent(cameraBehaviour).toggleEditMode();

    // rocket.GetComponent(Rocket).setPhysics(false);
}


function igniteStage(number: int){
  rocket.GetComponent(Rocket).igniteStage(number);
}

function detachStage(number: int){
  rocket.GetComponent(Rocket).detachStage(number);
}

function LaunchMode(){
    var camera = GameObject.Find("Camera");
    camera.GetComponent(cameraBehaviour).toggleStandby();
    ui.GetComponent(launchUI).toggleBalance(false);
    ui.GetComponent(launchUI).toggleLaunchButton(false);
    ui.GetComponent(launchUI).toggleFlightData(true);
    ui.GetComponent(launchUI).toggleEditButton(false);
    ui.GetComponent(launchUI).toggleInFlightUi(true);
    ui.GetComponent(launchUI).toggleExplodeButton(true);
    rocket.GetComponent(Rocket).Launch();
    // rocket.GetComponent(Rocket).setPosition();
    // rocket.GetComponent(Rocket).setPhysics(true);
}

function toggleInFlightMode(){
    var camera = GameObject.Find("Camera");
    // var Floor = GameObject.Find("Plane");
    // Floor.layer = 0;
    camera.GetComponent(cameraBehaviour).toggleInFlightMode();
}


function restart(){
    SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
}

function ARmode(){
    Application.LoadLevel("AR");
}


function explode(){
    rocket.GetComponent(Rocket).explode();
    gameOver();
}

function gameOver (){
    var camera = GameObject.Find("Camera");
    isGameOver = true;
    altitudeRecord = rocket.GetComponent(Rocket).altitude;
    camera.GetComponent(cameraBehaviour).toggleGameOver();
    GameObject.Find("ScoreText").GetComponent(UI.Text).text = altitudeRecord + " m";
    ui.GetComponent(launchUI).GameOver();
}
