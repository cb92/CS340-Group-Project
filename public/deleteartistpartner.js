function deleteArtistPartner(artistId, partnerId) {
  $.ajax({
    url: '/artistPartner/' + artistId + '/' + partnerId,
    type: 'DELETE',
    success: function(result) {
      window.location.reload(true);
    }
  })
};
