function filterValues(s_name, elQueryString)
{
	var searchEl = document.getElementById(s_name);
	var searchVal = searchEl.value.toUpperCase();
	var toSearch = document.body.querySelectorAll(elQueryString);

	for (let i=0; i<toSearch.length; i++)
	{
		if (toSearch[i].innerText.toUpperCase().indexOf(searchVal)> -1 || searchVal.length==0){
			toSearch[i].style.display = "block";

		} else 
		{
			toSearch[i].style.display = "none";
		}
	}
}