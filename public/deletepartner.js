function deletePartner(id) {
  $.ajax({
    url: '/partner/' + id,
    type: 'DELETE',
    success: function(result) {
      window.location.reload(true);
    }
  })
};
