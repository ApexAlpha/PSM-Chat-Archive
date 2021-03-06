function OnGetScriptCommands(){
	var ScriptCommands = "<ScriptCommands>";
	
	ScriptCommands += "<Command>";
	ScriptCommands += "<Name>psmon</Name>";
	ScriptCommands += "<Description>Turn on PSM Chat!</Description>";
	ScriptCommands += "</Command>";
	
	ScriptCommands += "<Command>";
	ScriptCommands += "<Name>psmoff</Name>";
	ScriptCommands += "<Description>Turn off PSM Chat!</Description>";
	ScriptCommands += "</Command>";
	
	ScriptCommands += "<Command>";
	ScriptCommands += "<Name>psmreset</Name>";
	ScriptCommands += "<Description>Reset your PSM!</Description>";
	ScriptCommands += "</Command>";
	
	ScriptCommands += "<Command>";
	ScriptCommands += "<Name>psmconf</Name>";
	ScriptCommands += "<Description>Open configuration window of PSM Chat!</Description>";
	ScriptCommands += "</Command>";
	
	ScriptCommands += "<Command>";
	ScriptCommands += "<Name>psmabout</Name>";
	ScriptCommands += "<Description>Opens about window of PSM Chat!</Description>";
	ScriptCommands += "</Command>";
	
	ScriptCommands += "<Command>";
	ScriptCommands += "<Name>psmshare</Name>";
	ScriptCommands += "<Description>Shares PSM Chat with your contact!</Description>";
	ScriptCommands += "</Command>";

	ScriptCommands += "</ScriptCommands>";
	return ScriptCommands;
}

function OnEvent_ChatWndSendMessage(ChatWnd, Message){
	if (Message.charAt(0) != '/') return Message;
	var arrMessage = Message.split(' ');
	var strCommand = arrMessage[0].substr(1);
	switch(strCommand){
		case "psmon":
			TurnOn();
			Debug.Trace("---------------------------------\nPSM Chat command: /psmon was used.\n---------------------------------")
			return "";
		case "psmoff":
			TurnOff();
			Debug.Trace("---------------------------------\nPSM Chat command: /psmoff was used.\n---------------------------------")
			return "";
		case "psmreset":
			Reset();
			Debug.Trace("---------------------------------\nPSM Chat command: /psmreset was used.\n---------------------------------")
			return "";
		case "psmconf":
			Conf();
			Debug.Trace("---------------------------------\nPSM Chat command: /psmconf was used.\n---------------------------------")
			return "";
		case "psmabout":
			About();
			Debug.Trace("---------------------------------\nPSM Chat command: /psmabout was used.\n---------------------------------")			
			return "";
		case "psmshare":
			ChatWnd.SendMessage("Hey, do you also want that your friends can put messages in your PSM ?\nI'm using PSM Chat for that! ;-)\nHere's a link http://www.msgpluslive.net/scripts/view/403-PSM-Chat/");
			Debug.Trace("---------------------------------\nPSM Chat command: /psmshare was used.\n---------------------------------")
			return "";
		default:
			return strMessage;
	}
}
