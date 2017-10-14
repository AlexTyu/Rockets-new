#pragma strict

var facing: String;
var inUse: boolean;
var parent: GameObject;
var radius: int;
var isVisible: boolean;

var game: GameObject;

function Start () {
    parent = this.transform.parent.gameObject;
    game = GameObject.Find("Game");
}

function Update () {
    if (parent.GetComponent(Part).attached){
        this.GetComponent.<Collider>().enabled = true;
    } else {
        this.GetComponent.<Collider>().enabled = false;
    }
    isVisible = game.GetComponent(Game).isEditMode;
    if (inUse){
        isVisible = true;
    }
    if (isVisible){
        GetComponent.<Renderer>().enabled = true;
    } else {
        GetComponent.<Renderer>().enabled = false;
    }
}
