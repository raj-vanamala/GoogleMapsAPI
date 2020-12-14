    let map,markers;

      function mapInitialization() {

        map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: 17.3616, lng: 78.4747 },
          zoom: 6,
        });

        infoWindow = new google.maps.InfoWindow();
        
        google.maps.event.addListener(map, 'click', function() {
        infoWindow.close();
        });
        

        fetch("https://api.agrihawk.in/api/devices/getMarkers?access_token=gPBjJLIYhiFMwHeXhilvDRgfJzR4a3GpnrCZTcZDfthx42hv2N08JUO026Pbwdev")
        
        .then(response=>response.json())
        
        .then(data=>{

          markers=data;

          for(let index=0;index<markers.length;index++){
            
            var marker = new google.maps.Marker({
               position: new google.maps.LatLng(markers[index].location["lat"], markers[index].location["lng"]),
               map: map,
            });

            position = new google.maps.LatLng(markers[index].location["lat"], markers[index].location["lng"])

            displayInfo(position,markers[index],markers[index].plotId,infoWindow)
        }
      })
      .catch(err=>console.log(err));
      }

      
      function displayInfo(position,markers,id,infoWindow) {

          fetch(`https://api.agrihawk.in/api/plots/getLatestDataForMap?plotId=${id}&access_token=gPBjJLIYhiFMwHeXhilvDRgfJzR4a3GpnrCZTcZDfthx42hv2N08JUO026Pbwdev`)
          
          .then(response=>response.json())
          
          .then(data=>{

            var marker = new google.maps.Marker({
                map: map,
                position: position
            });
            
            google.maps.event.addListener(marker, 'click', function() {
      
            
            var content = '<div style="font-weight: bold">' +
            '<div>' + "Time Stamp : " + data.timestamp + '</div>' + '<br/>' +
            '<div>' + "Air Humidity : " + data.airHumidity + '</div>' + '<br/>' +
            '<div>' + "Air Temp : " + data.airTemp + '</div>' + '<br/>' +
            '<div>' + "Leaf Wetness : " + data.leafWetness + '</div>' + '<br/>' +
            '<div>' + "Rainfall : " + data.rainFall + '</div>' + '<br/>' +
            '<div>' + "Light Intensity : " + data.lightIntensity + '</div><div/>';

            
            infoWindow.setContent(content);

            infoWindow.open(map, marker);
          })
        })
          .catch(err=>console.log(err))
      }