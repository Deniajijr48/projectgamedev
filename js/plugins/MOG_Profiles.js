//=============================================================================
// MOG_Profiles.js
//=============================================================================

/*:
 * @plugindesc (v1.0) Add the profiles scene to the title screen.
 * @author Moghunter
 *
 * @param Command Name
 * @desc Definição do nome do comando na tela de título.
 * @default Profiles
 *
 * @param Scrolling Speed
 * @desc Velocidade de Scroll.
 * @default 1
 *
 * @help  
 * =============================================================================
 * +++ MOG - Profiles (v1.0) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Adiciona a cena de créditos na tela de título.
 *
 * =============================================================================
 * UTILIZAÇÃO
 * ============================================================================= 
 * Serão necessários as imagens (img/system)
 *
 * ProfilesA.png
 * ProfilesB.png
 *
 * A altura da imagem pode ser de qualquer tamanho.
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_Profiles = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_Profiles');
	Moghunter.profiles_commandName = String(Moghunter.parameters['Command Name'] || "Profiles");
   
	
//=============================================================================
// ** Window Title Command
//=============================================================================	

//==============================
// * make Command List
//==============================
var _mog_profiles_wtc_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
    _mog_profiles_wtc_makeCommandList.call(this);
	this.addCommand(String(Moghunter.profiles_commandName),   'mprofiles');
};	
	
//=============================================================================
// ** Scene Tittle
//=============================================================================	

//==============================
// * create Command Window
//==============================
var _mog_profiles_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
    _mog_profiles_createCommandWindow.call(this);
	this._commandWindow.setHandler('mprofiles',  this.commandMProfiles.bind(this));
};

//==============================
// * command MProfiles
//==============================
Scene_Title.prototype.commandMProfiles = function() {
    this._commandWindow.close();
    SceneManager.push(Scene_MProfiles);
};


//=============================================================================
// ** Scene M Profiles
//=============================================================================	

//==============================
// * create Command Window
//==============================
function Scene_MProfiles() {
    this.initialize.apply(this, arguments);
}

Scene_MProfiles.prototype = Object.create(Scene_MenuBase.prototype);
Scene_MProfiles.prototype.constructor = Scene_MProfiles;

//==============================
// * initialize
//==============================
Scene_MProfiles.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

//==============================
// * Create Mbackground
//==============================
Scene_MenuBase.prototype.create_mbackground = function() {
};

//==============================
// * create
//==============================
Scene_MProfiles.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createPictureCredit();
};

//==============================
// * create
//==============================
Scene_MProfiles.prototype.createPictureCredit = function() {
	this._profilesSpeed = Math.min(Math.max(Moghunter.profiles_scrollSpeed,0.5),10);
    this.pictureCredit = [];
	this.pictureCredit[0] = new Sprite(ImageManager.loadSystem("ProfilesA"));
	this.addChild(this.pictureCredit[0]);
	if (Imported.MOG_MenuParticles && !this.skip_particles()) {this.create_mparticles()};
	this.pictureCredit[1] = new Sprite(ImageManager.loadSystem("ProfilesB"));
	this.pictureCredit[1].y = Graphics.boxHeight / 2;
	this.pictureCredit[1].opacity = 0;	
	this.addChild(this.pictureCredit[1]);
};

//==============================
// * Press Any Key
//==============================
Scene_MProfiles.prototype.pressAnyKey = function() {
    if (TouchInput.isTriggered()) {return true};
	if (TouchInput.isCancelled()) {return true};
	if (Input.isTriggered("ok")) {return true};
	if (Input.isTriggered("cancel")) {return true};
    return false;
};

//==============================
// * Update
//==============================
Scene_MProfiles.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
    this.pictureCredit[1].opacity += 1;
	this.pictureCredit[1].y -= this._profilesSpeed;
	if (this.pressAnyKey()) {SoundManager.playCursor();SceneManager.pop()};	 
	if (this.pictureCredit[1].y < -this.pictureCredit[1].height) {SceneManager.pop()};
	if (this._backgroundSprite) {this._backgroundSprite.visible = false};
};