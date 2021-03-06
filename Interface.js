// var oldpsm=Messenger.MyPersonalMessage;
var fso = new ActiveXObject("Scripting.FileSystemObject");
filehandle = fso.OpenTextFile(MsgPlus.ScriptFilesPath+"\\Config.ini",1);
filecontents = filehandle.ReadAll();
oldpsm = filecontents.split("[currentpsm]")[1].split("[/currentpsm]")[0];
filehandle.close();
function OnGetScriptMenu(Location)
{
	if (Location == 1 || Location == 2)
	{
		var ScriptMenu = "<ScriptMenu>";
		ScriptMenu += "<MenuEntry Id=\"MnuOn\">Turn On</MenuEntry>";
		ScriptMenu += "<MenuEntry Id=\"MnuOff\">Turn Off</MenuEntry>";
		ScriptMenu += "<Separator/>";
		ScriptMenu += "<MenuEntry Id=\"MnuReset\">Reset</MenuEntry>";
		ScriptMenu += "<MenuEntry Id=\"MnuShare\">Share</MenuEntry>";
		ScriptMenu += "<Separator/>";
		ScriptMenu += "<MenuEntry Id=\"MnuConf\">Configuration</MenuEntry>";
		ScriptMenu += "<MenuEntry Id=\"MnuAbout\">About</MenuEntry>"; 
		ScriptMenu += "</ScriptMenu>";
		return ScriptMenu;
	}
}

function OnEvent_MenuClicked(Id, Location, OrgWnd)
{
	if (Id == "MnuOn")
		TurnOn();
	if (Id == "MnuOff")
		TurnOff();
	if (Id == "MnuReset")
		Reset();
	if (Id == "MnuShare")
		Share();
	if (Id == "MnuConf")
		Conf();
	if (Id == "MnuAbout")
		About();
}

function About()
{
	MsgPlus.CreateWnd("dialogues.xml", "About");
}

function msgbox(msg)
{
	Interop.Call("User32.dll", "MessageBoxW", 0,msg,"PSM Chat", 0);
}

function Conf()
{
	var Wnd = MsgPlus.CreateWnd("dialogues.xml", "Conf");
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	filehandle = fso.OpenTextFile(MsgPlus.ScriptFilesPath+"\\Config.ini",1);
	filecontents = filehandle.ReadAll();
	oldpsm = filecontents.split("[currentpsm]")[1].split("[/currentpsm]")[0];
	filehandle.close();
	thecurrentpsm = oldpsm;
	Wnd.SetControlText("curpsm",thecurrentpsm);
}

function Reset()
{
	if(test == "on") {
		Messenger.MyPersonalMessage = "Your message here? Typ ~ plus your message!";
		MsgPlus.DisplayToast("PSM Chat","Reset");
	} else if(test == "off") {
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		filehandle = fso.OpenTextFile(MsgPlus.ScriptFilesPath+"\\Config.ini",1);
		filecontents = filehandle.ReadAll();
		oldpsm = filecontents.split("[currentpsm]")[1].split("[/currentpsm]")[0];
		filehandle.close();
		Messenger.MyPersonalMessage = oldpsm;
		MsgPlus.DisplayToast("PSM Chat","Reset");
	} else if(test == "") {
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		filehandle = fso.OpenTextFile(MsgPlus.ScriptFilesPath+"\\Config.ini",1);
		filecontents = filehandle.ReadAll();
		oldpsm = filecontents.split("[currentpsm]")[1].split("[/currentpsm]")[0];
		filehandle.close();
		Messenger.MyPersonalMessage = oldpsm;
		MsgPlus.DisplayToast("PSM Chat","NOT RUNNING.");
	}
}

function Refresh()
{
	if(test == "on") {
		Messenger.MyPersonalMessage = "Your message here? Typ ~ plus your message!";
	} else if(test == "off" || test == "") {
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		filehandle = fso.OpenTextFile(MsgPlus.ScriptFilesPath+"\\Config.ini",1);
		filecontents = filehandle.ReadAll();
		oldpsm = filecontents.split("[currentpsm]")[1].split("[/currentpsm]")[0];
		filehandle.close();
		Messenger.MyPersonalMessage = oldpsm;
	}
}

function TurnOn()
{
	test = "on";
	MsgPlus.DisplayToast("PSM Chat by Jules Huls","Hey " + Messenger.MyName + ",\n\  PSM Chat is: " + test + ".");
}

function TurnOff()
{
	test = "off";
	MsgPlus.DisplayToast("PSM Chat by Jules Huls","You can share this script by typing /psmshare in a conversation \n\ Status is: " + test + ".");
}

function OnConfEvent_CtrlClicked(PlusWnd,ControlId) {
	if (ControlId == "BtnSave") {
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		filehandle = fso.OpenTextFile(MsgPlus.ScriptFilesPath+"\\Config.ini",2);
		thenewpsm = PlusWnd.GetControlText("newpsm2");
		data = "[currentpsm]" + thenewpsm + "[/currentpsm]";
		filehandle.Write(data);
		msgbox("Je nieuwe PSM is opgeslagen.");
		filehandle.close();
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		filehandle = fso.OpenTextFile(MsgPlus.ScriptFilesPath+"\\Config.ini",1);
		filecontents = filehandle.ReadAll();
		thecurrentpsm = filecontents.split("[currentpsm]")[1].split("[/currentpsm]")[0];
		filehandle.close();
		PlusWnd.SetControlText("curpsm",thecurrentpsm);
		PlusWnd.SetControlText("newpsm2","");
		Refresh();
	}
}


