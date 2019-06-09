
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$"
})

function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
    } else {
      this.customSearch = false
    }
    $('#personalizada').toggleClass('invisible')
  })
}
setSearch()

$(document).ready(function() 
{ 
  get_info_selects()

  $("#buscar").click(function()
  {    
    if ($('#personalizada').hasClass('invisible'))
    {      
      if ($('#tarjeta').hasClass('invisible'))
      {
        $("#tarjeta").removeClass('invisible')
      }
      else
      {
        $("#tarjeta").addClass('invisible')
      }
    }
  })

});


function get_info_selects()
{ 
  $.ajax({
    url:'/info',    
    success: function (datos)      
    {     
      llenar_select((datos))
      $('select').material_select()    
    }
  })
}


function llenar_select(datos)
{ 
  var info = JSON.parse(datos)
  for(j=0;j<info.Ciudades.length;j++)
  {    
    $("#ciudad").append("<option value='"+info.Ciudades[j].nombre+"'>"+info.Ciudades[j].nombre+"</option>")     
  }
  for(j=0;j<info.Tipos.length;j++)
  {   
    $("#tipo").append("<option value='"+info.Tipos[j].nombre+"'>"+info.Tipos[j].nombre+"</option>")     
  }          
}