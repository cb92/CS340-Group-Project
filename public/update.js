function updateArtwork(id)
{
	$.ajax({
		url: '/artwork/'+id,
		type:'PUT',
		data: $('#move-artwork').serialize(),
		success: function(result) { window.location.replace("./");	}


	})
};

function selectPartner(id)
{
	if (id)
		document.getElementById("new_partner").value=id
	else 
		document.getElementById("new_partner").value="null";

}