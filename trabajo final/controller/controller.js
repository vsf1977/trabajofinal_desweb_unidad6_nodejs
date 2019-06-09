var path = require('path')
var archivo = require(path.join(__dirname , '../public/data.json'))

const controller = {}

var lista_ciudades = []
var tipo = []

controller.list = (req , res) =>
{
    var x = false 
    var y = false
    var listado = {} 
    var key = 'Ciudades'
    listado[key] = []    
    var key2 = 'Tipos'
    listado[key2] = []    


    for(i=0;i<archivo.length;i++)
    {          
        x = false
        for(j=0;j<lista_ciudades.length;j++)
        {
            if (lista_ciudades[j] == archivo[i].Ciudad)
            {
                x = true
            }
        }

        if (!x)
        {            
            lista_ciudades[lista_ciudades.length] = archivo[i].Ciudad          
            var data = 
            {
                nombre: archivo[i].Ciudad          
            }
            listado[key].push(data)
        }
        
        x = false
        for(j=0;j<tipo.length;j++)
        {
            if (tipo[j] == archivo[i].Tipo)
            {
                x = true
            }
        }

        if (!x)
        {            
            tipo[tipo.length] = archivo[i].Tipo          
            var data = 
            {
                nombre: archivo[i].Tipo          
            }
            listado[key2].push(data)
        }
      
    }
    res.json(JSON.stringify(listado))
}

module.exports = controller