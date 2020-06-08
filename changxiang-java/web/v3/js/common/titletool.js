function isYellowPage()
{
	var ua=window.navigator.userAgent.toLocaleLowerCase();
	if(ua.match("miuiyellowpage"))
	{
		return true;
	}
	else
	{
		return false;
	}
}
