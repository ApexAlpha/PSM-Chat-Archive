﻿//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
/////																/////
///// PSM Chat 1.5														/////
///// Let others put messages in your PSM!					/////
/////																/////
///// Made by; Jules Huls												/////
///// Please send bug or ideas to me at:									/////
///// [redacted]												/////
/////																/////
///// Look at the green text a bit below how you can ban people from using your script!		/////
/////																/////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
var Banned1 = MsgPlus.RemoveFormatCodes("ExampleName1"); //Add the name of the person that you want to ban!
var Banned2 = MsgPlus.RemoveFormatCodes("ExampleName2");//Example: Delete "ExampleName" en typ: "Tom" if you want to ban Tom.
var Banned3 = MsgPlus.RemoveFormatCodes("ExampleName3");//NOTE: If Someone uses (colour)codes or Emoticons, it's suggested that u copy their names from the message history!
var Banned4 = MsgPlus.RemoveFormatCodes("ExampleName4");
var Banned5 = MsgPlus.RemoveFormatCodes("ExampleName5");
var d = new Date();
time = d.getMonth() + 1;
oldpsm = "";
isxmason = "0";
test = "";

function OnEvent_Uninitialize(MessengerExit)
{ Debug.ClearDebuggingWindow()
}
function OnEvent_Initialize(MessengerStart)
{
	TurnOn();
	Debug.Trace("---------------------------------\nPSM Chat 1.0 is now turned On. \n---------------------------------");
	Debug.Trace("---------------------------------\nFollowing persons have been banned:" + "\n" + Banned1 + "\n" + Banned2 + "\n" + Banned3 + "\n" + Banned4 + "\n" + Banned5 + "\n---------------------------------");
}

function OnEvent_SignInReady(Email)
{
	var test="";
	oldpsm = Messenger.MyPersonalMessage;
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	filehandle = fso.OpenTextFile(MsgPlus.ScriptFilesPath+"\\Config.ini",1);
	filecontents = filehandle.ReadAll();
	checkpsm = filecontents.split("[currentpsm]")[1].split("[/currentpsm]")[0];
	filehandle.close();
	if (oldpsm == checkpsm){
		Messenger.MyPersonalMessage = checkpsm;
	} else if (oldpsm != checkpsm && checkpsm != "") {
		msgbox("PSM Chat is configured!!!\n\nYou can now use PSM Chat, here's a list with commands:\n\n /psmon - Schakeld PSM Chat in.\n /psmoff - Schakeld PSM Chat uit.\n /psmreset - Resets je PSM n\ /psmabout - Opent een venster met info over PSM Chat \n /psmconf - Opent Config scherm van PSM Chat \n /psmshare - Deelt PSM Chat met je contactpersoon.");
	} else {
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		filehandle = fso.OpenTextFile(MsgPlus.ScriptFilesPath+"\\Config.ini",2);
		data = "[currentpsm]" + Messenger.MyPersonalMessage + "[/currentpsm]";
		filehandle.Write(data);
		msgbox("PSM Chat is configured!!!\n\nYou can now use PSM Chat, here's a list with commands:\n\n /psmon - Schakeld PSM Chat in.\n /psmoff - Schakeld PSM Chat uit.\n /psmreset - Resets je PSM n\ /psmabout - Opent een venster met info over PSM Chat \n /psmconf - Opent Config scherm van PSM Chat \n /psmshare - Deelt PSM Chat met je contactpersoon.");
		filehandle.close();
	}
}

function OnEvent_ChatWndReceiveMessage(ChatWnd, Origin, Message, MessageKind)
{
	if (test == "on")
	{
		var name = MsgPlus.RemoveFormatCodes(Origin);
		if (name == Banned1 || name == Banned2 || name == Banned3 || name == Banned4 || name == Banned5 || name == Messenger.Myname) {
			if(Message.substring(0,1) == "~") {
				damessage = Message.substring(1,500);
				ChatWnd.SendMessage("");
				Debug.Trace("---------------------------------\nAuto-Bericht: You may not use this function." + "\nWas send to:" + name + "\n---------------------------------");
			}
		} else {
			if(Message.substring(0,1) == "~") {
				damessage = Message.substring(1,500);
				Messenger.MyPersonalMessage = "" + name.substring(0,25) + " says: " + damessage + "  - Your message here? Typ a ~ in front of your message!";
				ChatWnd.SendMessage("Hey " + name.substring (0,25) + ",\n   Your message:  " + "[i]" + damessage + "[/i]" + "  is in my PSM now! ;)\nAutomatic message from PSM Chat" );
				Debug.Trace("---------------------------------\nThe following message:" + damessage + "\nWas send by:" + name + "\nMessage is succesfull put in your PSM" + "\n---------------------------------");
				MsgPlus.DisplayToast("PSM Chat","PSM changed to: " + damessage + ".");
			}
		} 
	}
}


