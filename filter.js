function filterValues()
{
	var searchEl = document.getElementById("partner-search-string");
	console.log(searchEl);
	var searchVal = searchEl.value;
	console.log(searchVal);
	var partnerLis = document.body.querySelectorAll(".partner-li");
	console.log(partnerLis);

	for (let i=0; i<partnerLis.length; i++)
	{
		if (partnerLis[i].innerText.indexOf(searchVal)==-1){
			partnerLis[i].style.display = "none";
		} else 
		{
			partnerLis[i].style.display = " ";
		}
	}
}