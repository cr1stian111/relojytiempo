//solucion cors: https://cors-anywhere.herokuapp.com/corsdemohttps://github.com/Rob--W/cors-anywhere

const $tiempo = document.querySelector('.tiempo'),
$fecha = document.querySelector('.fecha');
$frase = document.querySelector('.frase');
$clima = document.querySelector('.clima');
//let ciudad = document.querySelector('.ciudad');
$desc = document.querySelector('.desc');
$temp = document.querySelector('.temp');
$minmax = document.querySelector('.tminmax');
$mm = document.querySelector('.mm');
$pie = document.querySelector('.pie');

function digitalClock(){
    let f = new Date(),
    dia = f.getDate(),
    mes = f.getMonth() + 1,
    anio = f.getFullYear(),
    diaSemana = f.getDay();

    dia = ('0' + dia).slice(-2);
    mes = ('0' + mes).slice(-2)

    let timeString = f.toLocaleTimeString();
    $tiempo.innerHTML = timeString;

    let semana = ['LUNES','MARTES','MIERCOLES','JUEVES','VIERNES','SABADO','DOMINGO'];
    let showSemana = (semana[diaSemana]);
    $fecha.innerHTML = `${showSemana} ${dia}-${mes}-${anio}`;
    $pie.innerHTML = `Por cr1stian111 y gracias a meteored :)`;
}


function getHora(){
    let hora = "";
    hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();

    return hora;
}

function getFraseFetch(){
    let api = "https://cr1corsproxy.herokuapp.com/?q=https://frasedeldia.azurewebsites.net/api/phrase";
    
    fetch(api)
      .then(response => response.json())
      .then(json => $frase.innerHTML = `${json["phrase"]} - ${json["author"]}`)
}


/*
antofagasta: 135102
santiago: 18578
valparaiso:  18577
temuco: 18267
conce: 18576
valdivia: 18266
*/

$dos = document.querySelector('.dos');
$cinco = document.querySelector('.cinco');
$ocho = document.querySelector('.ocho');
$once = document.querySelector('.once');
$dost = document.querySelector('.dost');
$cincot = document.querySelector('.cincot');
$ochot = document.querySelector('.ochot');
$oncet = document.querySelector('.oncet');
$nombre_ciudad = document.querySelector('.nombre_ciudad');

function getClima(ciudad){
    //let ciudad =  document.getElementById("idClima").value;
    let codigo_ciudad = ciudad.value;
    let api = "https://cr1corsproxy.herokuapp.com/?q=http://api.meteored.cl/index.php?api_lang=cl&localidad="+codigo_ciudad+"&affiliate_id=ri7jthz866dz&v=3.0";
    fetch(api)
      .then(response => response.json())
      .then(function(data){
        $desc.innerHTML = `${data["day"]["1"]["symbol_description"]}`;
        $temp.innerHTML = `${data["day"]["1"]["symbol_value"]}°`;
        $minmax.innerHTML = `Min: ${data["day"]["1"]["tempmin"]}°<br>Max: ${data["day"]["1"]["tempmax"]}°`;
        $mm.innerHTML = `${data["day"]["1"]["rain"]} mm de lluvia`;
        let array = data["day"]["1"]["hour"]; //array con los datos por hora
        //getDatosPorHora(data["day"]["1"]["hour"][0]["interval"]); 
        $nombre_ciudad.innerHTML = `Pronostico por hora para ${data["location"]}`
        for(let index in array){
            //console.log(array[index]) //objeto con datos x hora
            getDatosPorHora(array[index]);
        }

      })
      .catch(function(){
        console.log("Ocurrio un error");
      })

}

function getDatosPorHora(objeto){
    let output = `<b>${objeto["interval"]}</b></br>${objeto["symbol_description"]}</br>${objeto["temp"]}°</br>${objeto["rain"]}mm lluvia`;
    if(objeto["interval"]=="02:00"){
        $dos.innerHTML = output;
    }
    else if(objeto["interval"]=="05:00"){
        $cinco.innerHTML = output;
    }else if(objeto["interval"]=="08:00"){
        $ocho.innerHTML = output;
    }else if(objeto["interval"] == "11:00"){
        $once.innerHTML = output;
    }else if(objeto["interval"]=="14:00"){
        $dost.innerHTML = "<br>"+output;
    }else if(objeto["interval"]=="17:00"){
        $cincot.innerHTML = "<br>" + output;
    }else if(objeto["interval"] == "20:00"){
        $ochot.innerHTML = "<br>" + output;
    }else if(objeto["interval"]=="23:00"){
        $oncet.innerHTML = "<br>" + output;
    }
}

setInterval(() => {
    digitalClock()
}, 1000);

getFraseFetch();
