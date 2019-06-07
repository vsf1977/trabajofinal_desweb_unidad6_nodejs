//Inicializador del elemento Slider

var lista_ciudades = []
var tipo = []

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
  get_info()  
  llenarinfo()  
});


function get_info()
{
  $.ajax({
    url:'/info',
    success: function (info)      
    {     
      console.log(info)
      var x = false 
      var y = false
      for(i=0;i<info.length;i++)
      {          
          x = false
          y = false
          for(j=0;j<lista_ciudades.length;j++)
          {
            if (lista_ciudades[j] == info[i].Ciudad)
            {
              x = true
            }
            if (tipo[j] == info[i].Tipo)
            {
              y = true
            }
          }          
          if (!y)
          {            
            tipo[tipo.length] = info[i].Tipo          
          }
          if (!x)
          {            
            lista_ciudades[lista_ciudades.length] = info[i].Ciudad          
          }
      }
      llenarinfo()
      $('select').material_select()
    }
  })
}


function llenarinfo()
{  
  for(j=0;j<lista_ciudades.length;j++)
  {
    console.log(lista_ciudades[j])
    $("#ciudad").append("<option value='"+lista_ciudades[j]+"'>"+lista_ciudades[j]+"</option>")     
  }
  for(j=0;j<tipo.length;j++)
  {
    console.log(tipo[j])
    $("#tipo").append("<option value='"+tipo[j]+"'>"+tipo[j]+"</option>")     
  }          
}