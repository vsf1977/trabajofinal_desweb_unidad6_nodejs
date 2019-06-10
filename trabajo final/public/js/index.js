$("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 1000,
    to: 20000,
    prefix: "$",
    onChange: function (data) 
    {
        $(".lista").empty()  
    }
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
      $(".lista").empty()
    })
  }
  setSearch()
  
  $(document).ready(function() 
  { 
    var slider = $("#rangoPrecio").data("ionRangeSlider")

    get_info_selects()  

    $("#buscar").click(function()
    {    
      var ciudad = ""
      var tipo = ""
      var min = 0
      var max = 0
      if (!($('#personalizada').hasClass('invisible')))
      { 
        ciudad = $("#ciudad").val()
        tipo = $("#tipo").val()
        min = slider.result.from
        max = slider.result.to
      }
      get_info_cards(ciudad,tipo,min,max)
    })

    /*slider.click(function()
    {
        $(".lista").empty()
    })*/

    $("#ciudad").change(function()
    {
        $(".lista").empty()
    })

    $("#tipo").change(function()
    {
        $(".lista").empty()
    })

    
  })
  
  
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
  
  function get_info_cards(ciudad,tipo,min,max)
  { 
    var ciudad1 = ciudad
    var tipo1 = tipo
    var min1 = min
    var max1 = max  
    $.ajax({
      url:'/consulta',
      type: 'GET',
      data : {'ciudad':ciudad1,'tipo':tipo1,'min':min1,'max':max1},     
      success: function (datos)      
      {        
        llenar_tarjetas(datos)    
      }
    })
  }


  function llenar_tarjetas(datos)
  {  
    $(".lista").empty()
    if (datos.length == 0)
    {
        alert("No hay resultados")
    }
    else
    {    
        for(j=0;j<datos.length;j++)
        {      
            $(".lista").append('<div class="card horizontal"  id ="tarjeta"><div class="card-image"><img src="img/home.jpg"></div><div class="card-stacked"><div class="card-content"></div><div class="card-action right-align"><a href="#">Ver más</a></div></div></div>')
            $(".card-content").last().append('<div><b>Direccion: </b>'+ datos[j].Direccion + '</div>')
            $(".card-content").last().append('<div><b>Ciudad: </b>'+ datos[j].Ciudad + '</div>')
            $(".card-content").last().append('<div><b>Telefono: </b>'+ datos[j].Telefono + '</div>')
            $(".card-content").last().append('<div><b>Código postal: </b>'+ datos[j].Codigo_Postal + '</div>')
            $(".card-content").last().append('<div><b>Precio: </b>'+ datos[j].Precio + '</div>')
            $(".card-content").last().append('<div><b>Tipo: </b>'+ datos[j].Tipo + '</div>')
            
        }      
    }
  }