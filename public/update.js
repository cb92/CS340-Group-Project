function updateArtwork(id)
{
	$.ajax({
		url: '/artwork/'+id,
		type:'PUT',
		data = $('#move-artwork').serialize(),
		success: function(result) { window.location.replace("./");	}


	})
};