function filterValues()
{
	var searchEl = document.getElementById("partner-search-string");
	var searchVal = searchEl.value.toUpperCase();
	var partners = document.body.querySelectorAll(".partner-li");

	for (let i=0; i<partners.length; i++)
	{
		if (partners[i].innerText.toUpperCase().indexOf(searchVal)> -1 || searchVal.length==0){
			partners[i].style.display = "block";

		} else 
		{
			partners[i].style.display = "none";
			console.log(partners[i].innerText);
		}
	}
}